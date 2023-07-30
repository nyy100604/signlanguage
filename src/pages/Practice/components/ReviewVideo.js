import React from "react";
import { VscChromeClose } from "react-icons/vsc";

const ReviewVideo = ({ handleRevewVideo, unitname, nowWords }) => {
  return (
    <>
      {" "}
      <div className="z-[500] bg-black opacity-95 w-[100%] h-[100vh] absolute top-0 flex flex-col items-center justify-center">
        {" "}
        <div
          className=" text-white text-[2rem] mb-6 bg-slate-800 cursor-pointer rounded-full p-[0.5rem]"
          onClick={handleRevewVideo}
        >
          <VscChromeClose />
        </div>
        <video
          src={require(`../video/${unitname}/${nowWords}.mp4`)}
          className=" w-[950px] h-[470px] z-[510]"
          // autoplay="true"
          // controls="true"
        ></video>
      </div>
    </>
  );
};

export default ReviewVideo;
