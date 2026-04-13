import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Heart, Phone, Mail, MapPin, Clock, Award, ShieldCheck,
  ChevronDown, ChevronRight, Menu, X, ArrowUpRight, Star,
  Brain, Users, ArrowLeft, CheckCircle2, Home, Facebook,
  Printer, Hand, Sparkles, ScanLine, Wrench, MessageCircle,
  Baby, Activity, Puzzle, Move, PersonStanding, HandHelping,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════
   TRANSLATIONS — zh (Traditional Chinese) & en (English)
   ═══════════════════════════════════════════════════════════════════════ */
const TRANSLATIONS = {
  zh: {
    nav: {
      home: "首頁",
      services: "服務項目",
      product: "3D客製化輔具",
      workshops: "講座活動",
      about: "品牌介紹",
      contact: "聯絡我們",
      cta: "立即預約",
      langToggle: "EN",
    },
    hero: {
      badge: "兒童物理治療專家",
      headline: "讓專業成為支撐，",
      headlineAccent: "陪孩子預見未來的旅圖。",
      subtext: "專為兒童設計的物理治療服務，結合專業技術與溫暖關懷，從診間到戶外，陪伴每一位孩子探索世界。",
      ctaPrimary: "預約諮詢",
      ctaSecondary: "了解更多",
    },
    stats: {
      years: "年經驗",
      children: "服務兒童",
      satisfaction: "家長滿意",
    },
    services: {
      label: "我們的專業",
      title: "專業服務項目",
      subtitle: "根據每位孩子的獨特需求，提供個別化的物理治療方案。",
      more: "了解更多",
      cta: "預約諮詢",
      items: [
        { icon: "Baby", title: "發展評估", desc: "全面評估孩子的動作發展、感覺統合及日常功能表現，制定個別化治療計畫。", features: ["動作發展里程碑評估", "功能性活動分析", "個別化目標設定"] },
        { icon: "Move", title: "動作訓練", desc: "透過遊戲化的治療活動，提升孩子的粗大動作能力，包括翻身、爬行、站立和行走。", features: ["粗大動作訓練", "平衡與協調訓練", "肌力強化活動"] },
        { icon: "Puzzle", title: "感覺統合治療", desc: "針對感覺處理困難的孩子，提供適當的感覺刺激，改善日常生活適應能力。", features: ["前庭覺訓練", "觸覺調節活動", "本體覺強化"] },
        { icon: "Hand", title: "手部精細動作", desc: "專注於手部功能訓練，包括抓握、操作和書寫等精細動作技巧的提升。", features: ["抓握與操作訓練", "手眼協調活動", "書寫前備技巧"] },
        { icon: "PersonStanding", title: "姿勢訓練", desc: "矯正不良姿勢習慣，建立正確的身體排列，預防日後骨骼肌肉問題。", features: ["姿勢評估與矯正", "核心穩定訓練", "人體工學指導"] },
        { icon: "HandHelping", title: "家長諮詢", desc: "提供家長專業的居家訓練指導，讓治療效果延伸至日常生活中。", features: ["居家活動指導", "環境調整建議", "發展階段諮詢"] },
      ],
    },
    product: {
      label: "創新產品",
      title: "3D客製化輔具",
      subtitle: "運用先進3D列印技術，為每位孩子量身打造最合適的手部輔具。",
      missionSlogan: "我們不只製作輔具，更是在陪伴家庭繪製通往希望的藍圖。我們將專業化為最穩定的支撐，讓孩子能站在專業的肩膀上，預見更遙遠、更寬廣的未來。",
      badge: "專利技術",
      features: [
        { icon: "ScanLine", title: "完全客製化", desc: "根據孩子手部3D掃描數據，精準設計完美貼合的副木。" },
        { icon: "Sparkles", title: "輕量舒適", desc: "採用醫療級輕量材料，孩子配戴舒適，不影響日常活動。" },
        { icon: "Heart", title: "兒童友善", desc: "多彩設計，讓孩子樂於配戴，提高治療配合度。" },
        { icon: "Printer", title: "精準列印", desc: "高精度3D列印技術，確保每個細節完美呈現。" },
      ],
      timeline: {
        title: "製作流程",
        steps: [
          { num: "01", title: "專業評估", desc: "治療師評估孩子手部功能需求，確認副木類型與目標。" },
          { num: "02", title: "3D掃描", desc: "使用3D掃描技術精確擷取手部外型數據。" },
          { num: "03", title: "設計與列印", desc: "依據掃描數據進行客製化設計，以3D列印技術製作。" },
          { num: "04", title: "試戴調整", desc: "專業試戴與微調，確保最佳貼合度與功能性。" },
        ],
      },
      faq: {
        title: "常見問題",
        items: [
          { q: "3D列印副木適合幾歲的孩子？", a: "我們的3D列印副木適用於各年齡層的兒童，從嬰幼兒到青少年都可以客製化製作，會依據孩子的年齡與需求調整設計。" },
          { q: "副木需要多久更換一次？", a: "建議每3-6個月回診評估，隨著孩子的成長，可能需要重新製作以確保最佳效果。成長快速期可能需要更頻繁更換。" },
          { q: "製作一個副木需要多長時間？", a: "從掃描到完成約需5-7個工作天。我們會在製作完成後安排試戴與調整，確保副木完美貼合。" },
          { q: "副木可以碰水嗎？", a: "我們使用的3D列印材料具有防水特性，日常接觸水分不會影響副木的功能，但建議避免長時間浸泡。" },
        ],
      },
      quote: "「我們不只是在做一個輔具，我們是在幫孩子找回他原本就有的『主動權』。這多出來的一點協助，就是他探索世界的起點。」",
      cta: "預約副木諮詢",
    },
    workshops: {
      label: "講座與活動",
      title: "工作坊與演講",
      subtitle: "將專業知識帶出診間，透過講座、工作坊與共融活動，讓更多家庭與專業人士受益。",
      heroQuote: "我們相信知識的力量，應該被分享、被傳遞、被實踐。",
      sections: [
        { title: "專業講座", desc: "分享兒童物理治療的最新知識和臨床經驗，為家長和專業人士提供教育性的演講。", features: ["發展里程碑講座", "家長教育工作坊", "專業培訓課程", "輔具科技新知分享"] },
        { title: "共融活動", desc: "透過舉辦各式共融活動與職能體驗，將復健目標化為生活練習，讓成長在探索中真實發生。", features: ["親子互動活動", "戶外探索體驗", "職能體驗工作坊", "社區共融計畫"] },
        { title: "專業培訓", desc: "為物理治療師、職能治療師及相關專業人士提供進階培訓，分享3D列印輔具製作技術與臨床應用。", features: ["3D列印輔具技術培訓", "臨床案例分析", "跨領域合作工作坊", "實務操作演練"] },
      ],
      cta: "預約講座諮詢",
      ctaSubtext: "歡迎學校、機構或團體預約客製化講座與工作坊",
    },
    about: {
      label: "品牌介紹",
      title: "預見旅圖 Foresee Journey",
      tagline: "預見專業，圖繪旅程。",
      intro: "「預見旅圖」的誕生，源於我們深信每一位孩子，都應擁有探索世界的權利。",
      foreseeTitle: "「預見」",
      foreseeText: "憑藉在物理治療領域深耕多年的豐厚實務經驗，我們擁有一雙細膩觀察發展需求的眼睛，不僅能洞察目前的限制，更能看見孩子未來的潛力。我們將這份專業轉化為最具溫度的實體支撐，落實於每一項輔具與建議中。",
      journeyTitle: "「旅圖」",
      journeyText: "復健不應侷限於診間。透過舉辦各式共融活動與職能體驗，我們將復健目標化為生活練習，為孩子規劃出從診間通往戶外、與社會接軌的實踐路徑，讓成長在探索中真實發生。",
      story: "我們不只製作輔具，更是在陪伴家庭繪製通往希望的藍圖。我們將專業化為最穩定的支撐，讓孩子能站在專業的肩膀上，預見更遙遠、更寬廣的未來。",
      story2: "我們的治療團隊結合傳統物理治療技術與創新科技，包括自主研發的3D列印客製化副木，為孩子們提供全方位的治療方案。在這裡，每一次的治療都充滿歡笑與愛。",
      mission: "我們的使命",
      missionText: "以專業的物理治療技術，結合溫暖的關懷與創新的輔具科技，陪伴每一位孩子從診間走向戶外、走向社會，邁向健康、快樂的成長之路。",
      therapist: {
        name: "黃雅惠 治療師",
        role: "創辦人 / 物理治療師",
        bio: "黃雅惠治療師擁有豐富的兒童物理治療臨床經驗，專精於兒童發展評估、動作訓練及輔具設計。她率先將3D列印技術應用於兒童副木製作，為孩子們帶來更舒適、更有效的治療體驗。",
        credentials: [
          { label: "物理治療師執照", icon: "Award" },
          { label: "兒童發展專家", icon: "ShieldCheck" },
          { label: "3D列印輔具研發", icon: "Activity" },
        ],
      },
    },
    contact: {
      label: "聯絡我們",
      title: "預約諮詢",
      subtitle: "歡迎透過以下方式與我們聯繫，我們將盡快回覆您的訊息。",
      email: "1985yahui@gmail.com",
      address: {
        name: "預見旅圖",
        street: "台灣台中市XX區XX路XX號",
        detail: "(請來電確認地址)",
      },
      hours: "週一至週五 09:00 - 18:00",
      line: "@foreseept",
      facebook: "https://www.facebook.com/groups/1548602975442621/",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640!2d120.68!3d24.14!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDA4JzI0LjAiTiAxMjDCsDQwJzQ4LjAiRQ!5e0!3m2!1szh-TW!2stw!4v1",
    },
    footer: {
      tagline: "讓專業成為支撐，陪孩子預見未來的旅圖 — 專業兒童物理治療與3D客製化輔具",
      nav: "導航",
      contactTitle: "聯絡資訊",
      rights: "版權所有",
      privacy: "隱私權政策",
      terms: "服務條款",
    },
    cookie: {
      text: "本網站使用 Cookie 以提供更好的瀏覽體驗。",
      accept: "接受",
      decline: "拒絕",
    },
    common: {
      learnMore: "了解更多",
      bookNow: "立即預約",
      backToHome: "返回首頁",
      contactUs: "聯絡我們了解更多",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      product: "3D Custom Orthotics",
      workshops: "Workshops",
      about: "Brand Intro",
      contact: "Contact",
      cta: "Book Now",
      langToggle: "中文",
    },
    hero: {
      badge: "Pediatric Physiotherapy",
      headline: "Let Expertise Be the Support,",
      headlineAccent: "Guiding Every Child's Journey.",
      subtext: "Specialized physiotherapy designed for children, combining professional expertise with warm care — from the clinic to the outdoors, supporting every child's journey of exploration.",
      ctaPrimary: "Book Consultation",
      ctaSecondary: "Learn More",
    },
    stats: {
      years: "Years Exp.",
      children: "Children Served",
      satisfaction: "Satisfaction",
    },
    services: {
      label: "Our Expertise",
      title: "Professional Services",
      subtitle: "Individualized physiotherapy plans tailored to each child's unique needs.",
      more: "Learn More",
      cta: "Book Consultation",
      items: [
        { icon: "Baby", title: "Developmental Assessment", desc: "Comprehensive evaluation of motor development, sensory integration, and daily function to create individualized treatment plans.", features: ["Motor milestone assessment", "Functional activity analysis", "Individualized goal setting"] },
        { icon: "Move", title: "Motor Skills Training", desc: "Through play-based therapy activities, improve gross motor skills including rolling, crawling, standing, and walking.", features: ["Gross motor training", "Balance & coordination", "Strength building"] },
        { icon: "Puzzle", title: "Sensory Integration", desc: "For children with sensory processing difficulties, providing appropriate sensory input to improve daily life adaptation.", features: ["Vestibular training", "Tactile regulation", "Proprioceptive enhancement"] },
        { icon: "Hand", title: "Fine Motor Skills", desc: "Focused on hand function training, including grasping, manipulation, and writing skill improvement.", features: ["Grasp & manipulation", "Hand-eye coordination", "Pre-writing skills"] },
        { icon: "PersonStanding", title: "Posture Training", desc: "Correcting poor posture habits, establishing proper body alignment, preventing future musculoskeletal issues.", features: ["Posture assessment", "Core stability training", "Ergonomic guidance"] },
        { icon: "HandHelping", title: "Parent Consultation", desc: "Professional home training guidance for parents, extending therapy benefits into daily life.", features: ["Home activity guidance", "Environment modification", "Developmental counseling"] },
      ],
    },
    product: {
      label: "Innovation",
      title: "3D Custom Assistive Devices",
      subtitle: "Using advanced 3D printing technology to create perfectly fitted hand orthotics for every child.",
      missionSlogan: "We don't just make assistive devices — we help families draw blueprints toward hope. We turn expertise into the most stable support, so children can stand on the shoulders of professionals and foresee a broader, more expansive future.",
      badge: "Patented Technology",
      features: [
        { icon: "ScanLine", title: "Fully Custom", desc: "Precisely designed from 3D scans of each child's hand for a perfect fit." },
        { icon: "Sparkles", title: "Lightweight", desc: "Medical-grade lightweight materials for comfortable all-day wear." },
        { icon: "Heart", title: "Child-Friendly", desc: "Colorful designs that children love to wear, improving therapy compliance." },
        { icon: "Printer", title: "Precision Printed", desc: "High-precision 3D printing ensures every detail is perfectly rendered." },
      ],
      timeline: {
        title: "Our Process",
        steps: [
          { num: "01", title: "Assessment", desc: "Therapist evaluates hand function needs and determines orthotic type." },
          { num: "02", title: "3D Scanning", desc: "Precise 3D scanning captures exact hand geometry data." },
          { num: "03", title: "Design & Print", desc: "Custom design based on scan data, manufactured via 3D printing." },
          { num: "04", title: "Fitting", desc: "Professional fitting and fine-tuning for optimal comfort and function." },
        ],
      },
      faq: {
        title: "FAQ",
        items: [
          { q: "What ages are 3D printed orthotics suitable for?", a: "Our 3D printed orthotics are suitable for children of all ages, from infants to adolescents. Each design is customized based on the child's age and specific needs." },
          { q: "How often should orthotics be replaced?", a: "We recommend reassessment every 3-6 months. As children grow, new orthotics may be needed to ensure optimal effectiveness." },
          { q: "How long does it take to make an orthotic?", a: "From scanning to completion takes approximately 5-7 business days. We schedule a fitting session upon completion." },
          { q: "Are the orthotics waterproof?", a: "Our 3D printing materials are water-resistant. Normal water contact won't affect function, though prolonged soaking should be avoided." },
        ],
      },
      quote: "\"We're not just making an assistive device — we're helping children reclaim the 'agency' that was always theirs. This extra bit of support is their starting point for exploring the world.\"",
      cta: "Book Orthotic Consultation",
    },
    workshops: {
      label: "Workshops & Events",
      title: "Workshops & Speaking",
      subtitle: "Bringing professional knowledge beyond the clinic through lectures, workshops, and inclusive activities for families and professionals.",
      heroQuote: "We believe the power of knowledge should be shared, passed on, and put into practice.",
      sections: [
        { title: "Professional Lectures", desc: "Sharing the latest knowledge and clinical experience in pediatric physiotherapy through educational lectures for parents and professionals.", features: ["Developmental milestone seminars", "Parent education workshops", "Professional training courses", "Assistive technology updates"] },
        { title: "Inclusive Activities", desc: "Through inclusive activities and occupational experiences, we turn rehabilitation goals into life practice, letting growth happen through real exploration.", features: ["Parent-child interactive events", "Outdoor exploration experiences", "Occupational experience workshops", "Community inclusion programs"] },
        { title: "Professional Training", desc: "Advanced training for physiotherapists, occupational therapists, and related professionals on 3D printed orthotic fabrication and clinical applications.", features: ["3D printed orthotic training", "Clinical case analysis", "Interdisciplinary workshops", "Hands-on practice sessions"] },
      ],
      cta: "Book a Workshop",
      ctaSubtext: "Schools, institutions, and groups are welcome to book customized lectures and workshops",
    },
    about: {
      label: "Brand Introduction",
      title: "Foresee Journey: Brand Introduction",
      tagline: "Foresee Expertise, Map the Journey.",
      intro: "Foresee Journey was born from our deep belief that every child deserves the right to explore the world.",
      foreseeTitle: "\"Foresee\"",
      foreseeText: "With years of rich clinical experience in physical therapy, we have developed a keen eye for observing developmental needs. We see not only current limitations, but also each child's future potential. We transform this expertise into the warmest tangible support, realized in every assistive device and recommendation.",
      journeyTitle: "\"Journey\"",
      journeyText: "Rehabilitation shouldn't be confined to the clinic. Through inclusive activities and occupational experiences, we turn rehabilitation goals into life practice, planning pathways from the clinic to the outdoors and into society, letting growth happen through real exploration.",
      story: "We don't just make assistive devices — we help families draw blueprints toward hope. We turn expertise into the most stable support, so children can stand on the shoulders of professionals and foresee a broader, more expansive future.",
      story2: "Our therapy team combines traditional physiotherapy techniques with innovative technology, including our self-developed 3D printed custom orthotics, providing comprehensive treatment solutions for children. Here, every therapy session is filled with laughter and love.",
      mission: "Our Mission",
      missionText: "To accompany every child from the clinic to the outdoors and into society with professional physiotherapy, warm care, and innovative assistive technology — on a healthy and happy growth path.",
      therapist: {
        name: "Ya-Hui Huang, PT",
        role: "Founder / Physiotherapist",
        bio: "Therapist Ya-Hui Huang has extensive clinical experience in pediatric physiotherapy, specializing in child development assessment, motor training, and assistive device design. She pioneered the application of 3D printing technology in pediatric orthotic fabrication, bringing children more comfortable and effective therapy experiences.",
        credentials: [
          { label: "Licensed Physiotherapist", icon: "Award" },
          { label: "Child Development Specialist", icon: "ShieldCheck" },
          { label: "3D Orthotic R&D", icon: "Activity" },
        ],
      },
    },
    contact: {
      label: "Contact",
      title: "Book a Consultation",
      subtitle: "Reach out through any of the channels below. We'll respond as soon as possible.",
      email: "1985yahui@gmail.com",
      address: {
        name: "Foresee Journey",
        street: "XX Road, XX District, Taichung, Taiwan",
        detail: "(Please call to confirm address)",
      },
      hours: "Mon-Fri 09:00 - 18:00",
      line: "@foreseept",
      facebook: "https://www.facebook.com/groups/1548602975442621/",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640!2d120.68!3d24.14!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDA4JzI0LjAiTiAxMjDCsDQwJzQ4LjAiRQ!5e0!3m2!1szh-TW!2stw!4v1",
    },
    footer: {
      tagline: "Let Expertise Be the Support — Pediatric Physiotherapy & 3D Custom Assistive Devices",
      nav: "Navigation",
      contactTitle: "Contact",
      rights: "All rights reserved",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
    cookie: {
      text: "This website uses cookies for a better browsing experience.",
      accept: "Accept",
      decline: "Decline",
    },
    common: {
      learnMore: "Learn More",
      bookNow: "Book Now",
      backToHome: "Back to Home",
      contactUs: "Contact us to learn more",
    },
  },
};

/* ═══════════════════════════════════════════════════════════════════════
   COLORS & GLOBAL STYLES
   ═══════════════════════════════════════════════════════════════════════ */
const C = {
  primary:      "#AECEDB",   // Soft sky blue
  primaryLight: "#C8DFE8",   // Lighter sky blue
  primaryDark:  "#6A9DB3",   // Deeper blue
  accent:       "#F0D17A",   // Warm soft gold
  accentHover:  "#E0C060",   // Darker gold hover
  secondary:    "#7EC5D8",   // Powder blue (logo ribbon)
  bg:           "#F7F3EB",   // Warm cream beige 米色
  bgAlt:        "#F0EBDF",   // Warmer sand
  bgDark:       "#2B3F4A",   // Dark blue-teal
  text:         "#3A4A44",   // Dark teal-gray (warm)
  textMuted:    "#6E7F77",   // Muted green-gray
  textLight:    "#9AABA3",   // Light muted
  cardBg:       "#FFFDF9",   // Warm white
  border:       "#E5DCD0",   // Warm beige border
  borderLight:  "#F0E9DD",   // Light warm beige
};

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Serif+TC:wght@400;500;600;700&family=Noto+Sans+TC:wght@300;400;500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; overflow-x: hidden; }

  body {
    background: ${C.bg};
    color: ${C.text};
    font-family: 'Noto Sans TC', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 400;
    overflow-x: hidden;
    line-height: 1.8;
    -webkit-tap-highlight-color: transparent;
  }

  @media (max-width: 640px) {
    a, button { min-height: 44px; }
    ul { padding-left: 0; }
  }

  ::selection { background: ${C.primary}33; color: ${C.text}; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${C.bgAlt}; }
  ::-webkit-scrollbar-thumb { background: ${C.primary}55; border-radius: 3px; }

  .font-heading { font-family: 'Noto Serif TC', Georgia, serif; }

  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

  @keyframes pulse-dot {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.3); }
  }

  .warm-glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 8px 32px rgba(174, 206, 219, 0.12), inset 0 1px 1px rgba(255,255,255,0.9);
  }
