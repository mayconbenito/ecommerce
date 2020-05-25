import styled from "styled-components";

export const Container = styled.div`
  height: 60px;
  padding: 10px 20px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 2px solid #30445f;

  @media (max-width: 800px) {
    border-bottom: none;
  }
`;

export const Logo = styled.a`
  font-size: 2.2rem;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 800px) {
    font-size: 1.6rem;
  }
`;

export const Search = styled.div`
  margin-left: 20px;
  margin-right: 20px;

  @media (max-width: 800px) {
    width: 100%;
    height: 60px;
    background-color: #fff;
    position: absolute;
    top: 60px;
    left: 0px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    padding-left: 20px;
    padding-right: 200px;
    margin-left: 0px;
    margin-right: 0px;
    border-bottom: 2px solid #30445f;
  }
`;

export const SearchInput = styled.input`
  height: 40px;
  min-width: 300px;
  border: none;
  padding: 3px 5px;
  background-color: #ececec;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
`;

export const SearchButton = styled.button`
  height: 40px;
  min-width: 80px;
  border: none;
  padding: 3px 5px;
  background-color: #ececec;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  cursor: pointer;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  &:last-of-type {
    margin-inline-start: auto;
  }
`;

export const CartButton = styled.a`
  margin-right: 20px;
  cursor: pointer;
`;

export const LoginButton = styled.a`
  cursor: pointer;
`;

// #30445f
// #45566c
// #211c22
// #4b5f66
// #ececec
