import { BrowserRouter } from "react-router";

import AppRoutes from "./routes";
import { GlobalStyle } from "./globalStyle";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
