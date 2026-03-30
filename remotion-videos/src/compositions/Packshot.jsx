/**
 * PACKSHOT — Clean white/light background product shot
 * Professional e-commerce style with subtle shadow and rotation
 */
import { useCurrentFrame, useVideoConfig, Img, spring, interpolate, staticFile } from "remotion";

const IMAGES_BASE = "../../public/images_original/";

export const PackshotComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle entrance animation
  const scaleIn = spring({ frame, fps, config: { damping: 80, stiffness: 100 } });
  const scale = interpolate(scaleIn, [0, 1], [0.85, 1]);
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Very subtle floating motion
  const floatY = Math.sin(frame / 25) * 6;

  // Subtle shadow pulse
  const shadowSize = interpolate(Math.sin(frame / 30), [-1, 1], [20, 35]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 50%, #F0F1F3 100%)",
        fontFamily: "'Noto Sans TC', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow behind product */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(127,181,211,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Product image */}
      <div
        style={{
          transform: `scale(${scale}) translateY(${floatY}px)`,
          opacity,
          filter: `drop-shadow(0 ${shadowSize}px ${shadowSize * 1.5}px rgba(0,0,0,0.12))`,
        }}
      >
        <Img
          src={staticFile("packshot-trio.jpg")}
          style={{
            width: 750,
            height: 750,
            objectFit: "contain",
            borderRadius: 24,
          }}
        />
      </div>

      {/* Brand watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          opacity: interpolate(frame, [30, 50], [0, 0.6], { extrapolateRight: "clamp" }),
          fontSize: 16,
          fontWeight: 600,
          color: "#7FB5D3",
          letterSpacing: 2,
        }}
      >
        FORESEE PT
      </div>

      {/* Subtle corner accent */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          width: 60,
          height: 60,
          borderTop: "3px solid #7FB5D3",
          borderLeft: "3px solid #7FB5D3",
          borderRadius: "8px 0 0 0",
          opacity: interpolate(frame, [20, 40], [0, 0.4], { extrapolateRight: "clamp" }),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          width: 60,
          height: 60,
          borderBottom: "3px solid #F6C94E",
          borderRight: "3px solid #F6C94E",
          borderRadius: "0 0 8px 0",
          opacity: interpolate(frame, [20, 40], [0, 0.4], { extrapolateRight: "clamp" }),
        }}
      />
    </div>
  );
};
