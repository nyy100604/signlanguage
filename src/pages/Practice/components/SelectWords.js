import React, { useState } from "react";
import ShowWords from "./ShowWords";
import { unit1, unit2, unit3 } from "../../../Hooks/wordsHook";

const SelectWords = ({
  unit,
  handleShoswSelect,
  setUnit,
  setNowWords,

  setUnitname,
}) => {
  function selectUnitWords(num) {
    if (num === 1) {
      setUnit(unit1);
      setUnitname("unit1");
    } else if (num === 2) {
      setUnit(unit2);
      setUnitname("unit2");
    } else {
      setUnit(unit3);
      setUnitname("unit3");
    }
  }

  return (
    <>
      {" "}
      <div
        className=" z-[605] backdrop-blur-xl w-[100%] h-[100vh] absolute top-0 flex  items-center justify-center "
        onClick={handleShoswSelect}
      ></div>
      <div className="w-[100%] flex justify-center items-center absolute top-40 ">
        {" "}
        <div className=" bg-white w-[750px] h-[450px] drop-shadow-2xl rounded-xl flex flex-col z-[606] overflow-y-auto border-slate-300 border-[1px] ">
          <div className="flex  sticky top-0  bg-slate-100">
            {" "}
            <span
              className=" bg-slate-400 rounded-full cursor-pointer w-[7rem] h-[1.5rem] b-[0.3rem] flex justify-center items-center m-[1rem] py-[1rem] px-[1rem] text-white"
              onClick={() => {
                selectUnitWords(1);
              }}
            >
              單元 1
            </span>{" "}
            <span
              className=" bg-slate-400 rounded-full cursor-pointer w-[7rem] h-[1.5rem] b-[0.3rem] flex justify-center items-center m-[1rem] py-[1rem] px-[1rem] text-white"
              onClick={() => {
                selectUnitWords(2);
              }}
            >
              單元 2
            </span>{" "}
            <span
              className=" bg-slate-400 rounded-full cursor-pointer w-[7rem] h-[1.5rem] b-[0.3rem] flex justify-center items-center m-[1rem] py-[1rem] px-[1rem] text-white"
              onClick={() => {
                selectUnitWords(3);
              }}
            >
              單元 3
            </span>{" "}
            <hr />
          </div>

          {unit &&
            unit.map((words, index) => {
              return (
                <ShowWords
                  words={words}
                  handleShoswSelect={handleShoswSelect}
                  setNowWords={setNowWords}
                  wordsIndex={index}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SelectWords;
