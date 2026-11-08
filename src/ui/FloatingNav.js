'use client'
import styled from "styled-components";
import { motion } from "framer-motion";
import { hero } from "@/content/site";
import { MOBILE } from "./primitives";

// The same two buttons render either big inside the hero slide or small in the corner.
// Sharing a layoutId makes framer-motion animate them between the two spots.

const spring = { type: 'spring', stiffness: 300, damping: 32 };

const NavButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  background: ${(p) => (p.$variant === 'soft' ? 'var(--accent-soft-solid, #efe3ff)' : 'var(--accent)')};
  color: ${(p) => (p.$variant === 'soft' ? 'var(--accent)' : 'var(--accent-ink)')};
  font-size: ${(p) => (p.$size === 'big' ? 'clamp(1.15rem, 1.7vw, 1.6rem)' : '0.9rem')};
  padding: ${(p) => (p.$size === 'big' ? '0.95em 1.9em' : '0.6em 1.2em')};
  box-shadow: ${(p) => (p.$size === 'big' ? 'none' : '0 4px 18px rgba(17, 17, 17, 0.08)')};
`;

export const NavButtons = ({ size, onNavigate }) => {
  const go = (id) => (e) => {
    e.preventDefault();
    onNavigate(id);
  };
  return (
    <>
      <NavButton layoutId="nav-book" transition={spring} $size={size} href="#book" onClick={go('book')}>
        <motion.span layout transition={spring}>{hero.bookLabel}</motion.span>
      </NavButton>
      <NavButton layoutId="nav-about" transition={spring} $size={size} $variant="soft" href="#about" onClick={go('about')}>
        <motion.span layout transition={spring}>{hero.aboutLabel}</motion.span>
      </NavButton>
    </>
  );
};

export const CornerNav = styled.nav`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
  display: flex;
  gap: 0.5rem;

  @media ${MOBILE} {
    top: 1rem;
    right: 1rem;
  }
`;
