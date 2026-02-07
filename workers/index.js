const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
};
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: JSON_HEADERS,
  });
}

function sanitizeFileName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function rowToPackage(row) {
  let features = [];
  try {
    const parsed = JSON.parse(row.features ?? "[]");
    if (Array.isArray(parsed)) {
      features = parsed.map((item) => String(item));
    }
  } catch {
    features = [];
  }

  return {
    id: String(row.id),
    name: String(row.name),
    description: String(row.description),
    price: Number(row.price),
    duration: Number(row.duration),
    hotelStars: Number(row.hotel_stars),
    airline: String(row.airline),
    departureDate: String(row.departure_date),
    features,
    isPopular: Number(row.is_popular) === 1,
    isRecommended: Number(row.is_recommended) === 1,
    image: row.image ? String(row.image) : undefined,
  };
}

function validatePackage(pkg) {
  if (!pkg || typeof pkg !== "object") {
    return "Body package tidak valid.";
  }

  const requiredText = ["id", "name", "description", "airline", "departureDate"];
  for (const key of requiredText) {
    if (typeof pkg[key] !== "string" || pkg[key].trim().length === 0) {
      return `Field ${key} wajib diisi.`;
    }
  }

  const numberFields = ["price", "duration", "hotelStars"];
  for (const key of numberFields) {
    if (typeof pkg[key] !== "number" || Number.isNaN(pkg[key])) {
      return `Field ${key} harus berupa angka.`;
    }
  }

  if (![3, 4, 5].includes(pkg.hotelStars)) {
    return "Field hotelStars harus 3, 4, atau 5.";
  }

  if (!Array.isArray(pkg.features) || pkg.features.length === 0) {
    return "Field features harus berupa array dan tidak boleh kosong.";
  }

  return null;
}

