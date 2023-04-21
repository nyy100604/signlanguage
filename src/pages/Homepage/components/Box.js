import React from "react";
import { useNavigate } from "react-router-dom";
const Box = ({ content, setShowLearningUnit, setShowPractice }) => {
  const go = useNavigate();
  const showUnit = () => {
    if (content === "學習區") setShowLearningUnit(true);
    if (content === "練習區") {
      go("/practice");
    }
  };

  return (
    <div
      className="bg-[#C6D8EA] text-[3rem] rounded-lg p-[3.5rem] m-[1.5rem]  cursor-pointer"
      onClick={showUnit}
    >
      {content}
    </div>
  );
};

export default Box;
