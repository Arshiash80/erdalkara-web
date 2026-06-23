/* eslint-disable */
// @ts-nocheck
// AUTO-GENERATED from Claude Design "Erdal Kara.dc.html". Do not edit by hand.
export function initDesign() {
class EKDesign {
  renderVals() { return {}; }

  componentDidMount() {
    const root = document.getElementById('ekRoot');
    if (!root) return;
    this.root = root;
    this.initReveal(root);
    this.initParallax(root);
    this.initNav(root);
    this.initLang(root);
    void this.initCursor;
    this.initGallery(root);
    this.initCards(root);
    this.initCounters(root);
    this.initClipper(root);
  }

  initReveal(root) {
    const els = [...root.querySelectorAll('[data-reveal]')];
    els.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(42px)';
      el.style.transition = 'opacity 1.05s cubic-bezier(.16,.7,.2,1), transform 1.05s cubic-bezier(.16,.7,.2,1)';
      el.style.willChange = 'opacity, transform';
    });
    const reveal = (el) => {
      if (el.dataset.shown) return;
      el.dataset.shown = '1';
      const d = el.getAttribute('data-delay') || 0;
      el.style.transitionDelay = d + 'ms';
      el.style.opacity = '1';
      el.style.transform = 'none';
    };
    // rect-based reveal (works even where IntersectionObserver does not fire)
    const check = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) reveal(el);
      });
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    // safety net: never leave anything stuck hidden
    setTimeout(() => els.forEach(reveal), 1700);
  }

  initParallax(root) {
    const els = [...root.querySelectorAll('[data-parallax]')];
    if (!els.length) return;
    let ticking = false;
    const upd = () => {
      const vh = window.innerHeight;
      els.forEach(el => {
        const sp = parseFloat(el.getAttribute('data-parallax')) || 0.08;
        const r = el.getBoundingClientRect();
        const off = (r.top + r.height / 2) - vh / 2;
        el.style.transform = 'translate3d(0,' + (-off * sp).toFixed(1) + 'px,0)';
      });
      ticking = false;
    };
    const onS = () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } };
    window.addEventListener('scroll', onS, { passive: true });
    window.addEventListener('resize', upd);
    upd();
  }

  initCursor(root) {
    if (window.matchMedia && window.matchMedia('(pointer:coarse)').matches) {
      const d = root.querySelector('#ekCurDot'); const r = root.querySelector('#ekCurRing');
      if (d) d.style.display = 'none'; if (r) r.style.display = 'none';
      return;
    }
    const dot = root.querySelector('#ekCurDot');
    const ring = root.querySelector('#ekCurRing');
    if (!dot || !ring) return;
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
    });
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(loop);
    };
    loop();
    root.querySelectorAll('a,button,[data-cursor]').forEach(h => {
      h.addEventListener('mouseenter', () => {
        ring.style.width = '46px'; ring.style.height = '46px';
        ring.style.borderColor = 'var(--bronze2)';
      });
      h.addEventListener('mouseleave', () => {
        ring.style.width = '30px'; ring.style.height = '30px';
        ring.style.borderColor = 'var(--bronze)';
      });
    });
  }

  initCards(root) {
    root.querySelectorAll('[data-card]').forEach(c => {
      c.addEventListener('mouseenter', () => {
        c.style.transition = 'transform .45s cubic-bezier(.2,.7,.2,1), border-color .45s';
        c.style.transform = 'translateY(-8px)';
        c.style.borderColor = 'var(--bronze)';
      });
      c.addEventListener('mouseleave', () => {
        c.style.transform = 'none';
        c.style.borderColor = 'var(--line)';
      });
    });
  }

  initNav(root) {
    const nav = root.querySelector('#ekNav');
    const burger = root.querySelector('#ekBurger');
    const menu = root.querySelector('#ekMobile');
    if (nav) {
      const onScroll = () => {
        const s = window.scrollY > 40;
        nav.style.background = s ? 'rgba(20,17,13,.86)' : 'transparent';
        nav.style.borderColor = s ? 'var(--line)' : 'transparent';
        nav.style.backdropFilter = s ? 'blur(16px) saturate(1.3)' : 'none';
        nav.style.webkitBackdropFilter = nav.style.backdropFilter;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
    let open = false;
    const set = (o) => {
      open = o;
      if (!menu) return;
      menu.style.transform = o ? 'translateY(0)' : 'translateY(-100%)';
      menu.style.opacity = o ? '1' : '0';
      menu.style.pointerEvents = o ? 'auto' : 'none';
      if (burger) {
        burger.setAttribute('data-open', o);
        const bars = burger.querySelectorAll('span');
        if (bars[0]) bars[0].style.transform = o ? 'translateY(3.25px) rotate(45deg)' : 'none';
        if (bars[1]) bars[1].style.transform = o ? 'translateY(-3.25px) rotate(-45deg)' : 'none';
      }
    };
    if (burger) burger.addEventListener('click', () => set(!open));
    root.querySelectorAll('[data-nav-link]').forEach(a => a.addEventListener('click', () => set(false)));
    root.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
          const t = root.querySelector(id);
          if (t) {
            e.preventDefault();
            window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
          }
        }
      });
    });
  }

  initLang(root) {
    const btns = root.querySelectorAll('[data-lang-btn]');
    const nodes = [...root.querySelectorAll('[data-en]')];
    nodes.forEach(n => n.setAttribute('data-tr', n.textContent));
    const apply = (lang) => {
      nodes.forEach(n => {
        n.textContent = lang === 'en' ? n.getAttribute('data-en') : n.getAttribute('data-tr');
      });
      btns.forEach(b => {
        const on = b.getAttribute('data-lang-btn') === lang;
        b.style.color = on ? 'var(--ink)' : 'var(--faint)';
      });
      root.setAttribute('lang', lang);
    };
    btns.forEach(b => b.addEventListener('click', () => apply(b.getAttribute('data-lang-btn'))));
    apply('tr');
  }

  initGallery(root) {
    const box = root.querySelector('#ekLightbox');
    const img = root.querySelector('#ekLbImg');
    root.querySelectorAll('[data-lb]').forEach(t => {
      const im = t.querySelector('img');
      if (im) {
        t.addEventListener('mouseenter', () => { im.style.transform = 'scale(1.06)'; });
        t.addEventListener('mouseleave', () => { im.style.transform = 'scale(1)'; });
      }
      t.addEventListener('click', () => {
        const src = t.getAttribute('data-lb');
        if (!src || !box || !img) return;
        img.src = src;
        box.style.opacity = '1';
        box.style.pointerEvents = 'auto';
        requestAnimationFrame(() => { img.style.transform = 'scale(1)'; });
      });
    });
    if (box) {
      box.addEventListener('click', () => {
        box.style.opacity = '0';
        box.style.pointerEvents = 'none';
        if (img) img.style.transform = 'scale(.96)';
      });
    }
  }

  initCounters(root) {
    const els = [...root.querySelectorAll('[data-count]')];
    const run = (el) => { if (el.dataset.counted) return; el.dataset.counted = '1'; this.runCount(el); };
    const check = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) run(el);
      });
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    setTimeout(() => els.forEach(run), 1900);
  }

  runCount(el) {
    const to = parseFloat(el.getAttribute('data-count'));
    const dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    const dur = 1500;
    const st = performance.now();
    const fmt = (v) => dec ? v.toFixed(dec) : Math.round(v).toLocaleString('tr-TR');
    const step = (t) => {
      let p = Math.min(1, (t - st) / dur);
      p = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(to * p);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(to);
    };
    requestAnimationFrame(step);
  }

  initClipper(root) {
    const mount = root.querySelector('#ekClipper');
    if (!mount) return;
    let tries = 0;
    const start = () => {
      if (window.THREE) { try { this.buildScene(mount); } catch (e) { console.warn('3D init failed', e); } }
      else if (tries++ < 160) { setTimeout(start, 60); }
    };
    start();
  }

  makeEnv(THREE, renderer) {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 256;
    const g = c.getContext('2d');
    const grd = g.createLinearGradient(0, 0, 0, 256);
    grd.addColorStop(0, '#262219');
    grd.addColorStop(0.45, '#0a0908');
    grd.addColorStop(0.78, '#191108');
    grd.addColorStop(1, '#41301a');
    g.fillStyle = grd; g.fillRect(0, 0, 512, 256);
    const rg = g.createRadialGradient(360, 60, 8, 360, 60, 170);
    rg.addColorStop(0, 'rgba(255,228,176,.95)');
    rg.addColorStop(1, 'rgba(255,228,176,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 512, 256);
    const rg2 = g.createRadialGradient(110, 180, 8, 110, 180, 150);
    rg2.addColorStop(0, 'rgba(212,64,47,.30)');
    rg2.addColorStop(1, 'rgba(212,64,47,0)');
    g.fillStyle = rg2; g.fillRect(0, 0, 512, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    if ('sRGBEncoding' in THREE) tex.encoding = THREE.sRGBEncoding;
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromEquirectangular(tex).texture;
    tex.dispose(); pmrem.dispose();
    return env;
  }

  roundedRect(THREE, w, h, r) {
    const s = new THREE.Shape();
    const x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    return s;
  }

  makeClipper(THREE) {
    const g = new THREE.Group();
    const matBlack = new THREE.MeshStandardMaterial({ color: 0x121110, metalness: 0.5, roughness: 0.46 });
    const matBronze = new THREE.MeshStandardMaterial({ color: 0xb5863f, metalness: 1.0, roughness: 0.28 });
    const matBronzeB = new THREE.MeshStandardMaterial({ color: 0xddb46a, metalness: 1.0, roughness: 0.18 });
    const matSteel = new THREE.MeshStandardMaterial({ color: 0xcbc8c0, metalness: 1.0, roughness: 0.22 });

    const extrude = (shape, depth, bevel) => {
      const geo = new THREE.ExtrudeGeometry(shape, { depth: depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: 16, steps: 1 });
      geo.center();
      return geo;
    };

    // main body — stands vertically
    const body = new THREE.Mesh(extrude(this.roundedRect(THREE, 1.28, 0.78, 0.26), 3.0, 0.07), matBlack);
    body.rotation.x = -Math.PI / 2;
    body.castShadow = true;
    g.add(body);

    // bronze inlay plate on the front face
    const plate = new THREE.Mesh(extrude(this.roundedRect(THREE, 0.74, 2.2, 0.16), 0.06, 0.02), matBronze);
    plate.rotation.x = -Math.PI / 2;
    plate.position.set(0, 0.1, 0.42);
    plate.castShadow = true;
    g.add(plate);

    // bronze accent bands (rings) around body
    const bandShape = this.roundedRect(THREE, 1.34, 0.84, 0.27);
    bandShape.holes.push(this.roundedRect(THREE, 1.18, 0.68, 0.2));
    [1.02, -1.06].forEach((yy) => {
      const band = new THREE.Mesh(new THREE.ExtrudeGeometry(bandShape, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2, curveSegments: 14, steps: 1 }), matBronze);
      band.geometry.center();
      band.rotation.x = -Math.PI / 2;
      band.position.y = yy;
      band.castShadow = true;
      g.add(band);
    });

    // tapered head block (bronze) at top
    const head = new THREE.Mesh(extrude(this.roundedRect(THREE, 1.04, 0.62, 0.16), 0.5, 0.04), matBronze);
    head.rotation.x = -Math.PI / 2;
    head.position.y = 1.74;
    head.scale.set(0.92, 1, 0.92);
    head.castShadow = true;
    g.add(head);

    // steel cutting comb teeth
    const teeth = new THREE.Group();
    const tCount = 13;
    for (let i = 0; i < tCount; i++) {
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.16, 0.1), matSteel);
      tooth.position.x = (i - (tCount - 1) / 2) * 0.075;
      tooth.castShadow = true;
      teeth.add(tooth);
    }
    teeth.position.set(0, 2.05, 0.3);
    g.add(teeth);
    // steel base bar for the comb
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.12, 0.16), matBronzeB);
    bar.position.set(0, 1.98, 0.28);
    g.add(bar);

    // power button (bronze) on front
    const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.07, 28), matBronzeB);
    btn.rotation.x = Math.PI / 2;
    btn.position.set(0, 0.5, 0.45);
    g.add(btn);

    // taper lever on the side
    const lever = new THREE.Mesh(extrude(this.roundedRect(THREE, 0.18, 0.5, 0.07), 0.1, 0.02), matBronze);
    lever.rotation.x = -Math.PI / 2;
    lever.position.set(0.66, -0.1, 0.06);
    g.add(lever);

    g.position.y = 0.15;
    return g;
  }

  buildScene(mount) {
    const THREE = window.THREE;
    let w = mount.clientWidth, h = mount.clientHeight;
    if (w < 2 || h < 2) { setTimeout(() => this.buildScene(mount), 120); return; }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, w / h, 0.1, 100);
    camera.position.set(0.1, 0.4, 12.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if ('outputEncoding' in renderer) renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.32;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.cursor = 'grab';

    scene.environment = this.makeEnv(THREE, renderer);

    const group = new THREE.Group();
    scene.add(group);

    // pedestal
    const ped = new THREE.Mesh(
      new THREE.CylinderGeometry(2.1, 2.3, 0.16, 64),
      new THREE.MeshStandardMaterial({ color: 0x100d0a, metalness: 0.7, roughness: 0.22 })
    );
    ped.position.y = -1.95;
    ped.receiveShadow = true;
    scene.add(ped);
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(2.13, 0.024, 16, 80),
      new THREE.MeshStandardMaterial({ color: 0xc29351, metalness: 1, roughness: 0.25 })
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.y = -1.86;
    scene.add(rim);

    // lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const key = new THREE.SpotLight(0xffe7c2, 3.0, 40, 0.6, 0.6, 1.2);
    key.position.set(4.5, 7, 5);
    key.castShadow = true;
    key.shadow.mapSize.width = 1024;
    key.shadow.mapSize.height = 1024;
    key.shadow.bias = -0.0004;
    key.target = group;
    scene.add(key);
    const rimL = new THREE.DirectionalLight(0xffcf9c, 1.5);
    rimL.position.set(-5, 3.5, -4);
    scene.add(rimL);
    const red = new THREE.PointLight(0xff3a26, 1.1, 16, 2);
    red.position.set(-3.5, -1, 3.5);
    scene.add(red);
    const bronzeP = new THREE.PointLight(0xffbf6e, 0.9, 16, 2);
    bronzeP.position.set(2.6, 1.4, 4.5);
    scene.add(bronzeP);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.9;
    controls.minPolarAngle = Math.PI * 0.28;
    controls.maxPolarAngle = Math.PI * 0.62;
    controls.target.set(0, 0.1, 0);

    renderer.domElement.addEventListener('pointerdown', () => {
      controls.autoRotate = false;
      renderer.domElement.style.cursor = 'grabbing';
    });
    window.addEventListener('pointerup', () => {
      renderer.domElement.style.cursor = 'grab';
      clearTimeout(this._ar);
      this._ar = setTimeout(() => { controls.autoRotate = true; }, 2800);
    });

    this.tryLoadModel(THREE, group);

    const clock = new THREE.Clock();
    const animate = () => {
      this._raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      group.position.y = Math.sin(t * 0.8) * 0.07;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight;
      if (nw < 2 || nh < 2) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);
  }

  tryLoadModel(THREE, group) {
    if (!THREE.GLTFLoader) { group.add(this.makeClipper(THREE)); return; }
    // Real Meshy model. Local copy preferred; falls back to GitHub raw CDN.
    const urls = [
      '/models/clipper.glb',
      'https://raw.githubusercontent.com/Arshiash80/erdalkara-web/main/public/models/clipper.glb'
    ];
    const tryUrl = (i) => {
      if (i >= urls.length) { console.warn('[clipper] no model — placeholder'); group.add(this.makeClipper(THREE)); return; }
      try {
        const loader = new THREE.GLTFLoader();
        loader.load(urls[i], (gltf) => {
          const m = gltf.scene;
          const box = new THREE.Box3().setFromObject(m);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
          m.position.sub(center);
          const maxD = Math.max(size.x, size.y, size.z) || 1;
          m.scale.setScalar(3.45 / maxD);
          m.traverse(o => {
            if (o.isMesh) {
              o.castShadow = true;
              if (o.material) { o.material.envMapIntensity = 1.45; o.material.needsUpdate = true; }
            }
          });
          while (group.children.length) group.remove(group.children[0]);
          group.add(m);
          this._model = m;
          console.log('[clipper] model loaded from', urls[i]);
        }, undefined, () => { tryUrl(i + 1); });
      } catch (e) { tryUrl(i + 1); }
    };
    tryUrl(0);
  }
}
  new EKDesign().componentDidMount();
}
