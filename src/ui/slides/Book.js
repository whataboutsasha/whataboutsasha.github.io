'use client'
import styled from "styled-components";
import { book, links } from "@/content/site";
import { SlideFrame, SlideInner, SectionHeading, BodyText, ExternalButton, Reveal, Placeholder, MOBILE } from "../primitives";

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);

  ${SectionHeading} {
    margin-bottom: 0;
    white-space: nowrap;
    font-size: clamp(2.5rem, 6vw, 5.5rem);
  }

  @media ${MOBILE} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Intro = styled(BodyText)`
  max-width: 28rem;
  color: var(--ink-soft);
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.75rem);

  @media (max-width: 1000px) and (min-width: 801px) {
    gap: 0.85rem;
  }

  @media ${MOBILE} {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem 1rem 1.25rem;
  border-radius: 24px;
  background: var(--card-bg);
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.85rem;
  padding: 1.1rem 0.4rem 0;
`;

const CardTitle = styled.h3`
  font-weight: 700;
  font-size: clamp(1.35rem, 1.9vw, 1.75rem);
  line-height: 1.1;
`;

const CardText = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--ink-soft);
`;

const Facts = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.35em 0.85em;
    border-radius: 999px;
    background: var(--accent-soft-solid);
    color: var(--accent);
  }
`;

const Schedule = styled.ul`
  margin: 0;
  padding: 0.75rem 0 0;
  list-style: none;
  border-top: 1px solid var(--line);
  font-weight: 500;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  padding-top: 0.5rem;
`;

const Price = styled.span`
  font-weight: 900;
  font-size: clamp(1.4rem, 2vw, 1.9rem);
`;

const Note = styled.p`
  margin-top: 1.25rem;
  font-size: 0.85rem;
  color: var(--ink-soft);
`;

export const Book = () => (
  <SlideFrame id="book">
    <SlideInner>
      <Reveal>
        <Header>
          <SectionHeading>{book.heading}</SectionHeading>
          <Intro>{book.intro}</Intro>
        </Header>
      </Reveal>
      <Cards>
        {book.cards.map((card, i) => (
          <Reveal key={card.id} delay={0.08 * i} style={{ height: '100%' }}>
            <Card>
              <Placeholder $ratio="16 / 9" />
              <CardBody>
                <CardTitle>{card.title}</CardTitle>
                <CardText>{card.description}</CardText>
                <Facts>{card.facts.map((f) => <li key={f}>{f}</li>)}</Facts>
                <Schedule>{card.schedule.map((s) => <li key={s}>{s}</li>)}</Schedule>
                <Footer>
                  <Price>{card.price}</Price>
                  <ExternalButton href={links[card.link]}>Choose</ExternalButton>
                </Footer>
              </CardBody>
            </Card>
          </Reveal>
        ))}
      </Cards>
      <Note>{book.timezoneNote}</Note>
    </SlideInner>
  </SlideFrame>
);
