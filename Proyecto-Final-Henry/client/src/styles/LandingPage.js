import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
  background-color: #AE886F;
`

export const Title = styled.h1`
  margin: 0;
  color: white;
`

export const SubTitle = styled.h3`
  margin-top: 5px;
  color: white;
`

export const Img = styled.img`
  border-radius: 50%;
  width: 450px;
  height: 450px;
  margin-top: 15px;
`

export const LinkStyled = styled(Link)`
  text-decoration: 'none';
  &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`

export const Button = styled.button`
  display: block;
  margin: 25px auto;
  height: 25px;
  width: 100px;
`