async function handleGetPackages(env) {
  if (!env.DB) {
    return json({ error: "D1 binding DB belum tersedia." }, 500);
  }

  try {
    const result = await env.DB.prepare(
      `SELECT
        id,
        name,
        description,
        price,
        duration,
        hotel_stars,
        airline,
        departure_date,
        quota,
        available_quota,
        features,
        is_popular,
        is_recommended,
        image
      FROM packages
      ORDER BY departure_date ASC, created_at DESC`,
    ).all();

    const rows = Array.isArray(result.results) ? result.results : [];
    return json({ data: rows.map(rowToPackage) });
  } catch (error) {
    return json(
      {
        error: "Gagal mengambil data paket dari D1.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      500,
    );
  }
}

async function handleUpsertPackage(request, env) {
  if (!env.DB) {
    return json({ error: "D1 binding DB belum tersedia." }, 500);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Body JSON tidak valid." }, 400);
  }

  const pkg = payload?.package;
  const previousId = typeof payload?.previousId === "string" ? payload.previousId : null;
  const validationError = validatePackage(pkg);
  if (validationError) {
    return json({ error: validationError }, 400);
  }

  const statements = [];

  if (previousId && previousId !== pkg.id) {
    statements.push(env.DB.prepare("DELETE FROM packages WHERE id = ?").bind(previousId));
  }

  statements.push(
    env.DB
      .prepare(
        `INSERT INTO packages (
          id,
          name,
          description,
          price,
          duration,
          hotel_stars,
          airline,
          departure_date,
          quota,
          available_quota,
          features,
          is_popular,
          is_recommended,
          image,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(id) DO UPDATE SET
          name = excluded.name,
          description = excluded.description,
          price = excluded.price,
          duration = excluded.duration,
          hotel_stars = excluded.hotel_stars,
          airline = excluded.airline,
          departure_date = excluded.departure_date,
          quota = excluded.quota,
          available_quota = excluded.available_quota,
          features = excluded.features,
          is_popular = excluded.is_popular,
          is_recommended = excluded.is_recommended,
          image = excluded.image,
          updated_at = CURRENT_TIMESTAMP`,
      )
      .bind(
        pkg.id.trim(),
        pkg.name.trim(),
        pkg.description.trim(),
        pkg.price,
        pkg.duration,
        pkg.hotelStars,
        pkg.airline.trim(),
        pkg.departureDate,
        typeof pkg.quota === "number" ? pkg.quota : 0,
        typeof pkg.availableQuota === "number" ? pkg.availableQuota : 0,
        JSON.stringify(pkg.features.map((item) => String(item).trim()).filter(Boolean)),
        pkg.isPopular ? 1 : 0,
        pkg.isRecommended ? 1 : 0,
        pkg.image ? String(pkg.image).trim() : null,
      ),
  );

  try {
    await env.DB.batch(statements);
    return json({ ok: true, id: pkg.id });
  } catch (error) {
    return json(
      {
        error: "Gagal menyimpan paket ke D1.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      500,
    );
  }
}

async function handleDeletePackage(request, env) {
  if (!env.DB) {
    return json({ error: "D1 binding DB belum tersedia." }, 500);
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return json({ error: "Query parameter id wajib diisi." }, 400);
  }

  try {
    await env.DB.prepare("DELETE FROM packages WHERE id = ?").bind(id).run();
    return json({ ok: true, id });
  } catch (error) {
    return json(
      {
        error: "Gagal menghapus paket dari D1.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      500,
    );
  }
}

async function handleUploadImage(request, env) {
  if (!env.PACKAGE_IMAGES) {
    return json({ error: "R2 binding PACKAGE_IMAGES belum tersedia." }, 500);
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Body multipart/form-data tidak valid." }, 400);
  }

  const fileValue = form.get("file");
  if (!(fileValue instanceof File)) {
    return json({ error: "Field file wajib diisi." }, 400);
  }

  if (!ALLOWED_IMAGE_TYPES.has(fileValue.type)) {
    return json({ error: "Tipe file harus JPG, PNG, atau WEBP." }, 400);
  }

  if (fileValue.size > MAX_UPLOAD_BYTES) {
    return json({ error: "Ukuran file maksimal 5MB." }, 400);
  }

  const safeName = sanitizeFileName(fileValue.name || "image");
  const uniqueKey = `packages/${Date.now()}-${crypto.randomUUID()}-${safeName}`;

  try {
    await env.PACKAGE_IMAGES.put(uniqueKey, fileValue.stream(), {
      httpMetadata: {
        contentType: fileValue.type,
      },
    });
  } catch (error) {
    return json(
      {
        error: "Gagal upload gambar ke R2.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      500,
    );
  }

  return json({
    ok: true,
    key: uniqueKey,
    url: `/media/${uniqueKey}`,
  });
}

async function handleGetMedia(request, env) {
  if (!env.PACKAGE_IMAGES) {
    return new Response("R2 binding PACKAGE_IMAGES belum tersedia.", { status: 500 });
  }

  const url = new URL(request.url);
  const key = decodeURIComponent(url.pathname.replace(/^\/media\//, ""));

  if (!key || key === url.pathname) {
    return new Response("Media key tidak valid.", { status: 400 });
  }

  const object = await env.PACKAGE_IMAGES.get(key);
  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  const headers = new Headers();
  if (typeof object.writeHttpMetadata === "function") {
    object.writeHttpMetadata(headers);
  }
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new Response(object.body, { headers });
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/packages" && request.method === "GET") {
      return handleGetPackages(env);
    }

    if (url.pathname === "/api/admin/packages" && request.method === "POST") {
      return handleUpsertPackage(request, env);
    }

    if (url.pathname === "/api/admin/packages" && request.method === "DELETE") {
      return handleDeletePackage(request, env);
    }

    if (url.pathname === "/api/admin/upload-image" && request.method === "POST") {
      return handleUploadImage(request, env);
    }

    if (url.pathname.startsWith("/media/") && request.method === "GET") {
      return handleGetMedia(request, env);
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not found", { status: 404 });
  },
};

export default worker;
