import React from "react";

const ShowWords = ({
  words,
  handleShoswSelect,
  setNowWords,
  wordsIndex,
  handleNextQuestion,
}) => {
  let wordsHandler = () => {
    setNowWords(wordsIndex);
    handleShoswSelect();
    handleNextQuestion();
  };
  console.log(wordsIndex);
  return (
    <div
      className=" hover:bg-slate-100 hover:text-sky-600 text-[1.5rem] m-[5px] px-[1rem] py-[0.7rem] rounded-lg cursor-pointer"
      onClick={wordsHandler}
    >
      {words}
    </div>
  );
};

export default ShowWords;
