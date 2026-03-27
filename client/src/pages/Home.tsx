/**
 * Home Page - 3 Plan Showcase with Glassmorphism Medical Lab design
 * Background: Deep slate blue with floating glass panels
 * Typography: DM Sans (headings) + Noto Sans JP (body)
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlanASwipe from "@/components/plans/PlanASwipe";
import PlanBDashboard from "@/components/plans/PlanBDashboard";
import PlanCAiFeed from "@/components/plans/PlanCAiFeed";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/103976745/mXkDUtmxuZzTbTDixQUYNG/hero-bg-NidkjKXwKEtZHdDtHKmp6h.webp";
const PLAN_A_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/103976745/mXkDUtmxuZzTbTDixQUYNG/plan-a-card-A8TWHxEDWczXiwxrzR7dxb.webp";
const PLAN_B_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/103976745/mXkDUtmxuZzTbTDixQUYNG/plan-b-card-Zg9fou7ztbcBV8qAG9esMC.webp";
const PLAN_C_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/103976745/mXkDUtmxuZzTbTDixQUYNG/plan-c-card-QcgQMzDXXJAr4XiBUeYCaU.webp";

const plans = [
  {
    id: "a",
    title: "案A: スワイプ型",
    subtitle: "MedMatch",
    desc: "直感的なカードスワイプで、隙間時間にサクサクとマッチング。スキルをレーダーチャートで視覚化。",
    color: "from-teal-500 to-teal-600",
    borderColor: "border-teal-400/30",
    glowColor: "shadow-teal-500/20",
    textColor: "text-teal-300",
    img: PLAN_A_IMG,
    tags: ["直感的操作", "スキル可視化", "ゲーミフィケーション"],
  },
  {
    id: "b",
    title: "案B: ダッシュボード型",
    subtitle: "MedConnect",
    desc: "LinkedInライクな洗練されたUIで、詳細な条件検索と分析的なマッチングを実現。",
    color: "from-blue-600 to-blue-700",
    borderColor: "border-blue-400/30",
    glowColor: "shadow-blue-500/20",
    textColor: "text-blue-300",
    img: PLAN_B_IMG,
    tags: ["データドリブン", "詳細検索", "プロフェッショナル"],
  },
  {
    id: "c",
    title: "案C: AIフィード型",
    subtitle: "MedAI",
    desc: "AIが「なぜおすすめか」を説明するパーソナライズドフィード。対話型の要件設定も。",
    color: "from-indigo-600 to-purple-600",
    borderColor: "border-indigo-400/30",
    glowColor: "shadow-indigo-500/20",
    textColor: "text-indigo-300",
    img: PLAN_C_IMG,
    tags: ["AI推薦", "パーソナライズ", "対話型UX"],
  },
];

export default function Home() {
  const [activePlan, setActivePlan] = useState(0);
  const plan = plans[activePlan];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-[#0f172a]/70" />
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-emerald-600/8 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-purple-600/8 blur-3xl animate-pulse" style={{ animationDelay: "4s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <header className="pt-12 pb-8 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-light text-xs font-medium text-indigo-300 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              UIモックアップ比較ツール
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Med<span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">Match</span>
            </h1>
            <p className="text-sm md:text-base text-gray-400 mt-3 max-w-lg mx-auto leading-relaxed">
              病院と医師の専門性をベースとしたスキルマッチングアプリ
              <br className="hidden md:block" />
              3つのUIコンセプトを比較検討できます
            </p>
          </motion.div>
        </header>

        {/* Plan Selector Cards */}
        <div className="flex justify-center gap-3 md:gap-5 px-4 mb-8 flex-wrap">
          {plans.map((p, i) => (
            <motion.button
              key={p.id}
              onClick={() => setActivePlan(i)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className={`
                relative group w-full max-w-[280px] p-4 rounded-2xl transition-all duration-300
                glass-panel hover:scale-[1.02]
                ${activePlan === i ? `ring-2 ring-white/20 shadow-2xl ${p.glowColor}` : "opacity-70 hover:opacity-90"}
              `}
            >
              <div className="flex items-start gap-3">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                />
                <div className="text-left flex-1 min-w-0">
                  <h3 className={`text-sm font-bold ${activePlan === i ? "text-white" : "text-gray-300"}`}>
                    {p.title}
                  </h3>
                  <p className={`text-[11px] mt-0.5 ${activePlan === i ? p.textColor : "text-gray-500"}`}>
                    {p.subtitle}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2.5">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-0.5 rounded text-[9px] font-medium ${
                      activePlan === i
                        ? "bg-white/10 text-white/80"
                        : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {activePlan === i && (
                <motion.div
                  layoutId="active-indicator"
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r ${p.color}`}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Active Plan Label */}
        <div className="text-center mb-6">
          <motion.div
            key={activePlan}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r ${plan.color} text-white text-sm font-semibold shadow-lg`}
          >
            {plan.title} — {plan.subtitle}
          </motion.div>
          <p className="text-xs text-gray-500 mt-2">下のスマートフォン画面のタブをタップして各画面を確認できます</p>
        </div>

        {/* Phone Mockups */}
        <div className="pb-16 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlan}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex justify-center"
            >
              {activePlan === 0 && <PlanASwipe />}
              {activePlan === 1 && <PlanBDashboard />}
              {activePlan === 2 && <PlanCAiFeed />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="text-center pb-8 text-xs text-gray-600">
          MedMatch UIモックアップ — 病院×医師スキルマッチング
        </footer>
      </div>
    </div>
  );
}
