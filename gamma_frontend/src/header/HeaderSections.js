import React from 'react';
import styled from 'styled-components';
import Svg from 'react-inlinesvg';
import { Link } from 'react-router-dom'

import { Button } from '@material-ui/core'
import logoImg from '../assets/logo.svg';

const MainButton = styled(Button)`
  font-weight: 800;
  text-transform: none;
  color: #fafafa;
  margin-right: 30px;
`;

const AppName = styled.p`
  margin-left: 10px;
`;

const LogoSvg = styled(Svg)`
  overflow: hidden;
  max-width: 70px;

  & >svg {
    max-height: 32px;
    max-width: 100%;
  }

  & * {
    fill: white;
  }
`;

export const HomeLink = () => (
  <MainButton color="inherit" size='large' href='/index'>
    <LogoSvg src={logoImg} />
    <AppName>Evolvunteer</AppName>
  </MainButton>
);

const LinkButton = styled(Button)`
  && { 
    color: #fff;
  }
`;

export const NavButton = ({ to, label }) => (
  <Link to={to}>
    <LinkButton color='background'>
      {label}
    </LinkButton>
  </Link>
);