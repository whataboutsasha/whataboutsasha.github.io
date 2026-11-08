'use client'
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { animate } from "framer-motion";
import { hero } from "@/content/site";

// One fixed button bar: big inside the hero's button slot, small in the top-right corner.
//
// Smooth: the flight between the two spots is a transform-only animation (move + zoom),
// which iPhone Safari animates smoothly, and the bar zooms as one piece so nothing distorts.
//
// Crisp: zoomed text is blurry (Safari stretches a bitmap of the text), so the zoom is only
// used during the flight. When the bar lands, its real font size is switched to the target
// size and the zoom reset to 1 in the same frame. Everything inside is sized in em, so the
// switch is visually seamless and the resting bar is always rendered at true size.

const CORNER_FONT_REM = 0.8;
const spring = { type: 'spring', stiffness: 260, damping: 30, mass: 0.9 };

const remPx = () => parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
// Same as the original hero buttons: clamp(1.15rem, 1.7vw, 1.6rem)
const heroFontPx = () => Math.min(Math.max(1.15 * remPx(), 0.017 * window.innerWidth), 1.6 * remPx());

const Bar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  gap: 0.5em;
  font-size: ${CORNER_FONT_REM}rem;
  transform-origin: 0 0;
  opacity: 0;
  transition: opacity 0.6s 0.35s;
`;

const NavButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-weight: 700;
  font-size: 1em;
  padding: 0.95em 1.9em;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  background: ${(p) => (p.$variant === 'soft' ? 'var(--accent-soft-solid)' : 'var(--accent)')};
  color: ${(p) => (p.$variant === 'soft' ? 'var(--accent)' : 'var(--accent-ink)')};
  box-shadow: ${(p) => (p.$onHero ? '0 0 0 rgba(17, 17, 17, 0)' : '0 4px 18px rgba(17, 17, 17, 0.08)')};
  transition: box-shadow 0.4s;
`;

export const FloatingNav = ({ onHero, slotRef, onNavigate }) => {
  const barRef = useRef(null);
  // What is currently on screen: position, zoom, and the real font size (px).
  const current = useRef(null);
  const [spots, setSpots] = useState(null);

  // Where the bar rests in each state, and at which font size.
  useEffect(() => {
    const measure = () => {
      const bar = barRef.current;
      const slot = slotRef.current;
      if (!bar || !slot) return;
      const heroEl = slot.closest('section');
      const s = slot.getBoundingClientRect();
      const h = heroEl.getBoundingClientRect();
      const margin = window.innerWidth <= 800 ? 16 : 24;
      // The bar's width scales linearly with its font size (everything is in em).
      const widthPerFontPx = bar.offsetWidth / parseFloat(getComputedStyle(bar).fontSize);
      const cornerFont = CORNER_FONT_REM * remPx();
      setSpots({
        // hero position = slot position when the page is scrolled to the start
        hero: { x: Math.round(s.left - h.left), y: Math.round(s.top - h.top), font: heroFontPx() },
        corner: { x: Math.round(window.innerWidth - widthPerFontPx * cornerFont - margin), y: margin, font: cornerFont },
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(slotRef.current);
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [slotRef]);

  useEffect(() => {
    if (!spots) return;
    const bar = barRef.current;
    const target = onHero ? spots.hero : spots.corner;
    // All visual state is written here, in one place, so font and zoom always change together.
    const paint = (state) => {
      current.current = state;
      bar.style.fontSize = `${state.font}px`;
      bar.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) scale(${state.scale})`;
    };

    // First placement: jump straight into position at true size, then fade in (CSS transition).
    if (!current.current) {
      paint({ ...target, scale: 1 });
      bar.style.opacity = '1';
      return;
    }

    // Fly from what is on screen now: move, and zoom from the current real font size
    // towards the target size. On landing, swap the zoom for the real font size in the
    // same frame, so the resting bar is always rendered at true size (crisp text).
    const from = current.current;
    const fromZoom = from.scale;
    const toZoom = target.font / from.font;
    const flight = animate(0, 1, {
      ...spring,
      onUpdate: (p) => paint({
        x: from.x + (target.x - from.x) * p,
        y: from.y + (target.y - from.y) * p,
        scale: fromZoom + (toZoom - fromZoom) * p,
        font: from.font,
      }),
      onComplete: () => paint({ ...target, scale: 1 }),
    });
    return () => flight.stop();
  }, [spots, onHero]);

  const go = (id) => (e) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <Bar ref={barRef} aria-label="Quick links">
      <NavButton href="#book" onClick={go('book')} $onHero={onHero}>{hero.bookLabel}</NavButton>
      <NavButton href="#about" onClick={go('about')} $onHero={onHero} $variant="soft">{hero.aboutLabel}</NavButton>
    </Bar>
  );
};
