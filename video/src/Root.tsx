import { Composition } from "remotion";

import { PromoReserves } from "./PromoReserves";

// Vídeo de 15 segons a 30 fps = 450 fotogrames.
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="PromoReserves"
      component={PromoReserves}
      durationInFrames={450}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
