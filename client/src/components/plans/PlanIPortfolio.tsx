/**
 * Plan I: Portfolio / Case Gallery Style (MedPortfolio)
 * Design: Rose + Purple, Instagram-style case grid, achievement badges
 * No emoji, Lucide icons only
 */
import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneFrame from "../PhoneFrame";
import TabBar from "../TabBar";
import {
  hospitals, doctors, doctorMessages, hospitalMessages, type Doctor,
} from "@/lib/mockData";
import {
  MessageCircle, Building2, User, Award, Grid2x2,
  Scissors, FlaskConical, BookOpen, HeartPulse, Lock,
  Unlock, ChevronRight, ChevronLeft, Plus, Star, Microscope, GraduationCap,
  Clock, Calendar, CheckCircle2, Briefcase, Send, UserCheck, Users,
} from "lucide-react";

// ===== Animated count-up hook =====
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

// ===== Case card data =====
interface CaseItem {
  id: string;
  title: string;
  count: number;
  icon: ReactNode;
  color: string;
  bar: string;
  pct: number;
  description: string;
  highlights: string[];
  period: string;
}

const CASES: CaseItem[] = [
  {
    id: "c1",
    title: "冠動脈バイパス術",
    count: 2500,
    icon: <HeartPulse className="w-5 h-5" />,
    color: "bg-rose-50 text-rose-600 border-rose-200",
    bar: "bg-rose-500",
    pct: 100,
    description:
      "心臓の冠動脈が狭窄・閉塞した患者に対し、内胸動脈や伏在静脈を用いたバイパス術を施行。オフポンプ（心拍動下）を中心に、複雑多枝病変への対応実績も豊富。術後ICU管理・リハビリ連携まで一貫して担当。",
    highlights: ["オフポンプCABG 対応", "3枝以上の多枝病変", "緊急手術 対応", "術後ICU管理"],
    period: "経験期間: 15年",
  },
  {
    id: "c2",
    title: "弁膜症手術",
    count: 1200,
    icon: <Scissors className="w-5 h-5" />,
    color: "bg-pink-50 text-pink-600 border-pink-200",
    bar: "bg-pink-500",
    pct: 80,
    description:
      "大動脈弁狭窄症・僧帽弁閉鎖不全症を中心とした弁膜症手術を担当。弁形成術と弁置換術を症例ごとに適切に選択し、低侵襲アプローチ（MICS）との組み合わせによる早期回復も推進。",
    highlights: ["弁形成術 優先方針", "低侵襲アプローチ", "再手術 対応", "リウマチ性弁膜症"],
    period: "経験期間: 12年",
  },
  {
    id: "c3",
    title: "MICS",
    count: 320,
    icon: <Microscope className="w-5 h-5" />,
    color: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200",
    bar: "bg-fuchsia-500",
    pct: 45,
    description:
      "小切開心臓手術（Minimally Invasive Cardiac Surgery）として、胸骨正中切開を回避した術式を実施。入院期間の短縮・術後疼痛軽減・整容性向上を実現。ポートアクセス法によるAVR・MVrも経験。",
    highlights: ["ポートアクセス法", "AVR / MVr 対応", "術後在院日数 短縮", "審美的配慮"],
    period: "経験期間: 6年",
  },
  {
    id: "c4",
    title: "TAVI",
    count: 150,
    icon: <FlaskConical className="w-5 h-5" />,
    color: "bg-rose-50 text-rose-500 border-rose-200",
    bar: "bg-rose-400",
    pct: 30,
    description:
      "経カテーテル大動脈弁置換術（TAVI）において外科医として心臓チームに参加。経大腿アプローチを主体としつつ、大腿動脈アクセス困難例への代替アプローチも対応。ハートチームとしての意思決定に貢献。",
    highlights: ["ハートチーム参加", "経大腿アプローチ", "代替アクセス対応", "術後管理協働"],
    period: "経験期間: 4年",
  },
  {
    id: "c5",
    title: "大動脈手術",
    count: 280,
    icon: <HeartPulse className="w-5 h-5" />,
    color: "bg-red-50 text-red-500 border-red-200",
    bar: "bg-red-400",
    pct: 40,
    description:
      "急性大動脈解離（Stanford A型）の緊急手術から、胸部・腹部大動脈瘤の待機的手術まで幅広く対応。低体温循環停止・選択的脳分離体外循環を用いた弓部置換術の執刀実績を含む。",
    highlights: ["急性A型解離 緊急対応", "弓部置換術", "低体温循環停止", "ステントグラフト併用"],
    period: "経験期間: 10年",
  },
  {
    id: "c6",
    title: "論文執筆",
    count: 32,
    icon: <BookOpen className="w-5 h-5" />,
    color: "bg-orange-50 text-orange-500 border-orange-200",
    bar: "bg-orange-400",
    pct: 65,
    description:
      "査読付き英文論文32本（筆頭著者15本）を国際専門誌に掲載。冠動脈バイパス術の長期成績・MICS周術期管理・TAVI後の外科的介入に関する研究を中心とし、国際学会での口頭発表経験も多数。",
    highlights: ["英文論文 32本", "筆頭著者 15本", "国際学会 口頭発表", "研究グラント 獲得"],
    period: "経験期間: 15年",
  },
];

