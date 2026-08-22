"use client";

import dynamic from "next/dynamic";

const RealMap = dynamic(() => import("./RealMap"), {
  ssr: false,
  loading: () => <div className="border-2 border-[var(--ink)] h-72 sm:h-96 bg-[var(--ink)]/5" />,
});

export default RealMap;
