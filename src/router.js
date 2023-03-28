import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Learning from "./pages/Learning";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/learning/:id",
    element: <Learning />,
  },
]);

export default router;
