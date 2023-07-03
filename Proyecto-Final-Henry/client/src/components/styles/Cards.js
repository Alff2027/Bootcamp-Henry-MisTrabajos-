import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 375px;
  width: 350px;
  border: solid 1px red;
  border-radius: 5px;
  text-align: center;
  background-color: #00ff00;
  margin-top: 15px;
  margin-bottom: 5px;
`

export const Img = styled.img`
  width: 60%;
  border-radius: 5px;
`

export const Text = styled.span`
  margin-top: 10px;
`

export const SubTitle = styled.h4`
  margin: 5px 0;
`

export const LinkStyled = styled(Link)`
  text-decoration: 'none';
  &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`

export const Button = styled.button`
  display: block;
  margin: 10px auto;
  width: 25%;
`