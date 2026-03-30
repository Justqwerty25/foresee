import { Composition } from "remotion";
import { PackshotComposition } from "./compositions/Packshot.jsx";
import { HeroComposition } from "./compositions/Hero.jsx";
import { LifestyleComposition } from "./compositions/Lifestyle.jsx";
import { DetailComposition } from "./compositions/Detail.jsx";
import { ShowcaseVideo } from "./compositions/ShowcaseVideo.jsx";

export const RemotionRoot = () => {
  return (
    <>
      {/* 1. PACKSHOT — Clean white background product shots */}
      <Composition
        id="Packshot"
        component={PackshotComposition}
        durationInFrames={90}
        fps={30}
        width={1200}
        height={1200}
      />

      {/* 2. HERO IMAGE — Dramatic, premium banner */}
      <Composition
        id="Hero"
        component={HeroComposition}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 3. LIFESTYLE — Product in real-world context */}
      <Composition
        id="Lifestyle"
        component={LifestyleComposition}
        durationInFrames={90}
        fps={30}
        width={1200}
        height={1500}
      />

      {/* 4. DETAIL — Close-up feature showcase */}
      <Composition
        id="Detail"
        component={DetailComposition}
        durationInFrames={90}
        fps={30}
        width={1200}
        height={1200}
      />

      {/* 5. SHOWCASE VIDEO — Full animated product showcase (15s) */}
      <Composition
        id="ShowcaseVideo"
        component={ShowcaseVideo}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
