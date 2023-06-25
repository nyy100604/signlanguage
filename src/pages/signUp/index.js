import React, { useState } from "react";
import axios from "axios";
import NavComponents from "../../components/NavComponents";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  // const [isChecked1, setIsChecked1] = useState(false);
  // const [isChecked2, setIsChecked2] = useState(false);
  const [group, setGroup] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleGroupChange = (event) => {
    setGroup(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    // 檢查密碼是否一致
    if (password !== confirmPassword) {
      setMessage("密碼不一致");
      return;
    }
    // 構建請求體
    const requestData = {
      id: username,
      name: name,
      pwd: password,
      group: group,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/sign_up",
        requestData
      );

      if (response.data === "True") {
        setMessage("註冊成功");
        navigate("/SignIn");
      } else {
        setMessage("註冊失敗");
      }
    } catch (error) {
      setMessage("請求失敗");
      console.error(error);
    }

    // 清空輸入欄位
    setUsername("");
    setName("");
    setPassword("");
    setConfirmPassword("");
    setGroup("");
  };

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const handleCheckbox1Change = (event) => {
    setIsChecked1(event.target.checked);
    setIsChecked2(false); // 取消第二個 checkbox 的選中狀態
    if (event.target.checked) {
      setGroup("1");
    }
  };
  
  const handleCheckbox2Change = (event) => {
    setIsChecked2(event.target.checked);
    setIsChecked1(false); // 取消第一個 checkbox 的選中狀態
    if (event.target.checked) {
      setGroup("2");
    }
  };

  return (
    <div>
      <NavComponents />
      <div className="flex  justify-center items-center h-[90vh] ">
        {" "}
        <div className=" shadow-2xl rounded-lg m-[2rem] text-[2rem] w-[60%] h-[95%] flex flex-col justify-evenly items-center">
          {" "}
          <h2 className="py-[0.4rem]">註冊</h2>
          <input
            type="text"
            id="username"
            placeholder="輸入學號"
            value={username}
            onChange={handleUsernameChange}
            className="w-[70%] border-inherit border-2 rounded-lg"
          />
          <input
            type="text"
            id="name"
            placeholder="輸入姓名"
            value={name}
            onChange={handleNameChange}
            className="w-[70%] border-inherit border-2 rounded-lg"
          />
          <input
            type="password"
            id="password"
            placeholder="輸入密碼"
            value={password}
            onChange={handlePasswordChange}
            className="w-[70%] border-inherit border-2 rounded-lg"
          />
           <input
            type="password"
            id="confirmPassword"
            placeholder="再次輸入密碼"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-[70%] border-inherit border-2 rounded-lg"
          />
          <div className="flex w-[70%] m-3  pr-5">
          <input
            type="checkbox"
            id="checkgroup"
            value="1"
            checked={isChecked1}
            onChange={handleCheckbox1Change}
            className="w-[30%] border-inherit border-2 rounded-lg"
          />
          <span className="whitespace-nowrap">
            第一組
          </span>
          <input
            type="checkbox"
            id="checkgroup"
            value="2"
            checked={isChecked2}
            onChange={handleCheckbox2Change}
            className="w-[30%] border-inherit border-2 rounded-lg"
          />
          <span className="whitespace-nowrap">
            第二組
          </span>
          </div>
          <button
            type="submit"
            className="bg-[#20639E] px-[0.5rem] py-[0.5rem] rounded-lg text-white"
            onClick={handleSubmit}
          >
            送出資料
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupForm;
