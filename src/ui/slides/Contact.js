'use client'
import styled from "styled-components";
import { contact, links } from "@/content/site";
import { SlideFrame, SlideInner, SectionHeading, ExternalButton, Reveal } from "../primitives";

const Heading = styled(SectionHeading)`
  font-size: clamp(3rem, 11vw, 10rem);
`;

const Text = styled.p`
  max-width: 36rem;
  font-weight: 500;
  font-size: clamp(1.15rem, 1.8vw, 1.6rem);
  line-height: 1.4;
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: clamp(1.75rem, 4vw, 3rem);

  > * {
    font-size: clamp(1.05rem, 1.5vw, 1.35rem);
    padding: 0.95em 1.9em;
  }
`;

export const Contact = () => (
  <SlideFrame id="contact">
    <SlideInner>
      <Reveal>
        <Heading>{contact.heading}</Heading>
        <Text>{contact.text}</Text>
        <Buttons>
          <ExternalButton href={links.instagram}>Instagram</ExternalButton>
          <ExternalButton href={links.whatsapp} $variant="soft">WhatsApp</ExternalButton>
        </Buttons>
      </Reveal>
    </SlideInner>
  </SlideFrame>
);
