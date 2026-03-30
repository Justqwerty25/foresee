/**
 * SHOWCASE VIDEO — Full 15-second animated product showcase
 * Vertical format (1080x1920) for social media / website embed
 *
 * Timeline:
 * 0-90: Opening with logo + tagline
 * 90-210: Product gallery slideshow (3 products)
 * 210-330: Feature highlights with text
 * 330-450: Closing CTA + brand
 */
import { useCurrentFrame, useVideoConfig, Img, spring, interpolate, staticFile, Sequence } from "remotion";

/* ── OPENING SCENE ── */
const OpeningScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame: frame - 10, fps, config: { damping: 30, stiffness: 60 } });
  const titleOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [25, 45], [40, 0], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" });
  const lineWidth = interpolate(frame, [55, 75], [0, 200], { extrapolateRight: "clamp" });

  return (
    <div style={sceneBase("#2C3E50")}>
      {/* Animated particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 3 + (i % 4),
            height: 3 + (i % 4),
            borderRadius: "50%",
            background: i % 3 === 0 ? "#F6C94E" : i % 3 === 1 ? "#F4A7B9" : "#7FB5D3",
            opacity: interpolate(Math.sin(frame / (18 + i * 2) + i * 0.5), [-1, 1], [0.15, 0.6]),
            left: `${(i * 137.5 + 20) % 100}%`,
            top: `${(i * 73.7 + 10) % 100}%`,
            transform: `translateY(${Math.sin(frame / (12 + i) + i) * 15}px)`,
          }}
        />
      ))}

      {/* Logo */}
      <div
        style={{
          transform: `scale(${interpolate(logoScale, [0, 1], [0.5, 1])})`,
          opacity: interpolate(logoScale, [0, 1], [0, 1]),
          marginBottom: 30,
        }}
      >
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: 24,
            background: "linear-gradient(135deg, #7FB5D3, #5A96B8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 44,
            boxShadow: "0 10px 40px rgba(127,181,211,0.3)",
          }}
        >
          ★
        </div>
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: "#fff",
          margin: 0,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontFamily: "'Noto Serif TC', serif",
        }}
      >
        預見物理治療所
      </h1>

      {/* Divider line */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          background: "linear-gradient(90deg, #F6C94E, #F4A7B9)",
          borderRadius: 2,
          margin: "20px 0",
        }}
      />

      {/* Subtitle */}
      <p
        style={{
          fontSize: 24,
          color: "rgba(255,255,255,0.7)",
          opacity: subtitleOpacity,
          margin: 0,
          letterSpacing: 4,
          fontWeight: 500,
        }}
      >
        3D列印客製化副木
      </p>
    </div>
  );
};

