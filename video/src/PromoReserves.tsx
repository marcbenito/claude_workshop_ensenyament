import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif';

/** Una escena: fa fade+slide d'entrada i fade de sortida. */
const Scene: React.FC<{
  title: string;
  subtitle?: string;
  image?: string;
  bg: string;
  accent: string;
  titleColor?: string;
  durationInFrames: number;
}> = ({ title, subtitle, image, bg, accent, titleColor = "#1D2430", durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const y = interpolate(enter, [0, 1], [40, 0]);
  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bg,
        fontFamily: FONT,
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      <div style={{ transform: `translateY(${y}px)`, textAlign: "center" }}>
        {image ? (
          <Img
            src={staticFile(image)}
            style={{
              width: 360,
              height: 270,
              borderRadius: 24,
              boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
              marginBottom: 40,
            }}
          />
        ) : null}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: titleColor,
            margin: 0,
            letterSpacing: -1,
          }}
        >
          {title}
        </h1>
        {subtitle ? (
          <p style={{ fontSize: 34, color: accent, marginTop: 16, fontWeight: 600 }}>
            {subtitle}
          </p>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

export const PromoReserves: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <Sequence durationInFrames={90}>
        <Scene
          title="Reserva de Sessions de Treball"
          subtitle="Aprèn amb els millors mentors"
          bg="#EEF2FF"
          accent="#4F46E5"
          durationInFrames={90}
        />
      </Sequence>

      <Sequence from={90} durationInFrames={90}>
        <Scene
          title="Tria el professor"
          image="img/sessio.svg"
          bg="#EEF2FF"
          accent="#4F46E5"
          durationInFrames={90}
        />
      </Sequence>

      <Sequence from={180} durationInFrames={90}>
        <Scene
          title="Mira els seus buits"
          image="img/calendari.svg"
          bg="#ECFEFF"
          accent="#0891B2"
          durationInFrames={90}
        />
      </Sequence>

      <Sequence from={270} durationInFrames={90}>
        <Scene
          title="Confirma la sessió"
          image="img/franges.svg"
          bg="#FEF3F2"
          accent="#E11D48"
          durationInFrames={90}
        />
      </Sequence>

      <Sequence from={360} durationInFrames={90}>
        <Scene
          title="Comença avui"
          subtitle="reserva-sessions.app"
          bg="#4F46E5"
          accent="#C7D2FE"
          titleColor="#FFFFFF"
          durationInFrames={90}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
