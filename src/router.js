import { createHashRouter } from "react-router-dom";
import SelectPage from "./pages/SelectPage";
import Learning from "./pages/Learning";
import Learning2 from "./pages/Learning2";
import Learning3 from "./pages/Learning3";
import Practice from "./pages/Practice";
import Examination from "./pages/Examination";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import HomePages from "./pages/Homepages";
import Grade from "./pages/Grade";

const router = createHashRouter([
  {
    path: "/",
    element: <HomePages />,
  },
  {
    path: "/select",
    element: <SelectPage />,
  },
  {
    path: "/learning/1",
    element: <Learning />,
  },
  {
    path: "/learning/2",
    element: <Learning2 />,
  },
  {
    path: "/learning/3",
    element: <Learning3 />,
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
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/Grade",
    element: <Grade />,
  },

]);

export default router;
