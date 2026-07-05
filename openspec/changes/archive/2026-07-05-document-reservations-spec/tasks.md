## 1. Verificar la spec contra el codi

- [x] 1.1 Revisar cada escenari de `specs/reservations/spec.md` i confirmar que correspon exactament al comportament de `src/app/api/reservations/route.ts` i `[id]/route.ts`
- [x] 1.2 Confirmar que els codis d'estat HTTP (400/401/404/409/201) documentats coincideixen amb els del codi

## 2. Validar el canvi

- [x] 2.1 Executar `openspec validate document-reservations-spec --strict` i corregir qualsevol error de format
- [x] 2.2 Confirmar que el canvi queda llest per arxivar
