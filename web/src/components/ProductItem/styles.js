import styled from "styled-components";

export const Container = styled.div`
  width: 112.5px;
  display: flex;
  flex-direction: column;
`;

export const Image = styled.img`
  width: 112.5px;
  height: 200px;
  cursor: pointer;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;

export const Name = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  text-align: start;
`;

export const Price = styled.span`
  font-size: 1rem;
  margin-top: 2px;
`;
