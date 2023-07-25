import { Route, createHashRouter, Navigate, useNavigate  } from "react-router-dom";
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


const isUserLoggedIn = () => {
  const isLoggedInLocalStorage = localStorage.getItem("isLoggedIn");
  if(isLoggedInLocalStorage) {
    return true
  }
};
const UserGroup = () => {
  const group = localStorage.getItem("group");
  if(group === "1") {
    return true
  }
};
const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = isUserLoggedIn();

  // 如果用户已登录，渲染 Practice 组件
  if (isLoggedIn) {
    return children;
  } else {
    // 如果用户未登录，重定向到 SignIn 页面，您可以根据实际需求指定其他页面
    return <Navigate to="/signIn" />;
  }
};
const PrivatePractie= ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = isUserLoggedIn();
  const checkGroup = UserGroup(); 
  // 如果用户已登录，渲染 Practice 组件
  if (isLoggedIn && checkGroup) {
    return children;
  } else if(isLoggedIn && !checkGroup){
    return <Navigate to="/select" />;
  }else {
    // 如果用户未登录，重定向到 SignIn 页面，您可以根据实际需求指定其他页面
    return <Navigate to="/signIn" />;
  }
};
const router = createHashRouter([
  {
    path: "/",
    element: <HomePages />,
  },
  {
    path: "/select",
    element:  (
      <PrivateRoute>
        <SelectPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/learning/1",
    element: (
      <PrivateRoute>
        <Learning />
      </PrivateRoute>
    ),
  },
  {
    path: "/learning/2",
    element:  (
      <PrivateRoute>
        <Learning2 />
      </PrivateRoute>
    ),
  },
  {
    path: "/learning/3",
    element:  (
      <PrivateRoute>
        <Learning3 />
      </PrivateRoute>
    ),
  },
  {
    path: "/practice",
    element: (
      <PrivatePractie>
        <Practice />
      </PrivatePractie>
    ),
  },
  {
    path: "/Examination",
    element: (
      <PrivateRoute>
        <Examination />
      </PrivateRoute>
    ),
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
    element:(
      <PrivateRoute>
        <Grade />
      </PrivateRoute>
    ),
  },

]);

export default router;
