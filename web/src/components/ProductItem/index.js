import React from "react";
import Link from "next/link";

import { Container, Image, Details, Name, Price } from "./styles";

export default function ProductItem({ data }) {
  return (
    <Container>
      <Link href="/product/1a5s6d8c5gds">
        <Image src={data.image} />
      </Link>
      <Details>
        <Link href="/product/1a5s6d8c5gds">
          <Name>{data.name}</Name>
        </Link>
        <Price>R$ {data.price}</Price>
      </Details>
    </Container>
  );
}
