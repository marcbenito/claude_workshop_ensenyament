import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/* ------------------------------------------------------------------ */
/*  Paleta i tipografia (coherents amb l'app: indigo #4F46E5)          */
/* ------------------------------------------------------------------ */

const FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif';

const C = {
  bg: "#EEF2FF",
  primary: "#4F46E5",
  primarySoft: "#E0E7FF",
  ink: "#1D2430",
  muted: "#6B7280",
  border: "#E5E7EB",
  card: "#FFFFFF",
  ok: "#16A34A",
};

const STEPS = ["Dia", "Professor", "Hora"];

/* ------------------------------------------------------------------ */
/*  Helpers d'animació                                                 */
/* ------------------------------------------------------------------ */

/** Fade+slide d'entrada i fade de sortida per a una escena sencera. */
function useSceneOpacity(durationInFrames: number) {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );
  return Math.min(fadeIn, fadeOut);
}

/* ------------------------------------------------------------------ */
/*  Chrome de l'app: finestra + stepper                                */
/* ------------------------------------------------------------------ */

const Stepper: React.FC<{ current: number }> = ({ current }) => (
  <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
    {STEPS.map((label, i) => {
      const done = i < current;
      const active = i === current;
      const isLast = i === STEPS.length - 1;
      const filled = done || active;
      return (
        <React.Fragment key={label}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 700,
                border: `2px solid ${filled ? C.primary : C.border}`,
                background: done ? C.primary : "transparent",
                color: done ? "#fff" : active ? C.primary : C.muted,
              }}
            >
              {done ? "✓" : i + 1}
            </div>
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: active ? C.ink : C.muted,
              }}
            >
              {label}
            </span>
          </div>
          {!isLast && (
            <div
              style={{
                flex: 1,
                height: 2,
                margin: "0 14px",
                background: done ? C.primary : C.border,
              }}
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

const AppWindow: React.FC<{
  current: number;
  children: React.ReactNode;
}> = ({ current, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 } });
  const y = interpolate(enter, [0, 1], [30, 0]);

  return (
    <div
      style={{
        width: 880,
        background: C.card,
        borderRadius: 20,
        boxShadow: "0 30px 80px rgba(29,36,48,0.16)",
        overflow: "hidden",
        transform: `translateY(${y}px)`,
      }}
    >
      {/* barra de finestra */}
      <div
        style={{
          height: 44,
          background: "#F8FAFC",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 18px",
        }}
      >
        <Dot color="#F87171" />
        <Dot color="#FBBF24" />
        <Dot color="#34D399" />
        <span
          style={{
            marginLeft: 16,
            fontSize: 15,
            color: C.muted,
            fontWeight: 600,
          }}
        >
          reserva-sessions.app / reservar
        </span>
      </div>
      {/* contingut */}
      <div style={{ padding: "28px 40px 40px" }}>
        <div style={{ marginBottom: 28 }}>
          <Stepper current={current} />
        </div>
        {children}
      </div>
    </div>
  );
};

const Dot: React.FC<{ color: string }> = ({ color }) => (
  <div
    style={{ width: 12, height: 12, borderRadius: "50%", background: color }}
  />
);

/** Rètol inferior que explica el pas. */
const Caption: React.FC<{ badge: string; text: string }> = ({
  badge,
  text,
}) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [6, 20], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        bottom: 46,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity: op,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "rgba(255,255,255,0.85)",
          border: `1px solid ${C.border}`,
          borderRadius: 999,
          padding: "12px 26px 12px 12px",
          boxShadow: "0 10px 30px rgba(29,36,48,0.08)",
        }}
      >
        <span
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: C.primary,
            color: "#fff",
            fontWeight: 800,
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {badge}
        </span>
        <span style={{ fontSize: 26, fontWeight: 600, color: C.ink }}>
          {text}
        </span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Escena 0 · Intro                                                   */
/* ------------------------------------------------------------------ */

