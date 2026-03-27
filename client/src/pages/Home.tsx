/**
 * Home Page - 3 Plan Showcase
 * Design: Clean, professional, light background with subtle depth
 * Typography: DM Sans (headings) + Noto Sans JP (body)
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, LayoutDashboard, Lightbulb } from "lucide-react";
import PlanASwipe from "@/components/plans/PlanASwipe";
import PlanBDashboard from "@/components/plans/PlanBDashboard";
import PlanCAiFeed from "@/components/plans/PlanCAiFeed";

const plans = [
  {
    id: "a",
    title: "案A: スワイプ型",
    subtitle: "MedMatch",
    desc: "直感的なカードスワイプで、隙間時間にサクサクとマッチング。スキルをチャートで視覚化。",
    accentColor: "#0f766e",
    bgColor: "bg-teal-50",
    borderActive: "ring-teal-400",
    icon: <Stethoscope className="w-5 h-5" />,
    tags: ["直感的操作", "スキル可視化", "カード型UI"],
  },
  {
    id: "b",
    title: "案B: ダッシュボード型",
    subtitle: "MedConnect",
    desc: "LinkedInライクな洗練されたUIで、詳細な条件検索と分析的なマッチングを実現。",
    accentColor: "#1e3a5f",
    bgColor: "bg-slate-50",
    borderActive: "ring-slate-400",
    icon: <LayoutDashboard className="w-5 h-5" />,
    tags: ["データドリブン", "詳細検索", "プロフェッショナル"],
  },
  {
    id: "c",
    title: "案C: レコメンド型",
    subtitle: "MedRecommend",
    desc: "パーソナライズされたフィードで「なぜおすすめか」を説明。対話型の要件設定も。",
    accentColor: "#4338ca",
    bgColor: "bg-indigo-50",
    borderActive: "ring-indigo-400",
    icon: <Lightbulb className="w-5 h-5" />,
    tags: ["レコメンド", "パーソナライズ", "対話型UX"],
  },
];

export default function Home() {
  const [activePlan, setActivePlan] = useState(0);
  const plan = plans[activePlan];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-500 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              UIモックアップ比較
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
              MedMatch
            </h1>
            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto leading-relaxed">
              病院と医師の専門性をベースとしたスキルマッチングアプリ
            </p>
          </motion.div>
        </div>
      </header>

      {/* Plan Selector */}
      <div className="max-w-4xl mx-auto px-4 -mt-5">
        <div className="flex gap-3 justify-center flex-wrap">
          {plans.map((p, i) => (
            <motion.button
              key={p.id}
              onClick={() => setActivePlan(i)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 0.2 }}
              className={`
                relative w-full max-w-[260px] p-4 rounded-lg bg-white border transition-all duration-200 text-left
                ${activePlan === i
                  ? `ring-2 ${p.borderActive} border-transparent shadow-md`
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm opacity-75 hover:opacity-100"
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: activePlan === i ? p.accentColor : "#f3f4f6",
                    color: activePlan === i ? "#fff" : "#6b7280",
                  }}
                >
                  {p.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-semibold ${activePlan === i ? "text-gray-900" : "text-gray-600"}`}>
                    {p.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">
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
                        ? "bg-gray-100 text-gray-600"
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Active Plan Label */}
      <div className="text-center mt-8 mb-4">
        <motion.div
          key={activePlan}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-semibold text-white"
          style={{ backgroundColor: plan.accentColor }}
        >
          {plan.title}
        </motion.div>
        <p className="text-xs text-gray-400 mt-2">スマートフォン画面の下部タブをタップして各画面を確認できます</p>
      </div>

      {/* Phone Mockups */}
      <div className="pb-16 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlan}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex justify-center"
          >
            {activePlan === 0 && <PlanASwipe />}
            {activePlan === 1 && <PlanBDashboard />}
            {activePlan === 2 && <PlanCAiFeed />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="text-center pb-8 text-xs text-gray-400 border-t border-gray-200 pt-6">
        MedMatch UIモックアップ — 病院×医師スキルマッチング
      </footer>
    </div>
  );
}
