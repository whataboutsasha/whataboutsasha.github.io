'use client'
import styled from "styled-components";
import { motion } from "framer-motion";
import { hero } from "@/content/site";
import { SlideFrame, SlideInner, MOBILE } from "../primitives";
import { NavButtons } from "../FloatingNav";

const HeroFrame = styled(SlideFrame)`
  @media ${MOBILE} {
    align-items: center;
  }
`;

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
`;

const Brand = styled(motion.span)`
  font-weight: 900;
  font-size: clamp(5rem, 21vw, 19rem);
  line-height: 0.82;
  letter-spacing: -0.01em;
  text-transform: uppercase;

  @media ${MOBILE} {
    font-size: 28vw;
  }
`;

const Tagline = styled(motion.span)`
  font-weight: 500;
  font-size: clamp(1.4rem, 3.2vw, 2.75rem);
  line-height: 1.1;
`;

// Fixed height so the slide doesn't jump when the buttons fly off to the corner.
const ButtonsSlot = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: clamp(2rem, 5vw, 3.5rem);
  min-height: 4.5rem;
`;

const ease = [0.22, 1, 0.36, 1];

export const Hero = ({ showButtons, onNavigate }) => (
  <HeroFrame id="home">
    <SlideInner>
      <Title>
        <Brand initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
          {hero.brand}
        </Brand>
        <Tagline initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.15 }}>
          {hero.tagline}
        </Tagline>
      </Title>
      <ButtonsSlot>
        {showButtons && <NavButtons size="big" onNavigate={onNavigate} />}
      </ButtonsSlot>
    </SlideInner>
  </HeroFrame>
);
