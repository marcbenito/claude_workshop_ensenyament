import { Composition } from "remotion";

import { PromoReserves } from "./PromoReserves";
import { FluxReserva, TOTAL_FLUX } from "./FluxReserva";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Vídeo promocional (15 s). */}
      <Composition
        id="PromoReserves"
        component={PromoReserves}
        durationInFrames={450}
        fps={30}
        width={1280}
        height={720}
      />

      {/* Tutorial del flux de reservar una sessió, pas a pas. */}
      <Composition
        id="FluxReserva"
        component={FluxReserva}
        durationInFrames={TOTAL_FLUX}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
