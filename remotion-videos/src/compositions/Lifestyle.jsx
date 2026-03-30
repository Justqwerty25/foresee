/**
 * LIFESTYLE SHOT — Product in real-world context
 * Shows the orthotic being used naturally, with warm overlay
 */
import { useCurrentFrame, useVideoConfig, Img, spring, interpolate, staticFile } from "remotion";

export const LifestyleComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoomIn = interpolate(frame, [0, 90], [1, 1.06], { extrapolateRight: "clamp" });
  const overlayOpacity = interpolate(frame, [0, 20], [0.8, 0], { extrapolateRight: "clamp" });

  // Text animation
  const textIn = spring({ frame: frame - 15, fps, config: { damping: 40, stiffness: 50 } });
  const textOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" });
  const textY = interpolate(textIn, [0, 1], [40, 0]);

  // Tag animation
  const tagIn = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: 1200,
        height: 1500,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Noto Sans TC', sans-serif",
      }}
    >
      {/* Full-bleed lifestyle photo */}
      <Img
        src={staticFile("lifestyle-hands-yellow.jpg")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${zoomIn})`,
        }}
      />

      {/* Cinematic opening overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#2C3E50",
          opacity: overlayOpacity,
        }}
      />

      {/* Bottom gradient for text readability */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)",
        }}
      />

      {/* Text overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 50,
          right: 50,
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        {/* Tag */}
        <div
          style={{
            display: "inline-flex",
            background: "rgba(246, 201, 78, 0.9)",
            color: "#2C3E50",
            padding: "8px 18px",
            borderRadius: 20,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 2,
            marginBottom: 16,
            opacity: tagIn,
          }}
        >
          日常使用實況
        </div>

        <h2
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.3,
            margin: 0,
            marginBottom: 12,
            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
          }}
        >
          舒適配戴
          <br />
          <span style={{ color: "#F6C94E" }}>快樂成長</span>
        </h2>

        <p
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.7,
            margin: 0,
            maxWidth: 600,
          }}
        >
          輕量設計不影響日常活動，讓孩子自在探索世界
        </p>
      </div>

      {/* Corner brand mark */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: interpolate(frame, [20, 40], [0, 0.8], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "linear-gradient(135deg, #7FB5D3, #5A96B8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 18,
          }}
        >
          ★
        </div>
        <span style={{ color: "#fff", fontSize: 16, fontWeight: 600, textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>
          預見物理治療所
        </span>
      </div>
    </div>
  );
};
