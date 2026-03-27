/**
 * Plan B: Professional Dashboard Style (MedConnect)
 * Design: Navy + Emerald accent, clean professional UI
 * No emoji, Lucide icons only, restrained gradients
 */
import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneFrame from "../PhoneFrame";
import TabBar from "../TabBar";
import { hospitals, doctors, doctorMessages, hospitalMessages } from "@/lib/mockData";
import {
  LayoutDashboard, User, Search, MessageCircle,
  ClipboardList, Users, Building2, MapPin, Award,
  FileText, Briefcase, ChevronRight, ChevronDown, Filter, X, TrendingUp, Send,
  Eye, Target, BookmarkCheck, Heart, Plus, Minus, CheckCircle
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";

function InitialsAvatar({ initials, size = "md", variant = "navy" }: { initials: string; size?: "sm" | "md" | "lg"; variant?: "navy" | "emerald" | "gray" }) {
  const sizeMap = { sm: "w-9 h-9 text-xs", md: "w-11 h-11 text-sm", lg: "w-14 h-14 text-lg" };
  const variantMap = {
    navy: "bg-slate-100 text-slate-700",
    emerald: "bg-emerald-50 text-emerald-700",
    gray: "bg-gray-100 text-gray-600",
  };
  return (
    <div className={`${sizeMap[size]} ${variantMap[variant]} rounded-lg flex items-center justify-center font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

function BadgedIcon({ icon, count }: { icon: ReactNode; count: number }) {
  return (
    <div className="relative">
      {icon}
      {count > 0 && (
        <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center leading-none">
          {count}
        </span>
      )}
    </div>
  );
}

// ===== Doctor Side =====
function DoctorDashboard() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const stats = [
    { value: "12", label: "マッチ", color: "text-emerald-600", bg: "bg-emerald-50" },
    { value: "48", label: "閲覧数", color: "text-blue-600", bg: "bg-blue-50" },
    { value: "3", label: "スカウト", color: "text-orange-500", bg: "bg-orange-50" },
  ];

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-[#1e3a5f] px-5 pt-4 pb-5 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Briefcase className="w-5 h-5" /> MedConnect
        </h1>
        <p className="text-xs text-blue-200 mt-0.5">プロフェッショナル・マッチング</p>
      </div>

      <div className="px-5 -mt-3">
        <div className="grid grid-cols-3 gap-2.5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
              className={`bg-white rounded-xl p-3 shadow-sm text-center border border-gray-200`}
            >
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="bg-[#1e3a5f]/5 rounded-xl p-3 border border-[#1e3a5f]/10 mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#1e3a5f]" />
          <p className="text-xs text-[#1e3a5f] font-medium">マッチ率が先週比 +8% 上昇しています</p>
        </div>

        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-gray-800">おすすめの病院</h2>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
            すべて見る <ChevronRight className="w-3 h-3" />
          </span>
        </div>
        <div className="space-y-2.5">
          {hospitals.map((h, i) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 + 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer"
              onClick={() => setExpandedId(expandedId === h.id ? null : h.id)}
            >
              <div className="p-3.5">
                <div className="flex items-start gap-3">
                  <InitialsAvatar initials={h.initials} variant="navy" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm text-gray-800 truncate">{h.name}</h3>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-emerald-600">{h.matchScore}%</span>
                        <motion.div
                          animate={{ rotate: expandedId === h.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                        </motion.div>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">{h.department} {h.type} ・ {h.location}</p>
                    <div className="h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-emerald-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${h.matchScore}%` }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.07 + 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {expandedId === h.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-gray-100"
                  >
                    <div className="px-3.5 py-3 bg-gray-50">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {h.features.map((f) => (
                          <span key={f} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">{f}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                        <MapPin className="w-3 h-3" /> {h.location} ・ {h.beds}床
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-emerald-700">{h.salary}</span>
                        <button className="px-3 py-1 bg-[#1e3a5f] text-white text-[11px] font-semibold rounded-lg">
                          詳細を見る
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DoctorDetailProfile() {
  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-[#1e3a5f] px-5 pt-4 pb-8 text-white">
        <h1 className="text-lg font-bold">マイプロフィール</h1>
      </div>
      <div className="px-5 -mt-5 space-y-3">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <InitialsAvatar initials="田中" size="lg" variant="navy" />
            <div>
              <h2 className="text-base font-bold text-gray-800">田中 太郎</h2>
              <p className="text-xs text-gray-500">心臓外科専門医 ・ 経験15年</p>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> 転職検討中
              </p>
            </div>
          </div>
          <div className="h-px bg-gray-100 mb-3" />
          <div className="text-xs text-gray-600 leading-relaxed">
            心臓血管外科領域で15年の経験を持ち、冠動脈バイパス術を中心に2,500件以上の手術実績があります。指導医として後進の育成にも注力しています。
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" /> 職歴
          </h3>
          <div className="space-y-3">
            {[
              { period: "2018 - 現在", role: "心臓外科 部長", place: "○○大学病院" },
              { period: "2013 - 2018", role: "心臓外科 医長", place: "△△総合病院" },
              { period: "2011 - 2013", role: "心臓外科 医員", place: "□□医療センター" },
            ].map((exp, i) => (
              <motion.div
                key={exp.period}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-3"
              >
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1" />
                  <div className="w-px flex-1 bg-gray-200" />
                </div>
                <div className="pb-2">
                  <div className="text-[11px] text-gray-400">{exp.period}</div>
                  <div className="text-sm font-semibold text-gray-800">{exp.role}</div>
                  <div className="text-xs text-gray-500">{exp.place}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" /> 資格・認定
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {["心臓血管外科専門医", "外科指導医", "日本外科学会専門医"].map((c) => (
              <span key={c} className="px-2.5 py-1 rounded text-[11px] font-medium bg-[#1e3a5f] text-white">{c}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 mb-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> 研究実績
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 bg-slate-50 rounded-lg text-center">
              <div className="text-lg font-bold text-slate-700">32</div>
              <div className="text-[10px] text-gray-500">論文数</div>
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-lg text-center">
              <div className="text-lg font-bold text-emerald-700">15</div>
              <div className="text-[10px] text-gray-500">学会発表</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ALL_SPECIALTIES = ["内科", "外科", "心臓外科", "循環器内科", "整形外科", "小児科", "産婦人科", "麻酔科"];
const ADDABLE_SKILLS = ["低侵襲手術", "術後管理", "後進指導", "冠動脈バイパス", "チーム医療", "緩和ケア", "救急対応", "ICU管理"];

function DoctorProfileEdit() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("心臓外科");
  const [experience, setExperience] = useState(15);
  const [skills, setSkills] = useState(["心臓血管外科専門医", "外科指導医", "日本外科学会専門医"]);
  const [showAddSkills, setShowAddSkills] = useState(false);
  const [jobPrefs, setJobPrefs] = useState<Record<string, boolean>>({
    常勤希望: true,
    研究環境重視: false,
    指導医希望: true,
    遠方転居可: false,
  });
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const addSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills((prev) => [...prev, skill]);
    }
  };

  const togglePref = (key: string) => {
    setJobPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16 relative">
      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: -48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -48, opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="absolute top-2 left-1/2 -translate-x-1/2 z-50 bg-[#1e3a5f] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 whitespace-nowrap"
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            プロフィールを保存しました
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-[#1e3a5f] px-5 pt-4 pb-4 text-white flex items-center justify-between">
        <h1 className="text-lg font-bold">プロフィール編集</h1>
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={handleSave}
          className="px-4 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-lg"
        >
          保存
        </motion.button>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* 基本情報 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" /> 基本情報
          </h2>

          {/* Name (read-only) */}
          <div className="mb-3">
            <label className="text-[11px] text-gray-400 font-medium block mb-1">氏名</label>
            <div className="bg-gray-50 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 border border-gray-100">
              田中 太郎
            </div>
          </div>

          {/* Specialty chips */}
          <div className="mb-3">
            <label className="text-[11px] text-gray-400 font-medium block mb-1.5">専門科</label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_SPECIALTIES.map((sp) => (
                <motion.button
                  key={sp}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedSpecialty(sp)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    selectedSpecialty === sp
                      ? "bg-[#1e3a5f] text-white"
                      : "bg-gray-100 text-gray-500 border border-gray-200"
                  }`}
                >
                  {sp}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Experience stepper */}
          <div>
            <label className="text-[11px] text-gray-400 font-medium block mb-1.5">経験年数</label>
            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setExperience((v) => Math.max(1, v - 1))}
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 border border-gray-200"
              >
                <Minus className="w-3.5 h-3.5" />
              </motion.button>
              <span className="text-base font-bold text-[#1e3a5f] w-12 text-center">{experience} 年</span>
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setExperience((v) => Math.min(30, v + 1))}
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 border border-gray-200"
              >
                <Plus className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* スキル・専門領域 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" /> スキル・専門領域
          </h2>

          {/* Current skills with remove */}
          <div className="flex flex-wrap gap-1.5 mb-3 min-h-[28px]">
            <AnimatePresence>
              {skills.map((skill) => (
                <motion.div
                  key={skill}
                  initial={{ scale: 0.75, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.75, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1e3a5f] text-white text-[11px] font-semibold"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-0.5 opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Add skill toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddSkills((v) => !v)}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 border border-emerald-200 rounded-lg px-3 py-1.5 bg-emerald-50"
          >
            <Plus className="w-3 h-3" />
            スキルを追加
          </motion.button>

          <AnimatePresence>
            {showAddSkills && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-3 flex flex-wrap gap-1.5">
                  {ADDABLE_SKILLS.filter((s) => !skills.includes(s)).map((s) => (
                    <motion.button
                      key={s}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addSkill(s)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-[11px] font-semibold border border-gray-200"
                    >
                      <Plus className="w-3 h-3 text-emerald-500" />
                      {s}
                    </motion.button>
                  ))}
                  {ADDABLE_SKILLS.filter((s) => !skills.includes(s)).length === 0 && (
                    <span className="text-[11px] text-gray-400">追加できるスキルはありません</span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 求職条件 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" /> 求職条件
          </h2>
          <div className="space-y-2.5">
            {(Object.keys(jobPrefs) as Array<keyof typeof jobPrefs>).map((key) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 font-medium">{key}</span>
                <motion.button
                  onClick={() => togglePref(key)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
                    jobPrefs[key] ? "bg-[#1e3a5f]" : "bg-gray-200"
                  }`}
                  whileTap={{ scale: 0.93 }}
                >
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                    style={{ left: jobPrefs[key] ? "calc(100% - 20px)" : "4px" }}
                  />
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DoctorSearch() {
  const allFilters = [
    { label: "心臓外科", category: "科" },
    { label: "循環器内科", category: "科" },
    { label: "常勤", category: "形態" },
    { label: "非常勤", category: "形態" },
    { label: "関東", category: "エリア" },
    { label: "関西", category: "エリア" },
    { label: "1,500万以上", category: "年収" },
    { label: "300床以上", category: "規模" },
  ];
  const [activeFilters, setActiveFilters] = useState<string[]>(["心臓外科", "常勤", "関東"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const toggle = (label: string) => {
    setActiveFilters((prev) =>
      prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
    );
  };

  const resultCount = 4 + activeFilters.length * 2;

  const filteredHospitals = hospitals.filter((h) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return h.name.toLowerCase().includes(q) || h.department.toLowerCase().includes(q);
  });

  if (isLoading) {
    return (
      <div className="h-full bg-gray-50 overflow-y-auto pb-16">
        <div className="bg-[#1e3a5f] px-5 pt-4 pb-4 text-white">
          <h1 className="text-lg font-bold">検索</h1>
        </div>
        <div className="px-5 py-3 animate-pulse">
          {/* Search bar skeleton */}
          <div className="h-10 bg-gray-200 rounded-xl mb-4" />
          {/* Filter chips skeleton */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {[64, 80, 52, 72, 56, 68, 76, 60].map((w, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded-lg" style={{ width: w }} />
            ))}
          </div>
          {/* Search button skeleton */}
          <div className="h-10 bg-gray-200 rounded-xl mb-4" />
          {/* Result count skeleton */}
          <div className="h-3 bg-gray-200 rounded w-28 mb-3" />
          {/* Hospital card skeletons */}
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 flex items-center gap-3 mb-2">
              <div className="w-9 h-9 bg-gray-200 rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className={`h-3.5 bg-gray-200 rounded ${i === 0 ? "w-3/4" : i === 1 ? "w-2/3" : "w-4/5"}`} />
                <div className="h-2.5 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="w-8 h-5 bg-gray-200 rounded flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-[#1e3a5f] px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">検索</h1>
      </div>
      <div className="px-5 py-3">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 flex items-center gap-2 mb-4">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="病院名、診療科で検索..."
            className="text-sm text-gray-700 flex-1 bg-transparent outline-none placeholder-gray-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-gray-400 flex-shrink-0">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {searchQuery.trim() ? (
          <div className="mt-1">
            <div className="text-xs text-gray-400 mb-2">
              {filteredHospitals.length > 0 ? `検索結果 ${filteredHospitals.length}件` : "検索結果なし"}
            </div>
            {filteredHospitals.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-10 text-sm text-gray-400"
              >
                「{searchQuery}」に一致する病院が見つかりませんでした
              </motion.div>
            ) : (
              <div className="space-y-2">
                {filteredHospitals.map((h, i) => (
                  <motion.div
                    key={h.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 flex items-center gap-3"
                  >
                    <InitialsAvatar initials={h.initials} variant="navy" size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-800 truncate">{h.name}</div>
                      <div className="text-[11px] text-gray-400">{h.department} ・ {h.salary}</div>
                    </div>
                    <span className="text-sm font-bold text-emerald-600 flex-shrink-0">{h.matchScore}%</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> 絞り込み条件
            </h3>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {allFilters.map((f) => {
                const active = activeFilters.includes(f.label);
                return (
                  <motion.button
                    key={f.label}
                    onClick={() => toggle(f.label)}
                    whileTap={{ scale: 0.92 }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                      active
                        ? "bg-[#1e3a5f] text-white"
                        : "bg-white text-gray-500 border border-gray-200"
                    }`}
                  >
                    {f.label}
                    {active && (
                      <X className="inline w-2.5 h-2.5 ml-1 opacity-70" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {activeFilters.length > 0 && (
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-400">{activeFilters.length}件の条件を適用中</span>
                <button onClick={() => setActiveFilters([])} className="text-xs text-red-400 font-medium">すべて解除</button>
              </div>
            )}

            <motion.button
              whileTap={{ scale: 0.97 }}
              key={resultCount}
              className="w-full py-3 bg-[#1e3a5f] text-white rounded-xl font-semibold text-sm"
            >
              検索する（{resultCount}件）
            </motion.button>

            {activeFilters.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 space-y-2"
              >
                <div className="text-xs text-gray-400 mb-2">検索結果 {resultCount}件</div>
                {hospitals.slice(0, 3).map((h, i) => (
                  <motion.div
                    key={h.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 flex items-center gap-3"
                  >
                    <InitialsAvatar initials={h.initials} variant="navy" size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-800 truncate">{h.name}</div>
                      <div className="text-[11px] text-gray-400">{h.department} ・ {h.salary}</div>
                    </div>
                    <span className="text-sm font-bold text-emerald-600 flex-shrink-0">{h.matchScore}%</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const CHAT_THREAD = [
  { from: "hospital", text: "田中先生、当院の心臓外科ポジションについてご案内させてください。", time: "10:28" },
  { from: "doctor", text: "ありがとうございます。詳しくお聞かせいただけますか？", time: "10:30" },
  { from: "hospital", text: "年収は1,800万円〜を想定しております。手術件数も年間500件以上で、充実した環境です。", time: "10:31" },
  { from: "doctor", text: "条件面は魅力的ですね。一度見学をさせていただくことは可能でしょうか？", time: "10:32" },
  { from: "hospital", text: "もちろんです！ぜひ一度、見学にいらしてください。来週はいかがでしょうか？", time: "10:33" },
];

function DoctorChatThread({ threadId, onBack }: { threadId: string; onBack: () => void }) {
  const msg = doctorMessages.find((m) => m.id === threadId);
  const [messages, setMessages] = useState(CHAT_THREAD);
  const [draft, setDraft] = useState("");

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages((prev) => [...prev, { from: "doctor", text, time }]);
    setDraft("");
  };

  return (
    <motion.div
      className="h-full bg-gray-50 flex flex-col absolute inset-0 z-10"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.22 }}
    >
      <div className="bg-[#1e3a5f] px-4 pt-4 pb-4 text-white flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack} className="text-white/70 text-xs font-semibold">← 戻る</button>
        <div className="flex-1">
          <div className="font-semibold text-sm">{msg?.name}</div>
          <div className="text-[10px] text-blue-200">オンライン</div>
        </div>
      </div>
      <div className="flex-1 px-4 py-3 space-y-2.5 overflow-y-auto">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i < CHAT_THREAD.length ? i * 0.06 : 0 }}
            className={`flex ${m.from === "doctor" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
              m.from === "doctor"
                ? "bg-[#1e3a5f] text-white rounded-br-sm"
                : "bg-white text-gray-700 border border-gray-100 rounded-bl-sm shadow-sm"
            }`}>
              {m.text}
              <div className={`text-[9px] mt-1 ${m.from === "doctor" ? "text-blue-200" : "text-gray-400"}`}>{m.time}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="px-4 pb-[72px] pt-2 border-t border-gray-100 bg-white flex-shrink-0">
        <div className="flex gap-2 items-center bg-gray-100 rounded-xl px-3 py-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="メッセージを入力..."
            className="text-xs text-gray-700 flex-1 bg-transparent outline-none placeholder-gray-400"
          />
          <button
            onClick={sendMessage}
            className="w-7 h-7 rounded-full bg-[#1e3a5f] flex items-center justify-center flex-shrink-0"
          >
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function DoctorMsg() {
  const [openThread, setOpenThread] = useState<string | null>(null);

  return (
    <div className="h-full bg-gray-50 relative overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="bg-[#1e3a5f] px-5 pt-4 pb-4 text-white flex-shrink-0">
          <h1 className="text-lg font-bold">メッセージ</h1>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {doctorMessages.map((m) => (
            <button
              key={m.id}
              onClick={() => setOpenThread(m.id)}
              className="w-full flex items-center gap-3 px-5 py-3.5 bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <InitialsAvatar initials={m.initials} variant="navy" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-800">{m.name}</div>
                <div className="text-xs text-gray-400 truncate">{m.preview}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[11px] text-gray-400">{m.time}</span>
                {m.unread && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {openThread && (
          <DoctorChatThread
            key={openThread}
            threadId={openThread}
            onBack={() => setOpenThread(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── DoctorAnalytics data constants ──────────────────────────────────────────
const WEEKLY_DATA = [
  { day: "月", scouts: 2, views: 18 },
  { day: "火", scouts: 5, views: 24 },
  { day: "水", scouts: 3, views: 15 },
  { day: "木", scouts: 8, views: 31 },
  { day: "金", scouts: 4, views: 22 },
  { day: "土", scouts: 1, views: 8 },
  { day: "日", scouts: 2, views: 12 },
];

const SKILL_MATCH_DATA = [
  { subject: "手術実績", score: 95 },
  { subject: "論文数", score: 78 },
  { subject: "指導歴", score: 85 },
  { subject: "専門資格", score: 90 },
  { subject: "英語力", score: 60 },
];

const FUNNEL_DATA = [
  { label: "閲覧", count: 147 },
  { label: "スカウト", count: 23 },
  { label: "返信", count: 8 },
  { label: "面接", count: 3 },
];

function DoctorAnalytics() {
  const [likedHospitals, setLikedHospitals] = useState<Record<string, boolean>>(
    () => Object.fromEntries(hospitals.slice(0, 3).map((h) => [h.id, true]))
  );

  const toggleLike = (id: string) =>
    setLikedHospitals((prev) => ({ ...prev, [id]: !prev[id] }));

  const statCards = [
    { icon: Eye, label: "プロフィール閲覧数", value: "147", unit: "回", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { icon: Target, label: "スカウト受信数", value: "23", unit: "件", color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-100" },
    { icon: TrendingUp, label: "マッチング率", value: "73", unit: "%", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  ];

  const funnelMax = FUNNEL_DATA[0].count;

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-[#1e3a5f] px-5 pt-4 pb-5 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <TrendingUp className="w-5 h-5" /> アナリティクス
        </h1>
        <p className="text-xs text-blue-200 mt-0.5">過去30日間のデータ</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="px-5 -mt-3 mb-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-4 mb-2.5">マッチング概要</h2>
        <div className="grid grid-cols-3 gap-2">
          {statCards.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 280 }}
                className={`bg-white rounded-xl p-3 shadow-sm border ${s.border} text-center`}
              >
                <div className={`w-7 h-7 ${s.bg} rounded-lg flex items-center justify-center mx-auto mb-1.5`}>
                  <Icon className={`w-3.5 h-3.5 ${s.color}`} />
                </div>
                <div className={`text-xl font-bold ${s.color}`}>
                  {s.value}<span className="text-[10px] font-medium ml-0.5">{s.unit}</span>
                </div>
                <div className="text-[9px] text-gray-400 mt-0.5 leading-tight">{s.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Weekly Bar Chart (Recharts) ── */}
      <div className="px-5 mb-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">週別アクティビティ</h2>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
          {/* Legend */}
          <div className="flex items-center gap-3 mb-2 justify-end">
            <span className="flex items-center gap-1 text-[10px] text-gray-500">
              <span className="w-2.5 h-2.5 rounded-sm inline-block bg-[#1e3a5f]" />閲覧
            </span>
            <span className="flex items-center gap-1 text-[10px] text-gray-500">
              <span className="w-2.5 h-2.5 rounded-sm inline-block bg-[#93c5fd]" />スカウト
            </span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={WEEKLY_DATA} barSize={8} barGap={2} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 9, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ fontSize: 10, borderRadius: 8, border: "1px solid #e5e7eb", padding: "4px 8px" }}
                itemStyle={{ color: "#374151" }}
                cursor={{ fill: "#f9fafb" }}
              />
              <Bar dataKey="views" name="閲覧" fill="#1e3a5f" radius={[3, 3, 0, 0]} />
              <Bar dataKey="scouts" name="スカウト" fill="#93c5fd" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Skill Radar Chart ── */}
      <div className="px-5 mb-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">スキルマッチレーダー</h2>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 flex flex-col items-center">
          <ResponsiveContainer width="100%" height={160}>
            <RadarChart data={SKILL_MATCH_DATA} margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 9, fill: "#6b7280" }}
              />
              <Radar
                name="スコア"
                dataKey="score"
                stroke="#1e3a5f"
                fill="#1e3a5f"
                fillOpacity={0.25}
                strokeWidth={1.5}
              />
              <Tooltip
                contentStyle={{ fontSize: 10, borderRadius: 8, border: "1px solid #e5e7eb", padding: "4px 8px" }}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-1 mb-1">
            {SKILL_MATCH_DATA.map((d) => (
              <span key={d.subject} className="text-[9px] text-gray-500">
                {d.subject} <span className="font-bold text-[#1e3a5f]">{d.score}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Match Funnel ── */}
      <div className="px-5 mb-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">マッチングファネル</h2>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 space-y-2.5">
          {FUNNEL_DATA.map((item, i) => {
            const pct = (item.count / funnelMax) * 100;
            const opacities = ["opacity-100", "opacity-80", "opacity-60", "opacity-40"];
            return (
              <div key={item.label}>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-gray-600 font-medium">{item.label}</span>
                  <span className="font-bold text-[#1e3a5f]">{item.count}</span>
                </div>
                <div className="h-5 bg-gray-100 rounded-md overflow-hidden">
                  <motion.div
                    className={`h-full bg-[#1e3a5f] ${opacities[i]} rounded-md`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.1 + 0.2 }}
                  />
                </div>
              </div>
            );
          })}
          <div className="pt-1 text-[10px] text-gray-400 text-right">
            面接転換率 <span className="font-bold text-emerald-600">13.0%</span>
          </div>
        </div>
      </div>

      {/* ── Hospital Interest List ── */}
      <div className="px-5 mb-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <BookmarkCheck className="w-3.5 h-3.5" /> 気になる病院
        </h2>
        <div className="space-y-2">
          {hospitals.slice(0, 3).map((h, i) => {
            const liked = likedHospitals[h.id];
            return (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.09 + 0.5 }}
                className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 flex items-center gap-3"
              >
                <InitialsAvatar initials={h.initials} variant="navy" size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-800 truncate">{h.name}</div>
                  <div className="text-[11px] text-gray-400">{h.department} ・ {h.location}</div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => toggleLike(h.id)}
                    className="focus:outline-none"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        liked ? "text-rose-500 fill-rose-500" : "text-gray-300 fill-transparent"
                      }`}
                    />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={() => toggleLike(h.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                      liked
                        ? "bg-rose-50 text-rose-500 border border-rose-200"
                        : "bg-[#1e3a5f] text-white"
                    }`}
                  >
                    {liked ? "解除" : "興味あり"}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ===== Hospital Side =====
function HospitalDashboard() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const stats = [
    { value: "8", label: "候補者", color: "text-emerald-600" },
    { value: "24", label: "閲覧数", color: "text-blue-600" },
    { value: "5", label: "応募", color: "text-orange-500" },
  ];

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-emerald-700 px-5 pt-4 pb-5 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Building2 className="w-5 h-5" /> MedConnect <span className="text-xs font-normal text-emerald-200">for Hospital</span>
        </h1>
        <p className="text-xs text-emerald-200 mt-0.5">採用ダッシュボード</p>
      </div>

      <div className="px-5 -mt-3">
        <div className="grid grid-cols-3 gap-2.5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
              className="bg-white rounded-xl p-3 shadow-sm text-center border border-gray-200"
            >
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-gray-800">おすすめの医師</h2>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
            すべて見る <ChevronRight className="w-3 h-3" />
          </span>
        </div>
        <div className="space-y-2.5">
          {doctors.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 + 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer"
              onClick={() => setExpandedId(expandedId === d.id ? null : d.id)}
            >
              <div className="p-3.5">
                <div className="flex items-start gap-3">
                  <InitialsAvatar initials={d.initials} variant="emerald" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm text-gray-800 truncate">{d.name}</h3>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-emerald-600">{d.matchScore}%</span>
                        <motion.div animate={{ rotate: expandedId === d.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                        </motion.div>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">{d.specialty} ・ 経験{d.experience}年</p>
                    <div className="h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-emerald-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${d.matchScore}%` }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.07 + 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {expandedId === d.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-gray-100"
                  >
                    <div className="px-3.5 py-3 bg-gray-50">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {d.skills.map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700">{s}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">手術 {d.surgeries.toLocaleString()}件 ・ 論文 {d.papers}報</span>
                        <button className="px-3 py-1 bg-emerald-600 text-white text-[11px] font-semibold rounded-lg">
                          スカウト
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HospitalJobPost() {
  const jobs = [
    { dept: "心臓外科", type: "常勤", applicants: 5, max: 10, status: "公開中" },
    { dept: "循環器内科", type: "常勤", applicants: 3, max: 10, status: "公開中" },
    { dept: "麻酔科", type: "非常勤", applicants: 1, max: 5, status: "下書き" },
  ];

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-emerald-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">求人管理</h1>
      </div>
      <div className="px-5 py-3 space-y-3">
        {jobs.map((job, i) => (
          <motion.div
            key={job.dept}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-gray-800">{job.dept}</h3>
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${job.status === "公開中" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"}`}>
                {job.status}
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-2">{job.type} ・ 応募 {job.applicants}件</p>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(job.applicants / job.max) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 + 0.2 }}
              />
            </div>
          </motion.div>
        ))}
        <button className="w-full py-3 border-2 border-dashed border-emerald-200 rounded-xl text-emerald-600 text-sm font-semibold">
          + 新規求人を追加
        </button>
      </div>
    </div>
  );
}

function HospitalTalentSearch() {
  const initialTags = ["心臓外科専門医", "冠動脈バイパス", "経験10年以上"];
  const [tags, setTags] = useState(initialTags);
  const removeTag = (tag: string) => setTags((prev) => prev.filter((t) => t !== tag));

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-16">
      <div className="bg-emerald-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">タレント検索</h1>
      </div>
      <div className="px-5 py-3">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 flex items-center gap-2 mb-3">
          <Search className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">専門医、スキルで検索...</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <AnimatePresence>
            {tags.map((tag) => (
              <motion.button
                key={tag}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={() => removeTag(tag)}
                className="px-2.5 py-1 rounded text-[11px] font-medium bg-emerald-600 text-white flex items-center gap-1"
              >
                {tag} <X className="w-3 h-3 opacity-70" />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
        <div className="text-xs text-gray-400 mb-2">検索結果: {tags.length > 0 ? 8 : 0}件</div>
        <div className="space-y-2">
          {tags.length > 0 && doctors.slice(0, 3).map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 flex items-center gap-3"
            >
              <InitialsAvatar initials={d.initials} variant="emerald" size="sm" />
              <div className="flex-1">
                <div className="font-semibold text-sm text-gray-800">{d.name}</div>
                <div className="text-[11px] text-gray-400">{d.specialty}</div>
              </div>
              <span className="text-sm font-bold text-emerald-600">{d.matchScore}%</span>
            </motion.div>
          ))}
          {tags.length === 0 && (
            <div className="text-center py-8 text-sm text-gray-400">条件を追加して検索</div>
          )}
        </div>
      </div>
    </div>
  );
}

const HOSPITAL_CHAT = [
  { from: "doctor", text: "見学の件、ぜひお願いいたします。来週火曜日はいかがでしょうか？", time: "10:42" },
  { from: "hospital", text: "ありがとうございます。火曜日14時はいかがでしょうか。心臓外科部長の佐々木もご挨拶する予定です。", time: "10:44" },
  { from: "doctor", text: "14時、承知いたしました。当日はどのような服装でうかがえばよいでしょうか？", time: "10:45" },
  { from: "hospital", text: "スーツで問題ありません。正面玄関でお待ちしております。お気をつけてお越しください。", time: "10:46" },
];

function HospitalMsg() {
  const [openThread, setOpenThread] = useState<string | null>(null);

  if (openThread) {
    const msg = hospitalMessages.find((m) => m.id === openThread);
    return (
      <div className="h-full bg-gray-50 flex flex-col">
        <div className="bg-emerald-700 px-4 pt-4 pb-4 text-white flex items-center gap-3">
          <button onClick={() => setOpenThread(null)} className="text-white/70 text-xs font-semibold">← 戻る</button>
          <div className="flex-1">
            <div className="font-semibold text-sm">{msg?.name}</div>
            <div className="text-[10px] text-emerald-200">転職検討中</div>
          </div>
        </div>
        <div className="flex-1 px-4 py-3 space-y-2.5 overflow-y-auto">
          {HOSPITAL_CHAT.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`flex ${m.from === "hospital" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                m.from === "hospital"
                  ? "bg-emerald-700 text-white rounded-br-sm"
                  : "bg-white text-gray-700 border border-gray-100 rounded-bl-sm shadow-sm"
              }`}>
                {m.text}
                <div className={`text-[9px] mt-1 ${m.from === "hospital" ? "text-emerald-200" : "text-gray-400"}`}>{m.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="px-4 pb-[72px] pt-2 border-t border-gray-100 bg-white">
          <div className="flex gap-2 items-center bg-gray-100 rounded-xl px-3 py-2.5">
            <span className="text-xs text-gray-400 flex-1">メッセージを入力...</span>
            <button className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center">
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50">
      <div className="bg-emerald-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">メッセージ</h1>
      </div>
      <div className="divide-y divide-gray-100">
        {hospitalMessages.map((m) => (
          <button
            key={m.id}
            onClick={() => setOpenThread(m.id)}
            className="w-full flex items-center gap-3 px-5 py-3.5 bg-white hover:bg-gray-50 transition-colors text-left"
          >
            <InitialsAvatar initials={m.initials} variant="emerald" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-800">{m.name}</div>
              <div className="text-xs text-gray-400 truncate">{m.preview}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] text-gray-400">{m.time}</span>
              {m.unread && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Messages tab index
const DOCTOR_MSG_TAB = 3;
const HOSPITAL_MSG_TAB = 3;

// ===== Main Export =====

export default function PlanBDashboard() {
  const [doctorTab, setDoctorTab] = useState(0);
  const [hospitalTab, setHospitalTab] = useState(0);
  const [doctorUnread, setDoctorUnread] = useState(3);
  const [hospitalUnread, setHospitalUnread] = useState(2);

  const handleDoctorSelect = (i: number) => {
    if (i === DOCTOR_MSG_TAB) setDoctorUnread(0);
    setDoctorTab(i);
  };

  const handleHospitalSelect = (i: number) => {
    if (i === HOSPITAL_MSG_TAB) setHospitalUnread(0);
    setHospitalTab(i);
  };

  const doctorTabs: { icon: ReactNode; label: string }[] = [
    { icon: <LayoutDashboard className="w-4.5 h-4.5" />, label: "ダッシュボード" },
    { icon: <User className="w-4.5 h-4.5" />, label: "プロフィール" },
    { icon: <Search className="w-4.5 h-4.5" />, label: "検索" },
    {
      icon: (
        <BadgedIcon
          icon={<MessageCircle className="w-4.5 h-4.5" />}
          count={doctorUnread}
        />
      ),
      label: "メッセージ",
    },
    { icon: <TrendingUp className="w-4.5 h-4.5" />, label: "分析" },
  ];
  const hospitalTabs: { icon: ReactNode; label: string }[] = [
    { icon: <LayoutDashboard className="w-4.5 h-4.5" />, label: "ダッシュボード" },
    { icon: <ClipboardList className="w-4.5 h-4.5" />, label: "求人管理" },
    { icon: <Users className="w-4.5 h-4.5" />, label: "タレント検索" },
    {
      icon: (
        <BadgedIcon
          icon={<MessageCircle className="w-4.5 h-4.5" />}
          count={hospitalUnread}
        />
      ),
      label: "メッセージ",
    },
  ];

  const doctorScreens = [<DoctorDashboard />, <DoctorProfileEdit />, <DoctorSearch />, <DoctorMsg />, <DoctorAnalytics />];
  const hospitalScreens = [<HospitalDashboard />, <HospitalJobPost />, <HospitalTalentSearch />, <HospitalMsg />];

  return (
    <div className="flex flex-wrap justify-center gap-10">
      <div>
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-slate-50 text-sm font-semibold text-slate-700 border border-slate-200">
            <User className="w-4 h-4" /> 医師側 UI
          </span>
        </div>
        <PhoneFrame label={doctorTabs[doctorTab].label}>
          <div className="relative h-full">
            {doctorScreens[doctorTab]}
            <TabBar tabs={doctorTabs} activeIndex={doctorTab} onSelect={handleDoctorSelect} accentColor="#1e3a5f" />
          </div>
        </PhoneFrame>
      </div>

      <div>
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-emerald-50 text-sm font-semibold text-emerald-700 border border-emerald-200">
            <Building2 className="w-4 h-4" /> 病院側 UI
          </span>
        </div>
        <PhoneFrame label={hospitalTabs[hospitalTab].label}>
          <div className="relative h-full">
            {hospitalScreens[hospitalTab]}
            <TabBar tabs={hospitalTabs} activeIndex={hospitalTab} onSelect={handleHospitalSelect} accentColor="#059669" />
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
