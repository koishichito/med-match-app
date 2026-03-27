/**
 * Plan A: Skill Card Swipe Style (MedMatch)
 * Design: Teal primary, warm accent, clean card UI
 * No emoji, Lucide icons only, restrained gradients
 */
import { useState, type ReactNode } from "react";
import {
  motion, AnimatePresence,
  useMotionValue, useTransform, animate, type PanInfo
} from "framer-motion";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from "recharts";
import PhoneFrame from "../PhoneFrame";
import TabBar from "../TabBar";
import { hospitals, doctors, doctorMessages, hospitalMessages, skillRadarData } from "@/lib/mockData";
import {
  Heart, X, Send, Stethoscope, User, MessageCircle,
  ClipboardList, Building2, MapPin, Award, FileText, Scissors, ChevronLeft, CheckCircle
} from "lucide-react";

function InitialsAvatar({ initials, size = "md", variant = "teal" }: { initials: string; size?: "sm" | "md" | "lg"; variant?: "teal" | "orange" | "gray" }) {
  const sizeMap = { sm: "w-9 h-9 text-xs", md: "w-11 h-11 text-sm", lg: "w-14 h-14 text-lg" };
  const variantMap = {
    teal: "bg-teal-100 text-teal-700",
    orange: "bg-orange-100 text-orange-700",
    gray: "bg-gray-100 text-gray-600",
  };
  return (
    <div className={`${sizeMap[size]} ${variantMap[variant]} rounded-xl flex items-center justify-center font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

// ===== Draggable cards =====

function DraggableHospitalCard({ h, onSwipe }: { h: typeof hospitals[0]; onSwipe: (dir: number) => void }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-12, 0, 12]);
  const likeOpacity = useTransform(x, [30, 120], [0, 1]);
  const passOpacity = useTransform(x, [-120, -30], [1, 0]);

  const throwCard = (dir: number) => {
    animate(x, dir > 0 ? 450 : -450, { type: "spring", stiffness: 400, damping: 28 });
    setTimeout(() => onSwipe(dir), 240);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 80) throwCard(1);
    else if (info.offset.x < -80) throwCard(-1);
    else animate(x, 0, { type: "spring", stiffness: 300, damping: 22 });
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      style={{ x, rotate }}
      className="relative bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 cursor-grab active:cursor-grabbing select-none"
    >
      {/* LIKE overlay */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute inset-0 z-10 pointer-events-none rounded-2xl border-[3px] border-teal-500 bg-teal-500/5 flex items-start justify-end p-3"
      >
        <span className="text-teal-500 font-black text-lg border-2 border-teal-500 px-2.5 py-0.5 rounded-lg -rotate-12">LIKE</span>
      </motion.div>
      {/* PASS overlay */}
      <motion.div
        style={{ opacity: passOpacity }}
        className="absolute inset-0 z-10 pointer-events-none rounded-2xl border-[3px] border-red-400 bg-red-400/5 flex items-start justify-start p-3"
      >
        <span className="text-red-400 font-black text-lg border-2 border-red-400 px-2.5 py-0.5 rounded-lg rotate-12">PASS</span>
      </motion.div>

      <div className="bg-teal-700 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center font-bold text-lg">{h.initials}</div>
          <div>
            <h2 className="text-base font-bold">{h.name}</h2>
            <p className="text-teal-200 text-xs">{h.department} {h.type} ・ {h.location}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 flex items-center gap-3 bg-teal-50">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="text-2xl font-bold text-teal-700"
        >
          {h.matchScore}%
        </motion.div>
        <div className="flex-1">
          <div className="text-[10px] font-semibold text-teal-600 mb-1">マッチ度</div>
          <div className="h-1.5 bg-teal-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-teal-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${h.matchScore}%` }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {h.features.map((f) => (
            <span key={f} className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">{f}</span>
          ))}
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="w-3 h-3" /> {h.location} ・ {h.beds}床 ・ {h.salary}
        </div>
      </div>

      <div className="px-4 pb-3 text-center text-[10px] text-gray-300 select-none">← 左右にドラッグ →</div>
    </motion.div>
  );
}

