import React from "react";
import { useEffect, useState } from "react";

const Exam = () => {
  const [btnText, setBtnText] = useState("開始錄製");

  const changeText = () => {
    setBtnText("結束錄製");
  };
  return (
    <>
      <main className="flex flex-col-reverse items-center justify-center m-[1rem] lg:flex-row lg:mt-[5rem] ">
        <div className="flex flex-col items-center justify-center">
          {" "}
          <p className="text-[1.3rem] mb-2">題目1 ：二十</p>
          <video
            src="./video/2.mp4"
            autoplay="true"
            controls="true"
            className=" w-[800px]"
          ></video>
          <button
            className=" text-white bg-red-600 px-[0.5rem] py-[0.3rem] rounded-md mt-8 lg:text-[1.5rem]"
            onClick={changeText}
          >
            {btnText}
          </button>
        </div>
        <div className="flex flex-col items-center justify-center w-[400px]">
          <div className=" text-[1.5rem]">分數</div>{" "}
          <div className="text-[5rem]">97</div>{" "}
        </div>
      </main>
    </>
  );
};

export default Exam;
