'use client'
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

// Mobile-only bouncing down arrow in the dots bar, shown on slides that have more content
// below. The page decides when to show it (see page.js).

const Bubble = styled(motion.div)`
  /* Sits inside the mobile dots strip (48px tall), to the right of the dots */
  position: fixed;
  right: 20px;
  bottom: 10px;
  z-index: 1001;
  display: grid;
  place-items: center;
  color: var(--accent);
  pointer-events: none;
`;

export const ScrollHint = ({ show }) => (
  <AnimatePresence>
    {show && (
      <Bubble
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
        </motion.svg>
      </Bubble>
    )}
  </AnimatePresence>
);
