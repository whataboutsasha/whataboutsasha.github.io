'use client'
import styled from "styled-components";
import { motion, useTransform } from "framer-motion";

const ParagraphDisplay = styled(motion.div)`
  display: flex;
  flex-direction: column;
  flex: 7 0 0;
  aspect-ratio: 7 / 9;
  overflow: hidden;
  /* Width of this column, used to scale the text. Mirrors the layout:
     7 of 16 flex parts of CenteredDisplay (min(88vw, 1200px)) minus its 2rem gap.
     Avoids container-type/cqw, which makes Safari keep stale media-query
     styles after resizing the window. */
  --para-width: calc((min(88vw, 1200px) - 2rem) * 7 / 16);

  @media (max-width: 800px) {
    --para-width: min(100vw - 2rem, 88vw);
    flex: unset;
    width: 100%;
    aspect-ratio: unset;
    height: auto;
  }
`;

const TitleDisplay = styled.div`
  width: 100%;
  padding: 0 0 1.25rem 0;
  font-size: clamp(1.25rem, calc(var(--para-width) * 0.11), 3.5rem);
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  line-height: 1.1;
`;

const ParagraphWrapper = styled.div`
  flex: 1;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  font-family: 'Outfit', sans-serif;

  p {
    margin: 0;
    font-size: clamp(0.65rem, calc(var(--para-width) * 0.035), 1.05rem);
    font-weight: 500;
    line-height: 1.75;
    text-align: justify;
    hyphens: auto;
  }

  @media (max-width: 800px) {
    flex: unset;
    overflow: visible;
    p {
      font-size: 0.95rem;
      text-align: left;
      hyphens: none;
    }
  }
`;

export const Paragraph = ({ title = "TITLE", scrollProgress }) => {
  const opacity = useTransform(scrollProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollProgress, [0, 1], [40, 0]);

  return (
    <ParagraphDisplay style={{ opacity, y }}>
      <TitleDisplay>{title}</TitleDisplay>
      <ParagraphWrapper>
        <p><b>CLOS</b> is a remote playground camera-people and a platform for virtual photo shoots. Completely revamped a visual code with a team and helped to start a new journey in social media. Established and managed a complete team for a new social media strategy. We started working with UGC (because our users are the best) and launched a few special projects.</p>

        <p>I totally jazzed up the whole visual vibe with an awesome crew and kickstarted a wild new adventure in the land of social media. I assembled a dream team to craft a shiny new social media strategy. We dove headfirst into UGC—'cause, let's face it, our users are absolute rockstars—and we even launched a few super-special projects that were like the cherry on top of the digital sundae!</p>
      </ParagraphWrapper>
    </ParagraphDisplay>
  );
};
