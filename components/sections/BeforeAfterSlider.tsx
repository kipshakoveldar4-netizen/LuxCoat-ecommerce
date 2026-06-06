"use client";

import { MoveHorizontal, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function BeforeAfterSlider() {
  const [value, setValue] = useState(54);

  return (
    <div className="glass-panel overflow-hidden rounded-[2rem]">
      <div className="relative aspect-[16/10] min-h-[300px] sm:aspect-[16/9]">
        <Image
          alt="LuxCoat coated vehicle after application"
          className="object-cover object-[66%_50%]"
          fill
          sizes="(min-width: 1024px) 1080px, 100vw"
          src="/images/luxcoat-hero.png"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        <div
          className="absolute inset-0 overflow-hidden border-r border-white/70"
          style={{ width: `${value}%` }}
        >
          <Image
            alt="Vehicle finish before LuxCoat application"
            className="object-cover object-[66%_50%] grayscale brightness-[0.42] contrast-[0.88] saturate-50"
            fill
            sizes="(min-width: 1024px) 1080px, 100vw"
            src="/images/luxcoat-hero.png"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>
        <div
          className="absolute top-0 h-full w-px bg-cobalt shadow-glow"
          style={{ left: `${value}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/70 text-cobalt shadow-glow backdrop-blur-xl">
            <MoveHorizontal size={22} />
          </span>
        </div>
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/72 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-300 sm:left-5 sm:top-5">
          Before: dull paint
        </div>
        <div className="absolute right-4 top-4 rounded-full border border-cobalt/50 bg-cobalt px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white sm:right-5 sm:top-5">
          After: liquid glass
        </div>
        <div className="absolute bottom-4 left-4 right-4 rounded-3xl border border-white/15 bg-black/65 p-4 backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-sm">
          <div className="flex items-center gap-2 text-cobalt">
            <Sparkles size={18} />
            <p className="text-xs font-bold uppercase tracking-[0.16em]">Gloss preview</p>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-200">
            Drag to compare flat, low-contrast paint with the deeper wet-look finish.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 p-5">
        <input
          aria-label="Compare LuxCoat before and after"
          className="w-full accent-cobalt"
          max="84"
          min="16"
          onChange={(event) => setValue(Number(event.target.value))}
          type="range"
          value={value}
        />
        <div className="mt-3 flex justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
          <span>Uncoated</span>
          <span>Protected gloss</span>
        </div>
      </div>
    </div>
  );
}