`;

/* ═══════════════════════════════════════════════════════════════════════
   CONSTANTS & ANIMATION
   ═══════════════════════════════════════════════════════════════════════ */
const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: i * 0.1 } }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE, delay: i * 0.1 } }),
};

/* ═══════════════════════════════════════════════════════════════════════
   ICON RESOLVER
   ═══════════════════════════════════════════════════════════════════════ */
const ICON_MAP = {
  Heart, Phone, Mail, MapPin, Clock, Award, ShieldCheck,
  ChevronDown, ChevronRight, Menu, X, ArrowUpRight, Star,
  Brain, Users, ArrowLeft, CheckCircle2, Home, Facebook,
  Printer, Hand, Sparkles, ScanLine, Wrench, MessageCircle,
  Baby, Activity, Puzzle, Move, PersonStanding, HandHelping,
};

function Icon({ name, size = 24, className = "", ...props }) {
  const Comp = ICON_MAP[name];
  if (!Comp) return null;
  return <Comp size={size} className={className} {...props} />;
}

function ProductImage({ src, alt, className = "", style = {}, iconFallback = Hand, overlayGradient = true }) {
  const [failed, setFailed] = useState(false);
  const FallbackIcon = iconFallback;
  if (failed) {
    return (
      <div className={`relative flex flex-col items-center justify-center gap-3 ${className}`}
        style={{ background: `linear-gradient(135deg, ${C.primary}35, ${C.primaryDark}50, ${C.accent}20)`, ...style }}>
        <FallbackIcon size={64} style={{ color: C.primaryDark, opacity: 0.55 }} />
        <span className="text-xs font-medium tracking-wider uppercase" style={{ color: C.primaryDark, opacity: 0.45 }}>{alt}</span>
      </div>
    );
  }
  return (
    <div className={`relative ${className}`} style={style}>
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" onError={() => setFailed(true)} />
      {overlayGradient && <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════════════════════════════════ */
function ScrollReveal({ children, className = "", delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const variants = direction === "up" ? fadeUp : scaleIn;
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={variants} custom={delay} className={className}>
      {children}
    </motion.div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      viewport={{ once: true, margin: "-20px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BlurText({ text, className = "", style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const chars = text.split("");
  return (
    <span ref={ref} className={className} style={{ display: "inline-block", ...style }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
          animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: i * 0.04 }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

function SectionHeading({ label, title, subtitle, center = true, light = false }) {
  return (
    <ScrollReveal className={`mb-12 lg:mb-16 ${center ? "text-center" : ""}`}>
      {label && (
        <span
          className="inline-block text-xs font-semibold tracking-[0.15em] uppercase mb-4 px-4 py-1.5 rounded-full"
          style={{ color: light ? C.accent : C.primaryDark, background: light ? "rgba(246,201,78,0.15)" : `${C.primary}18` }}
        >
          {label}
        </span>
      )}
      <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.2] mb-3 sm:mb-4"
        style={{ color: light ? "#fff" : C.text }}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base lg:text-lg leading-relaxed max-w-2xl ${center ? "mx-auto" : ""}`}
          style={{ color: light ? "rgba(255,255,255,0.6)" : C.textMuted }}>
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SPOTLIGHT CARD — mouse-follow glow (from axiom-studio)
   ═══════════════════════════════════════════════════════════════════════ */
function SpotlightCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [hovering, setHovering] = useState(false);
  const handleMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div ref={cardRef} className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); setPos({ x: -1000, y: -1000 }); }}>
      {hovering && (
        <div className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{ background: `radial-gradient(250px circle at ${pos.x}px ${pos.y}px, ${C.primary}15, transparent 70%)` }} />
      )}
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SLOT COUNTER (from axiom-studio)
   ═══════════════════════════════════════════════════════════════════════ */
function SlotDigit({ digit, delay = 0 }) {
  const target = parseInt(digit, 10);
  if (isNaN(target)) return <span className="inline-block">{digit}</span>;
  return (
    <span className="inline-block relative overflow-hidden" style={{ width: "0.62em", height: "1.15em" }}>
      <motion.span className="absolute left-0 flex flex-col items-center" style={{ width: "100%" }}
        initial={{ y: 0 }} whileInView={{ y: `-${target * 1.15}em` }} viewport={{ once: true }}
        transition={{ duration: 1.2 + target * 0.08, ease: [0.22, 1, 0.36, 1], delay }}>
        {[0,1,2,3,4,5,6,7,8,9].map((n) => (
          <span key={n} className="block leading-[1.15em] text-center" style={{ height: "1.15em" }}>{n}</span>
        ))}
      </motion.span>
    </span>
  );
}

