import React from "react";
import Link from "next/link";

import { FaShoppingCart } from "react-icons/fa";

import {
  Container,
  Logo,
  Search,
  SearchInput,
  SearchButton,
  User,
  CartButton,
  LoginButton,
} from "./styles";

export default function Header() {
  return (
    <Container className="header">
      <Link href="/">
        <Logo>Shopfy</Logo>
      </Link>
      <Search>
        <SearchInput placeholder="Buscar por produtos" />
        <SearchButton>Buscar</SearchButton>
      </Search>
      <User>
        <Link href="/cart">
          <CartButton>
            <FaShoppingCart size={30} />
          </CartButton>
        </Link>
        <Link href="/login">
          <LoginButton>Fazer Login</LoginButton>
        </Link>
      </User>
    </Container>
  );
}
