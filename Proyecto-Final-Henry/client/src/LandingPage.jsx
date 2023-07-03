import React from 'react'
import { Container, Img, Button, Title, SubTitle, LinkStyled } from './styles/LandingPage'
import Landing from './images/landing.jpg'

function LandingPage() {
  return (
      <Container>
        <Title>Proyecto Final: "FoodHouse" </Title>
        <SubTitle>Por ENCINA ALFREDO RAFAEL </SubTitle>
        <Img src={Landing}/>
        <LinkStyled to='/home'>
          <Button>Home</Button>
        </LinkStyled>
      </Container>
  )
}

export default LandingPage