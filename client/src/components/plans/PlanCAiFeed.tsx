/**
 * Plan C: Recommend Timeline Style (MedRecommend)
 * Design: Indigo primary, clean feed UI with recommendation reasons
 * No emoji, Lucide icons only, restrained gradients, toned-down AI language
 */
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneFrame from "../PhoneFrame";
import TabBar from "../TabBar";
import { hospitals, doctors, doctorMessages, hospitalMessages } from "@/lib/mockData";
import {
  Lightbulb, Tag, Bell, MessageCircle,
  ClipboardList, Users, Building2, User,
  Heart, BookOpen, SkipForward, Send, Bookmark,
  TrendingUp, Sparkles, ChevronRight, Plus, X, Check,
  MapPin, Loader2
} from "lucide-react";

function InitialsAvatar({ initials, size = "md", variant = "indigo" }: { initials: string; size?: "sm" | "md" | "lg"; variant?: "indigo" | "purple" | "gray" }) {
  const sizeMap = { sm: "w-9 h-9 text-xs", md: "w-11 h-11 text-sm", lg: "w-12 h-12 text-base" };
  const variantMap = {
    indigo: "bg-indigo-50 text-indigo-700",
    purple: "bg-violet-50 text-violet-700",
    gray: "bg-gray-100 text-gray-600",
  };
  return (
    <div className={`${sizeMap[size]} ${variantMap[variant]} rounded-xl flex items-center justify-center font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

// ===== Doctor Onboarding Wizard =====
const ONBOARDING_SKILLS = ["冠動脈バイパス術", "弁膜症手術", "MICS", "TAVI", "大動脈手術", "カテーテル治療"];
const ONBOARDING_REGIONS = ["関東", "関西", "東海", "九州", "東北"];

function DoctorOnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());
  const [selectedRegions, setSelectedRegions] = useState<Set<string>>(new Set());

  const toggleSkill = (s: string) =>
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });

  const toggleRegion = (r: string) =>
    setSelectedRegions((prev) => {
      const next = new Set(prev);
      next.has(r) ? next.delete(r) : next.add(r);
      return next;
    });

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="h-full flex flex-col" style={{ background: "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)" }}>
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 pt-5 pb-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === step ? "w-6 h-2 bg-indigo-600" : "w-2 h-2 bg-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence custom={direction} mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
            >
              {/* Illustration */}
              <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center mb-6 shadow-lg">
                <Lightbulb className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">AIが最適な病院をおすすめします</h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-8">
                スキルと希望エリアを登録するだけで、あなたに合った求人を自動でレコメンドします。
              </p>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={goNext}
                className="w-full max-w-xs py-3.5 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                はじめる <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col px-6 pt-4 pb-6"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-1">スキルを登録してください</h2>
              <p className="text-xs text-gray-500 mb-4">1つ以上選択してください</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {ONBOARDING_SKILLS.map((s) => {
                  const active = selectedSkills.has(s);
                  return (
                    <motion.button
                      key={s}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => toggleSkill(s)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border-2 transition-colors ${
                        active
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-indigo-700 border-indigo-200"
                      }`}
                    >
                      {active && <Check className="w-3 h-3 inline mr-1" />}
                      {s}
                    </motion.button>
                  );
                })}
              </div>
              <div className="mt-auto">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={goNext}
                  disabled={selectedSkills.size === 0}
                  className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
                    selectedSkills.size > 0
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  次へ <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col px-6 pt-4 pb-6"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-1">希望エリアを選んでください</h2>
              <p className="text-xs text-gray-500 mb-4">複数選択可</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {ONBOARDING_REGIONS.map((r) => {
                  const active = selectedRegions.has(r);
                  return (
                    <motion.button
                      key={r}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => toggleRegion(r)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border-2 transition-colors flex items-center gap-1 ${
                        active
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-indigo-700 border-indigo-200"
                      }`}
                    >
                      <MapPin className="w-3 h-3" /> {r}
                    </motion.button>
                  );
                })}
              </div>
              <div className="mt-auto">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={onComplete}
                  className="w-full py-3.5 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> マッチングを開始
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ===== Doctor Side =====
function DoctorAIFeed() {
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [skippedIds, setSkippedIds] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const allReasons = [
    "冠動脈バイパス術の実績（2,500件+）が、この病院の求める条件と高い一致度を示しています。",
    "研究実績（論文32本）が評価され、学術環境が充実した本院での活躍が期待されます。",
    "カテーテル治療の豊富な経験が、この病院の循環器チームに最適です。",
    "先生の専門スキルと病院の求める条件が高くマッチしています（89%）。",
    "豊富な外科経験が、地域医療の中核を担うこの病院に最適です。",
  ];
  const allTimes = ["2時間前", "5時間前", "昨日", "2日前", "3日前"];

  const baseHospitals = hospitals.slice(0, visibleCount);
  const visibleHospitals = baseHospitals.filter((h) => !skippedIds.has(h.id));

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((c) => Math.min(c + 2, hospitals.length));
      setIsLoadingMore(false);
    }, 800);
  };

  if (!hasOnboarded) {
    return <DoctorOnboardingWizard onComplete={() => setHasOnboarded(true)} />;
  }

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-indigo-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Lightbulb className="w-5 h-5" /> MedRecommend
        </h1>
        <p className="text-xs text-indigo-200 mt-0.5">あなたに最適な病院をレコメンド</p>
      </div>

      <div className="mx-4 mt-3 p-3 bg-indigo-50 rounded-xl border border-indigo-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-700 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-indigo-700">今日のインサイト</div>
            <div className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">
              先生の心臓外科スキルに高い需要があります。{visibleHospitals.length}件のマッチが確認されています。
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-3 space-y-3">
        <AnimatePresence>
          {visibleHospitals.map((h, i) => {
            const liked = likedIds.has(h.id);
            const reasonIdx = i % allReasons.length;
            const timeIdx = i % allTimes.length;
            return (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -60, scale: 0.95 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
              >
                <div className="flex items-center gap-2 px-4 pt-3">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                    <span className="text-[11px] font-semibold text-indigo-600">レコメンド</span>
                  </div>
                  <span className="text-[11px] text-gray-400 ml-auto">{allTimes[timeIdx]}</span>
                </div>

                <div className="mx-3 mt-2 p-2.5 bg-gray-50 rounded-lg border-l-2 border-indigo-400">
                  <p className="text-[11px] text-gray-600 leading-relaxed">{allReasons[reasonIdx]}</p>
                </div>

                <div className="flex items-start gap-3 px-4 py-3">
                  <InitialsAvatar initials={h.initials} variant="indigo" size="lg" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-gray-800">{h.name}</h3>
                    <p className="text-[11px] text-gray-400">{h.department} {h.type} ・ {h.location}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {h.features.slice(0, 2).map((f) => (
                        <span key={f} className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">{f}</span>
                      ))}
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-50 text-indigo-600">{h.salary}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 pb-2">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-indigo-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${h.matchScore}%` }}
                      transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.08 + 0.2 }}
                    />
                  </div>
                  <span className="text-sm font-bold text-indigo-600">{h.matchScore}%</span>
                </div>

                <div className="flex border-t border-gray-100">
                  <button
                    onClick={() => setLikedIds((prev) => {
                      const next = new Set(prev);
                      next.has(h.id) ? next.delete(h.id) : next.add(h.id);
                      return next;
                    })}
                    className={`flex-1 py-2.5 text-center text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${
                      liked ? "text-white bg-indigo-600" : "text-indigo-600"
                    }`}
                  >
                    {liked ? <Check className="w-3.5 h-3.5" /> : <Heart className="w-3.5 h-3.5" />}
                    {liked ? "興味済み" : "興味あり"}
                  </button>
                  <button className="flex-1 py-2.5 text-center text-xs font-semibold text-gray-400 border-l border-gray-100 flex items-center justify-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> 詳細
                  </button>
                  <button
                    onClick={() => setSkippedIds((prev) => new Set(Array.from(prev).concat(h.id)))}
                    className="flex-1 py-2.5 text-center text-xs font-semibold text-gray-400 border-l border-gray-100 flex items-center justify-center gap-1"
                  >
                    <SkipForward className="w-3.5 h-3.5" /> スキップ
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {visibleHospitals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 text-sm text-gray-400"
          >
            <Sparkles className="w-8 h-8 mx-auto mb-2 text-indigo-200" />
            新しいレコメンドを読み込み中...
          </motion.div>
        )}

        {visibleCount < hospitals.length && visibleHospitals.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="w-full py-3 bg-white border border-indigo-200 rounded-xl text-sm font-semibold text-indigo-600 flex items-center justify-center gap-2 shadow-sm"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> 読み込み中...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> さらに表示
              </>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}

