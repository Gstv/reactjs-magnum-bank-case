import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Helvetica, Arial, sans-serif;
    color: #213547;
    background-color: #f9fafb;

    padding: 2rem;
  }
  
  h1 {
    text-align: center;
    color: #2a64f6;
    margin-bottom: 8px;
    font-size: 20px;
  }

  h2 {
    text-align: center;
    font-size: 16px;
    color: #777;
    margin-bottom: 24px;
  }
`;
