# video — Vídeo promocional amb Remotion

Projecte **Remotion** (vídeo per codi, amb React) per generar un vídeo
promocional de 15 segons de l'app de Reserva de Sessions de Treball. És un
projecte independent de l'`app/`.

## Posada en marxa

```bash
cd video
npm install
```

## Comandes

- **Studio (previsualització en viu)**:
  ```bash
  npm run dev
  ```
  Obre l'editor de Remotion al navegador; pots veure i editar la composició
  `PromoReserves` en temps real.

- **Renderitzar el vídeo** a `out/promo.mp4`:
  ```bash
  npm run render
  ```

## Estructura

- `src/index.ts` — punt d'entrada (`registerRoot`).
- `src/Root.tsx` — registra la composició `PromoReserves` (450 frames, 30 fps,
  1280×720).
- `src/PromoReserves.tsx` — el vídeo: 5 escenes (intro, tria professor, mira
  buits, confirma, CTA) amb fades i transicions.
- `public/img/` — imatges temàtiques (les mateixes que la landing de l'app).

## Al curs

Aquest projecte és el punt de partida del mòdul de **Remotion** (punt 5.5). La
skill `/remotion` (de skills.sh) treballa sobre aquest projecte per generar o
retocar el vídeo. El render triga una mica: es llança i es reprodueix al
tancament del curs.
