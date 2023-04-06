import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Learning from "./pages/Learning";
import Practice from "./pages/Practice";

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
]);

export default router;
