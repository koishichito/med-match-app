/**
 * Plan H: Negotiation / Offer Management Style (MedOffer)
 * Design: Emerald + Orange, salary sliders, offer inbox with actions
 * No emoji, Lucide icons only
 */
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneFrame from "../PhoneFrame";
import TabBar from "../TabBar";
import {
  doctors, doctorMessages,
} from "@/lib/mockData";
import {
  MessageCircle, Building2, User, BadgeDollarSign,
  CheckCircle, XCircle, RotateCcw, ChevronDown, ChevronUp,
  Clock, Send, FileText, Inbox, Settings, ChevronLeft,
  ChevronRight, Kanban, Star, ArrowRight,
} from "lucide-react";

// ===== Shared helpers =====

const COLOR_MAP: Record<string, { text: string; light: string }> = {
  "bg-emerald-500": { text: "text-emerald-600", light: "bg-emerald-100" },
  "bg-emerald-400": { text: "text-emerald-600", light: "bg-emerald-100" },
  "bg-orange-500": { text: "text-orange-600", light: "bg-orange-100" },
  "bg-orange-400": { text: "text-orange-600", light: "bg-orange-100" },
};

function SalarySlider({
  value, min, max, step, onChange, color,
}: {
  value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; color: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const { text: textColor, light: lightColor } = COLOR_MAP[color] ?? { text: "text-gray-700", light: "bg-gray-100" };
  return (
    <div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3 relative">
        <motion.div
          className={`h-full ${color} rounded-full`}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, value - step))}
          className="flex-1 py-2 text-xs font-semibold bg-gray-100 text-gray-600 rounded-lg active:scale-95 transition-transform"
        >
          −{step.toLocaleString()}万
        </button>
        <span className={`text-base font-bold w-28 text-center ${textColor}`}>
          {value.toLocaleString()}万円
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + step))}
          className={`flex-1 py-2 text-xs font-semibold ${lightColor} text-gray-700 rounded-lg active:scale-95 transition-transform`}
        >
          +{step.toLocaleString()}万
        </button>
      </div>
      <div className="flex justify-between text-[9px] text-gray-300 mt-1.5 px-0.5">
        <span>{min.toLocaleString()}万</span>
        <span>{max.toLocaleString()}万</span>
      </div>
    </div>
  );
}

// ===== Doctor Side =====

