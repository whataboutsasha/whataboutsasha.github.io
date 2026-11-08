'use client'
import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { faq } from "@/content/site";
import { SlideFrame, SlideInner, SectionHeading, Reveal } from "../primitives";

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  max-width: 980px;
  border-top: 2px solid var(--ink);
`;

const Item = styled.li`
  border-bottom: 2px solid var(--ink);
`;

const Question = styled.button`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: clamp(0.9rem, 1.6vw, 1.3rem) 0;
  cursor: pointer;
  font-weight: 700;
  font-size: clamp(1.2rem, 2.3vw, 2rem);
  line-height: 1.15;

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
  }
`;

const Icon = styled(motion.span)`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 1.6em;
  height: 1.6em;
  border-radius: 50%;
  background: ${(p) => (p.$open ? 'var(--accent)' : 'var(--accent-soft-solid)')};
  color: ${(p) => (p.$open ? 'var(--accent-ink)' : 'var(--accent)')};
  font-size: 0.8em;
  font-weight: 500;
  transition: background-color 0.25s, color 0.25s;
`;

const Answer = styled(motion.div)`
  overflow: hidden;

  p {
    padding: 0 3rem clamp(1rem, 1.8vw, 1.5rem) 0;
    font-size: clamp(1rem, 1.3vw, 1.2rem);
    line-height: 1.55;
    color: var(--ink-soft);
  }
`;

const FaqItem = ({ q, a, open, onToggle, id }) => (
  <Item>
    <Question onClick={onToggle} aria-expanded={open} aria-controls={id}>
      {q}
      <Icon $open={open} animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} aria-hidden>
        +
      </Icon>
    </Question>
    <AnimatePresence initial={false}>
      {open && (
        <Answer
          id={id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>{a}</p>
        </Answer>
      )}
    </AnimatePresence>
  </Item>
);

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <SlideFrame id="faq">
      <SlideInner>
        <Reveal>
          <SectionHeading>{faq.heading}</SectionHeading>
          <List>
            {faq.items.map((item, i) => (
              <FaqItem
                key={item.q}
                id={`faq-answer-${i}`}
                q={item.q}
                a={item.a}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </List>
        </Reveal>
      </SlideInner>
    </SlideFrame>
  );
};
