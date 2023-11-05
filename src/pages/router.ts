import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "./home.page";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/home"),
  },
  {
    path: "/home",
    Component: HomePage,
  }
]);

export default router;
