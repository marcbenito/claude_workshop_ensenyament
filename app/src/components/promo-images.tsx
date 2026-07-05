const IMATGES = [
  { src: "/img/sessio.svg", alt: "Sessió de treball amb un professor", peu: "Sessions 1-a-1 amb mentors" },
  { src: "/img/calendari.svg", alt: "Calendari de reserves", peu: "Tria el dia que et va bé" },
  { src: "/img/franges.svg", alt: "Franges horàries disponibles", peu: "Reserva la franja lliure" },
];

export function PromoImages() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {IMATGES.map((img) => (
        <figure
          key={img.src}
          className="overflow-hidden rounded-lg border bg-card"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.src} alt={img.alt} className="h-40 w-full object-cover" />
          <figcaption className="px-4 py-3 text-sm text-muted-foreground">
            {img.peu}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
