import { type ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  label?: string;
}

export default function PhoneFrame({ children, label }: PhoneFrameProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {label && (
        <span className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
          {label}
        </span>
      )}
      <div className="phone-frame-wrapper">
        <div className="phone-frame bg-white">
          {/* Status bar — notch-aware: left side shows time, right side icons */}
          <div className="h-11 flex items-center justify-between px-6 bg-white text-gray-800 text-xs font-medium">
            <span className="text-sm font-bold tracking-tight">9:41</span>
            {/* Notch spacer */}
            <div className="w-[120px]" />
            <div className="flex items-center gap-1.5">
              {/* Signal bars */}
              <div className="flex items-end gap-[2px]">
                {[3, 5, 7, 9].map((h, i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-sm"
                    style={{
                      height: h,
                      backgroundColor: i < 3 ? "#374151" : "#d1d5db",
                    }}
                  />
                ))}
              </div>
              {/* WiFi icon */}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M7 8.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" fill="#374151"/>
                <path d="M4.2 6.8a4 4 0 0 1 5.6 0" stroke="#374151" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                <path d="M1.4 4a8 8 0 0 1 11.2 0" stroke="#374151" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              </svg>
              {/* Battery */}
              <div className="flex items-center gap-px">
                <div className="w-[20px] h-[10px] rounded-[2px] border border-gray-700 relative flex items-center px-[1.5px]">
                  <div className="h-[6px] w-[13px] rounded-[1px] bg-gray-700" />
                </div>
                <div className="w-[1.5px] h-[5px] rounded-r-full bg-gray-700" />
              </div>
            </div>
          </div>
          {/* Screen content */}
          <div className="h-[688px] overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: "none" }}>
            {children}
          </div>
          {/* Home indicator */}
          <div className="h-[22px] bg-white flex items-center justify-center">
            <div className="w-28 h-[4px] rounded-full bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
