import React from 'react'
import { Container, Number, NumberContainer } from './pagination.js'

export default function Pagination({ recipesPerPage, allRecipes, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <Container>
        {pageNumbers.map((number) => {
          return (
            <NumberContainer key={number} onClick={() => paginate(number)}>
              <Number >{number}</Number>
            </NumberContainer>
          );
        })}
      </Container>
    </nav>
  );
}