/* ── PRODUCT GALLERY SCENE ── */
const GalleryScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const products = [
    { src: "packshot-trio.jpg", label: "多彩系列" },
    { src: "packshot-yellow-pair.jpg", label: "精準貼合" },
    { src: "detail-structure.jpg", label: "蜂巢結構" },
  ];

  // Each product shows for 40 frames
  const activeIndex = Math.min(Math.floor(frame / 40), 2);
  const localFrame = frame - activeIndex * 40;

  const imgScale = spring({ frame: localFrame, fps, config: { damping: 50, stiffness: 80 } });
  const scale = interpolate(imgScale, [0, 1], [1.15, 1]);
  const imgOpacity = interpolate(localFrame, [0, 10, 35, 40], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  const labelOpacity = interpolate(localFrame, [10, 20, 30, 40], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Progress dots
  const progress = frame / 120;

  return (
    <div style={sceneBase("#FFFBF5")}>
      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 60,
          fontSize: 16,
          fontWeight: 700,
          color: "#7FB5D3",
          letterSpacing: 4,
          opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        產品展示
      </div>

      {/* Product image */}
      <div
        style={{
          width: 800,
          height: 1000,
          borderRadius: 30,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.12)",
          opacity: imgOpacity,
          transform: `scale(${scale})`,
        }}
      >
        <Img
          src={staticFile(products[activeIndex].src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Product label */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          background: "rgba(44,62,80,0.9)",
          color: "#fff",
          padding: "14px 32px",
          borderRadius: 16,
          fontSize: 22,
          fontWeight: 700,
          opacity: labelOpacity,
          backdropFilter: "blur(10px)",
        }}
      >
        {products[activeIndex].label}
      </div>

      {/* Progress dots */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          display: "flex",
          gap: 12,
        }}
      >
        {products.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === activeIndex ? 32 : 10,
              height: 10,
              borderRadius: 5,
              background: i === activeIndex ? "#7FB5D3" : "#ddd",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ── FEATURE HIGHLIGHTS SCENE ── */
const FeaturesScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const features = [
    { icon: "🎯", title: "完全客製化", desc: "3D掃描精準設計" },
    { icon: "🪶", title: "輕量舒適", desc: "醫療級輕量材料" },
    { icon: "🎨", title: "多彩設計", desc: "孩子樂於配戴" },
    { icon: "⚡", title: "精準列印", desc: "高精度3D技術" },
  ];

  return (
    <div
      style={{
        ...sceneBase("linear-gradient(180deg, #5A96B8 0%, #2C3E50 100%)"),
        justifyContent: "center",
        padding: "60px 50px",
        gap: 0,
      }}
    >
      {/* Section title */}
      <h2
        style={{
          fontSize: 44,
          fontWeight: 800,
          color: "#fff",
          margin: "0 0 20px 0",
          textAlign: "center",
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
          fontFamily: "'Noto Serif TC', serif",
        }}
      >
        產品特色
      </h2>

      <div
        style={{
          width: 100,
          height: 3,
          background: "#F6C94E",
          borderRadius: 2,
          marginBottom: 50,
          opacity: interpolate(frame, [10, 25], [0, 1], { extrapolateRight: "clamp" }),
        }}
      />

      {/* Feature cards */}
      {features.map((feat, i) => {
        const cardIn = spring({
          frame: frame - 15 - i * 12,
          fps,
          config: { damping: 40, stiffness: 60 },
        });
        const cardOpacity = interpolate(cardIn, [0, 1], [0, 1]);
        const cardX = interpolate(cardIn, [0, 1], [60, 0]);

        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 20,
              padding: "24px 32px",
              marginBottom: 16,
              width: "100%",
              maxWidth: 700,
              opacity: cardOpacity,
              transform: `translateX(${cardX}px)`,
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "rgba(246,201,78,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                flexShrink: 0,
              }}
            >
              {feat.icon}
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                {feat.title}
              </div>
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }}>{feat.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ── CLOSING CTA SCENE ── */
const ClosingScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulseScale = 1 + Math.sin(frame / 15) * 0.02;
  const ctaIn = spring({ frame: frame - 30, fps, config: { damping: 30, stiffness: 50 } });

  return (
    <div style={sceneBase("#2C3E50")}>
      {/* Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 4 + (i % 3) * 2,
            height: 4 + (i % 3) * 2,
            borderRadius: "50%",
            background: i % 2 ? "#F6C94E" : "#7FB5D3",
            opacity: 0.3,
            left: `${(i * 97 + 10) % 100}%`,
            top: `${(i * 53 + 5) % 100}%`,
            transform: `translateY(${Math.sin(frame / 15 + i * 2) * 10}px)`,
          }}
        />
      ))}

      <div
        style={{
          textAlign: "center",
          opacity: interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [10, 30], [30, 0], { extrapolateRight: "clamp" })}px)`,
        }}
      >
        <div style={{ fontSize: 22, color: "#F6C94E", fontWeight: 600, marginBottom: 16, letterSpacing: 3 }}>
          FORESEE PHYSIOTHERAPY
        </div>

        <h2
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 12px 0",
            lineHeight: 1.3,
            fontFamily: "'Noto Serif TC', serif",
          }}
        >
          為孩子的未來
          <br />
          <span style={{ color: "#F6C94E" }}>預見更好的可能</span>
        </h2>

        <p style={{ fontSize: 20, color: "rgba(255,255,255,0.6)", margin: "0 0 50px 0" }}>
          專業兒童物理治療 ・ 3D列印客製副木
        </p>

        {/* CTA Button */}
        <div
          style={{
            display: "inline-block",
            background: "#F6C94E",
            color: "#2C3E50",
            padding: "20px 60px",
            borderRadius: 18,
            fontSize: 24,
            fontWeight: 800,
            transform: `scale(${interpolate(ctaIn, [0, 1], [0.8, 1]) * pulseScale})`,
            opacity: interpolate(ctaIn, [0, 1], [0, 1]),
            boxShadow: "0 8px 30px rgba(246,201,78,0.3)",
          }}
        >
          立即預約諮詢
        </div>
      </div>

      {/* Bottom brand */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: interpolate(frame, [50, 70], [0, 0.6], { extrapolateRight: "clamp" }),
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
        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, fontWeight: 600 }}>
          預見物理治療所
        </span>
      </div>
    </div>
  );
};

/* ── MAIN SHOWCASE VIDEO ── */
export const ShowcaseVideo = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={90}>
        <OpeningScene />
      </Sequence>
      <Sequence from={90} durationInFrames={120}>
        <GalleryScene />
      </Sequence>
      <Sequence from={210} durationInFrames={120}>
        <FeaturesScene />
      </Sequence>
      <Sequence from={330} durationInFrames={120}>
        <ClosingScene />
      </Sequence>
    </>
  );
};

/* ── SHARED STYLES ── */
const sceneBase = (bg) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  background: bg,
  fontFamily: "'Noto Sans TC', sans-serif",
});
