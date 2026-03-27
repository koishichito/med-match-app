import { type ReactNode } from "react";
import { Signal, BatteryMedium } from "lucide-react";

interface PhoneFrameProps {
  children: ReactNode;
  label?: string;
}

export default function PhoneFrame({ children, label }: PhoneFrameProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      {label && (
        <span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
          {label}
        </span>
      )}
      <div className="phone-frame bg-white">
        {/* Status bar */}
        <div className="h-11 flex items-center justify-between px-6 bg-gray-50 text-gray-700 text-xs font-medium border-b border-gray-100">
          <span className="text-sm font-semibold">9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>
        {/* Screen content */}
        <div className="h-[688px] overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: "none" }}>
          {children}
        </div>
        {/* Home indicator */}
        <div className="h-[20px] bg-gray-50 flex items-center justify-center border-t border-gray-100">
          <div className="w-32 h-1 rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
