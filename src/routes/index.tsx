import { Routes, Route } from "react-router";

import Home from "../pages/home";
import Login from "../pages/login";
import Transaction from "../pages/transaction";
import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" index element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/transaction"
        element={
          <PrivateRoute>
            <Transaction />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<h1>Essa página não existe!</h1>} />
    </Routes>
  );
}

export default AppRoutes;
