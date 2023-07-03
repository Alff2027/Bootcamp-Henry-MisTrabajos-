import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin: 20px auto;
  padding: 20px;
  justify-items: center;
  justify-content: space - around;
  width: 75%;
  &:hover {
    cursor: pointer;
    background-color: transparent;
    color: #c1dbe0;
    border: solid 2px #c1dbe0;
  }
`

export const NumberContainer = styled.div`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: #c1dbe0;
  display: flex;
  border: solid 2px #4c2b0d;
  color: #4c2b0d;
  font-weight: bolder;
  font-size: 20px;
  justify-content: center;
  align-content: center;
  box-shadow: 0px 0px 5px 1px black;
  transition: 0.5s;
`

export const Number = styled.span`
  margin: auto;
  font-weight: 800;
  &:hover{
    color: #c1dbe0;
  }
`