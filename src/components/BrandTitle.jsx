import React from 'react';

export default function BrandTitle({ size = "text-xl", showSubtitle = false }) {
  return (
    <div className="flex flex-col">
      <div className={`font-extrabold tracking-tight leading-none ${size}`}>
        <span className="text-slate-950 font-black">HE</span>
        <span className="text-[#b51253] font-black">R</span>
        <span className="text-slate-950 font-bold">oute</span>
      </div>
      {showSubtitle && (
        <span className="text-[10px] text-slate-500 font-semibold tracking-normal mt-0.5">
          Safety-Aware Navigation
        </span>
      )}
    </div>
  );
}
