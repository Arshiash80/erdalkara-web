"use client";

import { useEffect, useRef } from "react";
import { MARKUP } from "./_design/markup";
import { initDesign } from "./_design/logic";

// three.js r128 globals + example loaders (the versions the design was built against)
const THREE_SCRIPTS = [
  "https://unpkg.com/three@0.128.0/build/three.min.js",
  "https://unpkg.com/three@0.128.0/examples/js/controls/OrbitControls.js",
  "https://unpkg.com/three@0.128.0/examples/js/loaders/GLTFLoader.js",
];

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-ek="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.dataset.ek = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`failed to load ${src}`));
    document.head.appendChild(s);
  });
}

export default function Home() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    // Load three core + its example loaders IN ORDER and fully before init.
    // The design's clipper polls for window.THREE and builds the scene the
    // instant it appears — so OrbitControls/GLTFLoader must already be attached
    // to THREE, otherwise `new THREE.OrbitControls(...)` throws on a cold load.
    (async () => {
      try {
        for (const src of THREE_SCRIPTS) await loadScript(src);
      } catch (e) {
        console.warn("[erdalkara] three.js failed to load — clipper falls back", e);
      } finally {
        // runs regardless: reveal / language toggle / counters / gallery / clipper
        initDesign();
      }
    })();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
