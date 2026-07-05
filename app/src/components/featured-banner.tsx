"use client";

import { useEffect, useState } from "react";

const MISSATGES = [
  "Reserva la teva sessió de treball avui",
  "Els nostres mentors experts t'esperen",
  "Tria el professor i l'horari que t'encaixin",
];

/**
 * Càlcul "car" per decidir quin missatge destacar.
 * (Es fa síncron a CADA render — hauria d'anar memoritzat o fora del render.)
 */
function trientMissatgeDestacat(tick: number): number {
  let acc = 0;
  for (let i = 0; i < 5_000_000; i++) {
    acc += Math.sqrt((i * (tick + 1)) % 97);
  }
  return Math.round(acc) % MISSATGES.length;
}

export function FeaturedBanner() {
  const [tick, setTick] = useState(0);

  // Re-renderitza ~60 cops per segon sense cap motiu real.
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 16);
    return () => clearInterval(id);
  }, []);

  // A cada render (60/s) es fa el càlcul car → el main thread queda saturat.
  const destacat = trientMissatgeDestacat(tick);

  return (
    <div className="rounded-lg border bg-primary/5 px-6 py-4 text-center text-sm font-medium">
      {MISSATGES[destacat]}
    </div>
  );
}
