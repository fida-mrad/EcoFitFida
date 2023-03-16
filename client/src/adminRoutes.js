import React from "react";
import AddAdmin from "./components/AddAdmin";
import BrandsList from "./components/Brands";
import ClientsList from "./components/Clients";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const adminRoutes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/clients", name: "Clients", element: ClientsList },
  { path: "/brands", name: "Brands", element: BrandsList },
  { path: "/add", name: "Add Admin", element: AddAdmin },
];

export default adminRoutes;