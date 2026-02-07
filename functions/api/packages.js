const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: JSON_HEADERS,
  });
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
    quota: Number(row.quota),
    availableQuota: Number(row.available_quota),
    features,
    isPopular: Number(row.is_popular) === 1,
    isRecommended: Number(row.is_recommended) === 1,
    image: row.image ? String(row.image) : undefined,
  };
}

export async function onRequestGet(context) {
  if (!context.env.DB) {
    return json(
      {
        error: "D1 binding DB belum tersedia.",
      },
      500,
    );
  }

  try {
    const result = await context.env.DB.prepare(
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
    const data = rows.map(rowToPackage);

    return json({ data });
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
