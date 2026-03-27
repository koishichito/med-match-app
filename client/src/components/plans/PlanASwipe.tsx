/**
 * Plan A: Skill Card Swipe Style (MedMatch)
 * Design: Teal primary, warm accent, clean card UI
 * No emoji, Lucide icons only, restrained gradients
 */
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneFrame from "../PhoneFrame";
import TabBar from "../TabBar";
import { hospitals, doctors, doctorMessages, hospitalMessages } from "@/lib/mockData";
import {
  Heart, X, Send, Stethoscope, User, MessageCircle,
  Users, ClipboardList, Building2, MapPin, Award, FileText, Scissors
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
    <div className="h-full bg-white flex flex-col">
      <div className="px-5 pt-4 pb-3 border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-teal-600" /> MedMatch
        </h1>
        <p className="text-[11px] text-gray-400 mt-0.5">スワイプで直感的にマッチング</p>
      </div>

      <div className="flex-1 px-4 py-3 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: direction > 0 ? 300 : direction < 0 ? -300 : 0, opacity: 0, rotate: direction * 5 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            exit={{ x: direction > 0 ? 300 : -300, opacity: 0, rotate: direction * 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200"
          >
            <div className="bg-teal-700 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center font-bold text-lg">
                  {h.initials}
                </div>
                <div>
                  <h2 className="text-base font-bold">{h.name}</h2>
                  <p className="text-teal-200 text-xs">{h.department} {h.type} ・ {h.location}</p>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 flex items-center gap-3 bg-teal-50">
              <div className="text-2xl font-bold text-teal-700">{h.matchScore}%</div>
              <div className="flex-1">
                <div className="text-[10px] font-semibold text-teal-600 mb-1">マッチ度</div>
                <div className="h-1.5 bg-teal-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-600 rounded-full" style={{ width: `${h.matchScore}%` }} />
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
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-5 pb-4 pt-2">
        <button onClick={() => swipe(-1)} className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shadow-sm border border-gray-200 text-gray-500 hover:bg-gray-200 transition-colors">
          <X className="w-5 h-5" />
        </button>
        <button onClick={() => swipe(0)} className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shadow-sm border border-teal-200 text-teal-600 hover:bg-teal-100 transition-colors">
          <Send className="w-4 h-4" />
        </button>
        <button onClick={() => swipe(1)} className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center shadow-sm text-white hover:bg-teal-700 transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function DoctorProfile() {
  return (
    <div className="h-full bg-white">
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

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 mb-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Scissors className="w-3.5 h-3.5" /> 実績
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-800">2,500</div>
              <div className="text-[10px] text-gray-500">手術件数</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-800">32</div>
              <div className="text-[10px] text-gray-500">論文数</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-800">15年</div>
              <div className="text-[10px] text-gray-500">経験年数</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DoctorMessages() {
  return (
    <div className="h-full bg-white">
      <div className="bg-teal-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">メッセージ</h1>
      </div>
      <div className="divide-y divide-gray-100">
        {doctorMessages.map((m) => (
          <div key={m.id} className="flex items-center gap-3 px-5 py-3.5">
            <InitialsAvatar initials={m.initials} variant="gray" />
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
    <div className="h-full bg-white flex flex-col">
      <div className="px-5 pt-4 pb-3 border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-orange-500" /> MedMatch
          <span className="text-xs font-normal text-gray-400 ml-1">for Hospital</span>
        </h1>
        <p className="text-[11px] text-gray-400 mt-0.5">候補者をスワイプで確認</p>
      </div>

      <div className="flex-1 px-4 py-3 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: direction > 0 ? 300 : direction < 0 ? -300 : 0, opacity: 0, rotate: direction * 5 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            exit={{ x: direction > 0 ? 300 : -300, opacity: 0, rotate: direction * 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200"
          >
            <div className="bg-orange-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center font-bold text-lg">
                  {d.initials}
                </div>
                <div>
                  <h2 className="text-base font-bold">{d.name} 先生</h2>
                  <p className="text-orange-200 text-xs">{d.specialty} ・ 経験{d.experience}年</p>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 flex items-center gap-3 bg-orange-50">
              <div className="text-2xl font-bold text-orange-600">{d.matchScore}%</div>
              <div className="flex-1">
                <div className="text-[10px] font-semibold text-orange-600 mb-1">マッチ度</div>
                <div className="h-1.5 bg-orange-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: `${d.matchScore}%` }} />
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
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-5 pb-4 pt-2">
        <button onClick={() => swipe(-1)} className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shadow-sm border border-gray-200 text-gray-500 hover:bg-gray-200 transition-colors">
          <X className="w-5 h-5" />
        </button>
        <button onClick={() => swipe(0)} className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shadow-sm border border-orange-200 text-orange-600 hover:bg-orange-100 transition-colors">
          <Send className="w-4 h-4" />
        </button>
        <button onClick={() => swipe(1)} className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shadow-sm text-white hover:bg-orange-600 transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>
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

// ===== Main Export =====
export default function PlanASwipe() {
  const [doctorTab, setDoctorTab] = useState(0);
  const [hospitalTab, setHospitalTab] = useState(0);

  const doctorTabs: { icon: ReactNode; label: string }[] = [
    { icon: <Stethoscope className="w-4.5 h-4.5" />, label: "マッチ" },
    { icon: <User className="w-4.5 h-4.5" />, label: "プロフィール" },
    { icon: <MessageCircle className="w-4.5 h-4.5" />, label: "メッセージ" },
  ];
  const hospitalTabs: { icon: ReactNode; label: string }[] = [
    { icon: <Stethoscope className="w-4.5 h-4.5" />, label: "候補者発見" },
    { icon: <ClipboardList className="w-4.5 h-4.5" />, label: "管理" },
    { icon: <MessageCircle className="w-4.5 h-4.5" />, label: "メッセージ" },
  ];

  const doctorScreens = [<DoctorSwipeFeed />, <DoctorProfile />, <DoctorMessages />];
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
            <TabBar tabs={doctorTabs} activeIndex={doctorTab} onSelect={setDoctorTab} accentColor="#0d9488" />
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
