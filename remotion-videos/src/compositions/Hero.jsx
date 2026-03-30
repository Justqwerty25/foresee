/**
 * HERO IMAGE — Dramatic, premium banner for website header
 * Cinematic split layout with product and text
 */
import { useCurrentFrame, useVideoConfig, Img, spring, interpolate, staticFile } from "remotion";

export const HeroComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Parallax-style animations
  const bgScale = interpolate(frame, [0, 120], [1.05, 1], { extrapolateRight: "clamp" });
  const textSlide = spring({ frame, fps, config: { damping: 50, stiffness: 60 } });
  const textX = interpolate(textSlide, [0, 1], [-80, 0]);
  const textOpacity = interpolate(frame, [10, 35], [0, 1], { extrapolateRight: "clamp" });

  const imageSlide = spring({ frame: frame - 8, fps, config: { damping: 60, stiffness: 50 } });
  const imageX = interpolate(imageSlide, [0, 1], [100, 0]);
  const imageOpacity = interpolate(frame, [15, 40], [0, 1], { extrapolateRight: "clamp" });

  // Badge animation
  const badgeIn = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" });

  // Subtle glow animation
  const glowPulse = Math.sin(frame / 40) * 0.1 + 0.9;

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #2C3E50 0%, #5A96B8 50%, #2C3E50 100%)",
        fontFamily: "'Noto Serif TC', 'Noto Sans TC', sans-serif",
      }}
    >
      {/* Animated background particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 4 + (i % 3) * 2,
            height: 4 + (i % 3) * 2,
            borderRadius: "50%",
            background: i % 3 === 0 ? "#F6C94E" : i % 3 === 1 ? "#F4A7B9" : "#7FB5D3",
            opacity: interpolate(
              Math.sin(frame / (20 + i * 3) + i),
              [-1, 1],
              [0.1, 0.5]
            ),
            left: `${(i * 137.5) % 100}%`,
            top: `${(i * 73.7) % 100}%`,
            transform: `translateY(${Math.sin(frame / (15 + i) + i) * 12}px)`,
          }}
        />
      ))}

      {/* Left side — Text content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 60px 80px 100px",
          transform: `translateX(${textX}px)`,
          opacity: textOpacity,
          zIndex: 2,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(246, 201, 78, 0.2)",
            padding: "10px 20px",
            borderRadius: 30,
            marginBottom: 30,
            width: "fit-content",
            opacity: badgeIn,
            transform: `translateY(${(1 - badgeIn) * 15}px)`,
          }}
        >
          <span style={{ fontSize: 16, color: "#F6C94E", fontWeight: 600, letterSpacing: 3 }}>
            專利技術 ✦ PATENTED
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.1,
            margin: 0,
            marginBottom: 20,
          }}
        >
          3D列印
          <br />
          <span style={{ color: "#F6C94E" }}>客製化副木</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.8,
            maxWidth: 500,
            margin: 0,
            marginBottom: 40,
          }}
        >
          運用先進3D列印技術，為每位孩子
          <br />
          量身打造最合適的手部輔具
        </p>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            gap: 16,
            opacity: interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              background: "#F6C94E",
              color: "#2C3E50",
              padding: "16px 36px",
              borderRadius: 14,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            預約諮詢
          </div>
          <div
            style={{
              border: "2px solid rgba(255,255,255,0.3)",
              color: "#fff",
              padding: "16px 36px",
              borderRadius: 14,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            了解更多 →
          </div>
        </div>
      </div>

      {/* Right side — Product image */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          transform: `translateX(${imageX}px) scale(${bgScale})`,
          opacity: imageOpacity,
        }}
      >
        {/* Glowing circle behind product */}
        <div
          style={{
            position: "absolute",
            width: 550,
            height: 550,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(127,181,211,${0.2 * glowPulse}) 0%, transparent 70%)`,
          }}
        />

        <Img
          src={staticFile("packshot-white.png")}
          style={{
            width: 600,
            height: 700,
            objectFit: "cover",
            borderRadius: 30,
            boxShadow: "0 40px 80px rgba(0,0,0,0.3)",
          }}
        />

        {/* Floating accent card */}
        <div
          style={{
            position: "absolute",
            bottom: 120,
            left: -30,
            background: "rgba(255,255,255,0.95)",
            borderRadius: 16,
            padding: "16px 24px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [60, 80], [20, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          <div style={{ fontSize: 14, color: "#7FB5D3", fontWeight: 600 }}>完全客製化</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#2C3E50" }}>100%</div>
        </div>
      </div>

      {/* Brand logo */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 100,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: interpolate(frame, [5, 20], [0, 0.9], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "linear-gradient(135deg, #7FB5D3, #5A96B8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 22,
          }}
        >
          ★
        </div>
        <span style={{ color: "#fff", fontSize: 20, fontWeight: 700, letterSpacing: 1 }}>
          預見物理治療所
        </span>
      </div>
    </div>
  );
};
