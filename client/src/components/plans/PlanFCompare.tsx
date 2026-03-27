/**
 * Plan F: Compare / Decision Support Style (MedCompare)
 * Design: Sky + Amber, radar chart, side-by-side comparison table
 * No emoji, Lucide icons only
 */
import { useState, type ReactNode } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import PhoneFrame from "../PhoneFrame";
import TabBar from "../TabBar";
import {
  hospitals, doctors, doctorMessages, hospitalMessages, skillRadarData,
} from "@/lib/mockData";
import {
  GitCompare, MessageCircle, Building2, User,
  CheckCircle2, Circle, SlidersHorizontal, Users, Star, BarChart3,
  Send, FileText, ChevronLeft, X, GitMerge,
} from "lucide-react";

const radarChartData = skillRadarData.labels.map((label, i) => ({
  subject: label,
  doctor: skillRadarData.datasets[0].data[i],
  req: skillRadarData.datasets[1].data[i],
}));

// ===== Chat Thread Data =====

type ChatMsg = { id: string; from: "doctor" | "hospital"; text: string; time: string };

const DOCTOR_CHAT_THREADS: Record<string, ChatMsg[]> = {
  m1: [
    { id: "c1", from: "hospital", text: "田中先生のご経歴を拝見し、当院の心臓外科チームにぜひご参加いただきたいと思いご連絡しました。", time: "10:00" },
    { id: "c2", from: "doctor", text: "ありがとうございます。MedCompareで御院の条件を確認しました。マッチ度も高く、興味を持っています。", time: "10:12" },
    { id: "c3", from: "hospital", text: "ありがとうございます。一度オンライン面談をお願いできますか？スケジュールはご都合に合わせます。", time: "10:15" },
    { id: "c4", from: "doctor", text: "はい、来週の火曜か木曜の午後であれば可能です。", time: "10:20" },
    { id: "c5", from: "hospital", text: "では木曜日14時はいかがでしょうか。Zoomリンクをメールにてお送りします。", time: "10:22" },
  ],
  m2: [
    { id: "c1", from: "hospital", text: "先生の比較検討状況はいかがでしょうか。当院への志望度を教えていただけますか。", time: "昨日 9:30" },
    { id: "c2", from: "doctor", text: "現在3施設を比較中です。御院は研究環境の面で魅力的です。", time: "昨日 10:00" },
    { id: "c3", from: "hospital", text: "研究費は年間200万円まで支援可能です。論文実績への加算手当もございます。", time: "昨日 10:30" },
  ],
  m3: [
    { id: "c1", from: "hospital", text: "スキルチャート分析の結果、先生は当院の求める要件に92%マッチしています。", time: "3/25 13:00" },
    { id: "c2", from: "doctor", text: "詳細な分析をありがとうございます。具体的にどのスキルが評価されましたか？", time: "3/25 13:20" },
  ],
};

const HOSPITAL_CHAT_THREADS: Record<string, ChatMsg[]> = {
  hm1: [
    { id: "c1", from: "doctor", text: "ご連絡ありがとうございます。御院の求人内容について確認させてください。", time: "9:00" },
    { id: "c2", from: "hospital", text: "もちろんです。何でもお気軽にご質問ください。", time: "9:05" },
    { id: "c3", from: "doctor", text: "MedCompareのレーダーチャートで御院の適合度が最も高かったです。オファーをいただけますか？", time: "9:10" },
    { id: "c4", from: "hospital", text: "ありがとうございます！正式なオファーレターを本日中にお送りします。", time: "9:15" },
  ],
  hm2: [
    { id: "c1", from: "doctor", text: "先日の面接では大変お世話になりました。入職後の研修体制を教えていただけますか？", time: "14:00" },
    { id: "c2", from: "hospital", text: "3ヶ月の研修期間を設けており、メンター医師がフルサポートします。", time: "14:20" },
  ],
  hm3: [
    { id: "c1", from: "doctor", text: "条件交渉について相談させてください。", time: "昨日 16:00" },
    { id: "c2", from: "hospital", text: "承知しました。どのような点でご検討中でしょうか？", time: "昨日 16:30" },
    { id: "c3", from: "doctor", text: "年収とオンコール体制について調整いただければ幸いです。", time: "昨日 17:00" },
  ],
};

