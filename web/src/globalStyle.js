import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        outline: none
    }

    html {
        font-size: 100%;
    }

    body {
        font-family: 'Roboto', sans-serif;
        background-color: #fff;
    }

    .product-container {
      display: flex;
    }
    

    .product-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 50px;
    }

    .product-info h2 {
      font-size: 28px;
    }

    .product-info p {
      margin-top: 5px;
      font-size: 18px;
    }

    .add-to-cart {
      padding: 10px 20px;
      font-weight: bold;
      margin-top: 10px;
      cursor: pointer;
      border: 1px solid #666;
      background-color: #fff;
      border-radius: 3px;
    }


    @media(max-width: 800px) {
      .product-image-container img {
        width: 350px;
        height: 350px;
      }

      .product-info {
        margin-left: 50px;
      }
    }

    @media(max-width: 600px) {
      .product-container {
        flex-direction: column;
        align-items: center;
      }

      .product-image-container img {
        width: 420px;
        height: 420px;
      }

      .product-info {
        margin-left: 0px;
      }
    }

    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    ::-webkit-scrollbar-track {
        background-color: #fff;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #000;
    }
    
    .slick-track {
        margin-left: 0 !important
    }
`;
