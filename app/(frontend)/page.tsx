"use client";

import { useEffect, useRef } from "react";
import { MARKUP } from "../_design/markup";
import { initDesign } from "../_design/logic";

export default function Home() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    // reveal-on-scroll, nav, language toggle, gallery, card hovers
    initDesign();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
