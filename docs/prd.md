# PRD — Reserva de Sessions de Treball

> Document de producte. Descriu **què** fa l'aplicació i **per a qui**. Per a les
> convencions tècniques de com treballar al repo, vegeu el `CLAUDE.md`.

## 1. Visió

Una aplicació web perquè els membres d'una organització puguin **reservar
sessions de treball 1-a-1 amb professors/mentors interns** (frontend, backend,
producte, DevOps, dades…). Substitueix el descontrol de correus i fulls de
càlcul per una agenda compartida, simple i fiable.

## 2. Usuaris i rols

| Rol | Descripció | Què pot fer |
|---|---|---|
| **Usuari** (persona que reserva) | Qualsevol membre de l'organització amb compte | Registrar-se, iniciar sessió, explorar professors, reservar, veure i cancel·lar les seves reserves |
| **Professor** | Mentor intern que ofereix sessions | (De moment només és una entitat reservable; no té panell propi) |
| **Equip de Dades** | Manté el catàleg de professors | Gestiona els professors a la base de dades corporativa |

## 3. Casos d'ús principals

1. **Registre i accés** — l'usuari es crea un compte (nom, email, contrasenya) i
   inicia/tanca sessió. Les pàgines privades requereixen sessió activa.
2. **Explorar professors** — veure la llista de professors amb especialitat i
   una breu bio, per triar amb qui reservar.
3. **Reservar una sessió** — flux guiat en passos (stepper):
   1. triar **professor**,
   2. triar **data**,
   3. triar **franja horària** disponible,
   4. **confirmar** la reserva.
4. **Veure les meves reserves** — al dashboard, l'usuari veu les seves reserves
   confirmades i el seu estat.
5. **Cancel·lar una reserva** — l'usuari pot cancel·lar una reserva; la franja
   torna a quedar lliure per a altres.
6. *(Previst)* **Reprogramar** una reserva a una altra data/franja.

## 4. Regles de negoci

- **Franges horàries fixes**: 09:00–13:00 i 16:00–19:00 (una reserva per hora).
  Les mateixes per a tots els dies i professors.
- **Una reserva per professor, data i franja**: un professor només pot tenir
  **una** reserva confirmada en una franja donada d'un dia. Si algú intenta
  reservar una franja ja ocupada, el sistema ho rebutja (conflicte).
- **Cancel·lar allibera**: una reserva cancel·lada allibera la franja, que torna
  a estar disponible.
- **No solapament per usuari**: un mateix usuari no pot tenir dues reserves
  confirmades que coincideixin en data i franja (encara que siguin amb
  professors diferents).
- **Autenticació obligatòria**: reservar, veure el dashboard i cancel·lar
  requereixen sessió iniciada.

## 5. Model de domini (conceptual)

- **Usuari**: id, nom, email (únic), credencial.
- **Professor**: id, nom, especialitat, inicials (per a l'avatar), bio.
- **Franja horària**: hora (de la llista fixa).
- **Reserva**: usuari + professor + data + franja + estat (`confirmed` /
  `cancelled`).

## 6. Fora d'abast (per ara)

- Pagaments o facturació.
- Notificacions per correu / calendari.
- Panell d'administració per a professors.
- **Valoracions** de les sessions (candidata a evolució futura del producte).
