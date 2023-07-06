import React from "react";

import STImage from "./logo.jpg";
import { useNavigate } from "react-router-dom";

const HomePages = () => {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <div className="flex justify-around items-center w-[100%] h-[100vh]">
        <div className="flex items-center justify-center bg-[#004D8F] h-[100vh] w-[60%]">
          <img className="w-[100%]" src={STImage} alt="" />
        </div>{" "}
        <div className="flex flex-col w-[40%] h-[100%] items-center justify-center text-[2rem]">
          <div className="mb-[3rem]">歡迎來到AI手語助學網站</div>
          <div>
            {" "}
            <button
              className="px-[0.7rem] py-[0.5rem] mr-[1rem] bg-[#004D8F] rounded-lg text-white hover:bg-[#136DBA]"
              onClick={() => {
                navigate("/signup");
              }}
            >
              註冊
            </button>
            <button
              className="px-[0.7rem] py-[0.5rem] rounded-lg hover:bg-slate-300"
              onClick={() => {
                navigate("/signin");
              }}
            >
              登入
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePages;
