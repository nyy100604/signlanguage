import React, { useState } from "react";
import NavComponents from "../../components/NavComponents";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import video1 from "../../video/1.mp4";
import video2 from "../../video/2.mp4";
import video3 from "../../video/3.mp4";

const Learning = () => {
  const { id } = useParams();
  console.log(id);
  const [video, setVideo] = useState(1);

  const setVideoNum = (number) => {
    setVideo(number);
  };

  return (
    <>
      {" "}
      <NavComponents />
      <div className="flex flex-wrap h-[80vh] px-[auto] justify-center">
        <div className="left w-[350px]  flex flex-col justify-center items-center">
          <div className="flex justify-center items-center bg-[#20639E] w-[250px] h-[3rem] rounded-t-lg text-white text-[1.5rem]">
            單元 {id} 詞彙
          </div>{" "}
          <div className="bg-[#C6D8EA] flex flex-col  cursor-pointer items-center overflow-scroll w-[250px] h-[350px] text-[2rem]">
            {" "}
            <p
              className="p-[2px]"
              onClick={() => {
                setVideoNum(1);
              }}
            >
              動作1
            </p>
            <p
              className="p-[2px]"
              onClick={() => {
                setVideoNum(2);
              }}
            >
              動作2
            </p>
            <p
              className="p-[2px]"
              onClick={() => {
                setVideoNum(3);
              }}
            >
              動作3
            </p>{" "}
            <p className="p-[2px]">動作4</p>
            <p className="p-[2px]">動作5</p> <p className="p-[2px]">動作6</p>
            <p className="p-[2px]">動作7</p> <p className="p-[2px]">動作8</p>
          </div>
        </div>
        <div className="flex items-center right w-[724px] ">
          <video
            // src={video}
            src={require(`../../video/${video}.mp4`)}
            className=" w-[800px]"
            autoplay="true"
            controls="true"
          ></video>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Learning;
