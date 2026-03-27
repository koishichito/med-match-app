interface Tab {
  icon: string;
  label: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeIndex: number;
  onSelect: (index: number) => void;
  accentColor?: string;
}

export default function TabBar({ tabs, activeIndex, onSelect, accentColor = "#6366f1" }: TabBarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex bg-white/95 backdrop-blur-sm border-t border-gray-100" style={{ height: 64, paddingBottom: 8 }}>
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors"
          style={{ color: i === activeIndex ? accentColor : "#9ca3af" }}
        >
          <span className="text-lg">{tab.icon}</span>
          <span className="text-[10px] font-semibold">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