const Intro: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = useSceneOpacity(durationInFrames);
  const enter = spring({ frame, fps, config: { damping: 200 } });
  const y = interpolate(enter, [0, 1], [30, 0]);
  const subOp = interpolate(frame, [14, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        fontFamily: FONT,
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      <div style={{ textAlign: "center", transform: `translateY(${y}px)` }}>
        <div
          style={{
            display: "inline-block",
            background: C.primarySoft,
            color: C.primary,
            fontSize: 24,
            fontWeight: 700,
            padding: "8px 22px",
            borderRadius: 999,
            marginBottom: 28,
          }}
        >
          Guia ràpida
        </div>
        <h1
          style={{
            fontSize: 82,
            fontWeight: 800,
            color: C.ink,
            margin: 0,
            letterSpacing: -2,
          }}
        >
          Com reservar una sessió
        </h1>
        <p
          style={{
            fontSize: 34,
            color: C.muted,
            marginTop: 20,
            fontWeight: 500,
            opacity: subOp,
          }}
        >
          En 3 passos: <b style={{ color: C.primary }}>Dia · Professor · Hora</b>
        </p>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Escena 1 · Tria el dia (calendari)                                 */
/* ------------------------------------------------------------------ */

const DIES = Array.from({ length: 35 }, (_, i) => i - 1); // offset per començar en dilluns

const CalendarStep: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const opacity = useSceneOpacity(durationInFrames);
  const SELECTED = 16; // dia destacat
  // pols que ressalta el dia seleccionat
  const pulse = interpolate(frame % 40, [0, 20, 40], [1, 1.12, 1]);

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        fontFamily: FONT,
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      <AppWindow current={0}>
        <h2 style={{ fontSize: 30, fontWeight: 700, color: C.ink, margin: "0 0 4px" }}>
          Tria el dia
        </h2>
        <p style={{ fontSize: 20, color: C.muted, margin: "0 0 22px" }}>
          Selecciona una data al calendari
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>
          {["Dl", "Dt", "Dc", "Dj", "Dv", "Ds", "Dg"].map((d) => (
            <div
              key={d}
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: 700,
                color: C.muted,
                paddingBottom: 4,
              }}
            >
              {d}
            </div>
          ))}
          {DIES.map((n, i) => {
            const valid = n >= 1 && n <= 31;
            const isSel = n === SELECTED;
            const past = valid && n < 8;
            return (
              <div
                key={i}
                style={{
                  height: 52,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: isSel ? 800 : 600,
                  color: !valid
                    ? "transparent"
                    : isSel
                    ? "#fff"
                    : past
                    ? "#C7CBD1"
                    : C.ink,
                  background: isSel ? C.primary : valid ? "#F8FAFC" : "transparent",
                  border: isSel
                    ? "none"
                    : valid
                    ? `1px solid ${C.border}`
                    : "none",
                  transform: isSel ? `scale(${pulse})` : "none",
                  boxShadow: isSel
                    ? "0 8px 24px rgba(79,70,229,0.45)"
                    : "none",
                }}
              >
                {valid ? n : ""}
              </div>
            );
          })}
        </div>
      </AppWindow>
      <Caption badge="1" text="Escull el dia que et vagi bé" />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Escena 2 · Tria el professor                                       */
/* ------------------------------------------------------------------ */

const PROFESSORS = [
  { name: "Ana Martín", subject: "Frontend & React", initials: "AM", color: "#4F46E5" },
  { name: "Bruno Sáez", subject: "Backend & APIs", initials: "BS", color: "#0891B2" },
  { name: "Carla Ferrer", subject: "Producte & UX", initials: "CF", color: "#DB2777" },
  { name: "David Ortega", subject: "DevOps & Cloud", initials: "DO", color: "#16A34A" },
];

