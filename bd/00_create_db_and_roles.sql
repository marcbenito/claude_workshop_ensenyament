-- =============================================================================
-- 00_create_db_and_roles.sql
-- Crea els rols i la base de dades del workshop.
--
-- Executar com a SUPERUSUARI (postgres), connectat a la BD "postgres":
--   psql -U postgres -d postgres -f bd/00_create_db_and_roles.sql
--
-- IMPORTANT: canvia 'CHANGE_ME_strong_password' per una contrasenya forta abans
-- d'executar. Pots generar-ne una amb:
--   openssl rand -base64 24
-- =============================================================================

-- Rol propietari (sense login): posseeix l'esquema i totes les taules.
-- Separar el propietari de l'usuari que es connecta manté el compte compartit
-- amb privilegis mínims (només DML), sense poder alterar l'esquema.
CREATE ROLE reservas_owner NOLOGIN;

-- Usuari compartit per donar a altra gent (login + permisos de consulta i edició).
-- Els GRANTs DML es donen a 02_grants.sql.
CREATE ROLE reservas_app LOGIN PASSWORD 'AquestaSeraLaN0straPa$$';

-- Base de dades del projecte, propietat del rol owner.
CREATE DATABASE workshop_reservas OWNER reservas_owner;