function DoctorConditions() {
  const [salary, setSalary] = useState(1800);
  const [minSalary, setMinSalary] = useState(1500);
  const [workType, setWorkType] = useState<string[]>(["常勤"]);
  const [areas, setAreas] = useState<string[]>(["関東", "関西"]);

  const toggleArr = (arr: string[], set: (a: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-emerald-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <BadgeDollarSign className="w-5 h-5" /> MedOffer
        </h1>
        <p className="text-xs text-emerald-200 mt-0.5">希望条件を設定してマッチングを最適化</p>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Target salary */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-700">希望年収（目安）</h3>
            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">任意</span>
          </div>
          <SalarySlider
            value={salary} min={800} max={3000} step={100}
            onChange={setSalary} color="bg-emerald-500"
          />
        </div>

        {/* Min salary */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-700">最低希望年収</h3>
            <span className="text-[10px] text-red-500 font-semibold bg-red-50 px-2 py-0.5 rounded">必須</span>
          </div>
          <SalarySlider
            value={minSalary} min={800} max={2500} step={100}
            onChange={setMinSalary} color="bg-emerald-400"
          />
        </div>

        {/* Market salary comparison */}
        {(() => {
          const MARKET_MIN = 800;
          const MARKET_MAX = 3000;
          const MARKET_P25 = 1300;
          const MARKET_MEDIAN = 1600;
          const MARKET_P75 = 2100;
          const toPercent = (v: number) => ((v - MARKET_MIN) / (MARKET_MAX - MARKET_MIN)) * 100;
          const targetPct = toPercent(salary);
          const medianPct = toPercent(MARKET_MEDIAN);
          const p25Pct = toPercent(MARKET_P25);
          const p75Pct = toPercent(MARKET_P75);
          const aboveMedian = salary >= MARKET_MEDIAN;
          return (
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-700 mb-3">市場相場比較</h3>
              <div className="relative h-3 bg-gray-100 rounded-full overflow-visible mb-5">
                {/* Filled bar up to target */}
                <motion.div
                  className={`absolute left-0 top-0 h-full rounded-full ${aboveMedian ? "bg-emerald-400" : "bg-gray-300"}`}
                  animate={{ width: `${targetPct}%` }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                />
                {/* P25 marker */}
                <div
                  className="absolute top-[-3px] w-0.5 h-[18px] bg-gray-400 opacity-60"
                  style={{ left: `${p25Pct}%` }}
                />
                {/* Median marker */}
                <div
                  className="absolute top-[-3px] w-0.5 h-[18px] bg-orange-400"
                  style={{ left: `${medianPct}%` }}
                />
                {/* P75 marker */}
                <div
                  className="absolute top-[-3px] w-0.5 h-[18px] bg-gray-400 opacity-60"
                  style={{ left: `${p75Pct}%` }}
                />
                {/* Target marker */}
                <motion.div
                  className={`absolute top-[-5px] w-3 h-[22px] rounded-sm ${aboveMedian ? "bg-emerald-600" : "bg-gray-500"} shadow`}
                  style={{ marginLeft: "-6px" }}
                  animate={{ left: `${targetPct}%` }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                />
              </div>
              {/* Labels */}
              <div className="relative h-4">
                <span
                  className="absolute text-[9px] text-gray-400 -translate-x-1/2"
                  style={{ left: `${p25Pct}%` }}
                >下位25%</span>
                <span
                  className="absolute text-[9px] text-orange-500 font-semibold -translate-x-1/2"
                  style={{ left: `${medianPct}%` }}
                >中央値</span>
                <span
                  className="absolute text-[9px] text-gray-400 -translate-x-1/2"
                  style={{ left: `${p75Pct}%` }}
                >上位25%</span>
              </div>
              <div className="flex items-center justify-between mt-2 text-[11px]">
                <span className="text-gray-400">市場中央値 <span className="font-semibold text-orange-500">1,600万</span></span>
                <span className={`font-semibold ${aboveMedian ? "text-emerald-600" : "text-gray-500"}`}>
                  {aboveMedian ? "中央値以上" : "中央値未満"}
                  {" "}
                  ({aboveMedian ? "+" : ""}{(salary - MARKET_MEDIAN).toLocaleString()}万)
                </span>
              </div>
            </div>
          );
        })()}

        {/* Work type */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="text-sm font-bold text-gray-700 mb-3">雇用形態</h3>
          <div className="flex flex-wrap gap-2">
            {["常勤", "非常勤", "アルバイト", "業務委託"].map((t) => (
              <button
                key={t}
                onClick={() => toggleArr(workType, setWorkType, t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  workType.includes(t)
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Areas */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="text-sm font-bold text-gray-700 mb-3">希望エリア</h3>
          <div className="flex flex-wrap gap-2">
            {["北海道", "東北", "関東", "中部", "関西", "中国", "九州"].map((a) => (
              <button
                key={a}
                onClick={() => toggleArr(areas, setAreas, a)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  areas.includes(a)
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Match estimate */}
        <div className="bg-emerald-50 rounded-xl p-3.5 border border-emerald-200">
          <div className="text-xs font-bold text-emerald-700 mb-1">条件に合う病院の目安</div>
          <div className="text-2xl font-bold text-emerald-600">12件</div>
          <div className="text-[11px] text-gray-500 mt-0.5">現在の条件設定で {salary.toLocaleString()}万以上・{areas.join("/")}エリア</div>
        </div>

        <button className="w-full py-3 bg-emerald-700 text-white rounded-xl font-semibold text-sm">
          条件を保存してマッチングを更新
        </button>
      </div>
    </div>
  );
}

const OFFERS = [
  {
    id: "o1", hospital: "東京中央総合病院", initials: "東中",
    offered: 2000, min: 1800, type: "常勤", dept: "心臓外科",
    message: "先生の豊富な手術実績を高く評価しています。ぜひ当院でご活躍いただきたく、オファーさせていただきます。",
    time: "本日", status: "pending", expiresIn: 47,
  },
  {
    id: "o2", hospital: "慶應義塾大学病院", initials: "慶應",
    offered: 1700, min: 1700, type: "常勤", dept: "心臓外科",
    message: "研究環境も充実しており、論文執筆のサポートも万全です。",
    time: "昨日", status: "pending", expiresIn: 23,
  },
  {
    id: "o3", hospital: "大阪大学医学部附属病院", initials: "阪大",
    offered: 1600, min: 1500, type: "常勤", dept: "心臓血管外科",
    message: "大学病院ならではの研究機会をご提供できます。",
    time: "3/25", status: "countered", expiresIn: 71,
  },
];

function DoctorOffers() {
  const [expanded, setExpanded] = useState<string | null>("o1");
  const [statuses, setStatuses] = useState<Record<string, string>>(
    Object.fromEntries(OFFERS.map((o) => [o.id, o.status]))
  );
  const [counterVal, setCounterVal] = useState(2100);
  const [acceptedHospital, setAcceptedHospital] = useState<string | null>(null);

  const setStatus = (id: string, s: string) =>
    setStatuses((prev) => ({ ...prev, [id]: s }));

  const handleAccept = (id: string, hospital: string) => {
    setStatus(id, "accepted");
    setAcceptedHospital(hospital);
    setTimeout(() => setAcceptedHospital(null), 2500);
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16 relative">
      {/* Success animation overlay */}
      <AnimatePresence>
        {acceptedHospital && (
          <motion.div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, times: [0, 0.6, 1] }}
            >
              <CheckCircle className="w-20 h-20 text-white mb-4" />
            </motion.div>
            <motion.p
              className="text-white text-xl font-bold"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              オファーを承諾しました！
            </motion.p>
            <motion.p
              className="text-emerald-100 text-sm mt-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              {acceptedHospital}から採用確定
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-emerald-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Inbox className="w-5 h-5" /> オファー受信箱
        </h1>
        <p className="text-xs text-emerald-200 mt-0.5">{OFFERS.filter((o) => o.status === "pending").length}件の未返答オファー</p>
      </div>

      <div className="px-4 py-3 space-y-2.5">
        {OFFERS.map((offer) => {
          const st = statuses[offer.id];
          const isOpen = expanded === offer.id;
          const expiryBadge =
            offer.expiresIn < 24
              ? { cls: "bg-red-100 text-red-600 border border-red-200", urgent: true }
              : offer.expiresIn < 48
              ? { cls: "bg-amber-100 text-amber-600 border border-amber-200", urgent: false }
              : { cls: "bg-gray-100 text-gray-500 border border-gray-200", urgent: false };
          return (
            <div
              key={offer.id}
              className={`bg-white rounded-xl border shadow-sm overflow-hidden ${
                st === "accepted" ? "border-emerald-300" :
                st === "declined" ? "border-gray-200 opacity-60" :
                st === "countered" ? "border-orange-300" : "border-gray-200"
              }`}
            >
              <button
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                onClick={() => setExpanded(isOpen ? null : offer.id)}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {offer.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-800 truncate">{offer.hospital}</div>
                  <div className="text-xs text-gray-400">{offer.dept} ・ 提示: {offer.offered.toLocaleString()}万円</div>
                  {st !== "declined" && (
                    <div className={`inline-flex items-center gap-0.5 mt-1 px-1.5 py-0.5 rounded-md text-[9px] font-semibold ${expiryBadge.cls}`}>
                      <Clock className={`w-2.5 h-2.5 ${expiryBadge.urgent ? "text-red-500" : ""}`} />
                      残り{offer.expiresIn}時間
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-[10px] text-gray-400">{offer.time}</span>
                  {st === "pending" && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                  {st === "accepted" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                  {st === "countered" && <RotateCcw className="w-4 h-4 text-orange-500" />}
                  {st === "declined" && <XCircle className="w-4 h-4 text-gray-400" />}
                  {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-gray-100"
                  >
                    <div className="px-4 py-3 space-y-3">
                      {/* Message */}
                      <div className="text-xs text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-2.5">
                        {offer.message}
                      </div>

                      {/* Offer details */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-emerald-50 rounded-lg p-2.5">
                          <div className="text-[10px] text-emerald-600 font-semibold">提示年収</div>
                          <div className="text-base font-bold text-emerald-700">{offer.offered.toLocaleString()}万</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2.5">
                          <div className="text-[10px] text-gray-500 font-semibold">雇用形態</div>
                          <div className="text-base font-bold text-gray-700">{offer.type}</div>
                        </div>
                      </div>

                      {/* Counter offer */}
                      {st === "pending" && (
                        <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                          <div className="text-[10px] font-bold text-orange-600 mb-2">カウンターオファーを提示</div>
                          <SalarySlider
                            value={counterVal} min={offer.offered} max={3000} step={100}
                            onChange={setCounterVal} color="bg-orange-400"
                          />
                        </div>
                      )}

                      {/* Action buttons */}
                      {st === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAccept(offer.id, offer.hospital)}
                            className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
                          >
                            <CheckCircle className="w-3.5 h-3.5" /> 承諾
                          </button>
                          <button
                            onClick={() => setStatus(offer.id, "countered")}
                            className="flex-1 py-2.5 bg-orange-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> カウンター
                          </button>
                          <button
                            onClick={() => setStatus(offer.id, "declined")}
                            className="flex-1 py-2.5 bg-gray-100 text-gray-500 rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5" /> 辞退
                          </button>
                        </div>
                      )}
                      {st === "accepted" && (
                        <div className="py-2.5 bg-emerald-50 rounded-xl text-xs font-semibold text-emerald-600 text-center border border-emerald-200">
                          承諾済み — 面談日程を調整中
                        </div>
                      )}
                      {st === "countered" && (
                        <div className="py-2.5 bg-orange-50 rounded-xl text-xs font-semibold text-orange-600 text-center border border-orange-200">
                          カウンター提示中 — 病院の回答を待っています
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== Negotiation chat threads per message id =====

type ChatMsg = { id: string; from: "doctor" | "hospital"; text: string; time: string };

const CHAT_THREADS: Record<string, ChatMsg[]> = {
  m1: [
    { id: "c1", from: "hospital", text: "田中先生、この度はオファーをご覧いただきありがとうございます。提示年収2,000万円にて常勤でのご勤務をお願いしたく存じます。", time: "10:10" },
    { id: "c2", from: "doctor",   text: "ご連絡ありがとうございます。条件面について確認させてください。年間の当直回数はどのくらいを想定されていますか？", time: "10:18" },
    { id: "c3", from: "hospital", text: "月4回程度を想定しております。当直手当は別途支給いたします。また、手術日程については先生のご希望を最大限考慮いたします。", time: "10:22" },
    { id: "c4", from: "doctor",   text: "承知しました。年収については2,200万円でご検討いただくことは可能でしょうか。現在の勤務先での水準に合わせていただければ幸いです。", time: "10:25" },
    { id: "c5", from: "hospital", text: "社内で調整いたします。2,100万円であれば対応可能です。加えて、研究手当として年50万円を別途支給することもご提案できます。", time: "10:32" },
    { id: "c6", from: "doctor",   text: "研究手当のご提案、ありがとうございます。条件を前向きに検討させていただきます。一度見学をさせていただけますでしょうか。", time: "10:35" },
  ],
  m2: [
    { id: "c1", from: "hospital", text: "田中先生、当院の心臓外科チームに加わっていただきたく、年収1,700万円にてオファーをお送りしております。", time: "昨日 14:05" },
    { id: "c2", from: "doctor",   text: "ご連絡ありがとうございます。大学病院ならではの研究環境について詳しくお聞かせいただけますか？", time: "昨日 14:30" },
    { id: "c3", from: "hospital", text: "年間20本以上の論文を共著で執筆しており、学会発表の費用も全額負担いたします。研究日は週1日確保できます。", time: "昨日 15:00" },
    { id: "c4", from: "doctor",   text: "研究環境は魅力的ですね。ただ年収面で2,000万円を希望しております。ご検討いただけますか？", time: "昨日 15:20" },
    { id: "c5", from: "hospital", text: "国立大学の規定上、大幅な増額は難しい状況です。1,850万円と研究費補助100万円という形ではいかがでしょうか。", time: "昨日 16:00" },
  ],
  m3: [
    { id: "c1", from: "hospital", text: "田中先生、大阪大学医学部附属病院よりご連絡いたします。心臓血管外科部門でのご活躍を期待しオファーをお送りします。", time: "3/24 09:00" },
    { id: "c2", from: "doctor",   text: "ご連絡ありがとうございます。関西方面での勤務も検討しておりました。勤務スケジュールはどのようになりますか？", time: "3/24 10:15" },
    { id: "c3", from: "hospital", text: "週5日勤務、当直は月3回です。フレックスタイム制を採用しており、手術予定のない日は17時退勤も可能です。", time: "3/24 11:00" },
  ],
};

function DoctorChatThread({
  msg,
  onBack,
}: {
  msg: { id: string; name: string; initials: string };
  onBack: () => void;
}) {
  const thread = CHAT_THREADS[msg.id] ?? [];
  const [input, setInput] = useState("");
  const [localThread, setLocalThread] = useState<ChatMsg[]>(thread);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const newMsg: ChatMsg = {
      id: `local-${Date.now()}`,
      from: "doctor",
      text: trimmed,
      time: "今",
    };
    setLocalThread((prev) => prev.concat(newMsg));
    setInput("");
  };

  return (
    <motion.div
      className="absolute inset-0 bg-white flex flex-col z-20"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
    >
      {/* Header */}
      <div className="bg-emerald-700 px-4 pt-4 pb-4 text-white flex items-center gap-3 flex-shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-emerald-600 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
          {msg.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm leading-tight">{msg.name}</div>
          <div className="text-[10px] text-emerald-200">条件交渉中</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
        {localThread.map((cm, i) => {
          const isDoctor = cm.from === "doctor";
          return (
            <motion.div
              key={cm.id}
              className={`flex ${isDoctor ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.25 }}
            >
              <div
                className={`max-w-[78%] rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm ${
                  isDoctor
                    ? "bg-emerald-600 text-white rounded-br-sm"
                    : "bg-white text-gray-700 border border-gray-200 rounded-bl-sm"
                }`}
              >
                <p>{cm.text}</p>
                <p
                  className={`text-[9px] mt-1 text-right ${
                    isDoctor ? "text-emerald-200" : "text-gray-400"
                  }`}
                >
                  {cm.time}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-gray-100 bg-white px-3 py-2 flex items-end gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="メッセージを入力..."
          className="flex-1 text-xs bg-gray-100 rounded-xl px-3 py-2.5 outline-none resize-none"
        />
        <button
          onClick={handleSend}
          className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center active:scale-95 transition-transform flex-shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

function DoctorMsg() {
  const [openThread, setOpenThread] = useState<{ id: string; name: string; initials: string } | null>(null);

  return (
    <div className="h-full bg-white relative overflow-hidden">
      {/* Message list */}
      <div className="h-full">
        <div className="bg-emerald-700 px-5 pt-4 pb-4 text-white">
          <h1 className="text-lg font-bold">メッセージ</h1>
        </div>
        <div className="divide-y divide-gray-100">
          {doctorMessages.map((m) => (
            <button
              key={m.id}
              onClick={() => setOpenThread({ id: m.id, name: m.name, initials: m.initials })}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-left active:bg-gray-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                {m.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-800">{m.name}</div>
                <div className="text-xs text-gray-400 truncate">{m.preview}</div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-[11px] text-gray-400">{m.time}</span>
                {m.unread && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Inline chat thread (push navigation) */}
      <AnimatePresence>
        {openThread && (
          <DoctorChatThread
            msg={openThread}
            onBack={() => setOpenThread(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ===== Hospital Side =====

function HospitalOfferCreate() {
  const [targetDoc] = useState(doctors[0]);
  const [offerSalary, setOfferSalary] = useState(2000);
  const [bonusIncl, setBonusIncl] = useState(true);
  const [reloc, setReloc] = useState(false);
  const [housing, setHousing] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="h-full bg-gray-50 flex flex-col items-center justify-center px-8">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mb-4">
          <Send className="w-8 h-8" />
        </div>
        <div className="text-lg font-bold text-gray-800 mb-2">オファーを送信しました</div>
        <div className="text-sm text-gray-500 text-center mb-6">
          {targetDoc.name}先生への{offerSalary.toLocaleString()}万円のオファーを送信しました。返答をお待ちください。
        </div>
        <button onClick={() => setSent(false)} className="px-6 py-2.5 bg-orange-500 text-white rounded-xl font-semibold text-sm">
          オファー管理へ
        </button>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-orange-500 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Send className="w-5 h-5" /> オファー作成
          <span className="text-xs font-normal text-orange-200">for Hospital</span>
        </h1>
        <p className="text-xs text-orange-100 mt-0.5">条件を設定してオファーを送信</p>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Target doctor */}
        <div className="bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
            {targetDoc.initials}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm text-gray-800">{targetDoc.name} 先生</div>
            <div className="text-[11px] text-gray-400">{targetDoc.specialty} ・ 経験{targetDoc.experience}年</div>
          </div>
          <span className="text-sm font-bold text-orange-500">{targetDoc.matchScore}%</span>
        </div>

        {/* Salary offer */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <BadgeDollarSign className="w-4 h-4 text-orange-500" /> 提示年収
          </h3>
          <SalarySlider
            value={offerSalary} min={1000} max={3000} step={100}
            onChange={setOfferSalary} color="bg-orange-500"
          />
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500 bg-orange-50 rounded-lg px-3 py-2">
            <span>先生の希望年収目安</span>
            <span className="font-bold text-orange-600">1,800万円</span>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="text-sm font-bold text-gray-700 mb-3">待遇・福利厚生</h3>
          <div className="space-y-3">
            {[
              { label: "賞与込み", val: bonusIncl, set: setBonusIncl },
              { label: "引越し支援", val: reloc, set: setReloc },
              { label: "住宅手当", val: housing, set: setHousing },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.label}</span>
                <button
                  onClick={() => item.set(!item.val)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${item.val ? "bg-orange-500" : "bg-gray-200"}`}
                >
                  <motion.span
                    animate={{ left: item.val ? "22px" : "2px" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-orange-500" /> 添付メッセージ
          </h3>
          <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 leading-relaxed border border-gray-200">
            田中先生の冠動脈バイパス術2,500件以上のご実績を高く評価しており、ぜひ当院の心臓外科チームに参加していただきたく、オファーさせていただきます。
          </div>
        </div>

        <button
          onClick={() => setSent(true)}
          className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" /> {offerSalary.toLocaleString()}万円でオファーを送信
        </button>
      </div>
    </div>
  );
}

// ===== Mini progress timeline for offer tracking =====

type OfferStage = "pending" | "countered" | "accepted" | "declined";

const TIMELINE_STEPS: { key: OfferStage; label: string }[] = [
  { key: "pending",   label: "送付済" },
  { key: "countered", label: "交渉中" },
  { key: "accepted",  label: "承諾" },
];

function OfferTimeline({ stage }: { stage: OfferStage }) {
  // Map "declined" to step 0 (stuck at pending) with a red tint on the first dot
  const stepIndex =
    stage === "accepted" ? 2 :
    stage === "countered" ? 1 : 0;
  const isDeclined = stage === "declined";

  return (
    <div className="flex items-center gap-0 mt-3">
      {TIMELINE_STEPS.map((step, i) => {
        const isActive = i <= stepIndex;
        const isLast = i === TIMELINE_STEPS.length - 1;
        const dotColor = isDeclined && i === 0
          ? "bg-gray-400"
          : isActive
          ? i === 2
            ? "bg-emerald-500"
            : i === 1
            ? "bg-orange-400"
            : "bg-amber-400"
          : "bg-gray-200";
        const lineColor = isActive && i < stepIndex
          ? i === 1 ? "bg-orange-300" : "bg-amber-300"
          : "bg-gray-200";

        return (
          <div key={step.key} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-shrink-0">
              <motion.div
                className={`w-2.5 h-2.5 rounded-full ${dotColor}`}
                initial={{ scale: 0.6 }}
                animate={{ scale: isActive ? 1 : 0.7 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
              />
              <span className="text-[8px] text-gray-400 mt-0.5 whitespace-nowrap">{step.label}</span>
            </div>
            {!isLast && (
              <motion.div
                className={`h-0.5 flex-1 mx-0.5 rounded-full ${lineColor}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{ transformOrigin: "left" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function HospitalOfferTrack() {
  const tracking: {
    name: string; initials: string; salary: number;
    status: string; stage: OfferStage;
    color: string; time: string;
  }[] = [
    { name: "田中 太郎", initials: "田中", salary: 2000, status: "返答待ち",    stage: "pending",   color: "text-amber-600 bg-amber-50 border-amber-200",   time: "10分前" },
    { name: "佐藤 花子", initials: "佐藤", salary: 1600, status: "カウンター受信", stage: "countered", color: "text-orange-600 bg-orange-50 border-orange-200", time: "2時間前" },
    { name: "山田 美咲", initials: "山田", salary: 1500, status: "承諾済み",    stage: "accepted",  color: "text-emerald-600 bg-emerald-50 border-emerald-200", time: "昨日" },
    { name: "高橋 健二", initials: "高橋", salary: 1400, status: "辞退",        stage: "declined",  color: "text-gray-500 bg-gray-50 border-gray-200",         time: "3/25" },
  ];

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-orange-500 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Clock className="w-5 h-5" /> オファー管理
        </h1>
        <p className="text-xs text-orange-100 mt-0.5">送付済みオファーの状況追跡</p>
      </div>

      {/* Summary */}
      <div className="px-4 mt-3 grid grid-cols-3 gap-2.5">
        {[
          { v: "1", l: "返答待ち", c: "text-amber-600" },
          { v: "1", l: "交渉中", c: "text-orange-500" },
          { v: "1", l: "承諾済", c: "text-emerald-600" },
        ].map((s) => (
          <div key={s.l} className="bg-white rounded-xl p-3 text-center border border-gray-200 shadow-sm">
            <div className={`text-xl font-bold ${s.c}`}>{s.v}</div>
            <div className="text-[9px] text-gray-400 mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="px-4 mt-3 space-y-2.5">
        {tracking.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`bg-white rounded-xl p-3.5 border shadow-sm ${
              t.stage === "accepted" ? "border-emerald-200" :
              t.stage === "countered" ? "border-orange-200" :
              t.stage === "declined" ? "border-gray-200 opacity-70" :
              "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                {t.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-800">{t.name} 先生</div>
                <div className="text-[11px] text-gray-400">提示: {t.salary.toLocaleString()}万円 ・ {t.time}</div>
              </div>
              <span className={`px-2 py-1 rounded-lg text-[10px] font-semibold border flex-shrink-0 ${t.color}`}>
                {t.status}
              </span>
            </div>

            {/* Mini progress timeline */}
            <OfferTimeline stage={t.stage} />

            {t.stage === "countered" && (
              <div className="mt-2.5 flex gap-2">
                <button className="flex-1 py-2 text-xs font-semibold bg-orange-500 text-white rounded-lg">
                  カウンターを確認
                </button>
                <button className="flex-1 py-2 text-xs font-semibold bg-gray-100 text-gray-600 rounded-lg">
                  再交渉
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ===== Hospital chat threads =====

const HOSPITAL_CHAT_THREADS: Record<string, ChatMsg[]> = {
  hm1: [
    { id: "hc1", from: "hospital", text: "田中先生、当院の心臓外科部門にぜひご参加いただきたく、年収2,100万円でオファーをお送りしております。", time: "10:05" },
    { id: "hc2", from: "doctor",   text: "ご連絡ありがとうございます。条件面は大変魅力的です。当直の頻度はどのくらいになりますか？", time: "10:15" },
    { id: "hc3", from: "hospital", text: "月3〜4回を想定しております。当直手当は別途支給、緊急オペの場合は追加報酬もございます。", time: "10:20" },
    { id: "hc4", from: "doctor",   text: "承知しました。研究活動についての支援はありますか？現在進行中の研究を継続したいと考えています。", time: "10:28" },
    { id: "hc5", from: "hospital", text: "研究日として週1日を確保可能です。また学会参加費・論文投稿費は全額病院負担となります。ぜひ前向きにご検討ください。", time: "10:35" },
    { id: "hc6", from: "doctor",   text: "とても条件が揃っていますね。一度見学に伺わせていただけますでしょうか。", time: "10:40" },
  ],
  hm2: [
    { id: "hc1", from: "hospital", text: "山田先生、循環器内科の常勤ポストにご興味をお持ちいただき、誠にありがとうございます。年収1,800万円でのオファーをご提案します。", time: "昨日 13:00" },
    { id: "hc2", from: "doctor",   text: "ご連絡いただきありがとうございます。福利厚生について詳しくお聞かせいただけますか？", time: "昨日 13:45" },
    { id: "hc3", from: "hospital", text: "住宅手当月5万円、引越し費用全額支給、院内保育所あり（優先利用可）となっています。", time: "昨日 14:10" },
    { id: "hc4", from: "doctor",   text: "家族帯同での移住を考えていますので、院内保育所は大変助かります。給与については1,950万円でご検討いただけますか？", time: "昨日 15:00" },
    { id: "hc5", from: "hospital", text: "社内調整の結果、1,900万円まで対応可能です。ぜひ前向きにお考えいただければ幸いです。", time: "昨日 16:30" },
  ],
  hm3: [
    { id: "hc1", from: "hospital", text: "佐藤先生、心臓外科の若手有望株としてスカウトのご連絡をさせていただきます。年収1,700万円でのご提案です。", time: "3/26 09:30" },
    { id: "hc2", from: "doctor",   text: "ご連絡ありがとうございます。手術件数や設備面について教えていただけますか？", time: "3/26 11:00" },
    { id: "hc3", from: "hospital", text: "年間心臓手術1,200件超、最新のダ・ヴィンチ手術システムを完備しております。ぜひ見学にいらしてください。", time: "3/26 11:30" },
  ],
};

type HospitalChatThread = { id: string; name: string; initials: string };

function HospitalChatThreadView({
  msg,
  onBack,
}: {
  msg: HospitalChatThread;
  onBack: () => void;
}) {
  const thread = HOSPITAL_CHAT_THREADS[msg.id] ?? [];
  const [input, setInput] = useState("");
  const [localThread, setLocalThread] = useState<ChatMsg[]>(thread);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const newMsg: ChatMsg = {
      id: `local-${Date.now()}`,
      from: "hospital",
      text: trimmed,
      time: "今",
    };
    setLocalThread((prev) => prev.concat(newMsg));
    setInput("");
  };

  return (
    <motion.div
      className="absolute inset-0 bg-white flex flex-col z-20"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
    >
      {/* Header */}
      <div className="bg-orange-500 px-4 pt-4 pb-4 text-white flex items-center gap-3 flex-shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-orange-400 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="w-8 h-8 rounded-xl bg-orange-400 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
          {msg.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm leading-tight">{msg.name}</div>
          <div className="text-[10px] text-orange-200">条件交渉中</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
        {localThread.map((cm, i) => {
          const isHospital = cm.from === "hospital";
          return (
            <motion.div
              key={cm.id}
              className={`flex ${isHospital ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.25 }}
            >
              <div
                className={`max-w-[78%] rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm ${
                  isHospital
                    ? "bg-orange-500 text-white rounded-br-sm"
                    : "bg-white text-gray-700 border border-gray-200 rounded-bl-sm"
                }`}
              >
                <p>{cm.text}</p>
                <p
                  className={`text-[9px] mt-1 text-right ${
                    isHospital ? "text-orange-200" : "text-gray-400"
                  }`}
                >
                  {cm.time}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-gray-100 bg-white px-3 py-2 flex items-end gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="メッセージを入力..."
          className="flex-1 text-xs bg-gray-100 rounded-xl px-3 py-2.5 outline-none resize-none"
        />
        <button
          onClick={handleSend}
          className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center active:scale-95 transition-transform flex-shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

const HOSPITAL_MSG_LIST = [
  { id: "hm1", name: "田中 太郎", initials: "田太", preview: "一度見学に伺わせていただけますでしょうか。", time: "10:40", unread: true },
  { id: "hm2", name: "山田 花子", initials: "山花", preview: "1,900万円まで対応可能です。", time: "昨日", unread: true },
  { id: "hm3", name: "佐藤 健",   initials: "佐健", preview: "見学にいらしてください。", time: "3/26",  unread: false },
];

function HospitalMsg() {
  const [openThread, setOpenThread] = useState<HospitalChatThread | null>(null);

  return (
    <div className="h-full bg-white relative overflow-hidden">
      <div className="h-full">
        <div className="bg-orange-500 px-5 pt-4 pb-4 text-white">
          <h1 className="text-lg font-bold">メッセージ</h1>
          <p className="text-xs text-orange-200 mt-0.5">
            {HOSPITAL_MSG_LIST.filter((m) => m.unread).length}件の未読
          </p>
        </div>
        <div className="divide-y divide-gray-100">
          {HOSPITAL_MSG_LIST.map((m) => (
            <button
              key={m.id}
              onClick={() => setOpenThread({ id: m.id, name: m.name, initials: m.initials })}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-left active:bg-gray-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                {m.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-800">{m.name} 先生</div>
                <div className="text-xs text-gray-400 truncate">{m.preview}</div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-[11px] text-gray-400">{m.time}</span>
                {m.unread
                  ? <span className="w-2 h-2 rounded-full bg-orange-500" />
                  : <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                }
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openThread && (
          <HospitalChatThreadView
            msg={openThread}
            onBack={() => setOpenThread(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ===== Hospital Offer Pipeline (Kanban) =====

type PipelineStage = "scouted" | "replied" | "negotiating" | "agreed";

const PIPELINE_STAGES: {
  id: PipelineStage;
  label: string;
  color: string;
  borderColor: string;
  dot: string;
}[] = [
  { id: "scouted",     label: "スカウト済",  color: "bg-orange-100 text-orange-700",  borderColor: "border-orange-300",  dot: "bg-orange-400" },
  { id: "replied",     label: "返信あり",    color: "bg-emerald-100 text-emerald-700", borderColor: "border-emerald-300", dot: "bg-emerald-400" },
  { id: "negotiating", label: "交渉中",      color: "bg-blue-100 text-blue-700",      borderColor: "border-blue-300",    dot: "bg-blue-400" },
  { id: "agreed",      label: "合意済",      color: "bg-purple-100 text-purple-700",  borderColor: "border-purple-300",  dot: "bg-purple-400" },
];

type PipelineDoctor = {
  id: string;
  name: string;
  specialty: string;
  initials: string;
  salary: number;
  stage: PipelineStage;
  priority: boolean;
};

const PIPELINE_DOCTORS_INIT: PipelineDoctor[] = [
  { id: "d1", name: "田中 太郎", specialty: "心臓外科",      initials: "田太", salary: 2100, stage: "negotiating", priority: true  },
  { id: "d2", name: "山田 花子", specialty: "循環器内科",    initials: "山花", salary: 1800, stage: "replied",     priority: false },
  { id: "d3", name: "佐藤 健",   specialty: "心臓外科",      initials: "佐健", salary: 1700, stage: "scouted",     priority: false },
  { id: "d4", name: "鈴木 明",   specialty: "心臓血管外科",  initials: "鈴明", salary: 2200, stage: "agreed",      priority: false },
  { id: "d5", name: "伊藤 奈々", specialty: "循環器内科",    initials: "伊奈", salary: 1900, stage: "scouted",     priority: true  },
];

const STAGE_ORDER: PipelineStage[] = ["scouted", "replied", "negotiating", "agreed"];

function HospitalOfferPipeline() {
  const [doctors2, setDoctors2] = useState<PipelineDoctor[]>(PIPELINE_DOCTORS_INIT);
  const [activeStage, setActiveStage] = useState<PipelineStage>("negotiating");

  const advanceStage = (docId: string) => {
    setDoctors2((prev) =>
      prev.map((d) => {
        if (d.id !== docId) return d;
        const idx = STAGE_ORDER.indexOf(d.stage);
        if (idx >= STAGE_ORDER.length - 1) return d;
        return { ...d, stage: STAGE_ORDER[idx + 1] };
      })
    );
  };

  const filtered = doctors2.filter((d) => d.stage === activeStage);

  const stageInfo = PIPELINE_STAGES.find((s) => s.id === activeStage)!;

  // Count per stage for badges
  const countMap: Record<string, number> = {};
  doctors2.forEach((d) => {
    countMap[d.stage] = (countMap[d.stage] ?? 0) + 1;
  });

  return (
    <div className="h-full bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-orange-500 px-5 pt-4 pb-4 text-white flex-shrink-0">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Kanban className="w-5 h-5" /> オファーパイプライン
        </h1>
        <p className="text-xs text-orange-100 mt-0.5">
          候補医師 {doctors2.length}名 — ステージ別管理
        </p>
      </div>

      {/* Stage filter buttons */}
      <div className="flex-shrink-0 px-3 pt-3 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
        {PIPELINE_STAGES.map((s) => {
          const isActive = s.id === activeStage;
          const cnt = countMap[s.id] ?? 0;
          return (
            <button
              key={s.id}
              onClick={() => setActiveStage(s.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                isActive
                  ? `${s.color} ${s.borderColor} shadow-sm`
                  : "bg-white text-gray-500 border-gray-200"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${isActive ? s.dot : "bg-gray-300"}`}
              />
              {s.label}
              {cnt > 0 && (
                <span
                  className={`ml-0.5 min-w-[16px] h-4 rounded-full text-[9px] font-bold flex items-center justify-center px-1 ${
                    isActive ? "bg-white/70 text-gray-700" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {cnt}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Stage label row */}
      <div className={`flex-shrink-0 mx-3 mb-2 px-3 py-1.5 rounded-lg flex items-center gap-2 ${stageInfo.color} border ${stageInfo.borderColor}`}>
        <span className={`w-2 h-2 rounded-full ${stageInfo.dot}`} />
        <span className="text-xs font-semibold">{stageInfo.label}</span>
        <span className="text-xs text-gray-500 ml-auto">{filtered.length}名</span>
      </div>

      {/* Doctor cards */}
      <div className="flex-1 overflow-y-auto px-3 pb-20 space-y-2.5">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-gray-400"
            >
              <Kanban className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">このステージには候補者がいません</p>
            </motion.div>
          )}
          {filtered.map((doc) => {
            const isLastStage = STAGE_ORDER.indexOf(doc.stage) >= STAGE_ORDER.length - 1;
            return (
              <motion.div
                key={doc.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className={`bg-white rounded-xl border shadow-sm overflow-hidden ${stageInfo.borderColor}`}
              >
                <div className="px-4 py-3.5">
                  {/* Top row */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {doc.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm text-gray-800">{doc.name} 先生</span>
                        {doc.priority && (
                          <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-600 border border-amber-200 text-[9px] font-bold">
                            <Star className="w-2.5 h-2.5" />優先
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{doc.specialty}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-orange-600">{doc.salary.toLocaleString()}万</div>
                      <div className="text-[9px] text-gray-400">希望年収</div>
                    </div>
                  </div>

                  {/* Stage progress dots */}
                  <div className="mt-3 flex items-center gap-1">
                    {STAGE_ORDER.map((s, i) => {
                      const docIdx = STAGE_ORDER.indexOf(doc.stage);
                      const isDone = i <= docIdx;
                      const stg = PIPELINE_STAGES.find((ps) => ps.id === s)!;
                      return (
                        <div key={s} className="flex items-center flex-1">
                          <div
                            className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${
                              isDone ? stg.dot : "bg-gray-200"
                            }`}
                          />
                          {i < STAGE_ORDER.length - 1 && (
                            <div
                              className={`h-0.5 flex-1 mx-0.5 rounded-full transition-colors ${
                                i < docIdx ? stg.dot : "bg-gray-200"
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-0.5 px-0.5">
                    {STAGE_ORDER.map((s) => {
                      const stg = PIPELINE_STAGES.find((ps) => ps.id === s)!;
                      return (
                        <span key={s} className="text-[8px] text-gray-300">{stg.label}</span>
                      );
                    })}
                  </div>

                  {/* Advance button */}
                  {!isLastStage ? (
                    <button
                      onClick={() => advanceStage(doc.id)}
                      className="mt-3 w-full py-2 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold flex items-center justify-center gap-1 active:scale-95 transition-transform"
                    >
                      次のステージへ <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="mt-3 py-2 rounded-lg bg-purple-50 border border-purple-200 text-purple-600 text-xs font-semibold text-center">
                      合意完了
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ===== Main Export =====
export default function PlanHNegotiate() {
  const [doctorTab, setDoctorTab] = useState(0);
  const [hospitalTab, setHospitalTab] = useState(0);

  const doctorTabs: { icon: ReactNode; label: string }[] = [
    { icon: <Settings className="w-4.5 h-4.5" />, label: "希望条件" },
    { icon: <Inbox className="w-4.5 h-4.5" />, label: "オファー" },
    { icon: <MessageCircle className="w-4.5 h-4.5" />, label: "メッセージ" },
  ];
  const hospitalTabs: { icon: ReactNode; label: string }[] = [
    { icon: <Send className="w-4.5 h-4.5" />, label: "オファー作成" },
    { icon: <Clock className="w-4.5 h-4.5" />, label: "管理" },
    { icon: <Kanban className="w-4.5 h-4.5" />, label: "パイプライン" },
    { icon: <MessageCircle className="w-4.5 h-4.5" />, label: "メッセージ" },
  ];

  const doctorScreens = [<DoctorConditions />, <DoctorOffers />, <DoctorMsg />];
  const hospitalScreens = [<HospitalOfferCreate />, <HospitalOfferTrack />, <HospitalOfferPipeline />, <HospitalMsg />];

  return (
    <div className="flex flex-wrap justify-center gap-10">
      <div>
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-emerald-50 text-sm font-semibold text-emerald-700 border border-emerald-200">
            <User className="w-4 h-4" /> 医師側 UI
          </span>
        </div>
        <PhoneFrame label={doctorTabs[doctorTab].label}>
          <div className="relative h-full">
            {doctorScreens[doctorTab]}
            <TabBar tabs={doctorTabs} activeIndex={doctorTab} onSelect={setDoctorTab} accentColor="#059669" />
          </div>
        </PhoneFrame>
      </div>

      <div>
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-orange-50 text-sm font-semibold text-orange-700 border border-orange-200">
            <Building2 className="w-4 h-4" /> 病院側 UI
          </span>
        </div>
        <PhoneFrame label={hospitalTabs[hospitalTab].label}>
          <div className="relative h-full">
            {hospitalScreens[hospitalTab]}
            <TabBar tabs={hospitalTabs} activeIndex={hospitalTab} onSelect={setHospitalTab} accentColor="#f97316" />
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
