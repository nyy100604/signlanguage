import React from "react";

const Vocabulary = ({ vocabulary, setVideoNum, num }) => {
  return (
    <div
      className="p-[2px] mt-4"
      onClick={() => {
        setVideoNum(num);
      }}
    >
      {vocabulary}
    </div>
  );
};

export default Vocabulary;