// ===== Shared ChatThread Component =====

function ChatThread({
  thread: initialThread,
  name,
  initials,
  onBack,
  accentColor,
}: {
  thread: ChatMsg[];
  name: string;
  initials: string;
  onBack: () => void;
  accentColor: "sky" | "amber";
}) {
  const [messages, setMessages] = useState<ChatMsg[]>(initialThread);
  const [inputText, setInputText] = useState("");

  const headerBg = accentColor === "sky" ? "bg-sky-700" : "bg-amber-600";
  const doctorBubble = accentColor === "sky" ? "bg-sky-600 text-white" : "bg-amber-600 text-white";
  const avatarVariant = accentColor === "sky" ? "sky" as const : "amber" as const;

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages((prev) =>
      Array.from(prev).concat([{ id: `local-${Date.now()}`, from: "doctor", text, time }])
    );
    setInputText("");
  };

  return (
    <motion.div
      className="absolute inset-0 z-20 bg-white flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className={`${headerBg} px-4 pt-4 pb-3 text-white flex items-center gap-3 flex-shrink-0`}>
        <button onClick={onBack} className="p-1 -ml-1 rounded-lg hover:bg-white/10 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <Avatar initials={initials} size="sm" variant={avatarVariant} />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm leading-tight truncate">{name}</div>
          <div className="text-[11px] opacity-75">交渉中</div>
        </div>
      </div>

      {/* Message area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 bg-gray-50">
        {messages.map((msg, i) => {
          const isDoctor = msg.from === "doctor";
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.2 }}
              className={`flex flex-col ${isDoctor ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[78%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                  isDoctor
                    ? `${doctorBubble} rounded-br-sm`
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-0.5 px-1">{msg.time}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex-shrink-0 px-3 py-2.5 border-t border-gray-100 bg-white flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
          placeholder="メッセージを入力..."
          className="flex-1 text-xs px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-300 placeholder-gray-400"
        />
        <button
          onClick={handleSend}
          disabled={!inputText.trim()}
          className={`p-2 rounded-xl transition-colors ${
            inputText.trim()
              ? `${accentColor === "sky" ? "bg-sky-600" : "bg-amber-600"} text-white`
              : "bg-gray-100 text-gray-300"
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function Avatar({
  initials, size = "md", variant = "sky",
}: { initials: string; size?: "sm" | "md" | "lg"; variant?: "sky" | "amber" | "gray" }) {
  const sizes = { sm: "w-9 h-9 text-xs", md: "w-11 h-11 text-sm", lg: "w-14 h-14 text-lg" };
  const variants = {
    sky: "bg-sky-100 text-sky-700",
    amber: "bg-amber-100 text-amber-700",
    gray: "bg-gray-100 text-gray-600",
  };
  return (
    <div className={`${sizes[size]} ${variants[variant]} rounded-xl flex items-center justify-center font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

// ===== Doctor Side =====

interface DoctorCompareListProps {
  onCompare: () => void;
  selectedIds: string[];
  onToggle: (id: string) => void;
}

function DoctorCompareList({ onCompare, selectedIds, onToggle }: DoctorCompareListProps) {
  const selected = selectedIds;

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="bg-sky-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <GitCompare className="w-5 h-5" /> MedCompare
        </h1>
        <p className="text-xs text-sky-200 mt-0.5">気になる病院を選んで並べて比較（最大3件）</p>
      </div>

      <div className="flex-1 px-4 py-3 space-y-2.5 overflow-y-auto">
        {hospitals.map((h) => {
          const sel = selected.includes(h.id);
          return (
            <motion.button
              key={h.id}
              onClick={() => onToggle(h.id)}
              whileTap={{ scale: 0.98 }}
              className={`w-full rounded-xl p-3.5 border text-left transition-all ${
                sel
                  ? "border-sky-400 bg-sky-50 ring-1 ring-sky-200"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={sel ? "text-sky-600" : "text-gray-300"}>
                  {sel ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                </span>
                <Avatar initials={h.initials} size="sm" variant={sel ? "sky" : "gray"} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-800 truncate">{h.name}</div>
                  <div className="text-[11px] text-gray-400">{h.department} ・ {h.salary}</div>
                  <div className="h-1 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                    <motion.div
                      className="h-full bg-sky-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: sel ? `${h.matchScore}%` : "0%" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <span className={`text-base font-bold flex-shrink-0 ${sel ? "text-sky-600" : "text-gray-300"}`}>
                  {h.matchScore}%
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="px-4 pb-[72px] pt-2 bg-white border-t border-gray-100">
        <div className="text-[11px] text-gray-400 text-center mb-2">{selected.length} 件選択中</div>
        <button
          disabled={selected.length < 2}
          onClick={onCompare}
          className="w-full py-3 bg-sky-700 text-white rounded-xl font-semibold text-sm disabled:opacity-40"
        >
          {selected.length} 件を比較する
        </button>
      </div>
    </div>
  );
}

function DoctorCompareView({ selectedIds }: { selectedIds: string[] }) {
  const selected = hospitals.filter((h) => selectedIds.includes(h.id));
  const h1 = selected[0] ?? hospitals[0];
  const [interested, setInterested] = useState(false);

  const is3 = selected.length >= 3;
  const colClass = is3 ? "grid-cols-[70px_1fr_1fr_1fr]" : "grid-cols-[80px_1fr_1fr]";

  const dynamicRows = [
    {
      label: "マッチ度",
      values: selected.map((h) => `${h.matchScore}%`),
      bestIdx: selected.reduce((maxIdx, h, i, arr) => h.matchScore > arr[maxIdx].matchScore ? i : maxIdx, 0),
    },
    {
      label: "年収",
      values: selected.map((h) => h.salary.replace("年収", "")),
      bestIdx: 0,
    },
    {
      label: "病床数",
      values: selected.map((h) => `${h.beds}床`),
      bestIdx: selected.reduce((maxIdx, h, i, arr) => h.beds > arr[maxIdx].beds ? i : maxIdx, 0),
    },
    {
      label: "勤務地",
      values: selected.map((h) => h.location),
      bestIdx: -1,
    },
    {
      label: "診療科",
      values: selected.map((h) => h.department),
      bestIdx: -1,
    },
  ];

  const winner = selected.reduce((best, h) => h.matchScore > best.matchScore ? h : best, selected[0] ?? hospitals[0]);

  const headerSubtitle = is3
    ? selected.map((h) => h.name.slice(0, 4) + "…").join(" / ")
    : `${h1.name.slice(0, 5)}… vs ${(selected[1] ?? hospitals[2]).name.slice(0, 5)}…`;

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-sky-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">比較表</h1>
        <p className="text-xs text-sky-200 mt-0.5">{headerSubtitle}</p>
      </div>

      {/* Radar Chart */}
      <div className="mx-4 mt-3 bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">スキル適合度チャート</div>
        <ResponsiveContainer width="100%" height={155}>
          <RadarChart data={radarChartData} margin={{ top: 4, right: 18, bottom: 4, left: 18 }}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8, fill: "#9ca3af" }} />
            <Radar dataKey="doctor" stroke="#0284c7" fill="#0284c7" fillOpacity={0.35} name="田中先生" />
            <Radar dataKey="req" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} name="求人要件" />
          </RadarChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-5 mt-0.5">
          <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <span className="w-3 h-1 bg-sky-600 rounded-full inline-block" />田中先生
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <span className="w-3 h-1 bg-amber-400 rounded-full inline-block" />
            {selected.length > 0 ? selected.map((h) => h.name.slice(0, 4)).join("・") + " 求人要件" : "求人要件"}
          </span>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mx-4 mt-3 bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        {/* Header row */}
        <div className={`grid ${colClass} bg-gray-50 border-b border-gray-100`}>
          <div className="px-3 py-2.5" />
          {selected.map((h) => (
            <div key={h.id} className="px-2 py-2.5 text-center text-[10px] font-bold text-sky-700 leading-tight">
              {h.name.slice(0, is3 ? 4 : 6)}…
            </div>
          ))}
        </div>
        {/* Data rows */}
        {dynamicRows.map((row, i) => (
          <div
            key={i}
            className={`grid ${colClass} border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}
          >
            <div className="px-3 py-2.5 text-[10px] text-gray-400 font-medium self-center">{row.label}</div>
            {row.values.map((val, ci) => {
              const isBest = row.bestIdx === ci;
              return (
                <div key={ci} className="px-2 py-2.5 text-center">
                  <span className={`text-[11px] font-semibold ${isBest ? "text-sky-600" : "text-gray-600"}`}>
                    {isBest && <Star className="w-2.5 h-2.5 inline mr-0.5 text-amber-400 fill-amber-400" />}
                    {val}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Winner badge */}
      <motion.div
        className="mx-4 mt-3 bg-gradient-to-r from-sky-50 to-amber-50 rounded-xl p-3.5 border border-amber-200 shadow-sm flex items-center gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
          <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
        </div>
        <div>
          <div className="text-[9px] font-bold text-amber-600 uppercase tracking-wide">総合スコア No.1</div>
          <div className="text-sm font-bold text-gray-800 leading-tight mt-0.5">
            おすすめ: {winner.name}
          </div>
          <div className="text-[10px] text-gray-500">マッチ度 {winner.matchScore}%</div>
        </div>
      </motion.div>

      {/* Feature tags */}
      <div className="mx-4 mt-3 bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm">
        <div className="text-[10px] font-bold text-gray-400 uppercase mb-2">特徴・環境</div>
        <div className={`grid ${is3 ? "grid-cols-3" : "grid-cols-2"} gap-3`}>
          {selected.map((h) => (
            <div key={h.id}>
              <div className="text-[10px] font-semibold text-gray-500 mb-1.5 truncate">{h.name.slice(0, is3 ? 4 : 6)}…</div>
              <div className="space-y-1">
                {h.features.map((f) => (
                  <div key={f} className="text-[9px] px-1.5 py-0.5 bg-sky-50 text-sky-700 rounded border border-sky-100 leading-tight">
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-4 mt-3 flex gap-2">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setInterested((prev) => !prev)}
          className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors duration-200 ${
            interested
              ? "bg-green-600 text-white"
              : "bg-sky-700 text-white"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {interested ? (
              <motion.span
                key="applied"
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18 }}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                申し込み済み
              </motion.span>
            ) : (
              <motion.span
                key="interest"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18 }}
              >
                {h1.name.slice(0, 4)}… に興味あり
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        <button className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold">
          別の病院を比較
        </button>
      </div>
    </div>
  );
}

function DoctorMsg() {
  const [openThread, setOpenThread] = useState<string | null>(null);

  return (
    <div className="relative h-full bg-white">
      <div className="bg-sky-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">メッセージ</h1>
      </div>
      <div className="divide-y divide-gray-100">
        {doctorMessages.map((m) => (
          <button
            key={m.id}
            onClick={() => setOpenThread(m.id)}
            className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-gray-50 transition-colors"
          >
            <Avatar initials={m.initials} variant="gray" size="sm" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-800">{m.name}</div>
              <div className="text-xs text-gray-400 truncate">{m.preview}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] text-gray-400">{m.time}</span>
              {m.unread && <span className="w-2 h-2 rounded-full bg-sky-500" />}
            </div>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {openThread && DOCTOR_CHAT_THREADS[openThread] && (
          <ChatThread
            key={openThread}
            thread={DOCTOR_CHAT_THREADS[openThread]}
            name={doctorMessages.find((m) => m.id === openThread)?.name ?? ""}
            initials={doctorMessages.find((m) => m.id === openThread)?.initials ?? ""}
            onBack={() => setOpenThread(null)}
            accentColor="sky"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ===== Hospital Side =====

const CRITERIA = [
  { label: "専門スキル", weight: 40, color: "bg-amber-500" },
  { label: "経験年数", weight: 25, color: "bg-amber-400" },
  { label: "論文実績", weight: 15, color: "bg-amber-300" },
  { label: "指導医資格", weight: 12, color: "bg-amber-200" },
  { label: "エリア適合", weight: 8, color: "bg-amber-100" },
];

// ===== Doctor Comparison Modal =====

type ScoredDoctor = {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  matchScore: number;
  initials: string;
  breakdown: { label: string; score: number }[];
};

function DoctorCompareModal({
  doctors: selected,
  priorityIds,
  onTogglePriority,
  onClose,
}: {
  doctors: ScoredDoctor[];
  priorityIds: string[];
  onTogglePriority: (id: string) => void;
  onClose: () => void;
}) {
  const colCount = selected.length;
  const gridClass =
    colCount === 3 ? "grid-cols-3" : colCount === 2 ? "grid-cols-2" : "grid-cols-1";

  return (
    <motion.div
      className="absolute inset-0 z-30 bg-black/50 flex flex-col justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="bg-white rounded-t-2xl overflow-hidden flex flex-col max-h-[88%]"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
      >
        {/* Modal header */}
        <div className="bg-amber-600 px-4 pt-4 pb-3 text-white flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-base font-bold flex items-center gap-1.5">
              <GitMerge className="w-4 h-4" /> 候補者比較
            </h2>
            <p className="text-[11px] text-amber-200 mt-0.5">{colCount}名を並べて比較</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-3 py-3 space-y-3">
          {/* Name + score row */}
          <div className={`grid ${gridClass} gap-2`}>
            {selected.map((d) => {
              const isPriority = priorityIds.includes(d.id);
              return (
                <div
                  key={d.id}
                  className={`rounded-xl p-3 border text-center relative ${
                    isPriority
                      ? "border-amber-400 bg-amber-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  {isPriority && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-white" /> 優先
                    </span>
                  )}
                  <Avatar initials={d.initials} size="sm" variant={isPriority ? "amber" : "gray"} />
                  <div className="mt-1.5 font-semibold text-[11px] text-gray-800 leading-tight">{d.name}</div>
                  <div className="text-[10px] text-gray-400 truncate">{d.specialty}</div>
                  <div className="text-lg font-bold text-amber-600 mt-1">{d.matchScore}</div>
                  <div className="text-[9px] text-gray-400">総合スコア</div>
                  <button
                    onClick={() => onTogglePriority(d.id)}
                    className={`mt-2 w-full py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                      isPriority
                        ? "bg-amber-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-700"
                    }`}
                  >
                    {isPriority ? "推薦済み" : "推薦"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Breakdown bars */}
          <div className="bg-white rounded-xl border border-gray-200 p-3">
            <div className="text-[10px] font-bold text-gray-400 uppercase mb-2.5">評価項目別スコア</div>
            {selected[0]?.breakdown.map((item, bi) => (
              <div key={item.label} className="mb-2.5 last:mb-0">
                <div className="text-[10px] text-gray-500 font-medium mb-1">{item.label}</div>
                <div className={`grid ${gridClass} gap-2`}>
                  {selected.map((d) => {
                    const score = d.breakdown[bi]?.score ?? 0;
                    return (
                      <div key={d.id} className="flex items-center gap-1.5">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-amber-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: bi * 0.05 }}
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-600 w-6 text-right flex-shrink-0">
                          {score}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Experience row */}
          <div className={`grid ${gridClass} gap-2`}>
            {selected.map((d) => (
              <div key={d.id} className="bg-white rounded-xl border border-gray-200 p-2.5 text-center">
                <div className="text-[10px] text-gray-400">経験年数</div>
                <div className="text-base font-bold text-gray-700 mt-0.5">{d.experience}年</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ===== Hospital Candidate Score =====

function HospitalCandidateScore() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareSelected, setCompareSelected] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [priorityIds, setPriorityIds] = useState<string[]>([]);

  const scored: ScoredDoctor[] = doctors.map((d) => ({
    ...d,
    breakdown: [
      { label: "専門スキル", score: d.skills.length >= 4 ? 95 : d.skills.length === 3 ? 82 : 70 },
      { label: "経験年数", score: Math.min(100, d.experience * 5) },
      { label: "論文実績", score: Math.min(100, Math.round(d.papers * 2.5)) },
      { label: "指導資格", score: d.certifications.length > 1 ? 90 : 65 },
    ],
  }));

  const toggleExpand = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const toggleCompareSelect = (id: string) => {
    setCompareSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 3) return prev;
      return prev.concat([id]);
    });
  };

  const togglePriority = (id: string) => {
    setPriorityIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.concat([id])
    );
  };

  const selectedDoctors = scored.filter((d) => compareSelected.includes(d.id));

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-amber-600 px-5 pt-4 pb-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5" /> MedCompare
              <span className="text-xs font-normal text-amber-200">for Hospital</span>
            </h1>
            <p className="text-xs text-amber-200 mt-0.5">採用基準に基づくスコアリング</p>
          </div>
          <button
            onClick={() => {
              setCompareMode((prev) => !prev);
              setCompareSelected([]);
            }}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
              compareMode
                ? "bg-white text-amber-700"
                : "bg-amber-500 text-white border border-amber-400"
            }`}
          >
            {compareMode ? "キャンセル" : "複数比較"}
          </button>
        </div>
      </div>

      <div className="px-4 py-3 space-y-3">
        {scored.map((d, idx) => {
          const isExpanded = expandedId === d.id;
          const isChecked = compareSelected.includes(d.id);
          const isPriority = priorityIds.includes(d.id);
          return (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-colors ${
                isChecked ? "border-amber-400 ring-1 ring-amber-200" :
                isExpanded ? "border-amber-300" : "border-gray-200"
              }`}
            >
              <div className="flex items-start">
                {/* Checkbox in compare mode */}
                {compareMode && (
                  <button
                    onClick={() => toggleCompareSelect(d.id)}
                    className="pl-3 pt-4 flex-shrink-0"
                  >
                    <span className={isChecked ? "text-amber-500" : "text-gray-300"}>
                      {isChecked
                        ? <CheckCircle2 className="w-5 h-5" />
                        : <Circle className="w-5 h-5" />}
                    </span>
                  </button>
                )}

                {/* Clickable card body */}
                <button
                  onClick={() => !compareMode && toggleExpand(d.id)}
                  className="flex-1 text-left p-3.5 min-w-0"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <Avatar initials={d.initials} size="sm" variant="amber" />
                      {isPriority && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                          <Star className="w-2.5 h-2.5 text-white fill-white" />
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-800">{d.name}</div>
                      <div className="text-[11px] text-gray-400">{d.specialty} ・ 経験{d.experience}年</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-amber-600">{d.matchScore}</div>
                      <div className="text-[9px] text-gray-400">総合スコア</div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {d.breakdown.map((item, bi) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 w-16 flex-shrink-0">{item.label}</span>
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-amber-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.score}%` }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.08 + bi * 0.06 + 0.15 }}
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-600 w-7 text-right">{item.score}</span>
                      </div>
                    ))}
                  </div>
                  {!compareMode && (
                    <div className="mt-2.5 flex justify-end">
                      <span className="text-[10px] text-amber-600 font-medium">
                        {isExpanded ? "閉じる" : "アクションを見る"}
                      </span>
                    </div>
                  )}
                </button>
              </div>

              {/* Expandable action section (non-compare mode only) */}
              <AnimatePresence initial={false}>
                {!compareMode && isExpanded && (
                  <motion.div
                    key="actions"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-3.5 pb-3.5 border-t border-amber-100">
                      <div className="text-[10px] font-bold text-gray-400 uppercase mt-3 mb-2">アクション</div>
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-amber-600 text-white rounded-lg text-[11px] font-semibold">
                          <Send className="w-3 h-3" />
                          スカウト送信
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-100 text-gray-700 rounded-lg text-[11px] font-semibold">
                          <FileText className="w-3 h-3" />
                          詳細を見る
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Sticky bottom bar in compare mode */}
      <AnimatePresence>
        {compareMode && (
          <motion.div
            className="absolute bottom-14 left-0 right-0 px-4 py-2 bg-white border-t border-amber-200 shadow-md"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-[11px] text-gray-400 text-center mb-1.5">
              {compareSelected.length}名選択中（最大3名）
            </div>
            <button
              disabled={compareSelected.length < 2}
              onClick={() => setShowCompareModal(true)}
              className="w-full py-2.5 bg-amber-600 text-white rounded-xl font-semibold text-sm disabled:opacity-40 transition-opacity"
            >
              {compareSelected.length}名を比較する
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare modal */}
      <AnimatePresence>
        {showCompareModal && (
          <DoctorCompareModal
            doctors={selectedDoctors}
            priorityIds={priorityIds}
            onTogglePriority={togglePriority}
            onClose={() => setShowCompareModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const WEIGHT_PRESETS = [
  { name: "スキル重視", weights: [60, 15, 10, 10, 5] },
  { name: "経験重視", weights: [30, 45, 10, 10, 5] },
  { name: "論文重視", weights: [25, 20, 35, 15, 5] },
  { name: "バランス",  weights: [40, 25, 15, 12, 8] },
] as const;

function HospitalCriteriaWeights() {
  const [weights, setWeights] = useState(CRITERIA.map((c) => c.weight));
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const total = weights.reduce((s, w) => s + w, 0);

  const adjust = (i: number, delta: number) => {
    setActivePreset(null);
    setWeights((prev) => {
      const next = [...prev];
      next[i] = Math.max(5, Math.min(60, next[i] + delta));
      return next;
    });
  };

  const applyPreset = (preset: typeof WEIGHT_PRESETS[number]) => {
    setActivePreset(preset.name);
    setWeights([...preset.weights]);
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-amber-600 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" /> 採用基準設定
        </h1>
        <p className="text-xs text-amber-200 mt-0.5">評価項目の重み付けを調整</p>
      </div>

      <div className="px-4 py-4 space-y-3">
        {/* Preset template pills */}
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase mb-2">プリセット</div>
          <div className="flex flex-wrap gap-1.5">
            {WEIGHT_PRESETS.map((preset) => {
              const isActive = activePreset === preset.name;
              return (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-colors ${
                    isActive
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-white text-gray-600 border-gray-200 hover:border-amber-300 hover:text-amber-700"
                  }`}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>

        {CRITERIA.map((c, i) => (
          <div key={c.label} className="bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">{c.label}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => adjust(i, -5)}
                  className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-sm font-bold flex items-center justify-center"
                >−</button>
                <span className="text-sm font-bold text-amber-600 w-8 text-center">{weights[i]}%</span>
                <button
                  onClick={() => adjust(i, +5)}
                  className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-sm font-bold flex items-center justify-center"
                >+</button>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${c.color} rounded-full`}
                animate={{ width: `${(weights[i] / 60) * 100}%` }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}

        <div className={`rounded-xl p-3.5 border ${total === 100 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200"}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${total === 100 ? "text-amber-700" : "text-red-600"}`}>合計配点</span>
            <span className={`text-xl font-bold ${total === 100 ? "text-amber-600" : "text-red-500"}`}>{total}点</span>
          </div>
          {total !== 100 && (
            <div className="text-[11px] text-red-400 mt-0.5">合計が100になるよう調整してください</div>
          )}
          {total === 100 && (
            <div className="text-[11px] text-gray-500 mt-0.5">上位候補: <strong>田中 太郎（94点）</strong></div>
          )}
        </div>

        <button className="w-full py-3 bg-amber-600 text-white rounded-xl font-semibold text-sm">
          この基準でスコアを再計算
        </button>
      </div>
    </div>
  );
}

function HospitalMsg() {
  const [openThread, setOpenThread] = useState<string | null>(null);

  return (
    <div className="relative h-full bg-white">
      <div className="bg-amber-600 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">メッセージ</h1>
      </div>
      <div className="divide-y divide-gray-100">
        {hospitalMessages.map((m, idx) => {
          const threadKey = `hm${idx + 1}`;
          return (
            <button
              key={m.id}
              onClick={() => setOpenThread(threadKey)}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-gray-50 transition-colors"
            >
              <Avatar initials={m.initials} variant="amber" size="sm" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-800">{m.name}</div>
                <div className="text-xs text-gray-400 truncate">{m.preview}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[11px] text-gray-400">{m.time}</span>
                {m.unread && <span className="w-2 h-2 rounded-full bg-amber-500" />}
              </div>
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {openThread && HOSPITAL_CHAT_THREADS[openThread] && (
          <ChatThread
            key={openThread}
            thread={HOSPITAL_CHAT_THREADS[openThread]}
            name={hospitalMessages[parseInt(openThread.replace("hm", ""), 10) - 1]?.name ?? ""}
            initials={hospitalMessages[parseInt(openThread.replace("hm", ""), 10) - 1]?.initials ?? ""}
            onBack={() => setOpenThread(null)}
            accentColor="amber"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ===== Main Export =====
export default function PlanFCompare() {
  const [doctorTab, setDoctorTab] = useState(0);
  const [hospitalTab, setHospitalTab] = useState(0);
  const [compareSelected, setCompareSelected] = useState<string[]>(["h1", "h3"]);

  const toggleCompare = (id: string) =>
    setCompareSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );

  const doctorTabs: { icon: ReactNode; label: string }[] = [
    { icon: <GitCompare className="w-4.5 h-4.5" />, label: "比較選択" },
    { icon: <BarChart3 className="w-4.5 h-4.5" />, label: "比較表" },
    { icon: <MessageCircle className="w-4.5 h-4.5" />, label: "メッセージ" },
  ];
  const hospitalTabs: { icon: ReactNode; label: string }[] = [
    { icon: <Users className="w-4.5 h-4.5" />, label: "候補スコア" },
    { icon: <SlidersHorizontal className="w-4.5 h-4.5" />, label: "基準設定" },
    { icon: <MessageCircle className="w-4.5 h-4.5" />, label: "メッセージ" },
  ];

  const doctorScreens = [
    <DoctorCompareList onCompare={() => setDoctorTab(1)} selectedIds={compareSelected} onToggle={toggleCompare} />,
    <DoctorCompareView selectedIds={compareSelected} />,
    <DoctorMsg />,
  ];
  const hospitalScreens = [<HospitalCandidateScore />, <HospitalCriteriaWeights />, <HospitalMsg />];

  return (
    <div className="flex flex-wrap justify-center gap-10">
      <div>
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-sky-50 text-sm font-semibold text-sky-700 border border-sky-200">
            <User className="w-4 h-4" /> 医師側 UI
          </span>
        </div>
        <PhoneFrame label={doctorTabs[doctorTab].label}>
          <div className="relative h-full">
            {doctorScreens[doctorTab]}
            <TabBar tabs={doctorTabs} activeIndex={doctorTab} onSelect={setDoctorTab} accentColor="#0284c7" />
          </div>
        </PhoneFrame>
      </div>

      <div>
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-amber-50 text-sm font-semibold text-amber-700 border border-amber-200">
            <Building2 className="w-4 h-4" /> 病院側 UI
          </span>
        </div>
        <PhoneFrame label={hospitalTabs[hospitalTab].label}>
          <div className="relative h-full">
            {hospitalScreens[hospitalTab]}
            <TabBar tabs={hospitalTabs} activeIndex={hospitalTab} onSelect={setHospitalTab} accentColor="#d97706" />
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
