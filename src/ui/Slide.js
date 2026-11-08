'use client'
import styled from "styled-components";
import { useEffect } from "react";
import { useScroll } from "framer-motion";
import { Paragraph } from "./Paragraph";
import { MediaSlider } from "./MediaSlider";
import { useSlideFocus } from "@/hooks/useSlideFocus";

const SlideDisplay = styled.div`
  width: 100vw;
  min-height: 100vh;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
  padding: 2rem 60px 2rem 2rem;

  @media (max-width: 800px) {
    height: 100vh;
    min-height: unset;
    overflow-y: auto;
    overflow-x: hidden;
    align-items: flex-start;
    padding: 2rem 1rem 5rem 1rem;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

const CenteredDisplay = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  width: 100%;
  max-width: min(88vw, 1200px);
  gap: 2rem;

  @media (max-width: 800px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }
`;

export const Slide = ({ id, i, onFocus, title, containerRef }) => {
  const [isFocused, slideRef] = useSlideFocus();

  const { scrollYProgress } = useScroll({
    target: slideRef,
    container: containerRef,
    offset: ["start end", "start start"],
  });

  useEffect(() => {
    if (isFocused && onFocus) {
      onFocus(i);
    }
  }, [isFocused, i, onFocus]);

  return (
    <SlideDisplay ref={slideRef} id={id}>
      <CenteredDisplay>
        <Paragraph title={title} scrollProgress={scrollYProgress} />
        <MediaSlider scrollProgress={scrollYProgress} />
      </CenteredDisplay>
    </SlideDisplay>
  );
};
