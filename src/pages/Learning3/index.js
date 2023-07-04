import React, { useState } from "react";
import NavComponents from "../../components/NavComponents";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Vocabulary from "./vocabulary";

const Learning3 = () => {
  const { id } = useParams();
  console.log(id);
  const [video, setVideo] = useState(0);

  const setVideoNum = (number) => {
    setVideo(number);
  };
  const unit3 = [
    "常常",
    "久",
    "問",
    "會不會",
    "累/辛苦",
    "比賽",
    "回答",
    "猜",
    "輸",
    "贏",
    "他們兩個",
  ];
  return (
    <>
      {" "}
      <NavComponents needIcon={true} />
      <div className="flex flex-wrap h-[80vh] px-[auto] justify-center min-h-[80vh] my-4">
        <div className="left w-[350px]  flex flex-col justify-center items-center">
          <div className="flex justify-center items-center bg-[#20639E] w-[250px] h-[3rem] rounded-t-lg text-white text-[1.5rem]">
            單元 {id} 詞彙
          </div>{" "}
          <div className="bg-[#C6D8EA] flex flex-col  cursor-pointer items-center overflow-scroll w-[250px] h-[350px] text-[2rem]">
            {" "}
            {unit3.map((word, index) => {
              console.log(index);
              return (
                <Vocabulary
                  vocabulary={word}
                  setVideoNum={setVideoNum}
                  num={index}
                />
              );
            })}
          </div>
        </div>
        <div className="flex items-center right w-[724px] my-4 ">
          <video
            // src={require(`./video/unit3/${video}.mp4`)}
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

export default Learning3;
