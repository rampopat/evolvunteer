import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

const ResultPopup = ({ title, description, closePopup }) => (
      <Wrapper>
        <Container>
          <Button onClick={closePopup}>X</Button>
          <h1>
            { title || "This place is reserved for a title" }
          </h1>
          <p>
            { description || "This volunteering opportunityy will help you grow your skillz. Please get in touch" }
          </p>
        </Container>
      </Wrapper>
)

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.1);

  position: fixed;
  top: 0;
  left: 0;

  z-index: 1000;
`;

const Container = styled.div`
  width: 600px;
  height: 350px;
  background-color: white;
  margin: 130px auto 0;
  padding: 30px;
`

export default ResultPopup