const BADGES = [
  { id: "b1", title: "手術1,000件", desc: "心臓手術累計1,000件達成", unlocked: true, icon: <Scissors className="w-5 h-5" /> },
  { id: "b2", title: "手術2,000件", desc: "心臓手術累計2,000件達成", unlocked: true, icon: <Scissors className="w-5 h-5" /> },
  { id: "b3", title: "論文20本", desc: "査読付き論文20本以上", unlocked: true, icon: <BookOpen className="w-5 h-5" /> },
  { id: "b4", title: "指導医認定", desc: "外科指導医として認定", unlocked: true, icon: <GraduationCap className="w-5 h-5" /> },
  { id: "b5", title: "手術3,000件", desc: "心臓手術累計3,000件達成", unlocked: false, icon: <Scissors className="w-5 h-5" /> },
  { id: "b6", title: "学会発表10回", desc: "国際学会での発表10回以上", unlocked: false, icon: <Star className="w-5 h-5" /> },
];

const HOSPITAL_CASES = [
  { title: "年間手術件数", value: "500件以上", sub: "心臓外科", color: "bg-purple-50 border-purple-200 text-purple-700" },
  { title: "ロボット手術", value: "導入済", sub: "最新設備", color: "bg-violet-50 border-violet-200 text-violet-700" },
  { title: "研究論文支援", value: "年間3本", sub: "執筆サポート", color: "bg-purple-50 border-purple-200 text-purple-700" },
  { title: "学会発表", value: "費用全額負担", sub: "国際・国内", color: "bg-violet-50 border-violet-200 text-violet-700" },
];

// ===== Role data with full details =====
interface Role {
  dept: string;
  type: string;
  salary: string;
  cases: string;
  highlight: boolean;
  description: string;
  skills: string[];
  schedule: string;
  onCall: string;
}

const ROLES: Role[] = [
  {
    dept: "心臓外科",
    type: "常勤",
    salary: "1,800万〜",
    cases: "バイパス術・弁膜症手術",
    highlight: true,
    description:
      "当院心臓外科では年間500件以上の手術を行っており、冠動脈バイパス術・弁膜症手術・大動脈手術など幅広い症例を担当していただきます。最新のハイブリッドORとロボット支援手術環境のもと、国内トップクラスの外科チームで活躍できる環境です。指導医として若手育成にも積極的に関与できます。",
    skills: ["心臓外科専門医", "外科専門医", "CABG 執刀経験", "弁膜症手術経験", "チーム医療"],
    schedule: "月〜金 8:00〜17:00（手術日は延長あり）",
    onCall: "月4〜6回（当直・日当直）",
  },
  {
    dept: "循環器内科",
    type: "常勤",
    salary: "1,500万〜",
    cases: "カテーテル治療・心エコー",
    highlight: false,
    description:
      "循環器内科では経皮的冠動脈インターベンション（PCI）・不整脈アブレーション・心不全管理など多岐にわたる診療を担当します。心臓外科チームと密に連携したハートチーム体制が整っており、複雑病変症例へのアプローチも経験できます。臨床研究・学会発表も積極的に支援します。",
    skills: ["循環器内科専門医", "PCI 経験", "心エコー 熟練", "不整脈 知識", "心不全管理"],
    schedule: "月〜金 8:30〜17:30",
    onCall: "月3〜5回",
  },
  {
    dept: "麻酔科",
    type: "非常勤",
    salary: "応相談",
    cases: "心臓麻酔・ICU管理",
    highlight: false,
    description:
      "心臓麻酔の専門家として、オープンハート手術・TAVIなどの高難度手術に携わっていただきます。非常勤のため週1〜3日からの勤務が可能で、ライフスタイルに合わせた柔軟な働き方を実現できます。ICU管理・術後管理においても麻酔科医としての専門性を活かした役割をお任せします。",
    skills: ["麻酔科専門医", "心臓麻酔 経験", "ICU管理", "体外循環 知識", "ペインマネジメント"],
    schedule: "週1〜3日（応相談）",
    onCall: "なし（応相談）",
  },
];

