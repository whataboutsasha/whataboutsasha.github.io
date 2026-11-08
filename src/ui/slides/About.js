'use client'
import styled from "styled-components";
import { about } from "@/content/site";
import { SlideFrame, SlideInner, SectionHeading, BodyText, Reveal, Placeholder, MOBILE } from "../primitives";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: clamp(1.5rem, 4vw, 4rem);
  align-items: center;

  /* Tablet and mobile: one column, picture first (smaller), then the text */
  @media (max-width: 1100px) {
    grid-template-columns: minmax(0, 1fr);
    justify-items: start;
    gap: 1.75rem;
  }
`;

const Picture = styled(Reveal)`
  width: 100%;

  @media (max-width: 1100px) {
    max-width: 420px;
    > div { aspect-ratio: 4 / 3; }
  }

  @media ${MOBILE} {
    max-width: none;
  }
`;

const Text = styled(Reveal)`
  width: 100%;

  @media (max-width: 1100px) {
    max-width: 680px;
  }
`;

const Lead = styled.p`
  font-weight: 500;
  font-size: clamp(1.15rem, 1.6vw, 1.45rem);
  line-height: 1.4;
  margin-bottom: 1.5rem;
`;

const Paragraphs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--ink-soft);
`;

const Signoff = styled.p`
  margin-top: 1.5rem;
  font-weight: 700;
  font-size: clamp(1.1rem, 1.4vw, 1.3rem);
`;

export const About = () => (
  <SlideFrame id="about">
    <SlideInner>
      <Grid>
        <Picture>
          <Placeholder $ratio="4 / 5" />
        </Picture>
        <Text delay={0.1}>
          <SectionHeading>{about.heading}</SectionHeading>
          <Lead>{about.lead}</Lead>
          <Paragraphs>
            {about.paragraphs.map((p) => <BodyText key={p.slice(0, 24)}>{p}</BodyText>)}
          </Paragraphs>
          <Signoff>{about.signoff}</Signoff>
        </Text>
      </Grid>
    </SlideInner>
  </SlideFrame>
);
