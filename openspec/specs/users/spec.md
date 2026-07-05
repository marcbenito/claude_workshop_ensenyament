# users Specification

## Purpose
TBD - created by archiving change document-users-spec. Update Purpose after archive.
## Requirements
### Requirement: Registre d'un compte nou
El sistema SHALL permetre crear un compte nou amb nom, email i contrasenya, validant que les dades siguin completes i que l'email no estigui ja registrat.

#### Scenario: Registre vàlid
- **WHEN** es reben nom, email i contrasenya vàlids i l'email no existeix prèviament
- **THEN** el sistema crea el compte i respon amb èxit i codi 201

#### Scenario: Dades incompletes
- **WHEN** falta el nom, l'email o la contrasenya a la petició
- **THEN** el sistema respon amb error 400 sense crear cap compte

#### Scenario: Email ja registrat
- **WHEN** l'email indicat ja pertany a un compte existent
- **THEN** el sistema respon amb error 409 sense crear cap compte nou

### Requirement: Inici de sessió amb credencials
El sistema SHALL autenticar un usuari únicament quan l'email correspongui a un compte existent i la contrasenya coincideixi amb la registrada.

#### Scenario: Credencials vàlides
- **WHEN** l'email correspon a un usuari existent i la contrasenya coincideix
- **THEN** el sistema autentica l'usuari i li obre una sessió

#### Scenario: Email no registrat
- **WHEN** l'email indicat no correspon a cap compte existent
- **THEN** el sistema denega l'autenticació

#### Scenario: Contrasenya incorrecta
- **WHEN** l'email correspon a un usuari existent però la contrasenya no coincideix
- **THEN** el sistema denega l'autenticació

#### Scenario: Credencials incompletes
- **WHEN** falta l'email o la contrasenya a la petició d'inici de sessió
- **THEN** el sistema denega l'autenticació sense consultar la base de dades

### Requirement: Sessió autenticada disponible a l'aplicació
El sistema SHALL exposar l'identificador de l'usuari autenticat a la sessió, perquè la resta de capacitats (com les reserves) puguin identificar-lo sense tornar a consultar credencials.

#### Scenario: Usuari autenticat consulta la sessió
- **WHEN** un usuari ha iniciat sessió correctament
- **THEN** la sessió conté l'identificador (`id`) d'aquest usuari, accessible a la resta de l'aplicació

#### Scenario: Cap sessió activa
- **WHEN** no hi ha cap usuari autenticat
- **THEN** la sessió no conté cap identificador d'usuari