// ===== Doctor Side =====

function CaseDetailView({
  caseItem,
  onBack,
}: {
  caseItem: CaseItem;
  onBack: () => void;
}) {
  return (
    <motion.div
      key="case-detail"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute inset-0 bg-white flex flex-col z-10"
    >
      {/* Header — rose/pink gradient */}
      <div className="bg-gradient-to-r from-rose-600 to-pink-500 px-4 pt-4 pb-4 text-white flex items-center gap-3 flex-shrink-0">
        <button
          onClick={onBack}
          className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold leading-tight">{caseItem.title}</h2>
          <p className="text-[10px] text-rose-100 mt-0.5">{caseItem.period}</p>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto pb-16">
        {/* Count hero */}
        <div className={`mx-4 mt-4 rounded-xl p-4 border ${caseItem.color}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center">
              {caseItem.icon}
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800 leading-none">
                {caseItem.count.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">件の実績</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-gray-500 font-medium">専門領域内の割合</span>
              <span className="text-[10px] font-bold text-gray-700">{caseItem.pct}%</span>
            </div>
            <div className="h-2 bg-white/60 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${caseItem.bar} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${caseItem.pct}%` }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mx-4 mt-3 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            症例の概要
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">{caseItem.description}</p>
        </div>

        {/* Highlights */}
        <div className="mx-4 mt-3 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
            対応できる術式・特徴
          </h3>
          <ul className="space-y-2">
            {caseItem.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                <span className="text-xs text-gray-700 font-medium">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Period */}
        <div className="mx-4 mt-3 mb-4 bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm flex items-center gap-2">
          <Clock className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span className="text-xs text-gray-600 font-semibold">{caseItem.period}</span>
        </div>
      </div>
    </motion.div>
  );
}