const ProfessorStep: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const opacity = useSceneOpacity(durationInFrames);
  const SELECTED = 0;
  const glow = interpolate(frame % 40, [0, 20, 40], [0.35, 0.6, 0.35]);

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        fontFamily: FONT,
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      <AppWindow current={1}>
        <h2 style={{ fontSize: 30, fontWeight: 700, color: C.ink, margin: "0 0 4px" }}>
          Tria el professor
        </h2>
        <p style={{ fontSize: 20, color: C.muted, margin: "0 0 22px" }}>
          Amb disponibilitat per al dia escollit
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {PROFESSORS.map((p, i) => {
            const sel = i === SELECTED;
            const stagger = interpolate(
              frame,
              [i * 4, i * 4 + 14],
              [0, 1],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            );
            return (
              <div
                key={p.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: 18,
                  borderRadius: 16,
                  background: "#fff",
                  border: `2px solid ${sel ? C.primary : C.border}`,
                  boxShadow: sel
                    ? `0 0 0 6px rgba(79,70,229,${glow})`
                    : "0 4px 14px rgba(29,36,48,0.04)",
                  opacity: stagger,
                  transform: `translateY(${(1 - stagger) * 12}px)`,
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: "50%",
                    background: p.color,
                    color: "#fff",
                    fontSize: 22,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {p.initials}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: C.ink }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: 17, color: C.muted }}>{p.subject}</div>
                </div>
              </div>
            );
          })}
        </div>
      </AppWindow>
      <Caption badge="2" text="Selecciona el mentor que t'interessa" />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Escena 3 · Tria l'hora (franges)                                   */
/* ------------------------------------------------------------------ */

const MATI = ["09:00", "10:00", "11:00", "12:00", "13:00"];
const TARDA = ["16:00", "17:00", "18:00", "19:00"];

const TimeChip: React.FC<{
  time: string;
  selected: boolean;
  delay: number;
  glow: number;
}> = ({ time, selected, delay, glow }) => {
  const frame = useCurrentFrame();
  const stagger = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  return (
    <div
      style={{
        padding: "14px 0",
        width: 108,
        textAlign: "center",
        borderRadius: 12,
        fontSize: 22,
        fontWeight: 700,
        color: selected ? "#fff" : C.ink,
        background: selected ? C.primary : "#F8FAFC",
        border: `2px solid ${selected ? C.primary : C.border}`,
        boxShadow: selected ? `0 0 0 6px rgba(79,70,229,${glow})` : "none",
        opacity: stagger,
        transform: `translateY(${(1 - stagger) * 10}px)`,
      }}
    >
      {time}
    </div>
  );
};

const TimeStep: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const opacity = useSceneOpacity(durationInFrames);
  const glow = interpolate(frame % 40, [0, 20, 40], [0.35, 0.6, 0.35]);

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        fontFamily: FONT,
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      <AppWindow current={2}>
        <h2 style={{ fontSize: 30, fontWeight: 700, color: C.ink, margin: "0 0 4px" }}>
          Tria l&apos;hora
        </h2>
        <p style={{ fontSize: 20, color: C.muted, margin: "0 0 22px" }}>
          Franges de matí (09–13) i tarda (16–19)
        </p>

        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.muted, marginBottom: 12 }}>
            MATÍ
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {MATI.map((t, i) => (
              <TimeChip
                key={t}
                time={t}
                selected={t === "10:00"}
                delay={i * 3}
                glow={glow}
              />
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.muted, marginBottom: 12 }}>
            TARDA
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {TARDA.map((t, i) => (
              <TimeChip
                key={t}
                time={t}
                selected={false}
                delay={15 + i * 3}
                glow={glow}
              />
            ))}
          </div>
        </div>
      </AppWindow>
      <Caption badge="3" text="Escull una franja lliure" />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Escena 4 · Confirma                                                */
/* ------------------------------------------------------------------ */

const SummaryRow: React.FC<{
  icon: string;
  label: string;
  value: string;
  delay: number;
}> = ({ icon, label, value, delay }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "18px 4px",
        borderBottom: `1px solid ${C.border}`,
        opacity: op,
        transform: `translateX(${(1 - op) * 16}px)`,
      }}
    >
      <span style={{ fontSize: 30 }}>{icon}</span>
      <span style={{ fontSize: 20, color: C.muted, width: 150 }}>{label}</span>
      <span style={{ fontSize: 24, fontWeight: 700, color: C.ink }}>{value}</span>
    </div>
  );
};

