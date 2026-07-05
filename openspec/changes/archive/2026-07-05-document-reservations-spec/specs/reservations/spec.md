## ADDED Requirements

### Requirement: Llistar reserves de l'usuari
El sistema SHALL retornar només les reserves amb estat `confirmed` de l'usuari autenticat, ordenades per data i franja horària ascendent.

#### Scenario: Usuari autenticat amb reserves
- **WHEN** un usuari autenticat sol·licita la llista de les seves reserves
- **THEN** el sistema retorna les reserves `confirmed` d'aquest usuari, ordenades per data i hora

#### Scenario: Usuari no autenticat
- **WHEN** una petició sense sessió vàlida sol·licita la llista de reserves
- **THEN** el sistema respon amb error 401 i no retorna cap dada

### Requirement: Crear una reserva
El sistema SHALL permetre a un usuari autenticat crear una reserva per a un professor, data i franja horària concrets, validant que la franja existeix i que no hi ha conflictes.

#### Scenario: Creació vàlida
- **WHEN** un usuari autenticat envia professorId, date i time vàlids sense conflictes
- **THEN** el sistema crea la reserva amb estat `confirmed` i la retorna amb codi 201

#### Scenario: Dades incompletes
- **WHEN** falta professorId, date o time a la petició
- **THEN** el sistema respon amb error 400 sense crear cap reserva

#### Scenario: Franja horària no vàlida
- **WHEN** el `time` indicat no correspon a cap franja horària existent
- **THEN** el sistema respon amb error 400 sense crear cap reserva

#### Scenario: No-solapament per usuari
- **WHEN** l'usuari ja té una reserva `confirmed` a la mateixa data i franja horària
- **THEN** el sistema respon amb error 409 sense crear una nova reserva

#### Scenario: Exclusivitat per professor
- **WHEN** el professor indicat ja té una altra reserva `confirmed` a la mateixa data i franja horària
- **THEN** el sistema respon amb error 409 sense crear una nova reserva

#### Scenario: Usuari no autenticat
- **WHEN** una petició sense sessió vàlida intenta crear una reserva
- **THEN** el sistema respon amb error 401 sense crear cap reserva

### Requirement: Cancel·lar una reserva
El sistema SHALL permetre a un usuari autenticat cancel·lar únicament les seves pròpies reserves, marcant-les com a `cancelled` sense esborrar-les.

#### Scenario: Cancel·lació vàlida
- **WHEN** un usuari autenticat cancel·la una reserva `confirmed` de la qual és propietari
- **THEN** el sistema marca la reserva com a `cancelled` i respon amb èxit

#### Scenario: Reserva inexistent o d'un altre usuari
- **WHEN** un usuari intenta cancel·lar una reserva que no existeix o no li pertany
- **THEN** el sistema respon amb error 404 sense modificar cap reserva

#### Scenario: Usuari no autenticat
- **WHEN** una petició sense sessió vàlida intenta cancel·lar una reserva
- **THEN** el sistema respon amb error 401 sense modificar cap reserva
