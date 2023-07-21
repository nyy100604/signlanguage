import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LearnIcon from "../components/LearnIcon.png";
import PracticeIcon from "../components/PracticeIcon.png";
import TestIcon from "../components/TestIcon.png";
const Box = ({ content, setShowLearningUnit, setShowPractice }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const group = localStorage.getItem("group");
  const blockGroup = '2'


  const go = useNavigate();
  const showUnit = () => {
    if (content === "學習區") setShowLearningUnit(true);
    if (content === "練習區" && group !== blockGroup) {
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
        alt="學習區圖示"
        style={{ width: "150px", height: "150px" }}
      />
    );
  } else if (content === "練習區") {
    if(group === blockGroup) {
      image = (
      <div
        className="relative"
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <img
          src={PracticeIcon}
          alt="練習區鎖定圖示"
          style={{ width: "150px", height: "150px" }}
        />
        {tooltipVisible && (
          <div className="absolute top-0 bg-gray-200 p-2 pl-5 pr-5 mt-14 rounded">
            <p className="text-[1rem] whitespace-nowrap">練習區已鎖定。</p>
          </div>)}
        </div>
       
      );
    }else {
      image = (
        <img
            src={PracticeIcon}
            alt="練習區圖示"
            style={{ width: "150px", height: "150px" }}
        />
      )
    }
    
  } else if (content === "測驗區") {
    image = (
      <img
        src={TestIcon}
        alt="測驗區圖示"
        style={{ width: "150px", height: "150px" }}
      />
    );
  }
  
  //const boxImage = <img src={TestIcon} alt="Test Icon "style={{ width: '150px', height: '150px' }} /> ;
  //const boxImage2 = <img src={LearnIcon} alt="Learn Icon "style={{ width: '150px', height: '150px' }} /> ;
  //const boxImage3 = <img src={PracticeIcon} alt="Practice Icon "style={{ width: '150px', height: '150px' }} /> ;
  return (
    <div
      className="bg-[#C6D8EA] duration-300 text-[3rem] rounded-lg p-[3.5rem] m-[1.5rem] cursor-pointer hover:scale-110 "
      onClick={showUnit}
    >
      {image}
      <span className="text-[3rem]">{content}</span>
    </div>
  );
};

export default Box;
