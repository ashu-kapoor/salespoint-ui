import React from "react";

import "./App.css";

import { Navigate, useRoutes } from "react-router-dom";
import { InventoryPage } from "./containers/InventoryPage";
import { LoginPage } from "./containers/LoginPage";
import { ContactPage } from "./containers/ContactPage";
import { OrdersPage } from "./containers/OrdersPage";

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
