'use client'
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { hero } from "@/content/site";

// One fixed button bar that is only ever moved and scaled with a transform:
// big inside the hero's button slot, small in the top-right corner everywhere else.
// Transform-only animation stays smooth on iPhone Safari, and because the whole bar
// scales uniformly, the text never distorts or separates from its pill.

const HERO_SCALE = 1.6;
const spring = { type: 'spring', stiffness: 260, damping: 30, mass: 0.9 };

const Bar = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  gap: 0.5rem;
  transform-origin: 0 0;
`;

const NavButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.6em 1.2em;
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
  const firstPlacement = useRef(true);
  const [spots, setSpots] = useState(null);

  // Measure where the bar should sit: the hero slot (as laid out when the page is scrolled to the
  // start) and the top-right corner.
  useEffect(() => {
    const measure = () => {
      const bar = barRef.current;
      const slot = slotRef.current;
      if (!bar || !slot) return;
      const heroEl = slot.closest('section');
      const s = slot.getBoundingClientRect();
      const h = heroEl.getBoundingClientRect();
      const margin = window.innerWidth <= 800 ? 16 : 24;
      setSpots({
        hero: { x: Math.round(s.left - h.left), y: Math.round(s.top - h.top) },
        corner: { x: Math.round(window.innerWidth - bar.offsetWidth - margin), y: margin },
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
    const id = requestAnimationFrame(() => { firstPlacement.current = false; });
    return () => cancelAnimationFrame(id);
  }, [spots]);

  const go = (id) => (e) => {
    e.preventDefault();
    onNavigate(id);
  };

  const target = spots
    ? onHero
      ? { ...spots.hero, scale: HERO_SCALE, opacity: 1 }
      : { ...spots.corner, scale: 1, opacity: 1 }
    : { opacity: 0 };

  // First placement jumps straight into position and fades in; after that, moves use the spring.
  const transition = firstPlacement.current
    ? { x: { duration: 0 }, y: { duration: 0 }, scale: { duration: 0 }, opacity: { duration: 0.6, delay: 0.35 } }
    : spring;

  return (
    <Bar ref={barRef} aria-label="Quick links" initial={{ opacity: 0 }} animate={target} transition={transition}>
      <NavButton href="#book" onClick={go('book')} $onHero={onHero}>{hero.bookLabel}</NavButton>
      <NavButton href="#about" onClick={go('about')} $onHero={onHero} $variant="soft">{hero.aboutLabel}</NavButton>
    </Bar>
  );
};
