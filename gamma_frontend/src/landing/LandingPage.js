import React from 'react';
import styled from 'styled-components';

import bgimg from '../assets/background.jpeg';
import SectionPitch from './Pitch';

const Background = styled.img`
  display: block;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-20%);
`;

const Wrapper = styled.div`
  position: relative;
  height: calc(100vh - 72px);
  width: 100vw;
`;

const IndexPage = () => (
  <Wrapper>
    <Background src={bgimg} alt="Background" />
    <SectionPitch />
  </Wrapper>
);

export default IndexPage;