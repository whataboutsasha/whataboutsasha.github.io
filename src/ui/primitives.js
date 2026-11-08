'use client'
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const MOBILE = '(max-width: 800px)';

// One full-screen slide. Desktop: slides stack vertically. Mobile: slides sit side by side
// and each slide scrolls vertically on its own.
export const SlideFrame = styled.section`
  width: 100vw;
  min-height: 100vh;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
  padding: 5rem var(--dots-space) 3rem 2rem;

  @media ${MOBILE} {
    height: 100vh;
    min-height: unset;
    overflow-y: auto;
    overflow-x: hidden;
    align-items: flex-start;
    padding: 5rem 1rem 6rem 1rem;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

export const SlideInner = styled.div`
  width: 100%;
  max-width: min(88vw, 1200px);

  @media ${MOBILE} {
    max-width: none;
  }
`;

export const SectionHeading = styled.h2`
  font-weight: 900;
  font-size: clamp(2.5rem, 7vw, 6rem);
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin-bottom: clamp(1.25rem, 3vw, 2.5rem);
`;

export const BodyText = styled.p`
  font-size: clamp(1rem, 1.2vw, 1.15rem);
  line-height: 1.6;
`;

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  border-radius: 999px;
  font-family: inherit;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  transition: transform 0.2s, background-color 0.2s;
`;

export const Button = styled.a`
  ${buttonBase};
  padding: 0.85em 1.6em;
  font-size: 1rem;
  background: ${(p) => (p.$variant === 'soft' ? 'var(--card-bg)' : 'var(--accent)')};
  color: ${(p) => (p.$variant === 'soft' ? 'var(--accent)' : 'var(--accent-ink)')};

  &:hover {
    transform: scale(1.04);
  }

  &[aria-disabled='true'] {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }
`;

// Opens an external page in a new tab. Without an href (link not set yet) it renders disabled.
export const ExternalButton = ({ href, children, ...rest }) =>
  href ? (
    <Button href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </Button>
  ) : (
    <Button as="span" aria-disabled="true" title="Link coming soon" {...rest}>
      {children}
    </Button>
  );

// Fades content up the first time it scrolls into view.
export const Reveal = ({ children, delay = 0, ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const Placeholder = styled.div`
  width: 100%;
  aspect-ratio: ${(p) => p.$ratio || '4 / 3'};
  background: var(--highlight-color);
  border-radius: 16px;
`;
