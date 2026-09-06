"use client";

import { useId } from "react";

type LogoProps = {
  className?: string;
  markOnly?: boolean;
  size?: number;
};

export function LogoMark({ className, size = 40 }: { className?: string; size?: number }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `fnait-grad-${uid}`;
  const flagId = `fnait-flag-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="fn-ait"
    >
      <defs>
        <linearGradient id={gradId} x1="10" y1="15" x2="90" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B3DFF" />
          <stop offset="55%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id={flagId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>

      {/* left bar of N */}
      <rect x="16" y="18" width="16" height="64" rx="6" fill={`url(#${gradId})`} />
      {/* right bar of N */}
      <rect x="68" y="18" width="16" height="64" rx="6" fill={`url(#${gradId})`} />
      {/* diagonal stroke of N */}
      <polygon points="32,18 48,18 84,74 68,74" fill={`url(#${gradId})`} />
      {/* flag / spark accent, nods to forward motion + AI */}
      <path d="M68 18 L90 18 L68 40 Z" fill={`url(#${flagId})`} opacity="0.9" />
      <circle cx="76" cy="26" r="3.2" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}

export default function Logo({ className, markOnly = false, size = 40 }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark size={size} />
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            fn<span className="text-violet-600 dark:text-violet-400">-ait</span>
          </span>
          <span className="mt-0.5 text-[10px] font-medium tracking-wide text-slate-500 dark:text-slate-400">
            حلول ذكية بتقنية الذكاء الاصطناعي
          </span>
        </span>
      )}
    </span>
  );
}
