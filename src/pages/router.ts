import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "./home.page";
import GenQuestionPage from "./gen-question.page";
import GenImagePage from "./gen-image.page";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/home"),
  },
  {
    path: "/home",
    Component: HomePage,
  },
  {
    path: "/questions",
    Component: GenQuestionPage,
  },
  {
    path: "/images",
    Component: GenImagePage,
  },
]);

export default router;
