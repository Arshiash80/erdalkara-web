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

    // apply tweakable props
    if (this.props.accentColor) {
      root.style.setProperty('--clay', this.props.accentColor);
      root.style.setProperty('--clay2', this.props.accentColor);
    }

    this.initReveal(root);
    this.initNav(root);
    this.initLang(root);
    this.initGallery(root);
    this.initCards(root);
  }

  initReveal(root) {
    const on = this.props.gentleMotion !== false;
    const els = [...root.querySelectorAll('[data-rev]')];
    if (!on) { els.forEach(el => { el.style.opacity = '1'; }); return; }
    els.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .8s cubic-bezier(.16,.7,.2,1), transform .8s cubic-bezier(.16,.7,.2,1)';
      el.style.willChange = 'opacity, transform';
    });
    const reveal = (el) => {
      if (el.dataset.shown) return;
      el.dataset.shown = '1';
      el.style.opacity = '1';
      el.style.transform = 'none';
    };
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
    setTimeout(() => els.forEach(reveal), 1600);
  }

  initNav(root) {
    const nav = root.querySelector('#ekNav');
    const burger = root.querySelector('#ekBurger');
    const menu = root.querySelector('#ekMobile');
    if (nav) {
      const onScroll = () => {
        const s = window.scrollY > 32;
        nav.style.background = s ? 'rgba(247,242,233,.88)' : 'transparent';
        nav.style.borderColor = s ? 'var(--line)' : 'transparent';
        nav.style.boxShadow = s ? '0 6px 30px -18px rgba(58,40,26,.4)' : 'none';
        nav.style.backdropFilter = s ? 'blur(14px) saturate(1.2)' : 'none';
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
        if (bars[0]) bars[0].style.transform = o ? 'translateY(3.3px) rotate(45deg)' : 'none';
        if (bars[1]) bars[1].style.transform = o ? 'translateY(-3.3px) rotate(-45deg)' : 'none';
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
            window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' });
          }
        }
      });
    });
    // gentle nav link hover
    root.querySelectorAll('#ekNavLinks a').forEach(a => {
      a.addEventListener('mouseenter', () => { a.style.color = 'var(--ink)'; });
      a.addEventListener('mouseleave', () => { a.style.color = 'var(--muted)'; });
    });
  }

  initLang(root) {
    const btns = root.querySelectorAll('[data-lang-btn]');
    const nodes = [...root.querySelectorAll('[data-en]')];
    nodes.forEach(n => n.setAttribute('data-tr', n.innerHTML));
    const apply = (lang) => {
      nodes.forEach(n => {
        n.innerHTML = lang === 'en' ? n.getAttribute('data-en') : n.getAttribute('data-tr');
      });
      btns.forEach(b => {
        const onB = b.getAttribute('data-lang-btn') === lang;
        b.style.color = onB ? 'var(--ink)' : 'var(--faint)';
      });
      root.setAttribute('lang', lang);
    };
    btns.forEach(b => b.addEventListener('click', () => apply(b.getAttribute('data-lang-btn'))));
    const def = (this.props.defaultLang === 'en') ? 'en' : 'tr';
    apply(def);
  }

  initGallery(root) {
    const box = root.querySelector('#ekLightbox');
    const img = root.querySelector('#ekLbImg');
    root.querySelectorAll('[data-lb]').forEach(t => {
      const im = t.querySelector('img');
      if (im) {
        t.addEventListener('mouseenter', () => { im.style.transform = 'scale(1.05)'; });
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
        if (img) img.style.transform = 'scale(.97)';
      });
    }
  }

  initCards(root) {
    root.querySelectorAll('[data-card]').forEach(c => {
      c.addEventListener('mouseenter', () => {
        c.style.transform = 'translateY(-6px)';
        c.style.boxShadow = '0 24px 44px -26px rgba(58,40,26,.4)';
        c.style.borderColor = 'var(--clay)';
      });
      c.addEventListener('mouseleave', () => {
        c.style.transform = 'none';
        c.style.boxShadow = 'none';
        c.style.borderColor = 'var(--line)';
      });
    });
  }
}
  const __ek = new EKDesign();
  __ek.props = {"defaultLang":"tr","accentColor":"#bb6a4a","gentleMotion":true};
  __ek.componentDidMount();
}
