# timeslots Specification

## Purpose
TBD - created by archiving change document-timeslots-spec. Update Purpose after archive.
## Requirements
### Requirement: Llistar franges horàries actives
El sistema SHALL retornar totes les franges horàries actives quan no s'especifiqui cap filtre de professor ni data, ordenades per hora ascendent.

#### Scenario: Consulta sense filtres
- **WHEN** es consulten les franges horàries sense paràmetres `date` ni `professorId`
- **THEN** el sistema retorna totes les franges amb `is_active = true`, ordenades per hora

### Requirement: Llistar franges lliures d'un professor en una data
El sistema SHALL retornar només les franges horàries actives que no tenen cap reserva confirmada per al professor i la data indicats.

#### Scenario: Consulta amb data i professor
- **WHEN** es consulten les franges horàries amb els paràmetres `date` i `professorId`
- **THEN** el sistema retorna només les franges actives sense cap reserva `confirmed` d'aquest professor en aquesta data, ordenades per hora

