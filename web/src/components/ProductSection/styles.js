import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

  &:last-of-type {
    margin-bottom: 0px;
  }
`;

export const Title = styled.span`
  font-size: 1.7rem;
  font-weight: medium;
  margin-bottom: 5px;
`;

export const Products = styled.div`
  display: flex;
  flex-direction: row;
`;
