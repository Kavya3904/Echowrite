// src/components/ui/page-loader.tsx
"use client";

import { useEffect, useState } from "react";

type PageLoaderProps = {
  /** If you want to control it manually */
  show?: boolean;
};

export function PageLoader({ show = true }: PageLoaderProps) {
  const [visible, setVisible] = useState(true);
  console.log("show", visible);
  // allow parent to toggle "show" prop
  useEffect(() => {
     setVisible(show);
  }, [show]);
  const colors = [
    "border-red-500",
    "border-blue-500",
    "border-green-500",
    "border-purple-500",
    "border-yellow-400",
    "border-pink-500",
  ];

  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

    if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 rounded-xl bg-slate-500 px-6 py-4 shadow-lg">
        <span className=" flex h-8 w-8">
          <span
            className={` inset-0 h-8 w-8 border-4 ${colors[colorIndex]}  border-t-transparent rounded-full animate-[spin_1.5s_linear_infinite]`}
          />
        </span>
        <p className="text-xs pl-2 font-medium text-slate-100">Loading…</p>
      </div>
    </div>
  );
}
