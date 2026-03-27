// ===== Mock Data for MedMatch App =====

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  skills: string[];
  certifications: string[];
  papers: number;
  surgeries: number;
  location: string;
  status: string;
  matchScore: number;
  avatar: string;
}

export interface Hospital {
  id: string;
  name: string;
  department: string;
  type: string;
  beds: number;
  location: string;
  salary: string;
  features: string[];
  matchScore: number;
  avatar: string;
}

export interface Message {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread: boolean;
  avatar: string;
}

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "田中 太郎",
    specialty: "心臓外科専門医",
    experience: 15,
    skills: ["冠動脈バイパス術", "弁膜症手術", "MICS", "TAVI"],
    certifications: ["心臓血管外科専門医", "外科指導医"],
    papers: 32,
    surgeries: 2500,
    location: "東京都",
    status: "転職検討中",
    matchScore: 94,
    avatar: "👨‍⚕️",
  },
  {
    id: "d2",
    name: "佐藤 花子",
    specialty: "循環器内科専門医",
    experience: 12,
    skills: ["カテーテル治療", "心エコー", "不整脈治療", "心不全管理"],
    certifications: ["循環器内科専門医", "内科認定医"],
    papers: 28,
    surgeries: 1800,
    location: "大阪府",
    status: "情報収集中",
    matchScore: 89,
    avatar: "👩‍⚕️",
  },
  {
    id: "d3",
    name: "山田 美咲",
    specialty: "心臓外科",
    experience: 8,
    skills: ["冠動脈バイパス術", "大動脈手術", "MICS"],
    certifications: ["心臓血管外科専門医"],
    papers: 15,
    surgeries: 800,
    location: "神奈川県",
    status: "積極的に転職活動中",
    matchScore: 83,
    avatar: "👩‍⚕️",
  },
  {
    id: "d4",
    name: "高橋 健二",
    specialty: "外科専門医",
    experience: 20,
    skills: ["消化器外科", "腹腔鏡手術", "ロボット支援手術"],
    certifications: ["外科専門医", "消化器外科専門医", "指導医"],
    papers: 45,
    surgeries: 3200,
    location: "愛知県",
    status: "転職検討中",
    matchScore: 79,
    avatar: "👨‍⚕️",
  },
];

export const hospitals: Hospital[] = [
  {
    id: "h1",
    name: "東京中央総合病院",
    department: "心臓外科",
    type: "常勤",
    beds: 500,
    location: "千代田区",
    salary: "年収1,800万",
    features: ["心臓外科専門医", "研修指定病院", "手術件数500件/年"],
    matchScore: 92,
    avatar: "🏥",
  },
  {
    id: "h2",
    name: "大阪大学医学部附属病院",
    department: "心臓血管外科",
    type: "常勤",
    beds: 1086,
    location: "吹田市",
    salary: "年収1,600万",
    features: ["研究支援充実", "大学病院", "論文執筆サポート"],
    matchScore: 85,
    avatar: "🏥",
  },
  {
    id: "h3",
    name: "慶應義塾大学病院",
    department: "心臓外科",
    type: "常勤",
    beds: 960,
    location: "新宿区",
    salary: "年収1,700万",
    features: ["先端医療", "国際連携", "研究環境充実"],
    matchScore: 88,
    avatar: "🏥",
  },
  {
    id: "h4",
    name: "横浜みなと医療センター",
    department: "循環器内科",
    type: "常勤",
    beds: 450,
    location: "横浜市",
    salary: "年収1,500万",
    features: ["カテーテル治療", "救急対応", "チーム医療"],
    matchScore: 87,
    avatar: "🏥",
  },
];

export const doctorMessages: Message[] = [
  { id: "m1", name: "東京中央総合病院", preview: "ぜひ一度、見学にいらしてください...", time: "10:32", unread: true, avatar: "🏥" },
  { id: "m2", name: "慶應義塾大学病院", preview: "先生のご経歴を拝見し、大変興味を...", time: "昨日", unread: true, avatar: "🏥" },
  { id: "m3", name: "大阪大学医学部附属病院", preview: "研究環境についてご案内いたします...", time: "3/24", unread: false, avatar: "🏥" },
];

export const hospitalMessages: Message[] = [
  { id: "m1", name: "田中 太郎 先生", preview: "見学の件、ぜひお願いいたします...", time: "10:45", unread: true, avatar: "👨‍⚕️" },
  { id: "m2", name: "佐藤 花子 先生", preview: "条件面について確認させてください...", time: "昨日", unread: false, avatar: "👩‍⚕️" },
  { id: "m3", name: "鈴木 一郎 先生", preview: "ご連絡ありがとうございます...", time: "3/23", unread: false, avatar: "👨‍⚕️" },
];

export const skillRadarData = {
  labels: ["手術実績", "論文数", "指導経験", "専門資格", "学会活動", "チーム医療"],
  datasets: [
    { label: "田中太郎先生", data: [95, 80, 90, 95, 75, 85] },
    { label: "求人要件", data: [85, 60, 80, 90, 70, 80] },
  ],
};
