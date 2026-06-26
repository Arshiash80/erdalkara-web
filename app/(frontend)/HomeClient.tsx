"use client";

import { useEffect, useRef } from "react";
import { initDesign } from "../_design/logic";

// Renders the (server-prepared) design markup and wires up its behaviors:
// reveal-on-scroll, nav, language toggle, gallery, card hovers.
export default function HomeClient({ html }: { html: string }) {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    initDesign();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
