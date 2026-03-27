/**
 * Plan A: Skill Card Swipe Style (MedMatch)
 * Design: Teal (#0d9488) + Coral (#f97316) accent, warm gradients
 * Concept: Tinder-like card swiping for intuitive matching
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneFrame from "../PhoneFrame";
import TabBar from "../TabBar";
import { hospitals, doctors, doctorMessages, hospitalMessages } from "@/lib/mockData";

// ===== Doctor Side =====
function DoctorSwipeFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const h = hospitals[currentIndex % hospitals.length];

  const swipe = (dir: number) => {
    setDirection(dir);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setDirection(0);
    }, 300);
  };

  return (
    <div className="h-full bg-gradient-to-b from-teal-50 to-white flex flex-col">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-xl font-bold text-teal-800 flex items-center gap-2">
          <span className="text-2xl">💊</span> MedMatch
        </h1>
        <p className="text-xs text-teal-600 mt-0.5">スワイプで直感的にマッチング</p>
      </div>

      {/* Card */}
      <div className="flex-1 px-5 pb-2 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: direction > 0 ? 300 : direction < 0 ? -300 : 0, opacity: 0, rotate: direction * 5 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            exit={{ x: direction > 0 ? 300 : -300, opacity: 0, rotate: direction * 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-teal-100"
          >
            {/* Hospital header */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
                  {h.avatar}
                </div>
                <div>
                  <h2 className="text-lg font-bold">{h.name}</h2>
                  <p className="text-teal-100 text-sm">{h.department} {h.type} ・ {h.location}</p>
                </div>
              </div>
            </div>

            {/* Match score */}
            <div className="px-5 py-3 flex items-center gap-3 bg-teal-50/50">
              <div className="text-3xl font-bold text-teal-600">{h.matchScore}%</div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-teal-700 mb-1">マッチ度</div>
                <div className="h-2 bg-teal-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full" style={{ width: `${h.matchScore}%` }} />
                </div>
              </div>
            </div>

            {/* Radar chart placeholder */}
            <div className="px-5 py-3">
              <div className="text-xs font-semibold text-gray-500 mb-2">スキルマッチ分析</div>
              <div className="grid grid-cols-3 gap-2">
                {["手術実績", "専門資格", "指導経験", "論文数", "学会活動", "チーム医療"].map((label, i) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full border-3 flex items-center justify-center text-xs font-bold"
                      style={{
                        borderColor: i < 3 ? "#0d9488" : "#f97316",
                        color: i < 3 ? "#0d9488" : "#f97316",
                      }}>
                      {[95, 90, 85, 80, 75, 88][i]}
                    </div>
                    <span className="text-[10px] text-gray-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="px-5 pb-3">
              <div className="flex flex-wrap gap-1.5">
                {h.features.map((f) => (
                  <span key={f} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-teal-50 text-teal-700 border border-teal-200">
                    {f}
                  </span>
                ))}
                <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-orange-50 text-orange-600 border border-orange-200">
                  {h.salary}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-5 pb-4 pt-2">
        <button onClick={() => swipe(-1)} className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl shadow-md hover:bg-gray-200 transition-colors border border-gray-200">
          ✕
        </button>
        <button onClick={() => swipe(0)} className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-lg shadow-md hover:bg-blue-100 transition-colors border border-blue-200">
          ⭐
        </button>
        <button onClick={() => swipe(1)} className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center text-2xl shadow-lg text-white hover:shadow-xl transition-all">
          ❤️
        </button>
      </div>
    </div>
  );
}

function DoctorProfile() {
  return (
    <div className="h-full bg-gradient-to-b from-teal-50 to-white">
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-5 pt-4 pb-8 text-white">
        <h1 className="text-lg font-bold">プロフィール</h1>
      </div>
      <div className="px-5 -mt-4">
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-teal-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center text-3xl">👨‍⚕️</div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">田中 太郎</h2>
              <p className="text-sm text-teal-600">心臓外科専門医 ・ 経験15年</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 mb-1.5">専門スキル</h3>
              <div className="flex flex-wrap gap-1.5">
                {["冠動脈バイパス術", "弁膜症手術", "MICS", "TAVI"].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-teal-500 text-white">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-400 mb-1.5">資格</h3>
              <div className="flex flex-wrap gap-1.5">
                {["心臓血管外科専門医", "外科指導医"].map((c) => (
                  <span key={c} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-orange-50 text-orange-600 border border-orange-200">{c}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="text-center p-3 bg-teal-50 rounded-xl">
                <div className="text-xl font-bold text-teal-600">2,500</div>
                <div className="text-[10px] text-gray-500">手術件数</div>
              </div>
              <div className="text-center p-3 bg-teal-50 rounded-xl">
                <div className="text-xl font-bold text-teal-600">32</div>
                <div className="text-[10px] text-gray-500">論文数</div>
              </div>
              <div className="text-center p-3 bg-teal-50 rounded-xl">
                <div className="text-xl font-bold text-teal-600">15年</div>
                <div className="text-[10px] text-gray-500">経験年数</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-teal-100 mt-4">
          <h3 className="text-xs font-semibold text-gray-400 mb-2">希望条件</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between"><span>雇用形態</span><span className="font-medium">常勤</span></div>
            <div className="flex justify-between"><span>希望エリア</span><span className="font-medium">関東・関西</span></div>
            <div className="flex justify-between"><span>希望年収</span><span className="font-medium">1,500万以上</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DoctorMessages() {
  return (
    <div className="h-full bg-gradient-to-b from-teal-50 to-white">
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">メッセージ</h1>
      </div>
      <div className="divide-y divide-gray-100">
        {doctorMessages.map((m) => (
          <div key={m.id} className="flex items-center gap-3 px-5 py-4 hover:bg-teal-50/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-xl flex-shrink-0">{m.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-800">{m.name}</div>
              <div className="text-xs text-gray-400 truncate">{m.preview}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] text-gray-400">{m.time}</span>
              {m.unread && <span className="w-2 h-2 rounded-full bg-teal-500" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== Hospital Side =====
function HospitalSwipeFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const d = doctors[currentIndex % doctors.length];

  const swipe = (dir: number) => {
    setDirection(dir);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setDirection(0);
    }, 300);
  };

  return (
    <div className="h-full bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-xl font-bold text-orange-700 flex items-center gap-2">
          <span className="text-2xl">💊</span> MedMatch <span className="text-xs font-normal text-orange-400">for Hospital</span>
        </h1>
        <p className="text-xs text-orange-500 mt-0.5">最適な医師をスワイプで発見</p>
      </div>

      <div className="flex-1 px-5 pb-2 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: direction > 0 ? 300 : direction < 0 ? -300 : 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100"
          >
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">{d.avatar}</div>
                <div>
                  <h2 className="text-lg font-bold">{d.name} 先生</h2>
                  <p className="text-orange-100 text-sm">{d.specialty} ・ 経験{d.experience}年</p>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 flex items-center gap-3 bg-orange-50/50">
              <div className="text-3xl font-bold text-orange-600">{d.matchScore}%</div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-orange-700 mb-1">マッチ度</div>
                <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" style={{ width: `${d.matchScore}%` }} />
                </div>
              </div>
            </div>

            <div className="px-5 py-3">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {d.skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-teal-50 text-teal-700 border border-teal-200">{s}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {d.certifications.map((c) => (
                  <span key={c} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-orange-50 text-orange-600 border border-orange-200">{c}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 px-5 pb-4">
              <div className="text-center p-2.5 bg-gray-50 rounded-xl">
                <div className="text-lg font-bold text-gray-700">{d.surgeries.toLocaleString()}</div>
                <div className="text-[10px] text-gray-500">手術件数</div>
              </div>
              <div className="text-center p-2.5 bg-gray-50 rounded-xl">
                <div className="text-lg font-bold text-gray-700">{d.papers}</div>
                <div className="text-[10px] text-gray-500">論文数</div>
              </div>
              <div className="text-center p-2.5 bg-gray-50 rounded-xl">
                <div className="text-lg font-bold text-gray-700">{d.experience}年</div>
                <div className="text-[10px] text-gray-500">経験年数</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-5 pb-4 pt-2">
        <button onClick={() => swipe(-1)} className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl shadow-md border border-gray-200">✕</button>
        <button onClick={() => swipe(0)} className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-lg shadow-md border border-blue-200">📨</button>
        <button onClick={() => swipe(1)} className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-2xl shadow-lg text-white">❤️</button>
      </div>
    </div>
  );
}

function HospitalCandidates() {
  const stages = [
    { label: "新規", count: 3, color: "bg-teal-500" },
    { label: "コンタクト", count: 2, color: "bg-orange-500" },
    { label: "面談", count: 1, color: "bg-blue-500" },
    { label: "オファー", count: 0, color: "bg-pink-500" },
  ];
  return (
    <div className="h-full bg-gradient-to-b from-orange-50 to-white">
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-5 pt-4 pb-4 text-white">
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
          <div key={d.id} className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-teal-100 flex items-center justify-center text-xl">{d.avatar}</div>
            <div className="flex-1">
              <div className="font-semibold text-sm text-gray-800">{d.name}</div>
              <div className="text-[11px] text-gray-400">{d.specialty} ・ マッチ率 {d.matchScore}%</div>
            </div>
            <span className="px-2 py-1 rounded-md text-[10px] font-semibold bg-teal-50 text-teal-600">新規</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HospitalMessages() {
  return (
    <div className="h-full bg-gradient-to-b from-orange-50 to-white">
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">メッセージ</h1>
      </div>
      <div className="divide-y divide-gray-100">
        {hospitalMessages.map((m) => (
          <div key={m.id} className="flex items-center gap-3 px-5 py-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl flex-shrink-0">{m.avatar}</div>
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

// ===== Main Export =====
export default function PlanASwipe() {
  const [doctorTab, setDoctorTab] = useState(0);
  const [hospitalTab, setHospitalTab] = useState(0);

  const doctorTabs = [
    { icon: "💊", label: "マッチ" },
    { icon: "👤", label: "プロフィール" },
    { icon: "💬", label: "メッセージ" },
  ];
  const hospitalTabs = [
    { icon: "💊", label: "候補者発見" },
    { icon: "📋", label: "管理" },
    { icon: "💬", label: "メッセージ" },
  ];

  const doctorScreens = [<DoctorSwipeFeed />, <DoctorProfile />, <DoctorMessages />];
  const hospitalScreens = [<HospitalSwipeFeed />, <HospitalCandidates />, <HospitalMessages />];

  return (
    <div className="flex flex-wrap justify-center gap-10">
      {/* Doctor side */}
      <div>
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-light text-sm font-semibold text-teal-300">
            👨‍⚕️ 医師側 UI
          </span>
        </div>
        <PhoneFrame label={doctorTabs[doctorTab].label}>
          <div className="relative h-full">
            {doctorScreens[doctorTab]}
            <TabBar tabs={doctorTabs} activeIndex={doctorTab} onSelect={setDoctorTab} accentColor="#0d9488" />
          </div>
        </PhoneFrame>
      </div>

      {/* Hospital side */}
      <div>
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-light text-sm font-semibold text-orange-300">
            🏥 病院側 UI
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
