import { type ReactNode } from "react";

interface Tab {
  icon: ReactNode;
  label: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeIndex: number;
  onSelect: (index: number) => void;
  accentColor?: string;
}

export default function TabBar({ tabs, activeIndex, onSelect, accentColor = "#374151" }: TabBarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex bg-white border-t border-gray-200" style={{ height: 60, paddingBottom: 6 }}>
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors"
          style={{ color: i === activeIndex ? accentColor : "#9ca3af" }}
        >
          <span className="w-5 h-5 flex items-center justify-center">{tab.icon}</span>
          <span className="text-[10px] font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
