'use client'
import styled from "styled-components";
import { motion, useTransform } from "framer-motion";

const ImageDisplay = styled(motion.div)`
  flex: 9 0 0;
  aspect-ratio: 1 / 1;

  @media (max-width: 800px) {
    flex: unset;
    width: 100%;
  }
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--highlight-color);
  border-radius: 12px;
`;

export const MediaSlider = ({ scrollProgress }) => {
  const opacity = useTransform(scrollProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollProgress, [0, 1], [40, 0]);

  return (
    <ImageDisplay style={{ opacity, y }}>
      <Image />
    </ImageDisplay>
  );
};
