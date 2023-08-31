import { Route, createHashRouter, Navigate, useNavigate  } from "react-router-dom";
import SelectPage from "./pages/SelectPage";
import Learning from "./pages/Learning";
import Learning2 from "./pages/Learning2";
import Learning3 from "./pages/Learning3";
import Practice from "./pages/Practice";
import Examination from "./pages/Examination";

const router = createHashRouter([

  {
    path: "/",
    element:  (
        <SelectPage />
    ),
  },
  {
    path: "/learning/1",
    element: (
        <Learning />
    ),
  },
  {
    path: "/learning/2",
    element:  (
        <Learning2 />
    ),
  },
  {
    path: "/learning/3",
    element:  (
        <Learning3 />
    ),
  },
  {
    path: "/practice",
    element: (
        <Practice />
    ),
  },
  {
    path: "/Examination",
    element: (
        <Examination />
    ),
  },

]);

export default router;
