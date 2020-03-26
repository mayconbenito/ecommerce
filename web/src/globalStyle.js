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
