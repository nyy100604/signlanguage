import { createBrowserRouter } from "react-router-dom";
import SelectPage from "./pages/SelectPage";
import Learning from "./pages/Learning";
import Practice from "./pages/Practice";
import Examination from "./pages/Examination";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import HomePages from "./pages/Homepages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePages />,
  },
  {
    path: "/select",
    element: <SelectPage />,
  },
  {
    path: "/learning/:id",
    element: <Learning />,
  },
  {
    path: "/practice",
    element: <Practice />,
  },
  {
    path: "/Examination",
    element: <Examination />,
  },
  {
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
]);

export default router;
