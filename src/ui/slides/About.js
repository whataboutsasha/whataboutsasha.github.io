'use client'
import styled from "styled-components";
import { about } from "@/content/site";
import { SlideFrame, SlideInner, SectionHeading, BodyText, Reveal, Placeholder } from "../primitives";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: clamp(1.5rem, 4vw, 4rem);
  align-items: center;

  /* Tablet and mobile: one column, text first, smaller picture after it */
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Picture = styled(Reveal)`
  @media (max-width: 1100px) {
    order: 2;
    width: 100%;
    max-width: 420px;

    > div { aspect-ratio: 4 / 3; }
  }
`;

const Text = styled(Reveal)`
  @media (max-width: 1100px) {
    order: 1;
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
