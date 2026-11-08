'use client'
import { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { MOBILE } from "@/ui/primitives";
import { FloatingNav } from "@/ui/FloatingNav";
import { ScrollHint } from "@/ui/ScrollHint";
import { Hero } from "@/ui/slides/Hero";
import { Book } from "@/ui/slides/Book";
import { About } from "@/ui/slides/About";
import { Faq } from "@/ui/slides/Faq";
import { Contact } from "@/ui/slides/Contact";

const slides = [
  { id: 'home', label: 'Home' },
  { id: 'book', label: 'Book a Class' },
  { id: 'about', label: 'About' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

const Layout = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }

  @media ${MOBILE} {
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
  }
`;

const DotsBar = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  right: 0;
  top: 0;
  width: 48px;
  height: 100%;
  z-index: 999;
  pointer-events: none;

  @media ${MOBILE} {
    flex-direction: row;
    align-items: center;
    right: auto;
    left: 0;
    top: auto;
    bottom: 0;
    width: 100%;
    height: 48px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    pointer-events: auto;
  }
`;

const DotsColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  pointer-events: auto;

  @media ${MOBILE} {
    flex-direction: row;
    justify-content: center;
    gap: 12px;
  }
`;

const Dot = styled.button`
  all: unset;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(p) => (p.$active ? 'var(--highlight-color)' : 'rgba(0,0,0,0.25)')};
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  transform: ${(p) => (p.$active ? 'scale(1.4)' : 'scale(1)')};
  flex-shrink: 0;

  &:hover {
    transform: scale(1.4);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }
`;

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(false); // mobile only
  const layoutRef = useRef(null);
  const heroSlotRef = useRef(null);

  useEffect(() => {
    const layout = layoutRef.current;
    if (!layout) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      // The active slide is the last one whose start has passed the middle of the screen.
      // Works for both the vertical (desktop) and horizontal (mobile) layout.
      const midX = window.innerWidth / 2;
      const midY = window.innerHeight / 2;
      let index = 0;
      slides.forEach((s, i) => {
        const r = document.getElementById(s.id)?.getBoundingClientRect();
        if (r && r.top <= midY && r.left <= midX) index = i;
      });
      setActiveIndex(index);
      // The button bar leaves the hero as soon as the page starts moving away from it.
      setAtStart(Math.max(layout.scrollTop, layout.scrollLeft) < 40);

      // Mobile: show a down arrow on slides with more content below, until the visitor scrolls a bit.
      const el = document.getElementById(slides[index].id);
      const hasMore = el.scrollHeight - el.clientHeight > 24;
      setShowScrollHint(window.matchMedia(MOBILE).matches && hasMore && el.scrollTop < 24);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    update();
    // capture: also catches each slide's own vertical scrolling on mobile
    layout.addEventListener('scroll', schedule, { passive: true, capture: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      layout.removeEventListener('scroll', schedule, { capture: true });
      window.removeEventListener('resize', schedule);
    };
  }, []);

  const scrollToSlide = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  }, []);

  return (
    <>
      <Layout ref={layoutRef}>
        <Hero slotRef={heroSlotRef} />
        <Book />
        <About />
        <Faq />
        <Contact />
      </Layout>

      <FloatingNav onHero={atStart} slotRef={heroSlotRef} onNavigate={scrollToSlide} />
      <ScrollHint show={showScrollHint} />

      <DotsBar aria-label="Slides">
        <DotsColumn>
          {slides.map((slide, i) => (
            <Dot
              key={slide.id}
              $active={activeIndex === i}
              aria-label={slide.label}
              aria-current={activeIndex === i ? 'true' : undefined}
              onClick={() => scrollToSlide(slide.id)}
            />
          ))}
        </DotsColumn>
      </DotsBar>
    </>
  );
}
