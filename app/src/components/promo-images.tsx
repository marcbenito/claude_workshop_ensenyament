"use client";

import { useEffect, useState } from "react";

const IMAGENES_STOCK = [
  "https://picsum.photos/id/1015/400/300",
  "https://picsum.photos/id/1025/400/300",
  "https://picsum.photos/id/1035/400/300",
];

export function PromoImages() {
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.error("Error de test: PromoImages ha tardado a cargar");
      setCargado(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!cargado) {
    return <p>Cargando imágenes...</p>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {IMAGENES_STOCK.map((src) => (
        <img key={src} src={src} alt="Imagen promocional de stock" />
      ))}
    </div>
  );
}
