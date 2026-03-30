/**
 * DETAIL / MACRO SHOT — Close-up feature showcase
 * Highlights the 3D printed texture and craftsmanship
 */
import { useCurrentFrame, useVideoConfig, Img, spring, interpolate, staticFile } from "remotion";

export const DetailComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Zoom reveal animation
  const revealScale = interpolate(frame, [0, 30], [1.3, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Feature callouts appear sequentially
  const callout1 = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });
  const callout2 = interpolate(frame, [45, 65], [0, 1], { extrapolateRight: "clamp" });
  const callout3 = interpolate(frame, [55, 75], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: 1200,
        height: 1200,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Noto Sans TC', sans-serif",
        background: "#1a1a1a",
      }}
    >
      {/* Close-up product image */}
      <Img
        src={staticFile("detail-structure.jpg")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${revealScale})`,
          opacity,
        }}
      />

      {/* Dark overlay for contrast */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Feature callout 1 — top left */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 60,
          opacity: callout1,
          transform: `translateX(${(1 - callout1) * -30}px)`,
        }}
      >
        <div style={calloutLineStyle("left")} />
        <div style={calloutBoxStyle}>
          <div style={calloutTitleStyle}>蜂巢結構</div>
          <div style={calloutDescStyle}>透氣輕量設計</div>
        </div>
      </div>

      {/* Feature callout 2 — right middle */}
      <div
        style={{
          position: "absolute",
          top: 450,
          right: 60,
          opacity: callout2,
          transform: `translateX(${(1 - callout2) * 30}px)`,
          textAlign: "right",
        }}
      >
        <div style={calloutBoxStyle}>
          <div style={calloutTitleStyle}>醫療級材料</div>
          <div style={calloutDescStyle}>安全無毒 親膚舒適</div>
        </div>
        <div style={calloutLineStyle("right")} />
      </div>

      {/* Feature callout 3 — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 60,
          opacity: callout3,
          transform: `translateX(${(1 - callout3) * -30}px)`,
        }}
      >
        <div style={calloutLineStyle("left")} />
        <div style={calloutBoxStyle}>
          <div style={calloutTitleStyle}>精準貼合</div>
          <div style={calloutDescStyle}>3D掃描客製成型</div>
        </div>
      </div>

      {/* Bottom brand bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px 40px",
          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #7FB5D3, #5A96B8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 16,
            }}
          >
            ★
          </div>
          <span style={{ color: "#fff", fontSize: 15, fontWeight: 600 }}>預見物理治療所</span>
        </div>
        <span style={{ color: "#F6C94E", fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>
          3D PRINTED CUSTOM ORTHOTICS
        </span>
      </div>
    </div>
  );
};

const calloutBoxStyle = {
  background: "rgba(255,255,255,0.92)",
  borderRadius: 12,
  padding: "12px 20px",
  backdropFilter: "blur(10px)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
};

const calloutTitleStyle = {
  fontSize: 20,
  fontWeight: 800,
  color: "#2C3E50",
  marginBottom: 2,
};

const calloutDescStyle = {
  fontSize: 14,
  color: "#5A96B8",
  fontWeight: 500,
};

const calloutLineStyle = (side) => ({
  width: 50,
  height: 2,
  background: "#F6C94E",
  marginBottom: side === "left" ? 8 : 0,
  marginTop: side === "right" ? 8 : 0,
  marginLeft: side === "right" ? "auto" : 0,
});
