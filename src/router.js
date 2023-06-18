import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Learning from "./pages/Learning";
import Practice from "./pages/Practice";
import Examination from "./pages/Examination";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
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
