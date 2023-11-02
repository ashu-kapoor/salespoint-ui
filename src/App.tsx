import React from "react";

import "./App.css";

import { Navigate, useRoutes } from "react-router-dom";
import { InventoryPage } from "./pages/InventoryPage";
import { LoginPage } from "./pages/LoginPage";
import { ContactPage } from "./pages/ContactPage";
import { OrdersPage } from "./pages/OrdersPage";
import UserService from "./security/UserService";
import ProtectedRoute from "./components/GenericComponents/ProtectedRoute";

function App() {
  const routes = useRoutes([
    { path: "/", element: <LoginPage /> },
    {
      path: "/inventory/*",
      element: (
        <ProtectedRoute>
          <InventoryPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/contacts",
      element: (
        <ProtectedRoute>
          <ContactPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/orders",
      element: (
        <ProtectedRoute>
          <OrdersPage />
        </ProtectedRoute>
      ),
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);

  return routes;
}

export default App;