function SlotCounter({ value, suffix = "", label }) {
  const chars = value.toString().split("");
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight flex items-baseline justify-center" style={{ color: C.primaryDark }}>
        <span className="flex">{chars.map((c, i) => <SlotDigit key={i} digit={c} delay={i * 0.12} />)}</span>
        <span className="ml-0.5 text-2xl sm:text-3xl" style={{ color: C.accent }}>{suffix}</span>
      </div>
      <div className="text-sm mt-2 font-medium" style={{ color: C.textMuted }}>{label}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   FAQ ACCORDION (from space-landing)
   ═══════════════════════════════════════════════════════════════════════ */
function FaqItem({ q, a, isOpen, onClick }) {
  return (
    <div className="mb-3">
      <button onClick={onClick}
        className="warm-glass w-full rounded-2xl px-6 py-5 flex items-center justify-between text-left cursor-pointer group transition-all duration-300"
        style={{ borderColor: isOpen ? C.primary : C.border }}>
        <span className="font-medium text-lg pr-4" style={{ color: C.text }}>{q}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.4, ease: EASE }}>
          <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: C.primaryDark }} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="overflow-hidden">
            <div className="px-6 pt-2 pb-5">
              <p className="leading-relaxed" style={{ color: C.textMuted }}>{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   DECORATIVE STARS
   ═══════════════════════════════════════════════════════════════════════ */
function DecorativeStars({ count = 6 }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i, size: 8 + Math.random() * 16,
    top: Math.random() * 100, left: Math.random() * 100,
    delay: Math.random() * 3, duration: 2 + Math.random() * 2,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s) => (
        <motion.div key={s.id} className="absolute" style={{ top: `${s.top}%`, left: `${s.left}%` }}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.2, 0.8], rotate: [0, 15, 0] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}>
          <Star size={s.size} fill={C.accent} stroke="none" style={{ opacity: 0.45 }} />
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   WAVE DIVIDER
   ═══════════════════════════════════════════════════════════════════════ */
