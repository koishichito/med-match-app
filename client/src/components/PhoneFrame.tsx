import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  label?: string;
}

export default function PhoneFrame({ children, label }: PhoneFrameProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      {label && (
        <span className="text-xs font-semibold tracking-wider text-indigo-300/80 uppercase">
          {label}
        </span>
      )}
      <div className="phone-frame bg-[#0f172a]">
        {/* Status bar */}
        <div className="h-11 flex items-center justify-between px-6 bg-black/30 text-white text-xs font-semibold">
          <span className="text-sm font-bold">9:41</span>
          <div className="flex items-center gap-1 text-[10px]">
            <span>📶</span>
            <span>🔋</span>
          </div>
        </div>
        {/* Screen content */}
        <div className="h-[688px] overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: "none" }}>
          {children}
        </div>
        {/* Home indicator */}
        <div className="h-[20px] bg-black/20 flex items-center justify-center">
          <div className="w-32 h-1 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
}
