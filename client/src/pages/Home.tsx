/**
 * Home Page - 6 Plan Showcase
 * Design: Rich gradient background, professional depth, polished plan selector
 * Typography: DM Sans (headings) + Noto Sans JP (body)
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope, LayoutDashboard, Lightbulb, GitCompare, Grid2x2, BadgeDollarSign,
} from "lucide-react";
import PlanASwipe from "@/components/plans/PlanASwipe";
import PlanBDashboard from "@/components/plans/PlanBDashboard";
import PlanCAiFeed from "@/components/plans/PlanCAiFeed";
import PlanFCompare from "@/components/plans/PlanFCompare";
import PlanIPortfolio from "@/components/plans/PlanIPortfolio";
import PlanHNegotiate from "@/components/plans/PlanHNegotiate";

const plans = [
  {
    id: "a",
    title: "案A: スワイプ型",
    subtitle: "MedMatch",
    desc: "直感的なカードスワイプで、隙間時間にサクサクとマッチング。スキルをチャートで視覚化。",
    accentColor: "#0f766e",
    accentLight: "#ccfbf1",
    bgGradient: "from-teal-500 to-teal-700",
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
    accentLight: "#e0e7ef",
    bgGradient: "from-slate-600 to-slate-800",
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
    accentLight: "#e0e7ff",
    bgGradient: "from-indigo-500 to-indigo-700",
    borderActive: "ring-indigo-400",
    icon: <Lightbulb className="w-5 h-5" />,
    tags: ["レコメンド", "パーソナライズ", "対話型UX"],
  },
  {
    id: "f",
    title: "案F: 比較・意思決定型",
    subtitle: "MedCompare",
    desc: "複数病院をレーダーチャートで視覚比較。採用基準の重み付け設定で合理的に選択。",
    accentColor: "#0284c7",
    accentLight: "#e0f2fe",
    bgGradient: "from-sky-500 to-sky-700",
    borderActive: "ring-sky-400",
    icon: <GitCompare className="w-5 h-5" />,
    tags: ["並列比較", "レーダーチャート", "スコアリング"],
  },
  {
    id: "i",
    title: "案I: ポートフォリオ型",
    subtitle: "MedPortfolio",
    desc: "症例実績をグリッドで可視化。バッジ制度で医師の成長を示し、病院は経験機会を訴求。",
    accentColor: "#be123c",
    accentLight: "#ffe4e6",
    bgGradient: "from-rose-500 to-rose-700",
    borderActive: "ring-rose-400",
    icon: <Grid2x2 className="w-5 h-5" />,
    tags: ["症例ギャラリー", "バッジ", "実績可視化"],
  },
  {
    id: "h",
    title: "案H: 交渉・オファー型",
    subtitle: "MedOffer",
    desc: "年収スライダーで希望条件を設定。オファー承諾・カウンター・辞退をインラインで完結。",
    accentColor: "#059669",
    accentLight: "#d1fae5",
    bgGradient: "from-emerald-500 to-emerald-700",
    borderActive: "ring-emerald-400",
    icon: <BadgeDollarSign className="w-5 h-5" />,
    tags: ["オファー管理", "条件交渉", "年収スライダー"],
  },
];

export default function Home() {
  const [activePlan, setActivePlan] = useState(0);
  const plan = plans[activePlan];

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #f0f4f8 0%, #f8fafc 40%, #f0f4ff 100%)" }}>
      {/* Decorative background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: `radial-gradient(circle, ${plan.accentColor}, transparent)`, transition: "background 0.6s ease" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: `radial-gradient(circle, ${plan.accentColor}, transparent)`, transition: "background 0.6s ease" }}
        />
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-sm border-b border-gray-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-600 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              インタラクティブ UIモックアップ
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3" style={{ color: "#111827" }}>
              MedMatch
            </h1>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              病院と医師の専門性をベースとしたスキルマッチングアプリ —
              <br />
              <span className="font-semibold text-gray-700">{plans.length}つのUI案を触って比較できます</span>
            </p>
          </motion.div>
        </div>
      </header>

      {/* Plan Selector */}
      <div className="relative max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {plans.map((p, i) => (
            <motion.button
              key={p.id}
              onClick={() => setActivePlan(i)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: i * 0.06 + 0.1, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className={`
                relative w-full p-4 rounded-2xl bg-white/90 border backdrop-blur-sm text-left overflow-hidden transition-all duration-200
                ${activePlan === i
                  ? `ring-2 ${p.borderActive} border-transparent shadow-xl`
                  : "border-gray-200/70 hover:border-gray-300 hover:shadow-md opacity-65 hover:opacity-100"
                }
              `}
            >
              {/* Active indicator stripe */}
              {activePlan === i && (
                <motion.div
                  layoutId="plan-stripe"
                  className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${p.bgGradient}`}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    background: activePlan === i
                      ? `linear-gradient(135deg, ${p.accentColor}dd, ${p.accentColor})`
                      : "#f3f4f6",
                    color: activePlan === i ? "#fff" : "#6b7280",
                    boxShadow: activePlan === i ? `0 4px 12px ${p.accentColor}40` : "none",
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
                    className="px-2 py-0.5 rounded-full text-[9px] font-semibold transition-all duration-200"
                    style={
                      activePlan === i
                        ? { backgroundColor: p.accentLight, color: p.accentColor }
                        : { backgroundColor: "#f3f4f6", color: "#9ca3af" }
                    }
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Active Plan Banner */}
      <div className="text-center mb-6 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlan}
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="inline-flex flex-col items-center gap-1.5"
          >
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-xl text-sm font-bold text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${plan.accentColor}ee, ${plan.accentColor})`,
                boxShadow: `0 4px 20px ${plan.accentColor}44`,
              }}
            >
              {plan.icon}
              {plan.title}
            </div>
            <p className="text-xs text-gray-400 font-medium">{plan.subtitle}</p>
          </motion.div>
        </AnimatePresence>
        <p className="text-xs text-gray-400 mt-2">タブをタップして医師側・病院側の各画面を確認できます</p>
      </div>

      {/* Phone Mockups */}
      <div className="pb-24 px-4 pt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlan}
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-wrap justify-center gap-10"
          >
            {activePlan === 0 && <PlanASwipe />}
            {activePlan === 1 && <PlanBDashboard />}
            {activePlan === 2 && <PlanCAiFeed />}
            {activePlan === 3 && <PlanFCompare />}
            {activePlan === 4 && <PlanIPortfolio />}
            {activePlan === 5 && <PlanHNegotiate />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="relative text-center pb-8 pt-6 border-t border-gray-200/60">
        <p className="text-xs text-gray-400">MedMatch UIモックアップ — 病院×医師スキルマッチング</p>
        <p className="text-[10px] text-gray-300 mt-1">{plans.length} UI Concepts · Interactive Prototype</p>
      </footer>
    </div>
  );
}
