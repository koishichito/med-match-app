/**
 * Plan B: Professional Dashboard Style (MedConnect)
 * Design: Navy (#1e3a5f) + Emerald (#059669) accent, professional
 * Concept: LinkedIn-like data-driven matching with detailed profiles
 */
import { useState } from "react";
import PhoneFrame from "../PhoneFrame";
import TabBar from "../TabBar";
import { hospitals, doctors, doctorMessages, hospitalMessages } from "@/lib/mockData";

// ===== Doctor Side =====
function DoctorDashboard() {
  return (
    <div className="h-full bg-gray-50">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] px-5 pt-4 pb-5 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <span className="text-xl">🔗</span> MedConnect
        </h1>
        <p className="text-xs text-blue-200 mt-0.5">プロフェッショナル・マッチング</p>
      </div>

      {/* Stats */}
      <div className="px-5 -mt-3">
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { value: "12", label: "マッチ", color: "text-emerald-600" },
            { value: "48", label: "閲覧数", color: "text-blue-600" },
            { value: "3", label: "スカウト", color: "text-orange-500" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-3 shadow-sm text-center border border-gray-100">
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended */}
      <div className="px-5 mt-4">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-gray-800">おすすめの病院</h2>
          <span className="text-[11px] text-emerald-600 font-semibold">すべて見る →</span>
        </div>
        <div className="space-y-2.5">
          {hospitals.map((h) => (
            <div key={h.id} className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">{h.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-gray-800 truncate">{h.name}</h3>
                    <span className="text-sm font-bold text-emerald-600 flex-shrink-0">{h.matchScore}%</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5">{h.department} {h.type} ・ {h.location}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {h.features.slice(0, 2).map((f) => (
                      <span key={f} className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-600">{f}</span>
                    ))}
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-600">{h.salary}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DoctorDetailProfile() {
  return (
    <div className="h-full bg-gray-50">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] px-5 pt-4 pb-8 text-white">
        <h1 className="text-lg font-bold">マイプロフィール</h1>
      </div>
      <div className="px-5 -mt-5 space-y-3">
        {/* Profile card */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-3xl">👨‍⚕️</div>
            <div>
              <h2 className="text-base font-bold text-gray-800">田中 太郎</h2>
              <p className="text-xs text-gray-500">心臓外科専門医 ・ 経験15年</p>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">● 転職検討中</p>
            </div>
          </div>
          <div className="h-px bg-gray-100 mb-3" />
          <div className="text-xs text-gray-600 leading-relaxed">
            心臓血管外科領域で15年の経験を持ち、冠動脈バイパス術を中心に2,500件以上の手術実績があります。指導医として後進の育成にも注力しています。
          </div>
        </div>

        {/* Experience timeline */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">職歴</h3>
          <div className="space-y-3">
            {[
              { period: "2018 - 現在", role: "心臓外科 部長", place: "○○大学病院" },
              { period: "2013 - 2018", role: "心臓外科 医長", place: "△△総合病院" },
              { period: "2011 - 2013", role: "心臓外科 医員", place: "□□医療センター" },
            ].map((exp) => (
              <div key={exp.period} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1" />
                  <div className="w-px flex-1 bg-gray-200" />
                </div>
                <div className="pb-2">
                  <div className="text-[11px] text-gray-400">{exp.period}</div>
                  <div className="text-sm font-semibold text-gray-800">{exp.role}</div>
                  <div className="text-xs text-gray-500">{exp.place}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">資格・認定</h3>
          <div className="flex flex-wrap gap-1.5">
            {["心臓血管外科専門医", "外科指導医", "日本外科学会専門医"].map((c) => (
              <span key={c} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#1e3a5f] text-white">{c}</span>
            ))}
          </div>
        </div>

        {/* Publications */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">研究実績</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 bg-blue-50 rounded-lg text-center">
              <div className="text-lg font-bold text-blue-700">32</div>
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

function DoctorSearch() {
  return (
    <div className="h-full bg-gray-50">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">検索</h1>
      </div>
      <div className="px-5 py-3">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-2 mb-4">
          <span className="text-gray-400">🔍</span>
          <span className="text-sm text-gray-400">病院名、診療科で検索...</span>
        </div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">フィルター</h3>
        <div className="space-y-2">
          {[
            { label: "診療科", value: "心臓外科" },
            { label: "雇用形態", value: "常勤" },
            { label: "エリア", value: "関東" },
            { label: "年収", value: "1,500万以上" },
            { label: "病床数", value: "300床以上" },
          ].map((f) => (
            <div key={f.label} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center justify-between">
              <span className="text-sm text-gray-600">{f.label}</span>
              <span className="text-sm font-medium text-[#1e3a5f]">{f.value} ▾</span>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-3 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] text-white rounded-xl font-semibold text-sm">
          検索する（12件）
        </button>
      </div>
    </div>
  );
}

function DoctorMsg() {
  return (
    <div className="h-full bg-gray-50">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">メッセージ</h1>
      </div>
      <div className="divide-y divide-gray-100">
        {doctorMessages.map((m) => (
          <div key={m.id} className="flex items-center gap-3 px-5 py-3.5 bg-white hover:bg-gray-50 transition-colors">
            <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">{m.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-800">{m.name}</div>
              <div className="text-xs text-gray-400 truncate">{m.preview}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] text-gray-400">{m.time}</span>
              {m.unread && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== Hospital Side =====
function HospitalDashboard() {
  return (
    <div className="h-full bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 px-5 pt-4 pb-5 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <span className="text-xl">🔗</span> MedConnect <span className="text-xs font-normal text-emerald-200">for Hospital</span>
        </h1>
        <p className="text-xs text-emerald-200 mt-0.5">採用ダッシュボード</p>
      </div>

      <div className="px-5 -mt-3">
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { value: "8", label: "候補者", color: "text-emerald-600" },
            { value: "24", label: "閲覧数", color: "text-blue-600" },
            { value: "5", label: "応募", color: "text-orange-500" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-3 shadow-sm text-center border border-gray-100">
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-gray-800">おすすめの医師</h2>
          <span className="text-[11px] text-emerald-600 font-semibold">すべて見る →</span>
        </div>
        <div className="space-y-2.5">
          {doctors.map((d) => (
            <div key={d.id} className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-lg bg-emerald-50 flex items-center justify-center text-xl flex-shrink-0">{d.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-gray-800 truncate">{d.name} 先生</h3>
                    <span className="text-sm font-bold text-emerald-600 flex-shrink-0">{d.matchScore}%</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5">{d.specialty} ・ 経験{d.experience}年</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {d.skills.slice(0, 2).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-600">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HospitalJobPost() {
  return (
    <div className="h-full bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">求人管理</h1>
      </div>
      <div className="px-5 py-3 space-y-3">
        {[
          { dept: "心臓外科", type: "常勤", applicants: 5, status: "公開中" },
          { dept: "循環器内科", type: "常勤", applicants: 3, status: "公開中" },
          { dept: "麻酔科", type: "非常勤", applicants: 1, status: "下書き" },
        ].map((job) => (
          <div key={job.dept} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-gray-800">{job.dept}</h3>
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${job.status === "公開中" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"}`}>
                {job.status}
              </span>
            </div>
            <p className="text-xs text-gray-400">{job.type} ・ 応募 {job.applicants}件</p>
            <div className="h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${job.applicants * 20}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HospitalTalentSearch() {
  return (
    <div className="h-full bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">タレント検索</h1>
      </div>
      <div className="px-5 py-3">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-2 mb-3">
          <span className="text-gray-400">🔍</span>
          <span className="text-sm text-gray-400">専門医、スキルで検索...</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {["心臓外科専門医", "冠動脈バイパス", "経験10年以上"].map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500 text-white flex items-center gap-1">
              {tag} <span className="opacity-70">✕</span>
            </span>
          ))}
        </div>
        <div className="text-xs text-gray-400 mb-2">検索結果: 8件</div>
        <div className="space-y-2">
          {doctors.slice(0, 3).map((d) => (
            <div key={d.id} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-lg">{d.avatar}</div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-gray-800">{d.name}</div>
                <div className="text-[11px] text-gray-400">{d.specialty}</div>
              </div>
              <span className="text-sm font-bold text-emerald-600">{d.matchScore}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HospitalMsg() {
  return (
    <div className="h-full bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold">メッセージ</h1>
      </div>
      <div className="divide-y divide-gray-100">
        {hospitalMessages.map((m) => (
          <div key={m.id} className="flex items-center gap-3 px-5 py-3.5 bg-white">
            <div className="w-11 h-11 rounded-lg bg-emerald-50 flex items-center justify-center text-xl flex-shrink-0">{m.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-800">{m.name}</div>
              <div className="text-xs text-gray-400 truncate">{m.preview}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] text-gray-400">{m.time}</span>
              {m.unread && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== Main Export =====
export default function PlanBDashboard() {
  const [doctorTab, setDoctorTab] = useState(0);
  const [hospitalTab, setHospitalTab] = useState(0);

  const doctorTabs = [
    { icon: "📊", label: "ダッシュボード" },
    { icon: "👤", label: "プロフィール" },
    { icon: "🔍", label: "検索" },
    { icon: "💬", label: "メッセージ" },
  ];
  const hospitalTabs = [
    { icon: "📊", label: "ダッシュボード" },
    { icon: "📋", label: "求人管理" },
    { icon: "🔍", label: "タレント検索" },
    { icon: "💬", label: "メッセージ" },
  ];

  const doctorScreens = [<DoctorDashboard />, <DoctorDetailProfile />, <DoctorSearch />, <DoctorMsg />];
  const hospitalScreens = [<HospitalDashboard />, <HospitalJobPost />, <HospitalTalentSearch />, <HospitalMsg />];

  return (
    <div className="flex flex-wrap justify-center gap-10">
      <div>
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-light text-sm font-semibold text-blue-300">
            👨‍⚕️ 医師側 UI
          </span>
        </div>
        <PhoneFrame label={doctorTabs[doctorTab].label}>
          <div className="relative h-full">
            {doctorScreens[doctorTab]}
            <TabBar tabs={doctorTabs} activeIndex={doctorTab} onSelect={setDoctorTab} accentColor="#1e3a5f" />
          </div>
        </PhoneFrame>
      </div>

      <div>
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-light text-sm font-semibold text-emerald-300">
            🏥 病院側 UI
          </span>
        </div>
        <PhoneFrame label={hospitalTabs[hospitalTab].label}>
          <div className="relative h-full">
            {hospitalScreens[hospitalTab]}
            <TabBar tabs={hospitalTabs} activeIndex={hospitalTab} onSelect={setHospitalTab} accentColor="#059669" />
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
