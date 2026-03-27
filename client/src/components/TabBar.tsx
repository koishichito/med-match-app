import { type ReactNode } from "react";
import { motion } from "framer-motion";

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
    <div
      className="absolute bottom-0 left-0 right-0 flex bg-white/95 backdrop-blur-sm border-t border-gray-100"
      style={{ height: 60, paddingBottom: 6 }}
    >
      {tabs.map((tab, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 relative"
            style={{ color: isActive ? accentColor : "#9ca3af" }}
          >
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                style={{ backgroundColor: accentColor }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <motion.span
              animate={{ scale: isActive ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-5 h-5 flex items-center justify-center"
            >
              {tab.icon}
            </motion.span>
            <span
              className={`text-[10px] font-medium transition-all duration-200 ${
                isActive ? "font-semibold" : ""
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
