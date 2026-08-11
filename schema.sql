CREATE TABLE IF NOT EXISTS casos (
  id BIGSERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL,
  ubicacion TEXT,
  historia TEXT NOT NULL,
  anonimo BOOLEAN NOT NULL DEFAULT TRUE,
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'publicado', 'rechazado')),
  creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revisado_en TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS casos_estado_creado_idx ON casos (estado, creado_en DESC);