const ConfirmStep: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const opacity = useSceneOpacity(durationInFrames);
  // el botó "batega" cap al final
  const press = interpolate(frame % 44, [0, 22, 44], [1, 0.96, 1]);

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        fontFamily: FONT,
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      <AppWindow current={2}>
        <h2 style={{ fontSize: 30, fontWeight: 700, color: C.ink, margin: "0 0 22px" }}>
          Confirma la sessió
        </h2>
        <div
          style={{
            background: "#F8FAFC",
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            padding: "6px 24px",
          }}
        >
          <SummaryRow icon="📅" label="Dia" value="Dj 16 de juliol" delay={4} />
          <SummaryRow icon="👤" label="Professor" value="Ana Martín" delay={12} />
          <SummaryRow icon="🕙" label="Hora" value="10:00" delay={20} />
        </div>
        <div
          style={{
            marginTop: 26,
            background: C.primary,
            color: "#fff",
            fontSize: 24,
            fontWeight: 700,
            textAlign: "center",
            padding: "18px 0",
            borderRadius: 14,
            transform: `scale(${press})`,
            boxShadow: "0 12px 30px rgba(79,70,229,0.4)",
          }}
        >
          Confirmar reserva
        </div>
      </AppWindow>
      <Caption badge="✓" text="Revisa i confirma la reserva" />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Escena 5 · Reserva feta                                            */
/* ------------------------------------------------------------------ */

const SuccessStep: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = useSceneOpacity(durationInFrames);
  const pop = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });
  const ring = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const subOp = interpolate(frame, [18, 34], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: C.primary,
        fontFamily: FONT,
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 36px",
            transform: `scale(${pop})`,
            boxShadow: `0 0 0 ${ring * 24}px rgba(255,255,255,0.15)`,
          }}
        >
          <span style={{ fontSize: 84, color: C.ok, fontWeight: 900 }}>✓</span>
        </div>
        <h1
          style={{
            fontSize: 76,
            fontWeight: 800,
            color: "#fff",
            margin: 0,
            letterSpacing: -1,
          }}
        >
          Reserva feta!
        </h1>
        <p
          style={{
            fontSize: 30,
            color: C.primarySoft,
            marginTop: 18,
            fontWeight: 500,
            opacity: subOp,
          }}
        >
          La trobaràs al teu tauler · pots cancel·lar-la quan vulguis
        </p>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Composició principal                                               */
/* ------------------------------------------------------------------ */

// Durades (30 fps)
const D_INTRO = 75;
const D_STEP = 105;
const D_CONFIRM = 100;
const D_SUCCESS = 90;

// Offsets acumulats de cada escena.
const AT_INTRO = 0;
const AT_DIA = AT_INTRO + D_INTRO; // 75
const AT_PROF = AT_DIA + D_STEP; // 180
const AT_HORA = AT_PROF + D_STEP; // 285
const AT_CONFIRM = AT_HORA + D_STEP; // 390
const AT_SUCCESS = AT_CONFIRM + D_CONFIRM; // 490

export const TOTAL_FLUX = AT_SUCCESS + D_SUCCESS; // 580

export const FluxReserva: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Sequence from={AT_INTRO} durationInFrames={D_INTRO}>
        <Intro durationInFrames={D_INTRO} />
      </Sequence>
      <Sequence from={AT_DIA} durationInFrames={D_STEP}>
        <CalendarStep durationInFrames={D_STEP} />
      </Sequence>
      <Sequence from={AT_PROF} durationInFrames={D_STEP}>
        <ProfessorStep durationInFrames={D_STEP} />
      </Sequence>
      <Sequence from={AT_HORA} durationInFrames={D_STEP}>
        <TimeStep durationInFrames={D_STEP} />
      </Sequence>
      <Sequence from={AT_CONFIRM} durationInFrames={D_CONFIRM}>
        <ConfirmStep durationInFrames={D_CONFIRM} />
      </Sequence>
      <Sequence from={AT_SUCCESS} durationInFrames={D_SUCCESS}>
        <SuccessStep durationInFrames={D_SUCCESS} />
      </Sequence>
    </AbsoluteFill>
  );
};
