import React from "react";

const Box = ({ content, setShowLearningUnit }) => {
  const showUnit = () => {
    if (content === "學習區") setShowLearningUnit(true);
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
