import React from "react";
import { useNavigate } from "react-router-dom";
import LearnIcon from "../components/LearnIcon.png";
import PracticeIcon from "../components/PracticeIcon.png";
import TestIcon from "../components/TestIcon.png";
const Box = ({ content, setShowLearningUnit, setShowPractice }) => {
  const go = useNavigate();
  const showUnit = () => {
    if (content === "學習區") setShowLearningUnit(true);
    if (content === "練習區") {
      go("/practice");
    }
    if (content === "測驗區") {
      go("/Examination");
    }
  };
  let image;
  if (content === "學習區") {
    image = (
      <img
        src={LearnIcon}
        alt="Image 1"
        style={{ width: "150px", height: "150px" }}
      />
    );
  } else if (content === "練習區") {
    image = (
      <img
        src={PracticeIcon}
        alt="Image 2"
        style={{ width: "150px", height: "150px" }}
      />
    );
  } else if (content === "測驗區") {
    image = (
      <img
        src={TestIcon}
        alt="Image 3"
        style={{ width: "150px", height: "150px" }}
      />
    );
  }

  //const boxImage = <img src={TestIcon} alt="Test Icon "style={{ width: '150px', height: '150px' }} /> ;
  //const boxImage2 = <img src={LearnIcon} alt="Learn Icon "style={{ width: '150px', height: '150px' }} /> ;
  //const boxImage3 = <img src={PracticeIcon} alt="Practice Icon "style={{ width: '150px', height: '150px' }} /> ;
  return (
    <div
      className="bg-[#C6D8EA] text-[3rem] rounded-lg p-[3.5rem] m-[1.5rem] cursor-pointer hover:scale-110 duration-300"
      onClick={showUnit}
    >
      {image}
      <span className="text-[3rem]">{content}</span>
    </div>
  );
};

export default Box;
