import React, { useState } from "react";
import NavComponents from "../../components/NavComponents";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Vocabulary from "./vocabulary";

const Learning2 = () => {
  const { id } = useParams();
  console.log(id);
  const [video, setVideo] = useState(0);

  const setVideoNum = (number) => {
    setVideo(number);
  };
  const unit2 = [
    "盪鞦韆",
    "換",
    "人",
    "時間",
    "放心",
    "輪流",
    "下一個",
    "洗衣服",
    "洗車",
  ];
  return (
    <>
      {" "}
      <NavComponents needIcon={true} />
      <div className="flex flex-wrap h-[80vh] px-[auto] justify-center min-h-[80vh] my-4">
        <div className="left w-[350px]  flex flex-col justify-center items-center">
          <div className="flex justify-center items-center bg-[#20639E] w-[250px] h-[3rem] rounded-t-lg text-white text-[1.5rem]">
            單元 2 詞彙
          </div>{" "}
          <div className="bg-[#C6D8EA] flex flex-col  cursor-pointer pl-[10px] overflow-scroll w-[250px] h-[350px] text-[2rem]">
            {" "}
            {unit2.map((word, index) => {
              console.log(index);
              return (
                <Vocabulary
                  vocabulary={word}
                  setVideoNum={setVideoNum}
                  num={index}
                  key={index} 
                />
              );
            })}
          </div>
        </div>
        <div className="flex items-center right w-[724px] my-4 ">
          <video
            src={require(`./video/unit2/${video}.mp4`)}
            className=" w-[800px] h-[410px]"
            autoplay="true"
            controls="true"
          ></video>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Learning2;
