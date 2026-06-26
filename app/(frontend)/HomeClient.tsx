"use client";

import { useEffect, useRef } from "react";
import { initDesign } from "../_design/logic";

// Init-only: wires up the server-rendered design markup (reveal-on-scroll, nav,
// language toggle, gallery lightbox, card hovers). Renders nothing itself, so
// the (large) markup isn't serialized into the RSC payload as a prop.
export default function HomeClient() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    initDesign();
  }, []);

  return null;
}
