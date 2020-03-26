import React from "react";
import Slider from "react-slick";

import { Container, Title, Products } from "./styles";
import ProductItem from "../ProductItem";

export default function ProductSection({ title }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  };

  return (
    <Container>
      <Title>{title}</Title>
      <Slider {...settings}>
        <ProductItem
          data={{
            image: "https://via.placeholder.com/112x200",
            name: "Microsoft Office License",
            price: "1025,00"
          }}
        />
        <ProductItem
          data={{
            image: "https://via.placeholder.com/112x200",
            name: "Microsoft Office License",
            price: "1025,00"
          }}
        />
        <ProductItem
          data={{
            image: "https://via.placeholder.com/112x200",
            name: "Microsoft Office License",
            price: "1025,00"
          }}
        />
        <ProductItem
          data={{
            image: "https://via.placeholder.com/112x200",
            name: "Microsoft Office License",
            price: "1025,00"
          }}
        />
        <ProductItem
          data={{
            image: "https://via.placeholder.com/112x200",
            name: "Microsoft Office License",
            price: "1025,00"
          }}
        />
        <ProductItem
          data={{
            image: "https://via.placeholder.com/112x200",
            name: "Microsoft Office License",
            price: "1025,00"
          }}
        />
        <ProductItem
          data={{
            image: "https://via.placeholder.com/112x200",
            name: "Microsoft Office License",
            price: "1025,00"
          }}
        />
        <ProductItem
          data={{
            image: "https://via.placeholder.com/112x200",
            name: "Microsoft Office License",
            price: "1025,00"
          }}
        />
        <ProductItem
          data={{
            image: "https://via.placeholder.com/112x200",
            name: "Microsoft Office License",
            price: "1025,00"
          }}
        />
        <ProductItem
          data={{
            image: "https://via.placeholder.com/112x200",
            name: "Microsoft Office License",
            price: "1025,00"
          }}
        />
        <ProductItem
          data={{
            image: "https://via.placeholder.com/112x200",
            name: "Microsoft Office License",
            price: "1025,00"
          }}
        />
        <ProductItem
          data={{
            image: "https://via.placeholder.com/112x200",
            name: "Microsoft Office License",
            price: "1025,00"
          }}
        />
        <ProductItem
          data={{
            image: "https://via.placeholder.com/112x200",
            name: "Microsoft Office License",
            price: "1025,00"
          }}
        />
        <ProductItem
          data={{
            image: "https://via.placeholder.com/112x200",
            name: "Microsoft Office License",
            price: "1025,00"
          }}
        />
      </Slider>
    </Container>
  );
}
