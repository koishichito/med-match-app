/**
 * Plan C: Recommend Timeline Style (MedRecommend)
 * Design: Indigo primary, clean feed UI with recommendation reasons
 * No emoji, Lucide icons only, restrained gradients, toned-down AI language
 */
import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import PhoneFrame from "../PhoneFrame";
import TabBar from "../TabBar";
import { hospitals, doctors, doctorMessages, hospitalMessages } from "@/lib/mockData";
import {
  Lightbulb, Tag, Bell, MessageCircle,
  ClipboardList, Users, Building2, User,
  Heart, BookOpen, SkipForward, Send, Bookmark,
  TrendingUp, Sparkles, ChevronRight, Plus, X
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

// ===== Doctor Side =====
function DoctorAIFeed() {
  return (
    <div className="h-full bg-gray-50">
      <div className="bg-indigo-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Lightbulb className="w-5 h-5" /> MedRecommend
        </h1>
        <p className="text-xs text-indigo-200 mt-0.5">あなたに最適な病院をレコメンド</p>
      </div>

      {/* Insight Banner */}
      <div className="mx-4 mt-3 p-3 bg-indigo-50 rounded-xl border border-indigo-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-700 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-indigo-700">今日のインサイト</div>
            <div className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">先生の心臓外科スキルに高い需要があります。3件の新しいマッチが見つかりました。</div>
          </div>
        </div>
      </div>

      {/* Feed Cards */}
      <div className="px-4 mt-3 space-y-3 pb-20">
        {hospitals.slice(0, 3).map((h, i) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
          >
            {/* Recommend label */}
            <div className="flex items-center gap-2 px-4 pt-3">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                <span className="text-[11px] font-semibold text-indigo-600">レコメンド</span>
              </div>
              <span className="text-[11px] text-gray-400 ml-auto">{["2時間前", "5時間前", "昨日"][i]}</span>
            </div>

            {/* Reason */}
            <div className="mx-3 mt-2 p-2.5 bg-gray-50 rounded-lg border-l-2 border-indigo-400">
              <p className="text-[11px] text-gray-600 leading-relaxed">
                {[
                  "冠動脈バイパス術の実績（2,500件+）が、この病院の求める条件と高い一致度を示しています。",
                  "研究実績（論文32本）が評価され、学術環境が充実した本院での活躍が期待されます。",
                  "カテーテル治療の豊富な経験が、この病院の循環器チームに最適です。",
                ][i]}
              </p>
            </div>

            {/* Hospital info */}
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

            {/* Score bar */}
            <div className="flex items-center gap-2 px-4 pb-2">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${h.matchScore}%` }} />
              </div>
              <span className="text-sm font-bold text-indigo-600">{h.matchScore}%</span>
            </div>

            {/* Actions */}
            <div className="flex border-t border-gray-100">
              <button className="flex-1 py-2.5 text-center text-xs font-semibold text-indigo-600 flex items-center justify-center gap-1">
                <Heart className="w-3.5 h-3.5" /> 興味あり
              </button>
              <button className="flex-1 py-2.5 text-center text-xs font-semibold text-gray-400 border-l border-gray-100 flex items-center justify-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> 詳細
              </button>
              <button className="flex-1 py-2.5 text-center text-xs font-semibold text-gray-400 border-l border-gray-100 flex items-center justify-center gap-1">
                <SkipForward className="w-3.5 h-3.5" /> スキップ
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DoctorSkillTags() {
  return (
    <div className="h-full bg-gray-50">
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
              {["冠動脈バイパス術", "弁膜症手術", "MICS", "TAVI"].map((s) => (
                <span key={s} className="px-2.5 py-1 rounded text-[11px] font-medium bg-indigo-600 text-white flex items-center gap-1">
                  {s} <X className="w-3 h-3 opacity-70" />
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-xs text-gray-400 border border-gray-200">
              <Plus className="w-3.5 h-3.5" /> スキルを追加...
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2">資格・認定</h3>
          <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-200">
            <div className="flex flex-wrap gap-1.5">
              {["心臓血管外科専門医", "外科指導医"].map((c) => (
                <span key={c} className="px-2.5 py-1 rounded text-[11px] font-medium bg-indigo-600 text-white flex items-center gap-1">
                  {c} <X className="w-3 h-3 opacity-70" />
                </span>
              ))}
              <span className="px-2.5 py-1 rounded text-[11px] font-medium text-indigo-600 border border-dashed border-indigo-300 flex items-center gap-0.5">
                <Plus className="w-3 h-3" /> 追加
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2">希望条件</h3>
          <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-200">
            <div className="flex flex-wrap gap-1.5">
              {["常勤", "関東", "関西"].map((p) => (
                <span key={p} className="px-2.5 py-1 rounded text-[11px] font-medium bg-indigo-600 text-white flex items-center gap-1">
                  {p} <X className="w-3 h-3 opacity-70" />
                </span>
              ))}
              <span className="px-2.5 py-1 rounded text-[11px] font-medium text-indigo-600 border border-dashed border-indigo-300 flex items-center gap-0.5">
                <Plus className="w-3 h-3" /> 追加
              </span>
            </div>
          </div>
        </div>

        {/* Suggestion */}
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

        <button className="w-full py-3 bg-indigo-700 text-white rounded-xl font-semibold text-sm hover:bg-indigo-800 transition-colors">
          スキルを保存して分析を更新
        </button>
      </div>
    </div>
  );
}

function DoctorNotifications() {
  const notifs = [
    { icon: <Sparkles className="w-4 h-4" />, bg: "bg-indigo-50", color: "text-indigo-600", title: "新しいマッチ", desc: "東京中央総合病院があなたに「興味あり」を送りました。マッチ率92%です。", time: "10分前", isNew: true },
    { icon: <Send className="w-4 h-4" />, bg: "bg-violet-50", color: "text-violet-600", title: "スカウト受信", desc: "慶應義塾大学病院から「先生の冠動脈バイパス術の実績に注目しています」とのスカウトが届きました。", time: "1時間前", isNew: true },
    { icon: <TrendingUp className="w-4 h-4" />, bg: "bg-emerald-50", color: "text-emerald-600", title: "分析更新", desc: "プロフィール閲覧数が先週比+40%増加しました。", time: "3時間前", isNew: false },
    { icon: <Sparkles className="w-4 h-4" />, bg: "bg-indigo-50", color: "text-indigo-600", title: "新しいレコメンド", desc: "横浜みなと医療センターがあなたのスキルにマッチしています（87%）。", time: "昨日", isNew: false },
  ];

  return (
    <div className="h-full bg-gray-50">
      <div className="bg-indigo-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Bell className="w-5 h-5" /> 通知
        </h1>
      </div>
      <div className="divide-y divide-gray-100">
        {notifs.map((n, i) => (
          <div key={i} className={`flex items-start gap-3 px-4 py-3.5 ${n.isNew ? "bg-indigo-50/50" : "bg-white"}`}>
            <div className={`w-8 h-8 rounded-lg ${n.bg} ${n.color} flex items-center justify-center flex-shrink-0`}>{n.icon}</div>
            <div className="flex-1">
              <div className="text-xs text-gray-800 leading-relaxed"><strong>{n.title}</strong> {n.desc}</div>
              <div className="text-[11px] text-gray-400 mt-1">{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DoctorMsg() {
  return (
    <div className="h-full bg-gray-50">
      <div className="bg-indigo-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <MessageCircle className="w-5 h-5" /> メッセージ
        </h1>
      </div>
      <div className="divide-y divide-gray-100">
        {doctorMessages.map((m) => (
          <div key={m.id} className="flex items-center gap-3 px-4 py-3.5 bg-white">
            <InitialsAvatar initials={m.initials} variant="indigo" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-800">{m.name}</div>
              <div className="text-xs text-gray-400 truncate">{m.preview}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] text-gray-400">{m.time}</span>
              {m.unread && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== Hospital Side =====
function HospitalAIFeed() {
  return (
    <div className="h-full bg-gray-50">
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

      <div className="px-4 mt-3 space-y-3 pb-20">
        {doctors.slice(0, 2).map((d, i) => (
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
              <p className="text-[11px] text-gray-600 leading-relaxed">
                <strong>{d.name}先生</strong>は貴院の心臓外科求人に対し、専門性{d.matchScore}%の一致度です。
                {i === 0 ? "冠動脈バイパス術2,500件以上の実績は特に注目に値します。" : "カテーテル治療の豊富な経験が強みです。"}
              </p>
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
                <div className="h-full bg-violet-500 rounded-full" style={{ width: `${d.matchScore}%` }} />
              </div>
              <span className="text-sm font-bold text-violet-600">{d.matchScore}%</span>
            </div>

            <div className="flex border-t border-gray-100">
              <button className="flex-1 py-2.5 text-center text-xs font-semibold text-violet-600 flex items-center justify-center gap-1">
                <Send className="w-3.5 h-3.5" /> スカウト
              </button>
              <button className="flex-1 py-2.5 text-center text-xs font-semibold text-gray-400 border-l border-gray-100 flex items-center justify-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> 詳細
              </button>
              <button className="flex-1 py-2.5 text-center text-xs font-semibold text-gray-400 border-l border-gray-100 flex items-center justify-center gap-1">
                <Bookmark className="w-3.5 h-3.5" /> 保存
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function HospitalWizard() {
  return (
    <div className="h-full bg-gray-50">
      <div className="bg-violet-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <ClipboardList className="w-5 h-5" /> 募集要件設定
        </h1>
        <p className="text-xs text-violet-200 mt-0.5">対話形式で要件を定義</p>
      </div>

      <div className="px-4 py-4 space-y-2.5">
        {/* System bubble */}
        <div className="max-w-[85%] p-3 bg-gray-100 rounded-xl rounded-bl-sm text-xs text-gray-700 leading-relaxed">
          どのような医師をお探しですか？まず<strong>診療科</strong>を教えてください。
        </div>
        {/* User bubble */}
        <div className="max-w-[85%] ml-auto p-3 bg-violet-600 rounded-xl rounded-br-sm text-xs text-white leading-relaxed">
          心臓外科の常勤医師を探しています。
        </div>
        {/* System bubble with options */}
        <div className="max-w-[85%] p-3 bg-gray-100 rounded-xl rounded-bl-sm text-xs text-gray-700 leading-relaxed">
          心臓外科ですね。具体的に求める<strong>スキル・資格</strong>はありますか？
          <div className="flex flex-wrap gap-1.5 mt-2">
            {["心臓外科専門医", "冠動脈バイパス術", "弁膜症手術", "MICS", "TAVI", "大動脈手術"].map((s, i) => (
              <span key={s} className={`px-2.5 py-1 rounded text-[11px] font-medium ${i < 2 ? "bg-violet-600 text-white" : "text-violet-600 border border-violet-300 bg-white"}`}>
                {s}
              </span>
            ))}
          </div>
        </div>
        {/* User */}
        <div className="max-w-[85%] ml-auto p-3 bg-violet-600 rounded-xl rounded-br-sm text-xs text-white leading-relaxed">
          専門医と冠動脈バイパスは必須です。MICSもできれば。
        </div>
        {/* System with experience options */}
        <div className="max-w-[85%] p-3 bg-gray-100 rounded-xl rounded-bl-sm text-xs text-gray-700 leading-relaxed">
          承知しました。<strong>経験年数</strong>の目安はありますか？
          <div className="flex flex-wrap gap-1.5 mt-2">
            {["5年以上", "10年以上", "15年以上", "問わない"].map((s, i) => (
              <span key={s} className={`px-2.5 py-1 rounded text-[11px] font-medium ${i === 1 ? "bg-violet-600 text-white" : "text-violet-600 border border-violet-300 bg-white"}`}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Analysis result */}
        <div className="p-3.5 bg-violet-50 rounded-xl border border-violet-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-700 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-violet-700">分析結果</div>
              <div className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">この条件に合致する候補者は現在<strong>8名</strong>登録されています。最も高いマッチ率は<strong>94%</strong>です。</div>
            </div>
          </div>
        </div>

        <button className="w-full py-3 bg-violet-700 text-white rounded-xl font-semibold text-sm hover:bg-violet-800 transition-colors">
          この条件で候補者を表示
        </button>
      </div>
    </div>
  );
}

function HospitalKanban() {
  const candidates = [
    { name: "田中 太郎", detail: "心臓外科専門医 ・ マッチ率 94%", badge: "新規", badgeColor: "bg-indigo-50 text-indigo-600", initials: "田中" },
    { name: "山田 美咲", detail: "心臓外科 ・ マッチ率 83%", badge: "新規", badgeColor: "bg-indigo-50 text-indigo-600", initials: "山田" },
    { name: "高橋 健二", detail: "外科専門医 ・ マッチ率 79%", badge: "新規", badgeColor: "bg-indigo-50 text-indigo-600", initials: "高橋" },
    { name: "佐藤 花子", detail: "循環器内科専門医 ・ スカウト返信あり", badge: "コンタクト", badgeColor: "bg-emerald-50 text-emerald-600", initials: "佐藤" },
    { name: "中村 大輔", detail: "心臓外科 ・ 4/2 14:00 面談予定", badge: "面談", badgeColor: "bg-amber-50 text-amber-600", initials: "中村" },
  ];

  return (
    <div className="h-full bg-gray-50">
      <div className="bg-violet-700 px-5 pt-4 pb-4 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Users className="w-5 h-5" /> 候補者管理
        </h1>
        <p className="text-xs text-violet-200 mt-0.5">心臓外科 常勤医師 の候補者</p>
      </div>

      <div className="flex gap-1.5 px-4 py-3 overflow-x-auto">
        {["新規 (3)", "コンタクト (1)", "面談 (1)", "オファー (0)"].map((t, i) => (
          <button key={t} className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${i === 0 ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-600"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 space-y-2">
        {candidates.map((c) => (
          <div key={c.name} className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-200 flex items-center gap-3">
            <InitialsAvatar initials={c.initials} variant="purple" size="sm" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-800">{c.name}</div>
              <div className="text-[11px] text-gray-400">{c.detail}</div>
            </div>
            <span className={`px-2 py-1 rounded text-[10px] font-semibold ${c.badgeColor}`}>{c.badge}</span>
          </div>
        ))}
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

  const doctorTabs: { icon: ReactNode; label: string }[] = [
    { icon: <Lightbulb className="w-4.5 h-4.5" />, label: "フィード" },
    { icon: <Tag className="w-4.5 h-4.5" />, label: "スキル" },
    { icon: <Bell className="w-4.5 h-4.5" />, label: "通知" },
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
            <TabBar tabs={doctorTabs} activeIndex={doctorTab} onSelect={setDoctorTab} accentColor="#4338ca" />
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
