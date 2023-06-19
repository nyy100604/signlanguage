import React, { useState } from "react";
import axios from "axios";
import NavComponents from "../../components/NavComponents";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 構建請求體
    const requestData = {
      id: username,
      pwd: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/sign_in",
        requestData
      );

      if (response.data === "True") {
        setMessage("登入成功，前往首頁");
        navigate("/select");
      } else {
        setMessage("登入失敗");
      }
    } catch (error) {
      setMessage("請求失敗");
      console.error(error);
    }

    // 清空輸入欄位
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <NavComponents />{" "}
      <div className="flex w-[100%] h-[90vh] items-center justify-center ">
        {" "}
        <div className="flex flex-col justify-center items-center w-[55%] h-[100%] text-[3.5rem]">
          A I <p>手語助學網站....</p>{" "}
        </div>
        <div className="flex items-center justify-evenly w-[45%] h-[65%] mr-[4rem] shadow-2xl rounded-lg">
          {" "}
          <div className="w-[100%] h-[100%]">
            {" "}
            <div className="flex flex-col items-center justify-evenly">
              {(message && message === "登入失敗") ||
                (message === "請求失敗" && (
                  <p className="bg-pink-200 text-[1.7rem] w-[85%] rounded-lg pl-[1.5rem] mt-[2rem] ">
                    {message}
                  </p>
                ))}
              {message && message === "登入成功" && (
                <p className=" bg-green-200 text-[1.7rem] w-[85%] rounded-lg pl-[1.5rem] mt-[2rem] ">
                  {message}
                </p>
              )}
              <input
                type="text"
                id="username"
                placeholder="輸入學號"
                value={username}
                onChange={handleUsernameChange}
                className="w-[85%] text-[2rem] border-inherit border-2 rounded-lg p-[0.3rem] mt-[2.5rem] mb-[1rem]"
              />
              <input
                type="password"
                id="password"
                placeholder="輸入密碼"
                value={password}
                onChange={handlePasswordChange}
                className="w-[85%] text-[2rem] border-inherit border-2  mt-[2rem]  rounded-lg p-[0.3rem]"
              />{" "}
              <button
                type="submit"
                onClick={handleSubmit}
                className="text-[2rem] mt-[3rem] rounded-lg bg-[#20639E] py-[0.7rem] px-[1rem] text-white"
              >
                登入
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;