function DoctorSkillTags() {
  const [skills, setSkills] = useState(["冠動脈バイパス術", "弁膜症手術", "MICS", "TAVI"]);
  const [certs, setCerts] = useState(["心臓血管外科専門医", "外科指導医"]);
  const [prefs, setPrefs] = useState(["常勤", "関東", "関西"]);
  const suggestions = ["大動脈手術", "ロボット支援手術", "ECMO管理"];

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-indigo-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Tag className="w-5 h-5" /> スキル設定
        </h1>
        <p className="text-xs text-indigo-200 mt-0.5">より正確なマッチングのために</p>
      </div>

      <div className="px-4 py-4 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2">専門スキル</h3>
          <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-200">
            <div className="flex flex-wrap gap-1.5 mb-3">
              <AnimatePresence>
                {skills.map((s) => (
                  <motion.button
                    key={s}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={() => setSkills((prev) => prev.filter((x) => x !== s))}
                    className="px-2.5 py-1 rounded text-[11px] font-medium bg-indigo-600 text-white flex items-center gap-1"
                  >
                    {s} <X className="w-3 h-3 opacity-70" />
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
            <div className="text-[11px] font-semibold text-gray-400 mb-1.5">提案スキル（タップで追加）</div>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.filter((s) => !skills.includes(s)).map((s) => (
                <motion.button
                  key={s}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSkills((prev) => [...prev, s])}
                  className="px-2.5 py-1 rounded text-[11px] font-medium text-indigo-600 border border-dashed border-indigo-300 bg-white flex items-center gap-0.5"
                >
                  <Plus className="w-3 h-3" /> {s}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2">資格・認定</h3>
          <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-200">
            <div className="flex flex-wrap gap-1.5">
              <AnimatePresence>
                {certs.map((c) => (
                  <motion.button
                    key={c}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={() => setCerts((prev) => prev.filter((x) => x !== c))}
                    className="px-2.5 py-1 rounded text-[11px] font-medium bg-indigo-600 text-white flex items-center gap-1"
                  >
                    {c} <X className="w-3 h-3 opacity-70" />
                  </motion.button>
                ))}
              </AnimatePresence>
              <button className="px-2.5 py-1 rounded text-[11px] font-medium text-indigo-600 border border-dashed border-indigo-300 flex items-center gap-0.5">
                <Plus className="w-3 h-3" /> 追加
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2">希望条件</h3>
          <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-200">
            <div className="flex flex-wrap gap-1.5">
              <AnimatePresence>
                {prefs.map((p) => (
                  <motion.button
                    key={p}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={() => setPrefs((prev) => prev.filter((x) => x !== p))}
                    className="px-2.5 py-1 rounded text-[11px] font-medium bg-indigo-600 text-white flex items-center gap-1"
                  >
                    {p} <X className="w-3 h-3 opacity-70" />
                  </motion.button>
                ))}
              </AnimatePresence>
              <button className="px-2.5 py-1 rounded text-[11px] font-medium text-indigo-600 border border-dashed border-indigo-300 flex items-center gap-0.5">
                <Plus className="w-3 h-3" /> 追加
              </button>
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-indigo-50 rounded-xl border border-indigo-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-700 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-700">提案</div>
              <div className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">「大動脈手術」「ロボット支援手術」のスキルも追加すると、マッチ精度が向上する可能性があります。</div>
            </div>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 bg-indigo-700 text-white rounded-xl font-semibold text-sm"
        >
          スキルを保存して分析を更新
        </motion.button>
      </div>
    </div>
  );
}

function DoctorNotifications() {
  const [readIds, setReadIds] = useState<Set<number>>(new Set());
  const notifs = [
    { icon: <Sparkles className="w-4 h-4" />, bg: "bg-indigo-50", color: "text-indigo-600", title: "新しいマッチ", desc: "東京中央総合病院があなたに「興味あり」を送りました。マッチ率92%です。", time: "10分前" },
    { icon: <Send className="w-4 h-4" />, bg: "bg-violet-50", color: "text-violet-600", title: "スカウト受信", desc: "慶應義塾大学病院から「先生の冠動脈バイパス術の実績に注目しています」とのスカウトが届きました。", time: "1時間前" },
    { icon: <TrendingUp className="w-4 h-4" />, bg: "bg-emerald-50", color: "text-emerald-600", title: "分析更新", desc: "プロフィール閲覧数が先週比+40%増加しました。", time: "3時間前" },
    { icon: <Sparkles className="w-4 h-4" />, bg: "bg-indigo-50", color: "text-indigo-600", title: "新しいレコメンド", desc: "横浜みなと医療センターがあなたのスキルにマッチしています（87%）。", time: "昨日" },
  ];

  return (
    <div className="h-full bg-gray-50">
      <div className="bg-indigo-700 px-5 pt-4 pb-4 text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Bell className="w-5 h-5" /> 通知
          </h1>
          {readIds.size < notifs.length && (
            <button onClick={() => setReadIds(new Set(notifs.map((_, i) => i)))} className="text-xs text-indigo-200 font-medium">
              すべて既読
            </button>
          )}
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        <AnimatePresence>
          {notifs.map((n, i) => {
            const isNew = !readIds.has(i);
            return (
              <motion.div
                key={i}
                layout
                onClick={() => setReadIds((prev) => new Set(Array.from(prev).concat(i)))}
                className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors ${isNew ? "bg-indigo-50/60" : "bg-white"}`}
              >
                <div className={`w-8 h-8 rounded-lg ${n.bg} ${n.color} flex items-center justify-center flex-shrink-0`}>{n.icon}</div>
                <div className="flex-1">
                  <div className="text-xs text-gray-800 leading-relaxed"><strong>{n.title}</strong> {n.desc}</div>
                  <div className="text-[11px] text-gray-400 mt-1">{n.time}</div>
                </div>
                {isNew && <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0 mt-1" />}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

const AI_CHAT: Record<string, { from: "doctor" | "hospital"; text: string; time: string }[]> = {
  m1: [
    { from: "hospital", text: "田中先生のスカウトメッセージをご覧いただきありがとうございます。先生の豊富な手術実績に大変注目しております。", time: "9:55" },
    { from: "doctor", text: "スカウトいただきありがとうございます。東京中央総合病院については以前から注目していました。", time: "10:02" },
    { from: "hospital", text: "ありがとうございます！まずはオンラインで30分ほどお話しできますでしょうか。", time: "10:05" },
    { from: "doctor", text: "ぜひ。今週木曜か金曜の夕方はいかがでしょう？", time: "10:08" },
    { from: "hospital", text: "木曜18時はいかがでしょうか。ZoomのURLをお送りします。ぜひお待ちしております。", time: "10:10" },
  ],
  m2: [
    { from: "hospital", text: "先生のご経歴を拝見し、大変興味を持ちました。慶應病院は研究環境に力を入れており、ぜひ詳しくご紹介したいと思います。", time: "昨日 15:20" },
    { from: "doctor", text: "ご連絡ありがとうございます。研究環境について詳しく聞かせてください。", time: "昨日 16:45" },
  ],
  m3: [
    { from: "hospital", text: "研究論文執筆のサポート体制についてご案内いたします。年間3本まで費用負担、学会発表も全額支援しております。", time: "3/24 11:30" },
  ],
};

function DoctorMsg() {
  const [openThread, setOpenThread] = useState<string | null>(null);

  if (openThread) {
    const m = doctorMessages.find((msg) => msg.id === openThread)!;
    const thread = AI_CHAT[openThread] ?? [];
    return (
      <div className="h-full bg-gray-50 flex flex-col">
        <div className="bg-indigo-700 px-4 pt-4 pb-3 text-white flex items-center gap-3">
          <button onClick={() => setOpenThread(null)} className="text-indigo-200 text-xs font-semibold">← 戻る</button>
          <div className="flex-1">
            <div className="font-semibold text-sm">{m.name}</div>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 px-4 py-3 space-y-2.5 overflow-y-auto">
          {thread.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex ${msg.from === "doctor" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                msg.from === "doctor"
                  ? "bg-indigo-700 text-white rounded-br-sm"
                  : "bg-white text-gray-700 border border-gray-100 shadow-sm rounded-bl-sm"
              }`}>
                {msg.text}
                <div className={`text-[9px] mt-1 ${msg.from === "doctor" ? "text-indigo-200" : "text-gray-400"}`}>{msg.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="px-4 pb-[72px] pt-2 bg-white border-t border-gray-100">
          <div className="flex gap-2 items-center bg-gray-100 rounded-xl px-3 py-2.5">
            <span className="text-xs text-gray-400 flex-1">メッセージを入力...</span>
            <button className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50">
      <div className="bg-indigo-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <MessageCircle className="w-5 h-5" /> メッセージ
        </h1>
      </div>
      <div className="divide-y divide-gray-100">
        {doctorMessages.map((m) => (
          <button
            key={m.id}
            onClick={() => setOpenThread(m.id)}
            className="w-full flex items-center gap-3 px-4 py-3.5 bg-white hover:bg-gray-50 transition-colors text-left"
          >
            <InitialsAvatar initials={m.initials} variant="indigo" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-800">{m.name}</div>
              <div className="text-xs text-gray-400 truncate">{m.preview}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] text-gray-400">{m.time}</span>
              {m.unread && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ===== Hospital Side =====
function HospitalAIFeed() {
  const [scoutedIds, setScoutedIds] = useState<Set<string>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const reasons = [
    (name: string, score: number) => `${name}先生は貴院の心臓外科求人に対し、専門性${score}%の一致度です。冠動脈バイパス術2,500件以上の実績は特に注目に値します。`,
    (name: string, score: number) => `${name}先生のカテーテル治療の豊富な経験が、貴院の循環器チームの即戦力として最適です（一致度${score}%）。`,
  ];

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-violet-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Building2 className="w-5 h-5" /> MedRecommend <span className="text-xs font-normal text-violet-200">for Hospital</span>
        </h1>
        <p className="text-xs text-violet-200 mt-0.5">最適な医師をレコメンド</p>
      </div>

      <div className="mx-4 mt-3 p-3 bg-violet-50 rounded-xl border border-violet-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-700 flex items-center justify-center flex-shrink-0">
            <Bell className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-violet-700">アラート</div>
            <div className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">心臓外科の求人に高マッチ度の医師が2名新規登録されました。早めのアプローチをお勧めします。</div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-3 space-y-3">
        {doctors.slice(0, 2).map((d, i) => {
          const scouted = scoutedIds.has(d.id);
          const saved = savedIds.has(d.id);
          return (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
            >
              <div className="flex items-center gap-2 px-4 pt-3">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-violet-500" />
                  <span className="text-[11px] font-semibold text-violet-600">推薦</span>
                </div>
                <span className="text-[11px] text-gray-400 ml-auto">{["30分前", "2時間前"][i]}</span>
              </div>

              <div className="mx-3 mt-2 p-2.5 bg-gray-50 rounded-lg border-l-2 border-violet-400">
                <p className="text-[11px] text-gray-600 leading-relaxed">{reasons[i](d.name, d.matchScore)}</p>
              </div>

              <div className="flex items-start gap-3 px-4 py-3">
                <InitialsAvatar initials={d.initials} variant="purple" size="lg" />
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-800">{d.name} 先生</h3>
                  <p className="text-[11px] text-gray-400">{d.specialty} ・ 経験{d.experience}年</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {d.skills.slice(0, 2).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">{s}</span>
                    ))}
                    {d.certifications.slice(0, 1).map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded text-[10px] font-medium bg-violet-50 text-violet-600">{c}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 pb-2">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-violet-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${d.matchScore}%` }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.1 + 0.2 }}
                  />
                </div>
                <span className="text-sm font-bold text-violet-600">{d.matchScore}%</span>
              </div>

              <div className="flex border-t border-gray-100">
                <button
                  onClick={() => setScoutedIds((prev) => { const n = new Set(prev); n.has(d.id) ? n.delete(d.id) : n.add(d.id); return n; })}
                  className={`flex-1 py-2.5 text-center text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${scouted ? "text-white bg-violet-600" : "text-violet-600"}`}
                >
                  {scouted ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                  {scouted ? "送信済み" : "スカウト"}
                </button>
                <button className="flex-1 py-2.5 text-center text-xs font-semibold text-gray-400 border-l border-gray-100 flex items-center justify-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> 詳細
                </button>
                <button
                  onClick={() => setSavedIds((prev) => { const n = new Set(prev); n.has(d.id) ? n.delete(d.id) : n.add(d.id); return n; })}
                  className={`flex-1 py-2.5 text-center text-xs font-semibold border-l border-gray-100 flex items-center justify-center gap-1 transition-colors ${saved ? "text-indigo-600" : "text-gray-400"}`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-current" : ""}`} />
                  {saved ? "保存済" : "保存"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function HospitalWizard() {
  const skillOptions = ["心臓外科専門医", "冠動脈バイパス術", "弁膜症手術", "MICS", "TAVI", "大動脈手術"];
  const expOptions = ["5年以上", "10年以上", "15年以上", "問わない"];
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["心臓外科専門医", "冠動脈バイパス術"]);
  const [selectedExp, setSelectedExp] = useState("10年以上");

  const toggleSkill = (s: string) => setSelectedSkills((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-violet-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <ClipboardList className="w-5 h-5" /> 募集要件設定
        </h1>
        <p className="text-xs text-violet-200 mt-0.5">対話形式で要件を定義</p>
      </div>

      <div className="px-4 py-4 space-y-2.5">
        <div className="max-w-[85%] p-3 bg-gray-100 rounded-xl rounded-bl-sm text-xs text-gray-700 leading-relaxed">
          どのような医師をお探しですか？まず<strong>診療科</strong>を教えてください。
        </div>
        <div className="max-w-[85%] ml-auto p-3 bg-violet-600 rounded-xl rounded-br-sm text-xs text-white leading-relaxed">
          心臓外科の常勤医師を探しています。
        </div>
        <div className="max-w-[85%] p-3 bg-gray-100 rounded-xl rounded-bl-sm text-xs text-gray-700 leading-relaxed">
          心臓外科ですね。具体的に求める<strong>スキル・資格</strong>はありますか？（複数選択可）
          <div className="flex flex-wrap gap-1.5 mt-2">
            {skillOptions.map((s) => (
              <motion.button
                key={s}
                whileTap={{ scale: 0.92 }}
                onClick={() => toggleSkill(s)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  selectedSkills.includes(s)
                    ? "bg-violet-600 text-white"
                    : "text-violet-600 border border-violet-300 bg-white"
                }`}
              >
                {s}
              </motion.button>
            ))}
          </div>
        </div>

        {selectedSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[85%] ml-auto p-3 bg-violet-600 rounded-xl rounded-br-sm text-xs text-white leading-relaxed"
          >
            {selectedSkills.join("、")}が必須です。
          </motion.div>
        )}

        <div className="max-w-[85%] p-3 bg-gray-100 rounded-xl rounded-bl-sm text-xs text-gray-700 leading-relaxed">
          承知しました。<strong>経験年数</strong>の目安はありますか？
          <div className="flex flex-wrap gap-1.5 mt-2">
            {expOptions.map((s) => (
              <motion.button
                key={s}
                whileTap={{ scale: 0.92 }}
                onClick={() => setSelectedExp(s)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  selectedExp === s
                    ? "bg-violet-600 text-white"
                    : "text-violet-600 border border-violet-300 bg-white"
                }`}
              >
                {s}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          key={`${selectedSkills.join()}-${selectedExp}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 bg-violet-50 rounded-xl border border-violet-200"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-700 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-violet-700">分析結果</div>
              <div className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">
                この条件に合致する候補者は現在<strong>{Math.max(2, selectedSkills.length * 3)}名</strong>登録されています。最も高いマッチ率は<strong>94%</strong>です。
              </div>
            </div>
          </div>
        </motion.div>

        <button className="w-full py-3 bg-violet-700 text-white rounded-xl font-semibold text-sm">
          この条件で候補者を表示
        </button>
      </div>
    </div>
  );
}

function HospitalKanban() {
  const stages = ["新規", "コンタクト", "面談", "オファー"];
  const [activeStage, setActiveStage] = useState(0);
  const candidates = [
    { name: "田中 太郎", detail: "心臓外科専門医 ・ マッチ率 94%", badge: "新規", stage: 0, initials: "田中" },
    { name: "山田 美咲", detail: "心臓外科 ・ マッチ率 83%", badge: "新規", stage: 0, initials: "山田" },
    { name: "高橋 健二", detail: "外科専門医 ・ マッチ率 79%", badge: "新規", stage: 0, initials: "高橋" },
    { name: "佐藤 花子", detail: "循環器内科専門医 ・ スカウト返信あり", badge: "コンタクト", stage: 1, initials: "佐藤" },
    { name: "中村 大輔", detail: "心臓外科 ・ 4/2 14:00 面談予定", badge: "面談", stage: 2, initials: "中村" },
  ];
  const stageCounts = stages.map((_, i) => candidates.filter((c) => c.stage === i).length);
  const filtered = candidates.filter((c) => c.stage === activeStage);
  const badgeColors = ["bg-indigo-50 text-indigo-600", "bg-emerald-50 text-emerald-600", "bg-amber-50 text-amber-600", "bg-orange-50 text-orange-600"];

  return (
    <div className="h-full bg-gray-50">
      <div className="bg-violet-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Users className="w-5 h-5" /> 候補者管理
        </h1>
        <p className="text-xs text-violet-200 mt-0.5">心臓外科 常勤医師 の候補者</p>
      </div>

      <div className="flex gap-1.5 px-4 py-3 overflow-x-auto">
        {stages.map((t, i) => (
          <motion.button
            key={t}
            whileTap={{ scale: 0.92 }}
            onClick={() => setActiveStage(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeStage === i ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            {t} ({stageCounts[i]})
          </motion.button>
        ))}
      </div>

      <div className="px-4 space-y-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            {filtered.length > 0 ? filtered.map((c) => (
              <div key={c.name} className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-200 flex items-center gap-3">
                <InitialsAvatar initials={c.initials} variant="purple" size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-800">{c.name}</div>
                  <div className="text-[11px] text-gray-400">{c.detail}</div>
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-semibold ${badgeColors[c.stage]}`}>{c.badge}</span>
              </div>
            )) : (
              <div className="text-center py-8 text-sm text-gray-400">このステージに候補者はいません</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function HospitalMsg() {
  return (
    <div className="h-full bg-gray-50">
      <div className="bg-violet-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <MessageCircle className="w-5 h-5" /> メッセージ
        </h1>
      </div>
      <div className="divide-y divide-gray-100">
        {hospitalMessages.map((m) => (
          <div key={m.id} className="flex items-center gap-3 px-4 py-3.5 bg-white">
            <InitialsAvatar initials={m.initials} variant="purple" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-800">{m.name}</div>
              <div className="text-xs text-gray-400 truncate">{m.preview}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] text-gray-400">{m.time}</span>
              {m.unread && <span className="w-2 h-2 rounded-full bg-violet-500" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== Main Export =====
export default function PlanCAiFeed() {
  const [doctorTab, setDoctorTab] = useState(0);
  const [hospitalTab, setHospitalTab] = useState(0);
  const [unreadNotifCount, setUnreadNotifCount] = useState(3);

  const handleDoctorTabSelect = (idx: number) => {
    setDoctorTab(idx);
    // Tab index 2 = 通知
    if (idx === 2) setUnreadNotifCount(0);
  };

  const notifTabIcon = (
    <div className="relative inline-flex">
      <Bell className="w-4.5 h-4.5" />
      {unreadNotifCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] px-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center leading-none">
          {unreadNotifCount}
        </span>
      )}
    </div>
  );

  const doctorTabs: { icon: ReactNode; label: string }[] = [
    { icon: <Lightbulb className="w-4.5 h-4.5" />, label: "フィード" },
    { icon: <Tag className="w-4.5 h-4.5" />, label: "スキル" },
    { icon: notifTabIcon, label: "通知" },
    { icon: <MessageCircle className="w-4.5 h-4.5" />, label: "メッセージ" },
  ];
  const hospitalTabs: { icon: ReactNode; label: string }[] = [
    { icon: <Sparkles className="w-4.5 h-4.5" />, label: "推薦" },
    { icon: <ClipboardList className="w-4.5 h-4.5" />, label: "要件設定" },
    { icon: <Users className="w-4.5 h-4.5" />, label: "候補者" },
    { icon: <MessageCircle className="w-4.5 h-4.5" />, label: "メッセージ" },
  ];

  const doctorScreens = [<DoctorAIFeed />, <DoctorSkillTags />, <DoctorNotifications />, <DoctorMsg />];
  const hospitalScreens = [<HospitalAIFeed />, <HospitalWizard />, <HospitalKanban />, <HospitalMsg />];

  return (
    <div className="flex flex-wrap justify-center gap-10">
      <div>
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-indigo-50 text-sm font-semibold text-indigo-700 border border-indigo-200">
            <User className="w-4 h-4" /> 医師側 UI
          </span>
        </div>
        <PhoneFrame label={doctorTabs[doctorTab].label}>
          <div className="relative h-full">
            {doctorScreens[doctorTab]}
            <TabBar tabs={doctorTabs} activeIndex={doctorTab} onSelect={handleDoctorTabSelect} accentColor="#4338ca" />
          </div>
        </PhoneFrame>
      </div>

      <div>
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-violet-50 text-sm font-semibold text-violet-700 border border-violet-200">
            <Building2 className="w-4 h-4" /> 病院側 UI
          </span>
        </div>
        <PhoneFrame label={hospitalTabs[hospitalTab].label}>
          <div className="relative h-full">
            {hospitalScreens[hospitalTab]}
            <TabBar tabs={hospitalTabs} activeIndex={hospitalTab} onSelect={setHospitalTab} accentColor="#7c3aed" />
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
