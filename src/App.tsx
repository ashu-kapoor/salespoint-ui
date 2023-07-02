import React from "react";

import "./App.css";

import { Navigate, useRoutes } from "react-router-dom";
import { InventoryPage } from "./pages/InventoryPage";
import { LoginPage } from "./pages/LoginPage";
import { ContactPage } from "./pages/ContactPage";
import { OrdersPage } from "./pages/OrdersPage";

function App() {
  const routes = useRoutes([
    { path: "/", element: <LoginPage /> },
    { path: "/inventory", element: <InventoryPage /> },
    { path: "/contacts", element: <ContactPage /> },
    { path: "/orders", element: <OrdersPage /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);

  return routes;
}

export default App;
