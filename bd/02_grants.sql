-- =============================================================================
-- 02_grants.sql
-- Permisos de l'usuari compartit (reservas_app): consulta i edició (DML).
--
-- Executar com a SUPERUSUARI (postgres), connectat a la BD del projecte:
--   psql -U postgres -d workshop_reservas -f bd/02_grants.sql
-- =============================================================================

-- Accés a l'esquema (necessari per veure/usar les taules).
GRANT USAGE ON SCHEMA public TO reservas_app;

-- DML sobre les taules existents. NO s'atorga cap permís de DDL
-- (CREATE/ALTER/DROP), de manera que el compte compartit no pot tocar l'esquema.
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO reservas_app;

-- USAGE/SELECT sobre les sequences (necessari per als IDENTITY/serials en inserts).
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO reservas_app;

-- Privilegis per defecte: que les taules i sequences FUTURES creades per
-- reservas_owner siguin automàticament accessibles per reservas_app.
ALTER DEFAULT PRIVILEGES FOR ROLE reservas_owner IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO reservas_app;
ALTER DEFAULT PRIVILEGES FOR ROLE reservas_owner IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO reservas_app;