function DraggableDoctorCard({ d, onSwipe }: { d: typeof doctors[0]; onSwipe: (dir: number) => void }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-12, 0, 12]);
  const likeOpacity = useTransform(x, [30, 120], [0, 1]);
  const passOpacity = useTransform(x, [-120, -30], [1, 0]);

  const throwCard = (dir: number) => {
    animate(x, dir > 0 ? 450 : -450, { type: "spring", stiffness: 400, damping: 28 });
    setTimeout(() => onSwipe(dir), 240);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 80) throwCard(1);
    else if (info.offset.x < -80) throwCard(-1);
    else animate(x, 0, { type: "spring", stiffness: 300, damping: 22 });
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      style={{ x, rotate }}
      className="relative bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 cursor-grab active:cursor-grabbing select-none"
    >
      {/* LIKE overlay */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute inset-0 z-10 pointer-events-none rounded-2xl border-[3px] border-orange-500 bg-orange-500/5 flex items-start justify-end p-3"
      >
        <span className="text-orange-500 font-black text-lg border-2 border-orange-500 px-2.5 py-0.5 rounded-lg -rotate-12">HIRE</span>
      </motion.div>
      {/* PASS overlay */}
      <motion.div
        style={{ opacity: passOpacity }}
        className="absolute inset-0 z-10 pointer-events-none rounded-2xl border-[3px] border-red-400 bg-red-400/5 flex items-start justify-start p-3"
      >
        <span className="text-red-400 font-black text-lg border-2 border-red-400 px-2.5 py-0.5 rounded-lg rotate-12">PASS</span>
      </motion.div>

      <div className="bg-orange-600 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center font-bold text-lg">{d.initials}</div>
          <div>
            <h2 className="text-base font-bold">{d.name} 先生</h2>
            <p className="text-orange-200 text-xs">{d.specialty} ・ 経験{d.experience}年</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 flex items-center gap-3 bg-orange-50">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="text-2xl font-bold text-orange-600"
        >
          {d.matchScore}%
        </motion.div>
        <div className="flex-1">
          <div className="text-[10px] font-semibold text-orange-600 mb-1">マッチ度</div>
          <div className="h-1.5 bg-orange-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-orange-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${d.matchScore}%` }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {d.skills.map((s) => (
            <span key={s} className="px-2 py-0.5 rounded text-[10px] font-medium bg-teal-50 text-teal-700 border border-teal-200">{s}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {d.certifications.map((c) => (
            <span key={c} className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">{c}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-4 pb-3">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-base font-bold text-gray-700">{d.surgeries.toLocaleString()}</div>
          <div className="text-[10px] text-gray-500">手術件数</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-base font-bold text-gray-700">{d.papers}</div>
          <div className="text-[10px] text-gray-500">論文数</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-base font-bold text-gray-700">{d.experience}年</div>
          <div className="text-[10px] text-gray-500">経験年数</div>
        </div>
      </div>

      <div className="px-4 pb-3 text-center text-[10px] text-gray-300 select-none">← 左右にドラッグ →</div>
    </motion.div>
  );
}

// ===== Doctor Side =====
function DoctorSwipeFeed({ onGoToMessages }: { onGoToMessages: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [likeAnimKey, setLikeAnimKey] = useState(0);
  const [matchedHospital, setMatchedHospital] = useState<string | null>(null);
  const [detailHospital, setDetailHospital] = useState<typeof hospitals[0] | null>(null);

  const isDone = currentIndex >= hospitals.length;

  const handleSwipe = (dir: number) => {
    if (isDone) return;
    if (dir === 1) {
      setMatchedHospital(hospitals[currentIndex].name);
      setTimeout(() => setMatchedHospital(null), 1800);
      setLikeCount((prev) => prev + 1);
      setLikeAnimKey((prev) => prev + 1);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const h = isDone ? hospitals[0] : hospitals[currentIndex];
  const dotCount = Math.min(hospitals.length, 5);

  return (
    <div className="h-full bg-gray-50 flex flex-col relative">
      <div className="px-5 pt-4 pb-3 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-teal-600" /> MedMatch
          </h1>
          <div className="flex gap-2 items-center">
            {/* Animated like counter */}
            <AnimatePresence mode="wait">
              <motion.div
                key={likeAnimKey}
                initial={{ scale: 1.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
                className="flex items-center gap-0.5 text-[11px] font-bold text-rose-500"
              >
                <Heart className="w-3 h-3 fill-rose-500" />
                {likeCount}
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-1 items-center">
              {Array.from({ length: dotCount }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i === (isDone ? dotCount : currentIndex % dotCount) ? 16 : 6,
                    backgroundColor: i === (isDone ? dotCount : currentIndex % dotCount) ? "#0d9488" : "#e5e7eb",
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-1.5 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-[11px] text-gray-400 mt-0.5">スワイプで直感的にマッチング</p>
      </div>

      <div className="flex-1 px-4 py-3 relative overflow-hidden">
        {isDone ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="h-full flex flex-col items-center justify-center gap-4"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-400 to-teal-500 flex items-center justify-center shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <div className="text-center">
              <h2 className="text-base font-bold text-gray-800">全ての病院を確認しました！</h2>
              <p className="text-sm text-teal-600 font-semibold mt-1">{likeCount}件にLIKEしました</p>
            </div>
            <div className="flex flex-col gap-2 w-full px-6">
              <button
                onClick={() => { setCurrentIndex(0); setLikeCount(0); setLikeAnimKey(0); }}
                className="w-full py-2.5 rounded-xl border-2 border-teal-500 text-teal-600 font-bold text-sm hover:bg-teal-50 transition-colors"
              >
                最初からやり直す
              </button>
              <button
                onClick={onGoToMessages}
                className="w-full py-2.5 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 transition-colors shadow-sm"
              >
                マッチング一覧へ
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* peek card behind */}
            <div className="absolute inset-x-8 top-5 bottom-16 bg-white rounded-2xl border border-gray-100 shadow-sm opacity-60 scale-[0.93]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="relative z-10"
              >
                <DraggableHospitalCard h={h} onSwipe={handleSwipe} />
                {/* 詳細を見る button */}
                <button
                  onClick={() => setDetailHospital(h)}
                  className="mt-2 w-full py-1.5 rounded-xl bg-white border border-teal-200 text-teal-700 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:bg-teal-50 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  詳細を見る
                </button>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Match notification */}
      <AnimatePresence>
        {matchedHospital && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          >
            <div className="bg-teal-600 text-white rounded-2xl px-6 py-4 shadow-2xl text-center max-w-[240px]">
              <Heart className="w-8 h-8 mx-auto mb-2 fill-white" />
              <div className="text-lg font-black">マッチしました!</div>
              <div className="text-xs text-teal-100 mt-1 leading-tight">{matchedHospital}との<br />マッチングが成立しました</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isDone && (
        <div className="flex items-center justify-center gap-5 pb-4 pt-2 bg-white border-t border-gray-100">
          <button
            onClick={() => handleSwipe(-1)}
            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shadow-sm border border-gray-200 text-gray-500 hover:bg-red-50 hover:border-red-200 hover:text-red-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleSwipe(0)}
            className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shadow-sm border border-teal-200 text-teal-600 hover:bg-teal-100 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => handleSwipe(1)}
            className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center shadow-sm text-white hover:bg-teal-700 transition-colors"
          >
            <Heart className="w-5 h-5" />
          </motion.button>
        </div>
      )}

      {/* Hospital Detail overlay */}
      <AnimatePresence>
        {detailHospital && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="absolute inset-0 z-30 bg-white flex flex-col"
          >
            {/* Detail header */}
            <div className="bg-teal-700 px-4 pt-4 pb-5 text-white relative flex-shrink-0">
              <button
                onClick={() => setDetailHospital(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center font-bold text-lg">{detailHospital.initials}</div>
                <div>
                  <h2 className="text-base font-bold pr-10">{detailHospital.name}</h2>
                  <p className="text-teal-200 text-xs">{detailHospital.department} {detailHospital.type}</p>
                </div>
              </div>
            </div>

            {/* Detail body */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
              {/* Match score */}
              <div className="bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-black text-teal-700">{detailHospital.matchScore}%</div>
                  <div className="flex-1">
                    <div className="text-[10px] font-semibold text-teal-600 mb-1">マッチ度</div>
                    <div className="h-2 bg-teal-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-teal-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${detailHospital.matchScore}%` }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Basic info */}
              <div className="bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm space-y-2.5">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> 基本情報
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-[10px] text-gray-400 mb-0.5">診療科</div>
                    <div className="text-xs font-semibold text-gray-700">{detailHospital.department}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-[10px] text-gray-400 mb-0.5">雇用形態</div>
                    <div className="text-xs font-semibold text-gray-700">{detailHospital.type}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-[10px] text-gray-400 mb-0.5">病床数</div>
                    <div className="text-xs font-semibold text-gray-700">{detailHospital.beds}床</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-[10px] text-gray-400 mb-0.5">所在地</div>
                    <div className="text-xs font-semibold text-gray-700 flex items-center gap-0.5"><MapPin className="w-3 h-3" />{detailHospital.location}</div>
                  </div>
                </div>
              </div>

              {/* Salary */}
              <div className="bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Award className="w-3.5 h-3.5" /> 給与・条件
                </h3>
                <div className="text-xl font-black text-teal-700">{detailHospital.salary}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">年収ベース（手当・インセンティブ別途）</div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <ClipboardList className="w-3.5 h-3.5" /> 特徴・環境
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {detailHospital.features.map((f) => (
                    <span key={f} className="px-2.5 py-1 rounded text-[11px] font-medium bg-teal-50 text-teal-700 border border-teal-200">{f}</span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <FileText className="w-3.5 h-3.5" /> 病院紹介
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {detailHospital.name}は{detailHospital.location}に位置する{detailHospital.beds}床規模の病院です。
                  {detailHospital.department}領域において高度な医療を提供し、専門医の育成・研究活動も積極的に支援しています。
                  スタッフの働きやすい環境づくりに注力しており、先生のスキルを最大限に活かせる職場です。
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex-shrink-0 bg-white border-t border-gray-100 px-4 py-3 flex gap-3">
              <button
                onClick={() => { setDetailHospital(null); handleSwipe(-1); }}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" /> PASS
              </button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { setDetailHospital(null); handleSwipe(1); }}
                className="flex-1 py-3 rounded-xl bg-teal-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors shadow-sm"
              >
                <Heart className="w-4 h-4" /> LIKE
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DoctorProfile() {
  return (
    <div className="h-full bg-white overflow-y-auto pb-16">
      <div className="bg-teal-700 px-5 pt-4 pb-8 text-white">
        <h1 className="text-lg font-bold">マイプロフィール</h1>
      </div>
      <div className="px-5 -mt-5 space-y-3">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <InitialsAvatar initials="田中" size="lg" />
            <div>
              <h2 className="text-base font-bold text-gray-900">田中 太郎</h2>
              <p className="text-xs text-gray-500">心臓外科専門医 ・ 経験15年</p>
              <p className="text-[11px] text-teal-600 font-medium mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" /> 転職検討中
              </p>
            </div>
          </div>
          <div className="h-px bg-gray-100 mb-3" />
          <div className="text-xs text-gray-600 leading-relaxed">
            心臓血管外科領域で15年の経験を持ち、冠動脈バイパス術を中心に2,500件以上の手術実績があります。
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" /> 専門スキル
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {["冠動脈バイパス術", "弁膜症手術", "MICS", "TAVI"].map((s) => (
              <span key={s} className="px-2.5 py-1 rounded text-[11px] font-medium bg-teal-50 text-teal-700 border border-teal-200">{s}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> 資格
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {["心臓血管外科専門医", "外科指導医"].map((c) => (
              <span key={c} className="px-2.5 py-1 rounded text-[11px] font-medium bg-gray-100 text-gray-700">{c}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Scissors className="w-3.5 h-3.5" /> 実績
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {[["2,500", "手術件数"], ["32", "論文数"], ["15年", "経験年数"]].map(([val, label]) => (
              <div key={label} className="text-center p-2 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-800">{val}</div>
                <div className="text-[10px] text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 mb-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            スキル適合度
          </h3>
          <ResponsiveContainer width="100%" height={130}>
            <RadarChart
              data={skillRadarData.labels.map((label, i) => ({
                subject: label,
                doctor: skillRadarData.datasets[0].data[i],
              }))}
              margin={{ top: 4, right: 16, bottom: 4, left: 16 }}
            >
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8, fill: "#9ca3af" }} />
              <Radar dataKey="doctor" stroke="#0d9488" fill="#0d9488" fillOpacity={0.35} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ===== Chat thread data & sub-components for DoctorMessages =====

const SWIPE_CHAT_THREADS: Record<string, { from: "doctor" | "hospital"; text: string; time: string }[]> = {
  m1: [
    { from: "hospital", text: "田中先生、はじめまして。東京中央総合病院の採用担当です。先生のプロフィールを拝見し、ぜひ一度お話しできればと思いご連絡しました。", time: "10:15" },
    { from: "doctor", text: "ご連絡いただきありがとうございます。御院の心臓外科には以前から関心を持っておりました。", time: "10:22" },
    { from: "hospital", text: "ありがとうございます！先生のご経験・実績は大変魅力的です。ぜひ一度、見学にいらしてください。ご都合はいかがでしょうか？", time: "10:32" },
  ],
  m2: [
    { from: "hospital", text: "田中先生、慶應義塾大学病院心臓外科の坂本です。先生のご経歴を拝見し、大変興味を持ちました。", time: "昨日 14:10" },
    { from: "hospital", text: "特に先生のMICSおよびTAVIの実績は当科が現在強化したい領域と完全に合致しております。", time: "昨日 14:12" },
    { from: "doctor", text: "ご関心いただきありがとうございます。慶應の研究環境にも興味があります。条件面もお伺いできますか？", time: "昨日 18:44" },
    { from: "hospital", text: "もちろんです。年収1,700万円ベースに加え、手術インセンティブ制度もございます。詳しくは面談でご説明します。", time: "昨日 19:03" },
  ],
  m3: [
    { from: "hospital", text: "田中先生、大阪大学医学部附属病院の心臓血管外科 河野と申します。先生の論文実績（32報）に大変注目しております。", time: "3/24 09:00" },
    { from: "doctor", text: "お声がけいただきありがとうございます。阪大の研究環境は国内トップレベルと存じます。", time: "3/24 12:30" },
    { from: "hospital", text: "はい、当科は研究支援が充実しており、論文執筆サポートや海外学会への費用補助も行っています。研究環境についてご案内いたします。", time: "3/24 13:05" },
  ],
};

function DoctorChatThread({ messageId, hospitalName, initials, onBack }: {
  messageId: string;
  hospitalName: string;
  initials: string;
  onBack: () => void;
}) {
  const [inputText, setInputText] = useState("");
  const thread = SWIPE_CHAT_THREADS[messageId] ?? [];

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className="absolute inset-0 z-20 bg-white flex flex-col"
    >
      {/* Header */}
      <div className="bg-teal-700 px-4 pt-4 pb-3 text-white flex items-center gap-3 flex-shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <InitialsAvatar initials={initials} size="sm" variant="gray" />
        <div className="flex-1 min-w-0">
          <div className="font-bold text-sm leading-tight truncate">{hospitalName}</div>
          <div className="text-teal-200 text-[10px]">病院採用担当</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
        {thread.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "doctor" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[78%] rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm ${
              msg.from === "doctor"
                ? "bg-teal-600 text-white rounded-tr-sm"
                : "bg-white text-gray-800 border border-gray-200 rounded-tl-sm"
            }`}>
              <p>{msg.text}</p>
              <p className={`text-[10px] mt-1 text-right ${msg.from === "doctor" ? "text-teal-200" : "text-gray-400"}`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 px-3 py-2 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="メッセージを入力..."
          className="flex-1 text-xs bg-gray-100 rounded-full px-3 py-2 outline-none placeholder-gray-400"
        />
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setInputText("")}
          className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0"
        >
          <Send className="w-3.5 h-3.5 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
}

function DoctorMessages() {
  const [openThread, setOpenThread] = useState<string | null>(null);

  const activeMessage = openThread ? doctorMessages.find((m) => m.id === openThread) : null;

  return (
    <div className="h-full bg-white relative">
      <div className="bg-teal-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">メッセージ</h1>
      </div>
      <div className="divide-y divide-gray-100">
        {doctorMessages.map((m) => (
          <button
            key={m.id}
            onClick={() => setOpenThread(m.id)}
            className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors text-left"
          >
            <InitialsAvatar initials={m.initials} variant="gray" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-800">{m.name}</div>
              <div className="text-xs text-gray-400 truncate">{m.preview}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] text-gray-400">{m.time}</span>
              {m.unread && <span className="w-2 h-2 rounded-full bg-teal-500" />}
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openThread && activeMessage && (
          <DoctorChatThread
            key={openThread}
            messageId={openThread}
            hospitalName={activeMessage.name}
            initials={activeMessage.initials}
            onBack={() => setOpenThread(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ===== Hospital Side =====
function HospitalSwipeFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hireCount, setHireCount] = useState(0);
  const [matchedDoctor, setMatchedDoctor] = useState<string | null>(null);

  const isDone = currentIndex >= doctors.length;

  const handleSwipe = (dir: number) => {
    if (isDone) return;
    if (dir === 1) {
      setMatchedDoctor(doctors[currentIndex].name);
      setTimeout(() => setMatchedDoctor(null), 1800);
      setHireCount((prev) => prev + 1);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const d = isDone ? doctors[0] : doctors[currentIndex];
  const dotCount = Math.min(doctors.length, 5);

  return (
    <div className="h-full bg-gray-50 flex flex-col relative">
      <div className="px-5 pt-4 pb-3 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-orange-500" /> MedMatch
            <span className="text-xs font-normal text-gray-400">for Hospital</span>
          </h1>
          <div className="flex gap-1 items-center">
            {Array.from({ length: dotCount }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === (isDone ? dotCount : currentIndex % dotCount) ? 16 : 6,
                  backgroundColor: i === (isDone ? dotCount : currentIndex % dotCount) ? "#f97316" : "#e5e7eb",
                }}
                transition={{ duration: 0.3 }}
                className="h-1.5 rounded-full"
              />
            ))}
          </div>
        </div>
        <p className="text-[11px] text-gray-400 mt-0.5">候補者をスワイプで確認</p>
      </div>

      <div className="flex-1 px-4 py-3 relative overflow-hidden">
        {isDone ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="h-full flex flex-col items-center justify-center gap-4"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-300 flex items-center justify-center shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <div className="text-center">
              <h2 className="text-base font-bold text-gray-800">全ての医師を確認しました！</h2>
              <p className="text-sm text-orange-500 font-semibold mt-1">{hireCount}名にHIREを送りました</p>
            </div>
            <div className="flex flex-col gap-2 w-full px-6">
              <button
                onClick={() => { setCurrentIndex(0); setHireCount(0); }}
                className="w-full py-2.5 rounded-xl border-2 border-orange-400 text-orange-600 font-bold text-sm hover:bg-orange-50 transition-colors"
              >
                最初からやり直す
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* peek card behind */}
            <div className="absolute inset-x-8 top-5 bottom-16 bg-white rounded-2xl border border-gray-100 shadow-sm opacity-60 scale-[0.93]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="relative z-10"
              >
                <DraggableDoctorCard d={d} onSwipe={handleSwipe} />
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Match notification */}
      <AnimatePresence>
        {matchedDoctor && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          >
            <div className="bg-orange-500 text-white rounded-2xl px-6 py-4 shadow-2xl text-center max-w-[240px]">
              <Heart className="w-8 h-8 mx-auto mb-2 fill-white" />
              <div className="text-lg font-black">興味あり登録!</div>
              <div className="text-xs text-orange-100 mt-1 leading-tight">{matchedDoctor}先生を<br />候補リストに追加しました</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isDone && (
        <div className="flex items-center justify-center gap-5 pb-4 pt-2 bg-white border-t border-gray-100">
          <button
            onClick={() => handleSwipe(-1)}
            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shadow-sm border border-gray-200 text-gray-500 hover:bg-red-50 hover:border-red-200 hover:text-red-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleSwipe(0)}
            className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shadow-sm border border-orange-200 text-orange-600 hover:bg-orange-100 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => handleSwipe(1)}
            className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shadow-sm text-white hover:bg-orange-600 transition-colors"
          >
            <Heart className="w-5 h-5" />
          </motion.button>
        </div>
      )}
    </div>
  );
}

function HospitalCandidates() {
  const stages = [
    { label: "新規", count: 3 },
    { label: "コンタクト", count: 2 },
    { label: "面談", count: 1 },
    { label: "オファー", count: 0 },
  ];
  return (
    <div className="h-full bg-white">
      <div className="bg-orange-600 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">候補者管理</h1>
      </div>
      <div className="flex gap-1.5 px-5 py-3 overflow-x-auto">
        {stages.map((s, i) => (
          <button key={s.label} className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${i === 0 ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}>
            {s.label} ({s.count})
          </button>
        ))}
      </div>
      <div className="px-5 space-y-2.5">
        {doctors.slice(0, 3).map((d) => (
          <div key={d.id} className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-200 flex items-center gap-3">
            <InitialsAvatar initials={d.initials} variant="orange" size="sm" />
            <div className="flex-1">
              <div className="font-semibold text-sm text-gray-800">{d.name}</div>
              <div className="text-[11px] text-gray-400">{d.specialty} ・ マッチ率 {d.matchScore}%</div>
            </div>
            <span className="px-2 py-1 rounded text-[10px] font-semibold bg-teal-50 text-teal-600">新規</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HospitalMessages() {
  return (
    <div className="h-full bg-white">
      <div className="bg-orange-600 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">メッセージ</h1>
      </div>
      <div className="divide-y divide-gray-100">
        {hospitalMessages.map((m) => (
          <div key={m.id} className="flex items-center gap-3 px-5 py-3.5">
            <InitialsAvatar initials={m.initials} variant="orange" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-800">{m.name}</div>
              <div className="text-xs text-gray-400 truncate">{m.preview}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] text-gray-400">{m.time}</span>
              {m.unread && <span className="w-2 h-2 rounded-full bg-orange-500" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== Badge icon helper =====
function BadgeIcon({ icon, count }: { icon: ReactNode; count: number }) {
  return (
    <div className="relative">
      {icon}
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
}

// ===== Main Export =====
export default function PlanASwipe() {
  const [doctorTab, setDoctorTab] = useState(0);
  const [hospitalTab, setHospitalTab] = useState(0);
  const [doctorUnread, setDoctorUnread] = useState(2);
  const [hospitalUnread, setHospitalUnread] = useState(2);

  const handleDoctorTabSelect = (i: number) => {
    setDoctorTab(i);
    if (i === 2) setDoctorUnread(0);
  };

  const handleHospitalTabSelect = (i: number) => {
    setHospitalTab(i);
    if (i === 2) setHospitalUnread(0);
  };

  const doctorTabs: { icon: ReactNode; label: string }[] = [
    { icon: <Stethoscope className="w-4.5 h-4.5" />, label: "マッチ" },
    { icon: <User className="w-4.5 h-4.5" />, label: "プロフィール" },
    { icon: <BadgeIcon icon={<MessageCircle className="w-4.5 h-4.5" />} count={doctorUnread} />, label: "メッセージ" },
  ];
  const hospitalTabs: { icon: ReactNode; label: string }[] = [
    { icon: <Stethoscope className="w-4.5 h-4.5" />, label: "候補者発見" },
    { icon: <ClipboardList className="w-4.5 h-4.5" />, label: "管理" },
    { icon: <BadgeIcon icon={<MessageCircle className="w-4.5 h-4.5" />} count={hospitalUnread} />, label: "メッセージ" },
  ];

  const doctorScreens = [
    <DoctorSwipeFeed onGoToMessages={() => handleDoctorTabSelect(2)} />,
    <DoctorProfile />,
    <DoctorMessages />,
  ];
  const hospitalScreens = [<HospitalSwipeFeed />, <HospitalCandidates />, <HospitalMessages />];

  return (
    <div className="flex flex-wrap justify-center gap-10">
      <div>
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-teal-50 text-sm font-semibold text-teal-700 border border-teal-200">
            <User className="w-4 h-4" /> 医師側 UI
          </span>
        </div>
        <PhoneFrame label={doctorTabs[doctorTab].label}>
          <div className="relative h-full">
            {doctorScreens[doctorTab]}
            <TabBar tabs={doctorTabs} activeIndex={doctorTab} onSelect={handleDoctorTabSelect} accentColor="#0d9488" />
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
            <TabBar tabs={hospitalTabs} activeIndex={hospitalTab} onSelect={handleHospitalTabSelect} accentColor="#f97316" />
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
