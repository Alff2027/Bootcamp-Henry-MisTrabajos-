import React from 'react'

import SearchBar from './SearchBar'
import { Container, SearchContainer } from './styles/NavBar'

function NavBar() {
  return (
    <Container>
      <SearchContainer>
        <SearchBar/>
      </SearchContainer>
    </Container>
  )
}

export default NavBar