function WaveDivider({ color = C.bg }) {
  return (
    <div className="w-full overflow-hidden leading-[0]" style={{ marginTop: -1 }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[50px] sm:h-[80px]">
        <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z" fill={color} />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PARTICLE CANVAS — warm colors (adapted from axiom-studio)
   ═══════════════════════════════════════════════════════════════════════ */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const stateRef = useRef({ particles: [], rotationY: 0, mouseX: 0, mouseY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.parentElement.offsetWidth;
      const h = canvas.parentElement.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const count = 600, radius = 160;
    const positions = [];
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const phi = Math.acos(2 * t - 1);
      const theta = Math.sqrt(count * Math.PI) * phi;
      positions.push([radius * Math.sin(phi) * Math.cos(theta), radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi)]);
    }
    const state = stateRef.current;
    state.particles = positions.map(([x, y, z]) => ({ sx: x, sy: y, sz: z }));

    const onMouse = (e) => {
      state.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      state.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    let animId;
    const colors = [`rgba(174,206,219,`, `rgba(240,209,122,`, `rgba(126,197,216,`];
    const render = () => {
      const w = parseFloat(canvas.style.width), h = parseFloat(canvas.style.height);
      ctx.clearRect(0, 0, w, h);
      state.rotationY += 0.002 + state.mouseX * 0.001;
      const cosY = Math.cos(state.rotationY), sinY = Math.sin(state.rotationY);
      const rotX = state.mouseY * 0.1, cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cx = w / 2, cy = h / 2, fov = 500;
      for (let i = 0; i < state.particles.length; i++) {
        const p = state.particles[i];
        const x1 = p.sx * cosY - p.sz * sinY;
        const z1 = p.sx * sinY + p.sz * cosY;
        const y1 = p.sy * cosX - z1 * sinX;
        const z2 = p.sy * sinX + z1 * cosX;
        const scale = fov / (fov + z2);
        const depth = (z2 + radius * 2) / (radius * 4);
        const alpha = 0.15 + depth * 0.5;
        ctx.beginPath();
        ctx.arc(cx + x1 * scale, cy + y1 * scale, 0.5 + scale * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = colors[i % 3] + (alpha * [1, 0.8, 0.6][i % 3]) + ")";
        ctx.fill();
      }
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMouse); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ═══════════════════════════════════════════════════════════════════════
   LINE ICON SVG
   ═══════════════════════════════════════════════════════════════════════ */
function LineIcon({ size = 24, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.271.173-.508.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   NAVIGATION HELPER
   ═══════════════════════════════════════════════════════════════════════ */
function navigate(hash) {
  window.location.hash = hash;
  window.scrollTo({ top: 0, behavior: "instant" });
}

/* ═══════════════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════════════ */
function Navbar({ currentPage, t, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = currentPage === "home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navBg = !isHome || scrolled;
  const links = [
    { label: t.nav.services, href: "services" },
    { label: t.nav.product, href: "product" },
    { label: t.nav.workshops, href: "workshops" },
    { label: t.nav.about, href: "about" },
    { label: t.nav.contact, href: "contact" },
  ];

  return (
    <>
      <motion.nav role="navigation" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: navBg ? "rgba(247,243,235,0.95)" : "transparent",
          backdropFilter: navBg ? "blur(16px)" : "none",
          borderBottom: navBg ? `1px solid ${C.border}` : "1px solid transparent",
          padding: scrolled ? "0.5rem 0" : "0.8rem 0",
        }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 no-underline" onClick={(e) => { e.preventDefault(); navigate("home"); }}>
            <img src="/images/foresee-logo.jpeg" alt="預見旅圖 Foresee Journey" style={{ height: "38px", objectFit: "contain", borderRadius: "6px" }} />
            <span className="font-heading text-lg font-bold tracking-tight hidden sm:block"
              style={{ color: navBg ? C.text : (isHome ? "#fff" : C.text) }}>
              {lang === "zh" ? "預見旅圖" : "Foresee Journey"}
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-7 list-none">
            {links.map((link) => {
              const active = currentPage === link.href;
              return (
                <li key={link.href}>
                  <a href={`#${link.href}`} className="text-[0.85rem] font-medium no-underline transition-colors duration-300 relative pb-1"
                    style={{ color: navBg ? (active ? C.primaryDark : C.textMuted) : (active ? "#fff" : "rgba(255,255,255,0.8)") }}
                    onClick={(e) => { e.preventDefault(); navigate(link.href); }}>
                    {link.label}
                    {active && <motion.div layoutId="nav-indicator" className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full" style={{ background: navBg ? C.primaryDark : "#fff" }} />}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => setLang(lang === "zh" ? "en" : "zh")}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer"
              style={{ background: navBg ? `${C.primary}15` : "rgba(255,255,255,0.15)", color: navBg ? C.primaryDark : "#fff", border: `1px solid ${navBg ? C.primary + "30" : "rgba(255,255,255,0.25)"}` }}>
              {t.nav.langToggle}
            </button>
            <a href="#contact" onClick={(e) => { e.preventDefault(); navigate("contact"); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-[0.82rem] font-semibold no-underline transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})` }}>
              <Phone size={15} /> {t.nav.cta}
            </a>
          </div>

          <button className="lg:hidden p-2 rounded-lg border-none bg-transparent cursor-pointer" onClick={() => setMobileOpen(true)}
            style={{ color: navBg ? C.text : (isHome ? "#fff" : C.text) }}>
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] lg:hidden" style={{ background: C.bgDark }}>
            <div className="flex justify-between items-center p-5">
              <button onClick={() => setLang(lang === "zh" ? "en" : "zh")} className="px-4 py-2 rounded-full text-sm font-semibold text-white/70 cursor-pointer"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                {t.nav.langToggle}
              </button>
              <button onClick={() => setMobileOpen(false)} className="text-white bg-transparent border-none p-2 cursor-pointer"><X size={28} /></button>
            </div>
            <div className="flex flex-col items-center gap-6 mt-12">
              <motion.a href="#home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl font-bold text-white no-underline"
                onClick={(e) => { e.preventDefault(); setMobileOpen(false); navigate("home"); }}>{t.nav.home}</motion.a>
              {links.map((link, i) => (
                <motion.a key={link.href} href={`#${link.href}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i + 1) * 0.07, ease: EASE }}
                  className="font-heading text-3xl font-bold text-white no-underline"
                  onClick={(e) => { e.preventDefault(); setMobileOpen(false); navigate(link.href); }}>{link.label}</motion.a>
              ))}
              <motion.a href="#contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, ease: EASE }}
                className="mt-6 inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white text-lg font-semibold no-underline"
                style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})` }}
                onClick={(e) => { e.preventDefault(); setMobileOpen(false); navigate("contact"); }}>
                <Phone size={20} /> {t.nav.cta}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PAGE HERO — subpages
   ═══════════════════════════════════════════════════════════════════════ */
function PageHero({ title, subtitle, t }) {
  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-20 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${C.primaryDark} 0%, ${C.bgDark} 100%)` }}>
      <DecorativeStars count={8} />
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
          <a href="#home" onClick={(e) => { e.preventDefault(); navigate("home"); }}
            className="inline-flex items-center gap-2 text-white/50 text-sm font-medium no-underline hover:text-white/80 transition-colors mb-6">
            <ArrowLeft size={16} /> {t.common.backToHome}
          </a>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-3">{title}</h1>
          {subtitle && <p className="text-sm sm:text-base lg:text-lg text-white/70 max-w-2xl leading-relaxed">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════════════════════════ */
function HomePage({ t }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${C.bgDark} 0%, ${C.primaryDark} 50%, ${C.bgDark} 100%)` }}>
        <div className="absolute inset-0 opacity-50"><ParticleCanvas /></div>
        <div className="absolute top-0 left-0 w-[60vw] h-[60vh] rounded-full pointer-events-none opacity-30"
          style={{ background: `radial-gradient(circle, ${C.primary}40 0%, transparent 70%)`, filter: "blur(80px)" }} />
        <DecorativeStars count={12} />

        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase mb-8"
              style={{ background: "rgba(246,201,78,0.15)", color: C.accent, border: `1px solid ${C.accent}30` }}>
              <Heart size={14} /> {t.hero.badge}
            </motion.div>

            <h1 className="font-heading text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.15] tracking-tight mb-5">
              <span className="whitespace-nowrap"><BlurText text={t.hero.headline} /></span>
              <br />
              <span className="whitespace-nowrap" style={{ color: C.accent }}><BlurText text={t.hero.headlineAccent} /></span>
            </h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
              className="text-sm sm:text-base lg:text-lg text-white/60 max-w-xl leading-relaxed mb-8 sm:mb-10">
              {t.hero.subtext}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a href="#contact" onClick={(e) => { e.preventDefault(); navigate("contact"); }}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-white font-bold transition-all duration-300 hover:scale-[1.03] hover:shadow-xl shadow-lg"
                style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})` }}>
                <Phone size={18} /> {t.hero.ctaPrimary}
              </a>
              <a href="#services" onClick={(e) => { e.preventDefault(); navigate("services"); }}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-white font-bold transition-all duration-300 hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                {t.hero.ctaSecondary} <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown size={32} className="text-white/20" />
          </motion.div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-16 lg:py-24" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-20">
            <ScrollReveal delay={0.1}><SlotCounter value={18} suffix="+" label={t.stats.years} /></ScrollReveal>
            <ScrollReveal delay={0.2}><SlotCounter value={1000} suffix="+" label={t.stats.children} /></ScrollReveal>
            <ScrollReveal delay={0.3}><SlotCounter value={99} suffix="%" label={t.stats.satisfaction} /></ScrollReveal>
          </div>
        </div>
      </section>

      {/* FEATURES PREVIEW */}
      <section className="py-20 lg:py-32 overflow-hidden" style={{ background: C.bgAlt }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal>
              <SectionHeading label={t.services.label} title={t.services.title} subtitle={t.services.subtitle} center={false} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                {t.services.items.slice(0, 4).map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${C.primary}15`, color: C.primaryDark }}>
                      <Icon name={item.icon} size={22} />
                    </div>
                    <h3 className="font-bold mb-2" style={{ color: C.text }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <a href="#services" onClick={(e) => { e.preventDefault(); navigate("services"); }}
                  className="inline-flex items-center gap-2 text-sm font-bold no-underline transition-all duration-300 group" style={{ color: C.primaryDark }}>
                  {t.services.more} <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="scale" className="relative">
              <div className="rounded-[2.5rem] overflow-hidden aspect-square shadow-2xl relative z-10" style={{ border: `1px solid ${C.border}` }}>
                <ProductImage src="/images/packshot-white.png" alt="Foresee Pediatric Physiotherapy" iconFallback={Baby} className="w-full h-full" />
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20" style={{ background: C.accent, filter: "blur(60px)" }} />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-20" style={{ background: C.primary, filter: "blur(60px)" }} />
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 p-4 sm:p-5 rounded-2xl z-20 shadow-xl hidden sm:block"
                style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: `1px solid ${C.borderLight}` }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${C.primary}15`, color: C.primaryDark }}><CheckCircle2 size={20} /></div>
                  <div>
                    <div className="text-xs font-bold" style={{ color: C.text }}>Professional Care</div>
                    <div className="text-[10px]" style={{ color: C.textMuted }}>Tailored to your child</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 lg:py-32">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <ScrollReveal>
            <div className="rounded-[3rem] p-10 sm:p-16 lg:p-20 text-center relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.bgDark})` }}>
              <DecorativeStars count={10} />
              <div className="relative z-10">
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-[1.15]">{t.common.contactUs}</h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="#contact" onClick={(e) => { e.preventDefault(); navigate("contact"); }}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white font-bold transition-all duration-300 hover:scale-[1.03] shadow-lg"
                    style={{ color: C.primaryDark }}>{t.common.bookNow}</a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SERVICES PAGE
   ═══════════════════════════════════════════════════════════════════════ */
function ServicesPage({ t }) {
  return (
    <>
      <PageHero title={t.services.title} subtitle={t.services.subtitle} t={t} />
      <section className="py-16 sm:py-20 lg:py-28" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="space-y-16 sm:space-y-24 lg:space-y-32">
            {t.services.items.map((service, i) => (
              <ScrollReveal key={i}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                  <div className="lg:[direction:ltr]">
                    <div className="rounded-3xl overflow-hidden aspect-[4/3]"
                      style={{ border: `1px solid ${C.primary}25` }}>
                      <ProductImage
                        src={["/images/packshot-white.png", "/images/packshot-sizes.jpg", "/images/product-yellow-single.jpg", "/images/product-green-backpack.jpg", "/images/detail-strap.jpg", "/images/lifestyle-shelf.jpg"][i]}
                        alt={service.title}
                        iconFallback={(() => { const icons = [Baby, Move, Puzzle, Hand, PersonStanding, HandHelping]; return icons[i] || Hand; })()}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="lg:[direction:ltr]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${C.primary}15`, color: C.primaryDark }}>
                        <Icon name={service.icon} size={24} />
                      </div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: C.text }}>{service.title}</h3>
                    </div>
                    <p className="text-[0.95rem] leading-relaxed mb-6" style={{ color: C.textMuted }}>{service.desc}</p>
                    <ul className="space-y-3 mb-6">
                      {service.features.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-3 text-[0.95rem]" style={{ color: C.text }}>
                          <CheckCircle2 size={18} style={{ color: C.primaryDark }} className="flex-shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); navigate("contact"); }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold no-underline transition-all duration-300 hover:scale-[1.03]"
                      style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})` }}>
                      <Phone size={16} /> {t.services.cta}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PRODUCT PAGE
   ═══════════════════════════════════════════════════════════════════════ */
function ProductPage({ t }) {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <>
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${C.primaryDark} 0%, ${C.bgDark} 60%, ${C.primaryDark} 100%)` }}>
        <DecorativeStars count={10} />
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
          <a href="#home" onClick={(e) => { e.preventDefault(); navigate("home"); }}
            className="inline-flex items-center gap-2 text-white/50 text-sm font-medium no-underline hover:text-white/80 transition-colors mb-8">
            <ArrowLeft size={16} /> {t.common.backToHome}
          </a>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase mb-6"
                style={{ background: `${C.accent}20`, color: C.accent, border: `1px solid ${C.accent}30` }}>
                <Sparkles size={12} /> {t.product.badge}
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-5">{t.product.title}</h1>
              <p className="text-base lg:text-lg text-white/60 max-w-lg leading-relaxed mb-8">{t.product.subtitle}</p>
              <a href="#contact" onClick={(e) => { e.preventDefault(); navigate("contact"); }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-[0.9rem] font-semibold no-underline transition-all duration-300 hover:scale-[1.03]"
                style={{ background: C.accent, color: C.bgDark }}>
                <Phone size={18} /> {t.product.cta}
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}>
              <div className="relative">
                <ProductImage src="/images/packshot-white.png" alt="3D列印客製化手部副木" iconFallback={Hand}
                  className="rounded-3xl overflow-hidden aspect-square shadow-2xl" style={{ border: "1px solid rgba(255,255,255,0.15)" }} />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-lg z-10"
                  style={{ border: "3px solid rgba(255,255,255,0.1)" }}>
                  <ProductImage src="/images/lifestyle-green.jpg" alt="綠色副木" iconFallback={Printer}
                    className="w-full h-full" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <WaveDivider color={C.bg} />

      {/* Mission Slogan */}
      <section className="py-14 sm:py-16" style={{ background: C.bg }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <Reveal>
            <p className="font-heading text-lg sm:text-xl lg:text-[1.35rem] font-medium leading-[2.2]" style={{ color: C.text }}>
              {t.product.missionSlogan}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Inspirational Quote */}
      <section className="py-16 sm:py-20" style={{ background: `linear-gradient(135deg, ${C.primary}08, ${C.accent}06)` }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <Reveal>
            <div className="relative">
              <span className="font-heading text-6xl sm:text-7xl absolute -top-6 left-1/2 -translate-x-1/2 opacity-10" style={{ color: C.primaryDark }}>&ldquo;</span>
              <p className="font-heading text-xl sm:text-2xl lg:text-[1.65rem] font-medium leading-[2] relative z-10 pt-4" style={{ color: C.primaryDark }}>
                {t.product.quote}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28" style={{ background: C.bg }}>
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.product.features.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <SpotlightCard className="rounded-3xl h-full">
                  <div className="text-center p-8 rounded-3xl h-full transition-all duration-300 hover:-translate-y-1"
                    style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                      style={{ background: `linear-gradient(135deg, ${C.primary}15, ${C.accent}15)`, color: C.primaryDark }}>
                      <Icon name={f.icon} size={28} />
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: C.text }}>{f.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{f.desc}</p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Tech Showcase */}
      <section className="py-20 lg:py-28" style={{ background: C.bgAlt }}>
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <SectionHeading
            label={t.nav.home === "首頁" ? "3D 科技展示" : "3D Tech Showcase"}
            title={t.nav.home === "首頁" ? "從掃描到成品" : "From Scan to Finished Product"}
            subtitle={t.nav.home === "首頁" ? "運用先進3D列印技術，每一件輔具都是獨一無二的客製化作品。" : "Using advanced 3D printing technology, every orthotic is a unique custom creation."} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Row 1: 3D Model + Render */}
            <ScrollReveal className="col-span-2 lg:col-span-2 row-span-2">
              <div className="rounded-2xl lg:rounded-3xl overflow-hidden h-full shadow-lg group relative" style={{ border: `1px solid ${C.border}` }}>
                <ProductImage src="/images/3d-model-screen.jpeg" alt="3D數位建模" iconFallback={Printer}
                  className="w-full h-full transition-transform duration-700 group-hover:scale-105" style={{ minHeight: "280px" }} />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-white text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${C.primary}cc` }}>
                    {t.nav.home === "首頁" ? "數位建模" : "Digital Modeling"}
                  </span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg group aspect-square relative" style={{ border: `1px solid ${C.border}` }}>
                <ProductImage src="/images/3d-render-red.jpeg" alt="3D渲染設計" iconFallback={Sparkles}
                  className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-white text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${C.accent}cc` }}>
                    {t.nav.home === "首頁" ? "3D渲染" : "3D Render"}
                  </span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg group aspect-square relative" style={{ border: `1px solid ${C.border}` }}>
                <ProductImage src="/images/3d-hand-green.jpeg" alt="綠色副木成品" iconFallback={Hand}
                  className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-white text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${C.primary}cc` }}>
                    {t.nav.home === "首頁" ? "列印成品" : "3D Printed"}
                  </span>
                </div>
              </div>
            </ScrollReveal>
            {/* Row 2: Real products */}
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg group aspect-square" style={{ border: `1px solid ${C.border}` }}>
                <ProductImage src="/images/3d-hand-orange.jpeg" alt="橘色兒童副木" iconFallback={Hand}
                  className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg group aspect-square" style={{ border: `1px solid ${C.border}` }}>
                <ProductImage src="/images/3d-hand-yellow-pair.jpeg" alt="黃色副木對" iconFallback={Hand}
                  className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg group aspect-square" style={{ border: `1px solid ${C.border}` }}>
                <ProductImage src="/images/3d-hand-black-worn.jpeg" alt="黑色副木配戴" iconFallback={Hand}
                  className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg group aspect-square" style={{ border: `1px solid ${C.border}` }}>
                <ProductImage src="/images/fitting-child.jpeg" alt="專業試戴" iconFallback={Baby}
                  className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
              </div>
            </ScrollReveal>
          </div>

          {/* Before & After / Process strip */}
          <div className="mt-10">
            <ScrollReveal>
              <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg" style={{ border: `1px solid ${C.border}` }}>
                <ProductImage src="/images/3d-hand-collage.jpeg" alt="3D副木製作過程 - 從掃描到試戴"
                  iconFallback={Hand} className="w-full" style={{ maxHeight: "400px" }} />
              </div>
              <p className="text-center text-sm mt-4" style={{ color: C.textMuted }}>
                {t.nav.home === "首頁" ? "從設計、列印到試戴 — 每一步都精準客製" : "From design to print to fitting — every step precisely customized"}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Product Showcase — Individual Products (details coming soon) */}
      <section className="py-20 lg:py-28" style={{ background: C.bg }}>
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <SectionHeading
            label={t.nav.home === "首頁" ? "成品展示" : "Product Showcase"}
            title={t.nav.home === "首頁" ? "每一件輔具，都是為孩子量身打造" : "Every Device, Tailor-Made for Your Child"}
            subtitle={t.nav.home === "首頁" ? "每款成品都有專屬介紹頁面，敬請期待更多詳細資訊。" : "Each finished product will have its own dedicated page. More details coming soon."} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: "/images/3d-hand-green.jpeg", name: t.nav.home === "首頁" ? "綠色副木" : "Green Orthotic" },
              { src: "/images/3d-hand-orange.jpeg", name: t.nav.home === "首頁" ? "橘色兒童副木" : "Orange Pediatric Orthotic" },
              { src: "/images/3d-hand-yellow-pair.jpeg", name: t.nav.home === "首頁" ? "黃色副木對" : "Yellow Orthotic Pair" },
              { src: "/images/3d-hand-black-worn.jpeg", name: t.nav.home === "首頁" ? "黑色副木" : "Black Orthotic" },
              { src: "/images/fitting-child.jpeg", name: t.nav.home === "首頁" ? "兒童試戴" : "Child Fitting" },
              { src: "/images/3d-hand-collage.jpeg", name: t.nav.home === "首頁" ? "製作過程總覽" : "Process Overview" },
            ].map((product, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
                  <div className="aspect-square overflow-hidden">
                    <ProductImage src={product.src} alt={product.name} iconFallback={Hand}
                      className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-4 text-center">
                    <h4 className="font-heading text-base font-bold mb-1" style={{ color: C.text }}>{product.name}</h4>
                    <p className="text-xs" style={{ color: C.textMuted }}>
                      {t.nav.home === "首頁" ? "詳細介紹即將推出" : "Details coming soon"}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28" style={{ background: C.bgAlt }}>
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <SectionHeading title={t.product.timeline.title} />
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px hidden md:block" style={{ background: `linear-gradient(to bottom, ${C.primary}, ${C.accent})` }} />
            <div className="space-y-10 md:space-y-12">
              {t.product.timeline.steps.map((step, i) => (
                <Reveal key={i} delay={i * 0.15}>
                  <div className="flex gap-6 md:gap-10 items-start">
                    <div className="relative flex-shrink-0 hidden md:block">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})` }}>
                        <span className="text-white font-bold text-sm">{step.num}</span>
                      </div>
                      <div className="absolute inset-0 rounded-full" style={{ animation: `pulse-dot 2s ease-in-out infinite ${i * 0.5}s`, border: `2px solid ${C.primary}40` }} />
                    </div>
                    <div className="flex-1 p-6 rounded-2xl" style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
                      <div className="md:hidden inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${C.primary}15`, color: C.primaryDark }}>{step.num}</div>
                      <h3 className="font-bold text-lg mb-2" style={{ color: C.text }}>{step.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28" style={{ background: C.bg }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <SectionHeading title={t.product.faq.title} />
          <div className="space-y-4">
            {t.product.faq.items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <FaqItem q={item.q} a={item.a} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   WORKSHOPS & SPEAKING PAGE
   ═══════════════════════════════════════════════════════════════════════ */
function WorkshopsPage({ t }) {
  const w = t.workshops;
  const workshopIcons = [Brain, Users, Award];
  return (
    <>
      {/* Hero with background image */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${C.bgDark} 0%, ${C.primaryDark} 50%, ${C.bgDark} 100%)` }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "url(/images/workshop-lecture.jpeg)", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.4)" }} />
        <DecorativeStars count={8} />
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
          <a href="#home" onClick={(e) => { e.preventDefault(); navigate("home"); }}
            className="inline-flex items-center gap-2 text-white/50 text-sm font-medium no-underline hover:text-white/80 transition-colors mb-8">
            <ArrowLeft size={16} /> {t.common.backToHome}
          </a>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase mb-6"
              style={{ background: `${C.accent}20`, color: C.accent, border: `1px solid ${C.accent}30` }}>
              <Brain size={12} /> {w.label}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-5">{w.title}</h1>
            <p className="text-base lg:text-lg text-white/60 max-w-lg leading-relaxed mb-6">{w.subtitle}</p>
            <p className="font-heading text-lg sm:text-xl text-white/80 italic leading-relaxed">{w.heroQuote}</p>
          </motion.div>
        </div>
      </section>

      <WaveDivider color={C.bg} />

      {/* Workshop Sections */}
      <section className="py-16 sm:py-20 lg:py-28" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="space-y-16 sm:space-y-24 lg:space-y-32">
            {w.sections.map((section, i) => {
              const IconComp = workshopIcons[i] || Brain;
              return (
                <ScrollReveal key={i}>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                    <div className="lg:[direction:ltr]">
                      <div className="rounded-3xl overflow-hidden aspect-[4/3] relative"
                        style={{ border: `1px solid ${C.primary}25` }}>
                        <ProductImage
                          src={["/images/workshop-lecture.jpeg", "/images/fitting-child.jpeg", "/images/3d-hand-collage.jpeg"][i]}
                          alt={section.title}
                          iconFallback={IconComp}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="lg:[direction:ltr]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${C.primary}15`, color: C.primaryDark }}>
                          <IconComp size={24} />
                        </div>
                        <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: C.text }}>{section.title}</h3>
                      </div>
                      <p className="text-[0.95rem] leading-relaxed mb-6" style={{ color: C.textMuted }}>{section.desc}</p>
                      <ul className="space-y-3 mb-6">
                        {section.features.map((f, fi) => (
                          <li key={fi} className="flex items-center gap-3 text-[0.95rem]" style={{ color: C.text }}>
                            <CheckCircle2 size={18} style={{ color: C.primaryDark }} className="flex-shrink-0" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20" style={{ background: C.bgAlt }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <ScrollReveal>
            <div className="p-10 sm:p-14 rounded-3xl" style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.bgDark})` }}>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">{w.cta}</h2>
              <p className="text-sm text-white/50 mb-8">{w.ctaSubtext}</p>
              <a href="#contact" onClick={(e) => { e.preventDefault(); navigate("contact"); }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-[0.9rem] font-semibold no-underline transition-all duration-300 hover:scale-[1.03]"
                style={{ background: C.accent, color: C.bgDark }}>
                <Phone size={18} /> {w.cta}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   ABOUT PAGE
   ═══════════════════════════════════════════════════════════════════════ */
function AboutPage({ t }) {
  const a = t.about;
  return (
    <>
      <PageHero title={a.title} t={t} />

      {/* Brand Tagline & Intro */}
      <section className="py-16 sm:py-20 lg:py-24" style={{ background: C.bg }}>
        <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ color: C.primaryDark }}>{a.tagline}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg sm:text-xl leading-[2] max-w-2xl mx-auto mb-0" style={{ color: C.text }}>{a.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* Brand Meaning: 預見 + 旅圖 */}
      <section className="py-16 sm:py-20 lg:py-24" style={{ background: C.bgAlt }}>
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <ScrollReveal>
              <div className="p-8 sm:p-10 rounded-3xl h-full" style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `linear-gradient(135deg, ${C.primary}15, ${C.accent}15)`, color: C.primaryDark }}>
                  <Star size={28} />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4" style={{ color: C.primaryDark }}>{a.foreseeTitle}</h3>
                <p className="text-[0.95rem] leading-[2]" style={{ color: C.textMuted }}>{a.foreseeText}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="p-8 sm:p-10 rounded-3xl h-full" style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `linear-gradient(135deg, ${C.accent}15, ${C.secondary}15)`, color: C.accent }}>
                  <MapPin size={28} />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4" style={{ color: C.primaryDark }}>{a.journeyTitle}</h3>
                <p className="text-[0.95rem] leading-[2]" style={{ color: C.textMuted }}>{a.journeyText}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Story & Mission */}
      <section className="py-16 sm:py-20 lg:py-24" style={{ background: C.bg }}>
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <Reveal><p className="text-lg leading-[2] mb-6" style={{ color: C.text }}>{a.story}</p></Reveal>
          <Reveal delay={0.15}><p className="text-lg leading-[2] mb-10" style={{ color: C.text }}>{a.story2}</p></Reveal>
          <Reveal delay={0.2}>
            <div className="p-8 sm:p-10 rounded-3xl relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.primary}10, ${C.accent}08)`, border: `1px solid ${C.primary}20` }}>
              <DecorativeStars count={4} />
              <h3 className="font-heading text-2xl font-bold mb-4 relative z-10" style={{ color: C.primaryDark }}>{a.mission}</h3>
              <p className="text-base leading-relaxed relative z-10" style={{ color: C.textMuted }}>{a.missionText}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28" style={{ background: C.bgAlt }}>
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 items-start">
            <ScrollReveal direction="scale" className="lg:col-span-2">
              <div className="relative max-w-sm mx-auto lg:max-w-none">
                <div className="rounded-3xl overflow-hidden aspect-[3/4]"
                  style={{ border: `1px solid ${C.primary}25` }}>
                  <ProductImage src="/images/packshot-trio.jpg" alt="黃雅惠 治療師" iconFallback={Users}
                    className="w-full h-full" overlayGradient={false} />
                </div>
                <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-full h-full rounded-3xl -z-10" style={{ border: `2px solid ${C.primary}30` }} />
              </div>
            </ScrollReveal>
            <div className="lg:col-span-3">
              <ScrollReveal>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mb-2" style={{ color: C.text }}>{a.therapist.name}</h2>
                <p className="text-sm font-semibold mb-6" style={{ color: C.primaryDark }}>{a.therapist.role}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="text-[0.95rem] leading-[2] mb-8" style={{ color: C.textMuted }}>{a.therapist.bio}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="flex flex-wrap gap-3">
                  {a.therapist.credentials.map((cred, i) => (
                    <div key={i} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl"
                      style={{ background: `${C.primary}10`, border: `1px solid ${C.primary}20` }}>
                      <Icon name={cred.icon} size={16} style={{ color: C.primaryDark }} />
                      <span className="text-sm font-medium" style={{ color: C.text }}>{cred.label}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CONTACT PAGE
   ═══════════════════════════════════════════════════════════════════════ */
function ContactPage({ t }) {
  const c = t.contact;
  return (
    <>
      <PageHero title={c.title} subtitle={c.subtitle} t={t} />
      <section className="py-16 sm:py-20 lg:py-28" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-2xl mx-auto space-y-5">
            {[
              { href: `https://line.me/R/ti/p/${c.line}`, icon: <LineIcon size={22} />, title: "LINE", sub: c.line, bg: "#06C75512", color: "#06C755", external: true },
              { href: `mailto:${c.email}`, icon: <Mail size={22} />, title: c.email, sub: null, bg: `${C.primary}12`, color: C.primaryDark },
              { href: c.facebook, icon: <Facebook size={22} />, title: "Facebook", sub: "預見旅圖", bg: "#1877F212", color: "#1877F2", external: true },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <a href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 p-5 rounded-2xl no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: item.bg, color: item.color }}>{item.icon}</div>
                  <div>
                    <div className="font-bold text-[0.95rem] mb-0.5" style={{ color: C.text }}>{item.title}</div>
                    {item.sub && <p className="text-sm" style={{ color: C.textMuted }}>{item.sub}</p>}
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════════ */
function Footer({ t, lang }) {
  const year = new Date().getFullYear();
  const links = [
    { label: t.nav.home, href: "home" }, { label: t.nav.services, href: "services" },
    { label: t.nav.product, href: "product" }, { label: t.nav.workshops, href: "workshops" }, { label: t.nav.about, href: "about" }, { label: t.nav.contact, href: "contact" },
  ];
  return (
    <footer style={{ background: C.bgDark }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10">
          <div className="sm:col-span-2 lg:col-span-2">
            <a href="#home" onClick={(e) => { e.preventDefault(); navigate("home"); }} className="inline-flex items-center gap-2 mb-4 no-underline">
              <img src="/images/foresee-logo.jpeg" alt="預見旅圖 Foresee Journey" style={{ height: "38px", objectFit: "contain", borderRadius: "6px" }} />
              <span className="font-heading text-lg font-bold text-white">{lang === "zh" ? "預見旅圖" : "Foresee Journey"}</span>
            </a>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-6">{t.footer.tagline}</p>
            <div className="flex gap-3">
              <a href={t.contact.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors no-underline" style={{ background: "rgba(255,255,255,0.06)" }}><Facebook size={16} /></a>
              <a href={`https://line.me/R/ti/p/${t.contact.line}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors no-underline" style={{ background: "rgba(255,255,255,0.06)" }}><LineIcon size={16} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.12em] uppercase text-white/30 mb-5 font-semibold">{t.footer.nav}</h4>
            <ul className="space-y-2.5 list-none">
              {links.map((l) => (
                <li key={l.href}><a href={`#${l.href}`} className="text-sm text-white/50 hover:text-white/80 transition-colors no-underline" onClick={(e) => { e.preventDefault(); navigate(l.href); }}>{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.12em] uppercase text-white/30 mb-5 font-semibold">{t.footer.contactTitle}</h4>
            <ul className="space-y-2.5 list-none">

              <li><a href={`mailto:${t.contact.email}`} className="text-sm text-white/50 hover:text-white/80 transition-colors no-underline flex items-center gap-2"><Mail size={14} /> {t.contact.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs text-white/20">&copy; {year} {lang === "zh" ? "預見旅圖" : "Foresee Journey"}. {t.footer.rights}.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/20 hover:text-white/40 transition-colors no-underline">{t.footer.privacy}</a>
            <a href="#" className="text-xs text-white/20 hover:text-white/40 transition-colors no-underline">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   FLOATING LINE BUTTON
   ═══════════════════════════════════════════════════════════════════════ */
function FloatingLine({ t, lang }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Desktop: floating LINE button */}
          <motion.a href={`https://line.me/R/ti/p/${t.contact.line}`} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.4, ease: EASE }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl no-underline hidden sm:flex"
            style={{ background: "#06C755" }} title="LINE">
            <LineIcon size={28} />
          </motion.a>

          {/* Mobile: sticky bottom CTA bar */}
          <motion.div
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
            style={{ background: "rgba(247,243,235,0.95)", backdropFilter: "blur(16px)", borderTop: `1px solid ${C.border}`, padding: "0.6rem 1rem" }}>
            <div className="flex items-center gap-2">
              <a href={`https://line.me/R/ti/p/${t.contact.line}`} target="_blank" rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-bold no-underline"
                style={{ background: "#06C755" }}>
                <LineIcon size={18} /> LINE
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); navigate("contact"); }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-bold no-underline"
                style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})` }}>
                <Phone size={16} /> {lang === "zh" ? "立即預約" : "Book Now"}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   COOKIE BANNER
   ═══════════════════════════════════════════════════════════════════════ */
function CookieBanner({ t }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { if (!localStorage.getItem("foresee-cookie-consent")) setVisible(true); }, []);
  if (!visible) return null;
  return (
    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: EASE }} className="fixed bottom-0 left-0 right-0 z-[70] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto warm-glass rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs sm:text-sm font-medium" style={{ color: C.text }}>{t.cookie.text}</p>
        <div className="flex items-center gap-3">
          <button onClick={() => { localStorage.setItem("foresee-cookie-consent", "declined"); setVisible(false); }}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-white/50 hover:text-white/80 transition-colors bg-transparent cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.12)" }}>{t.cookie.decline}</button>
          <button onClick={() => { localStorage.setItem("foresee-cookie-consent", "accepted"); setVisible(false); }}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:scale-[1.03] cursor-pointer border-none"
            style={{ background: C.primary }}>{t.cookie.accept}</button>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SEO
   ═══════════════════════════════════════════════════════════════════════ */
function useSEO(page, lang) {
  useEffect(() => {
    const n = lang === "zh" ? "預見旅圖" : "Foresee Journey";
    const map = {
      home: { title: `${n} — ${lang === "zh" ? "兒童物理治療" : "Pediatric PT"}`, desc: lang === "zh" ? "專為兒童設計的物理治療服務" : "Specialized physiotherapy for children" },
      services: { title: `${lang === "zh" ? "服務" : "Services"} — ${n}` }, product: { title: `${lang === "zh" ? "3D客製化輔具" : "3D Custom Orthotics"} — ${n}` },
      workshops: { title: `${lang === "zh" ? "講座活動" : "Workshops"} — ${n}` },
      about: { title: `${lang === "zh" ? "品牌介紹" : "Brand Introduction"} — ${n}` }, contact: { title: `${lang === "zh" ? "聯絡" : "Contact"} — ${n}` },
    };
    const seo = map[page] || map.home;
    document.title = seo.title;
  }, [page, lang]);
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [lang, setLang] = useState(() => localStorage.getItem("foresee-lang") || "zh");
  const t = TRANSLATIONS[lang];

  useSEO(currentPage, lang);

  useEffect(() => { localStorage.setItem("foresee-lang", lang); document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en"; }, [lang]);

  useEffect(() => {
    const existing = document.getElementById("foresee-global-styles");
    if (!existing) { const s = document.createElement("style"); s.id = "foresee-global-styles"; s.textContent = GLOBAL_STYLES; document.head.appendChild(s); }
    return () => { const s = document.getElementById("foresee-global-styles"); if (s) s.remove(); };
  }, []);

  useEffect(() => {
    const handleHash = () => { setCurrentPage(window.location.hash.replace("#", "") || "home"); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", handleHash); handleHash();
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "services": return <ServicesPage t={t} />;
      case "product": return <ProductPage t={t} />;
      case "workshops": return <WorkshopsPage t={t} />;
      case "about": return <AboutPage t={t} />;
      case "contact": return <ContactPage t={t} />;
      default: return <HomePage t={t} />;
    }
  };

  return (
    <div className="relative">
      <Navbar currentPage={currentPage} t={t} lang={lang} setLang={setLang} />
      <main id="main-content">
        <AnimatePresence mode="wait">
          <motion.div key={currentPage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer t={t} lang={lang} />
      <FloatingLine t={t} lang={lang} />
      <CookieBanner t={t} />
    </div>
  );
}
