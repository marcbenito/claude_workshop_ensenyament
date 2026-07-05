## ADDED Requirements

### Requirement: Llistar tots els professors
El sistema SHALL retornar el catàleg complet de professors quan no s'especifiqui cap filtre de data ni franja horària.

#### Scenario: Consulta sense filtres
- **WHEN** es consulten els professors sense paràmetres `date` ni `slot`
- **THEN** el sistema retorna tots els professors del catàleg, ordenats per identificador

### Requirement: Llistar professors amb disponibilitat en una data
El sistema SHALL retornar només els professors que tenen almenys una franja horària activa lliure (sense reserva confirmada) en la data indicada.

#### Scenario: Consulta amb data
- **WHEN** es consulten els professors amb un paràmetre `date`
- **THEN** el sistema retorna només els professors que tenen com a mínim una franja activa sense reserva `confirmed` en aquesta data

### Requirement: Llistar professors disponibles en una data i franja concretes
El sistema SHALL retornar només els professors sense cap reserva confirmada en la data i franja horària indicades, validant prèviament que la franja existeix.

#### Scenario: Consulta amb data i franja vàlides
- **WHEN** es consulten els professors amb els paràmetres `date` i `slot` corresponents a una franja horària existent
- **THEN** el sistema retorna els professors sense cap reserva `confirmed` per a aquesta data i franja

#### Scenario: Franja horària no vàlida
- **WHEN** es consulten els professors amb un paràmetre `slot` que no correspon a cap franja horària existent
- **THEN** el sistema respon amb error 400 sense retornar cap professor
