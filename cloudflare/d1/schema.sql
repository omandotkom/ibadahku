-- packages table for Cloudflare D1
CREATE TABLE IF NOT EXISTS packages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  hotel_stars INTEGER NOT NULL CHECK (hotel_stars IN (3, 4, 5)),
  airline TEXT NOT NULL,
  departure_date TEXT NOT NULL,
  quota INTEGER NOT NULL,
  available_quota INTEGER NOT NULL,
  features TEXT NOT NULL,
  is_popular INTEGER NOT NULL DEFAULT 0,
  is_recommended INTEGER NOT NULL DEFAULT 0,
  image TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_packages_departure_date ON packages(departure_date);