// Sub-component so each stat cell can call useCountUp independently
function AnimatedStatCell({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const count = useCountUp(target);
  return (
    <div className="py-3 text-center border-r border-gray-100 last:border-0">
      <div className="text-lg font-bold text-gray-800">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[10px] text-gray-400">{label}</div>
    </div>
  );
}

// Total hand-surgery count = sum of all surgical CASES (exclude 論文執筆)
const TOTAL_SURGERY_COUNT = CASES.filter((c) => c.id !== "c6").reduce((acc, c) => acc + c.count, 0);

function DoctorCaseGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedCase = CASES.find((c) => c.id === selectedId) ?? null;

  return (
    <div className="h-full bg-white flex flex-col relative">
      {/* Grid view */}
      <div className="h-full flex flex-col">
        <div className="bg-rose-700 px-5 pt-4 pb-4 text-white flex-shrink-0">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Grid2x2 className="w-5 h-5" /> MedPortfolio
          </h1>
          <p className="text-xs text-rose-200 mt-0.5">田中 太郎 先生の症例ポートフォリオ</p>

          {/* Achievement row */}
          <div className="mt-3 flex items-center gap-3">
            {/* Instructor certification progress */}
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-rose-200 mb-1 leading-tight">指導医認定取得まで</div>
              <div className="h-1.5 bg-rose-900/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-rose-200 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
                />
              </div>
              <div className="text-[9px] text-rose-300 mt-0.5">60%</div>
            </div>

            {/* Monthly surgery counter */}
            <div className="flex-shrink-0 flex items-center gap-1.5 bg-teal-500/20 border border-teal-400/40 rounded-lg px-2.5 py-1.5">
              <Scissors className="w-3 h-3 text-teal-300 flex-shrink-0" />
              <div>
                <div className="text-[9px] text-teal-300 leading-tight">今月の手術件数</div>
                <div className="text-xs font-bold text-white leading-tight">12件</div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated stats row */}
        <div className="grid grid-cols-3 gap-0 border-b border-gray-100 flex-shrink-0">
          <AnimatedStatCell target={TOTAL_SURGERY_COUNT} suffix="" label="総手術件数" />
          <AnimatedStatCell target={15} suffix="年" label="経験年数" />
          <AnimatedStatCell target={32} suffix="" label="論文数" />
        </div>

        {/* Case Grid */}
        <div className="flex-1 overflow-y-auto pb-16">
          <div className="p-3 grid grid-cols-2 gap-2.5">
            {CASES.map((c, i) => (
              <motion.button
                key={c.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setSelectedId(c.id)}
                className={`rounded-xl p-3 border text-left transition-all ${c.color}`}
              >
                <div className="mb-2">{c.icon}</div>
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">{c.title}</div>
                <div className="text-xl font-bold text-gray-800 leading-none">
                  {c.count.toLocaleString()}
                </div>
                <div className="text-[9px] text-gray-400 mt-0.5">件</div>
                <div className="mt-2 h-1 bg-white/60 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${c.bar} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${c.pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.07 + 0.1 }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-end">
                  <span className="text-[9px] text-gray-400 flex items-center gap-0.5">
                    詳細 <ChevronRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="px-4 pb-4">
            <button className="w-full py-2.5 border border-dashed border-rose-300 rounded-xl text-xs font-medium text-rose-500 flex items-center justify-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> 症例を追加する
            </button>
          </div>
        </div>
      </div>

      {/* Case detail overlay with AnimatePresence */}
      <AnimatePresence>
        {selectedCase !== null && (
          <CaseDetailView
            caseItem={selectedCase}
            onBack={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function DoctorBadges() {
  const unlocked = BADGES.filter((b) => b.unlocked);
  const locked = BADGES.filter((b) => !b.unlocked);
  const nextBadge = locked[0] ?? null;

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-rose-700 px-5 pt-4 pb-8 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Award className="w-5 h-5" /> 実績バッジ
        </h1>
        <p className="text-xs text-rose-200 mt-0.5">{unlocked.length}/{BADGES.length} 解除済み</p>
      </div>

      {/* Progress bar + unlock count */}
      <div className="mx-4 -mt-4 bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-700">達成率</span>
          <span className="text-sm font-bold text-rose-600">{unlocked.length}/{BADGES.length}</span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-rose-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(unlocked.length / BADGES.length) * 100}%` }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
          />
        </div>
      </div>

      {/* 次のバッジまで */}
      {nextBadge && (
        <div className="mx-4 mb-3 bg-amber-50 rounded-xl p-3.5 border border-amber-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center flex-shrink-0">
            {nextBadge.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-0.5">次のバッジまで</div>
            <div className="text-xs font-bold text-gray-800 leading-tight">{nextBadge.title}</div>
            <div className="text-[9px] text-gray-500 mt-0.5 leading-tight">{nextBadge.desc}</div>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-400 flex-shrink-0" />
        </div>
      )}

      {/* Unlocked */}
      <div className="px-4 mb-3">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Unlock className="w-3.5 h-3.5" /> 解除済み
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {unlocked.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-3 border border-rose-200 shadow-sm text-center cursor-default"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                {b.icon}
              </div>
              <div className="text-xs font-bold text-gray-800 leading-tight">{b.title}</div>
              <div className="text-[9px] text-gray-400 mt-0.5 leading-tight">{b.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Locked */}
      <div className="px-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5" /> 未解除
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {locked.map((b) => (
            <motion.div
              key={b.id}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 rounded-xl p-3 border border-gray-200 text-center opacity-50 cursor-default"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">
                {b.icon}
              </div>
              <div className="text-xs font-bold text-gray-500 leading-tight">{b.title}</div>
              <div className="text-[9px] text-gray-400 mt-0.5 leading-tight">{b.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DoctorMsg() {
  return (
    <div className="h-full bg-white">
      <div className="bg-rose-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">メッセージ</h1>
      </div>
      <div className="divide-y divide-gray-100">
        {doctorMessages.map((m) => (
          <div key={m.id} className="flex items-center gap-3 px-5 py-3.5">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
              {m.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-800">{m.name}</div>
              <div className="text-xs text-gray-400 truncate">{m.preview}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] text-gray-400">{m.time}</span>
              {m.unread && <span className="w-2 h-2 rounded-full bg-rose-500" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== Hospital Side =====

type HospitalCategory = "専門外科" | "研究機関" | "地域病院" | null;

const HOSPITAL_CATEGORY_MAP: Record<string, NonNullable<HospitalCategory>> = {
  h1: "専門外科",
  h2: "研究機関",
  h3: "研究機関",
  h4: "地域病院",
};

function HospitalShowcase() {
  const [activeFilter, setActiveFilter] = useState<HospitalCategory>(null);
  const [sortByMatch, setSortByMatch] = useState(false);

  const categories: NonNullable<HospitalCategory>[] = ["専門外科", "研究機関", "地域病院"];

  const filteredHospitals = hospitals
    .filter((h) => activeFilter === null || HOSPITAL_CATEGORY_MAP[h.id] === activeFilter)
    .slice()
    .sort((a, b) => sortByMatch ? b.matchScore - a.matchScore : 0);

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-purple-700 px-5 pt-4 pb-8 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Building2 className="w-5 h-5" /> MedPortfolio
          <span className="text-xs font-normal text-purple-300">for Hospital</span>
        </h1>
        <p className="text-xs text-purple-300 mt-0.5">東京中央総合病院 の紹介</p>
      </div>

      {/* Hero stats */}
      <div className="mx-4 -mt-5 bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-3">
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { v: "500+", l: "年間手術件数" },
            { v: "98%", l: "患者満足度" },
            { v: "30+", l: "専門医師数" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-xl font-bold text-purple-700">{s.v}</div>
              <div className="text-[9px] text-gray-400 leading-tight mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter / Sort row */}
      <div className="mx-4 mb-3 flex items-center gap-1.5 flex-wrap">
        <button
          onClick={() => setActiveFilter(null)}
          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-colors ${
            activeFilter === null
              ? "bg-purple-700 text-white border-purple-700"
              : "bg-white text-gray-500 border-gray-200"
          }`}
        >
          すべて
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(activeFilter === cat ? null : cat)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-colors ${
              activeFilter === cat
                ? "bg-purple-700 text-white border-purple-700"
                : "bg-white text-gray-500 border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
        <button
          onClick={() => setSortByMatch((v) => !v)}
          className={`ml-auto px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-colors flex items-center gap-1 ${
            sortByMatch
              ? "bg-violet-600 text-white border-violet-600"
              : "bg-white text-gray-500 border-gray-200"
          }`}
        >
          <Star className="w-3 h-3" /> マッチ度順
        </button>
      </div>

      {/* Hospital cards — staggered animated */}
      <div className="mx-4 mb-3 space-y-2.5">
        <AnimatePresence mode="popLayout">
          {filteredHospitals.map((h, i) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, delay: i * 0.07, ease: "easeOut" }}
              className="bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {h.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-gray-800 leading-tight">{h.name}</div>
                  <div className="text-[10px] text-gray-400">{h.department} · {h.location}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold text-purple-700">{h.matchScore}%</div>
                  <div className="text-[9px] text-gray-400">マッチ度</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {h.features.map((f) => (
                  <span key={f} className="px-2 py-0.5 rounded text-[10px] bg-purple-50 text-purple-600 border border-purple-200">
                    {f}
                  </span>
                ))}
                {HOSPITAL_CATEGORY_MAP[h.id] && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-violet-100 text-violet-600 border border-violet-200 font-semibold">
                    {HOSPITAL_CATEGORY_MAP[h.id]}
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700">{h.salary}</span>
                <span className="text-[10px] text-gray-400">{h.type}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredHospitals.length === 0 && (
          <div className="py-8 text-center text-xs text-gray-400">該当する病院がありません</div>
        )}
      </div>

      {/* What you can do here */}
      <div className="mx-4 mb-3">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          この病院で積める経験
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {HOSPITAL_CASES.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-xl p-3 border ${c.color}`}
            >
              <div className="text-[10px] font-medium opacity-70 mb-0.5">{c.sub}</div>
              <div className="text-xs font-bold">{c.title}</div>
              <div className="text-sm font-bold mt-1">{c.value}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mx-4 bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm mb-3">
        <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">施設・設備</h3>
        <div className="flex flex-wrap gap-1.5">
          {["最新手術室 6室", "ハイブリッドOR", "ICU 30床", "研究棟完備", "国際認定取得"].map((f) => (
            <span key={f} className="px-2.5 py-1 rounded text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-200">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mx-4 bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">在籍チーム</h3>
        <div className="space-y-2">
          {doctors.slice(0, 2).map((d) => (
            <div key={d.id} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {d.initials}
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-800">{d.name}</div>
                <div className="text-[10px] text-gray-400">{d.specialty}</div>
              </div>
            </div>
          ))}
          <button className="text-[11px] text-purple-600 font-semibold flex items-center gap-0.5">
            全スタッフを見る <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

type ApplyStep = "idle" | "form" | "success";

const JOIN_OPTIONS = ["3ヶ月以内", "半年以内", "1年以内", "要相談"] as const;

function ApplicationFormOverlay({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [motivation, setMotivation] = useState("");
  const [joinTime, setJoinTime] = useState<string>("");
  const [hasReferral, setHasReferral] = useState<boolean | null>(null);
  const [pr, setPr] = useState("");

  const canSubmit = motivation.trim().length > 0 && joinTime !== "" && hasReferral !== null;

  return (
    <motion.div
      key="app-form"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      className="absolute inset-0 z-30 bg-white flex flex-col"
    >
      {/* Handle + header */}
      <div className="flex-shrink-0 px-4 pt-3 pb-3 border-b border-gray-100">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-800">応募フォーム</h2>
          <button
            onClick={onCancel}
            className="text-xs text-gray-400 font-medium hover:text-gray-600"
          >
            キャンセル
          </button>
        </div>
      </div>

      {/* Scrollable fields */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* 志望動機 */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-gray-600">志望動機 <span className="text-rose-500">*</span></label>
            <span className="text-[10px] text-gray-400">{motivation.length}/300</span>
          </div>
          <textarea
            value={motivation}
            onChange={(e) => setMotivation(e.target.value.slice(0, 300))}
            placeholder="この求人に応募する理由をお書きください..."
            rows={4}
            className="w-full text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-purple-400 focus:bg-white transition-colors placeholder-gray-300"
          />
        </div>

        {/* 希望入職時期 */}
        <div>
          <label className="text-xs font-bold text-gray-600 block mb-1.5">希望入職時期 <span className="text-rose-500">*</span></label>
          <div className="flex flex-wrap gap-1.5">
            {JOIN_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setJoinTime(opt)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-colors ${
                  joinTime === opt
                    ? "bg-purple-700 text-white border-purple-700"
                    : "bg-white text-gray-500 border-gray-200 hover:border-purple-300"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 紹介状 */}
        <div>
          <label className="text-xs font-bold text-gray-600 block mb-1.5">紹介状 <span className="text-rose-500">*</span></label>
          <div className="flex gap-2">
            {(["あり", "なし"] as const).map((val) => {
              const isSelected = val === "あり" ? hasReferral === true : hasReferral === false;
              return (
                <button
                  key={val}
                  onClick={() => setHasReferral(val === "あり")}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                    isSelected
                      ? "bg-purple-700 text-white border-purple-700"
                      : "bg-white text-gray-500 border-gray-200 hover:border-purple-300"
                  }`}
                >
                  {val}
                </button>
              );
            })}
          </div>
        </div>

        {/* PR */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-gray-600">自己PR</label>
            <span className="text-[10px] text-gray-400">{pr.length}/200</span>
          </div>
          <textarea
            value={pr}
            onChange={(e) => setPr(e.target.value.slice(0, 200))}
            placeholder="あなたの強みや実績を自由にお書きください..."
            rows={3}
            className="w-full text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-purple-400 focus:bg-white transition-colors placeholder-gray-300"
          />
        </div>
      </div>

      {/* Confirm button */}
      <div className="flex-shrink-0 px-4 pb-5 pt-3 border-t border-gray-100">
        <button
          onClick={onConfirm}
          disabled={!canSubmit}
          className={`w-full py-3 rounded-xl text-sm font-bold transition-opacity ${
            canSubmit
              ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white opacity-100"
              : "bg-gradient-to-r from-rose-500 to-pink-500 text-white opacity-40 cursor-not-allowed"
          }`}
        >
          応募を確定する
        </button>
      </div>
    </motion.div>
  );
}

function RoleDetailView({
  role,
  onBack,
}: {
  role: Role;
  onBack: () => void;
}) {
  const [applyStep, setApplyStep] = useState<ApplyStep>("idle");

  return (
    <motion.div
      key="role-detail"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="absolute inset-0 bg-gray-50 flex flex-col z-10"
    >
      {/* Header */}
      <div className="bg-purple-700 px-4 pt-4 pb-4 text-white flex items-center gap-3 flex-shrink-0">
        <button
          onClick={onBack}
          className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold leading-tight">{role.dept}</h2>
          <p className="text-[10px] text-purple-300 mt-0.5">募集ポジション詳細</p>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
          role.type === "常勤" ? "bg-white/20 text-white" : "bg-white/10 text-purple-200"
        }`}>
          {role.type}
        </span>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Salary hero */}
        <div className="mx-4 mt-4 bg-white rounded-xl p-4 border border-purple-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-gray-400 mb-0.5">年収目安</div>
              <div className="text-2xl font-bold text-purple-700">{role.salary}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mx-4 mt-3 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            業務内容
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">{role.description}</p>
        </div>

        {/* Required skills */}
        <div className="mx-4 mt-3 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
            必要なスキル・資格
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {role.skills.map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="mx-4 mt-3 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
            勤務条件
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] text-gray-400 font-medium">勤務時間</div>
                <div className="text-xs text-gray-700 font-semibold mt-0.5">{role.schedule}</div>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] text-gray-400 font-medium">当直・オンコール</div>
                <div className="text-xs text-gray-700 font-semibold mt-0.5">{role.onCall}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cases */}
        <div className="mx-4 mt-3 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
            担当できる症例
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {role.cases.split("・").map((c) => (
              <span key={c} className="px-2.5 py-1 rounded text-[11px] bg-purple-50 text-purple-600 border border-purple-200">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Apply button — fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-3 bg-gray-50 border-t border-gray-200">
        <AnimatePresence mode="wait">
          {applyStep === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="w-full py-3 rounded-xl bg-green-500 text-white text-sm font-bold flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              応募完了
            </motion.div>
          ) : (
            <motion.button
              key="apply"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={() => setApplyStep("form")}
              className="w-full py-3 rounded-xl bg-purple-700 text-white text-sm font-bold"
            >
              応募する
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Application form overlay */}
      <AnimatePresence>
        {applyStep === "form" && (
          <ApplicationFormOverlay
            onConfirm={() => setApplyStep("success")}
            onCancel={() => setApplyStep("idle")}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function HospitalOpenRoles() {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const selectedRole = ROLES.find((r) => r.dept === selectedDept) ?? null;

  return (
    <div className="h-full bg-gray-50 relative">
      {/* List view */}
      <div className="h-full flex flex-col">
        <div className="bg-purple-700 px-5 pt-4 pb-4 text-white flex-shrink-0">
          <h1 className="text-lg font-bold">募集ポジション</h1>
          <p className="text-xs text-purple-300 mt-0.5">積める経験を詳しく紹介</p>
        </div>

        <div className="flex-1 overflow-y-auto pb-16">
          <div className="px-4 py-3 space-y-3">
            {ROLES.map((r, i) => (
              <motion.div
                key={r.dept}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white rounded-xl p-4 border shadow-sm ${
                  r.highlight ? "border-purple-300 ring-1 ring-purple-200" : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-sm text-gray-800">{r.dept}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold mt-1 inline-block ${
                      r.type === "常勤" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {r.type}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-purple-700">{r.salary}</div>
                    <div className="text-[10px] text-gray-400">年収目安</div>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-gray-100">
                  <div className="text-[10px] font-bold text-gray-400 mb-1.5">担当できる症例</div>
                  <div className="flex flex-wrap gap-1">
                    {r.cases.split("・").map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded text-[10px] bg-purple-50 text-purple-600 border border-purple-200">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedDept(r.dept)}
                  className="w-full mt-3 py-2 rounded-lg text-xs font-semibold bg-purple-700 text-white flex items-center justify-center gap-1"
                >
                  詳細を見る <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Role detail overlay with AnimatePresence */}
      <AnimatePresence>
        {selectedRole !== null && (
          <RoleDetailView
            role={selectedRole}
            onBack={() => setSelectedDept(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function HospitalMsg() {
  return (
    <div className="h-full bg-white">
      <div className="bg-purple-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">メッセージ</h1>
      </div>
      <div className="divide-y divide-gray-100">
        {hospitalMessages.map((m) => (
          <div key={m.id} className="flex items-center gap-3 px-5 py-3.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
              {m.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-800">{m.name}</div>
              <div className="text-xs text-gray-400 truncate">{m.preview}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] text-gray-400">{m.time}</span>
              {m.unread && <span className="w-2 h-2 rounded-full bg-purple-500" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== Hospital Candidate List =====

function DoctorDetailView({
  doctor,
  onBack,
}: {
  doctor: Doctor;
  onBack: () => void;
}) {
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  function fireToast(msg: string) {
    setToastMsg(msg);
    setToast(true);
    setTimeout(() => setToast(false), 1500);
  }

  return (
    <motion.div
      key="doctor-detail"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute inset-0 bg-gray-50 flex flex-col z-10"
    >
      {/* Header — purple gradient */}
      <div className="bg-gradient-to-r from-purple-700 to-violet-500 px-4 pt-4 pb-4 text-white flex items-center gap-3 flex-shrink-0">
        <button
          onClick={onBack}
          className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold leading-tight">{doctor.name} 先生</h2>
          <p className="text-[10px] text-purple-200 mt-0.5">{doctor.specialty}</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-xs font-bold">
          {doctor.initials}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Stats grid */}
        <div className="mx-4 mt-4 grid grid-cols-3 gap-2">
          {[
            { label: "手術件数", value: doctor.surgeries.toLocaleString() + "件" },
            { label: "論文数", value: doctor.papers + "本" },
            { label: "経験年数", value: doctor.experience + "年" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl p-3 border border-purple-100 shadow-sm text-center"
            >
              <div className="text-lg font-bold text-purple-700 leading-none">{s.value}</div>
              <div className="text-[9px] text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mx-4 mt-3 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
            スキル
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {doctor.skills.map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mx-4 mt-3 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
            資格・認定
          </h3>
          <ul className="space-y-2">
            {doctor.certifications.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                <span className="text-xs text-gray-700 font-medium">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Status */}
        <div className="mx-4 mt-3 bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm flex items-center gap-2">
          <User className="w-4 h-4 text-purple-400 flex-shrink-0" />
          <span className="text-xs text-gray-600 font-semibold">{doctor.status}</span>
        </div>
      </div>

      {/* Action buttons — fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-3 bg-gray-50 border-t border-gray-200 flex gap-2">
        <button
          onClick={() => fireToast("スカウト送信完了！")}
          className="flex-1 py-3 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" /> スカウト送信
        </button>
        <button
          onClick={() => fireToast("面接オファー送信完了！")}
          className="flex-1 py-3 rounded-xl bg-purple-700 text-white text-xs font-bold flex items-center justify-center gap-1.5"
        >
          <UserCheck className="w-3.5 h-3.5" /> 面接オファー
        </button>
      </div>

      {/* Toast overlay */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.22 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-2xl bg-gray-800 text-white text-xs font-bold shadow-lg flex items-center gap-2 whitespace-nowrap"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function HospitalCandidateList() {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId) ?? null;

  return (
    <div className="h-full bg-gray-50 relative">
      <div className="h-full flex flex-col">
        <div className="bg-gradient-to-r from-purple-700 to-violet-500 px-5 pt-4 pb-4 text-white flex-shrink-0">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Users className="w-5 h-5" /> 候補ドクター
          </h1>
          <p className="text-xs text-purple-200 mt-0.5">スカウト候補の医師一覧</p>
        </div>

        <div className="flex-1 overflow-y-auto pb-16">
          <div className="px-4 py-3 space-y-3">
            {doctors.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {d.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-gray-800">{d.name} 先生</div>
                    <div className="text-[10px] text-gray-400">{d.specialty}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-purple-700">{d.matchScore}%</div>
                    <div className="text-[9px] text-gray-400">マッチ度</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {d.skills.slice(0, 3).map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded text-[10px] bg-purple-50 text-purple-600 border border-purple-200">
                      {s}
                    </span>
                  ))}
                  {d.skills.length > 3 && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-gray-100 text-gray-500 border border-gray-200">
                      +{d.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedDoctorId(d.id)}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold bg-purple-700 text-white flex items-center justify-center gap-1"
                  >
                    詳細を見る <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedDoctor !== null && (
          <DoctorDetailView
            doctor={selectedDoctor}
            onBack={() => setSelectedDoctorId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ===== Main Export =====
export default function PlanIPortfolio() {
  const [doctorTab, setDoctorTab] = useState(0);
  const [hospitalTab, setHospitalTab] = useState(0);

  const doctorTabs: { icon: ReactNode; label: string }[] = [
    { icon: <Grid2x2 className="w-4.5 h-4.5" />, label: "症例集" },
    { icon: <Award className="w-4.5 h-4.5" />, label: "バッジ" },
    { icon: <MessageCircle className="w-4.5 h-4.5" />, label: "メッセージ" },
  ];
  const hospitalTabs: { icon: ReactNode; label: string }[] = [
    { icon: <Building2 className="w-4.5 h-4.5" />, label: "病院紹介" },
    { icon: <BookOpen className="w-4.5 h-4.5" />, label: "募集ポジション" },
    { icon: <Users className="w-4.5 h-4.5" />, label: "候補一覧" },
    { icon: <MessageCircle className="w-4.5 h-4.5" />, label: "メッセージ" },
  ];

  const doctorScreens = [<DoctorCaseGrid />, <DoctorBadges />, <DoctorMsg />];
  const hospitalScreens = [<HospitalShowcase />, <HospitalOpenRoles />, <HospitalCandidateList />, <HospitalMsg />];

  return (
    <div className="flex flex-wrap justify-center gap-10">
      <div>
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-rose-50 text-sm font-semibold text-rose-700 border border-rose-200">
            <User className="w-4 h-4" /> 医師側 UI
          </span>
        </div>
        <PhoneFrame label={doctorTabs[doctorTab].label}>
          <div className="relative h-full">
            {doctorScreens[doctorTab]}
            <TabBar tabs={doctorTabs} activeIndex={doctorTab} onSelect={setDoctorTab} accentColor="#be123c" />
          </div>
        </PhoneFrame>
      </div>

      <div>
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-purple-50 text-sm font-semibold text-purple-700 border border-purple-200">
            <Building2 className="w-4 h-4" /> 病院側 UI
          </span>
        </div>
        <PhoneFrame label={hospitalTabs[hospitalTab].label}>
          <div className="relative h-full">
            {hospitalScreens[hospitalTab]}
            <TabBar tabs={hospitalTabs} activeIndex={hospitalTab} onSelect={setHospitalTab} accentColor="#7e22ce" />
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
