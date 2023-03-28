import React from "react";
import { useNavigate } from "react-router-dom";
import { VscChromeClose } from "react-icons/vsc";

const UnitSelect = ({ setShowLearningUnit }) => {
  const go = useNavigate();

  const goRouter = () => {
    go("/learning/1");
  };
  return (
    <>
      {" "}
      <div className="fixed top-0 bg-black opacity-90 w-full h-full flex flex-col items-center justify-center">
        <div
          className="text-white p-[1rem] rounded-full text-[2rem]  bg-slate-800 cursor-pointer"
          onClick={() => {
            setShowLearningUnit(false);
          }}
        >
          {" "}
          <VscChromeClose />
        </div>
        <div className=" text-white ">
          <div
            className="text-[2.5rem] cursor-pointer m-[1.5rem]"
            onClick={() => {
              go("/learning/1");
            }}
          >
            單元 1
          </div>
          <div
            className="text-[2.5rem] cursor-pointer m-[1.5rem]"
            onClick={() => {
              go("/learning/2");
            }}
          >
            單元 2
          </div>
          <div
            className="text-[2.5rem] cursor-pointer m-[1.5rem]
     "
            onClick={() => {
              go("/learning/3");
            }}
          >
            單元 3
          </div>
        </div>
      </div>
    </>
  );
};

export default UnitSelect;
