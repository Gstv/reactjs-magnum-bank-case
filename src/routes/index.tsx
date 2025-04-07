import { Routes, Route } from "react-router";

import Home from "../pages/home";
import Login from "../pages/login";
import Transaction from "../pages/transaction";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/transaction" element={<Transaction />} />

      <Route path="*" element={<h1>Essa página não existe!</h1>} />
    </Routes>
  );
}

export default AppRoutes;
