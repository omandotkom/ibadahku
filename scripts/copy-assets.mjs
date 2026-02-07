import { cp, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const distDir = path.join(root, "dist");

async function copyIfExists(relativePath) {
  const source = path.join(publicDir, relativePath);
  const destination = path.join(distDir, relativePath);

  try {
    await cp(source, destination, { force: true, recursive: false });
  } catch {
    // Skip missing files to keep build resilient across environments.
  }
}

async function copyAssetsDir() {
  const source = path.join(publicDir, "assets");
  const destination = path.join(distDir, "assets");

  try {
    await cp(source, destination, { force: true, recursive: true });
  } catch {
    // Skip when assets directory does not exist.
  }
}

async function copyIconPngs() {
  try {
    const files = await readdir(publicDir);
    const iconFiles = files.filter((file) => /^icon-.*\.png$/i.test(file));

    await Promise.all(iconFiles.map((file) => copyIfExists(file)));
  } catch {
    // Ignore if public directory is unavailable.
  }
}

async function main() {
  await mkdir(distDir, { recursive: true });

  await Promise.all([
    copyIfExists("favicon.ico"),
    copyIfExists("logo-kabah.svg"),
    copyIfExists("apple-touch-icon.png"),
    copyIfExists("og-image.jpg"),
    copyIconPngs(),
    copyAssetsDir(),
  ]);

  console.log("Assets copied to dist/");
}

main().catch((error) => {
  console.error("Failed to copy assets:", error);
  process.exitCode = 1;
});
