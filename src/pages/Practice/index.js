import React from "react";
import styled from "styled-components";

const Div1 = styled.div`
  display: flex;
  justify-content: center;

  /* margin-top: 2rem; */
  /* flex-wrap: wrap; */
`;

const Div2 = styled.div`
  background-color: #c6d8ea;
  width: 20vw;
  height: 70vh;
  //delete
  max-height: 60vh;
  overflow-y: overlay;
  margin: 3rem;
  border-radius: 1rem;

  p {
    font-size: 2rem;
    padding: 1rem;
    text-align: center;
  }
`;

const VideoDiv = styled.div`
  margin-top: 1.5rem;
  /* background-color: #195796; */
  //需修正
  /* width: 65vw; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div {
    button {
      border: none;
      background-color: #b12727;
      color: white;
      border-radius: 0.5rem;
      padding: 0.75rem 1.25rem;
      font-size: 1.3rem;
      margin: 3rem;
      cursor: pointer;
    }
  }
`;

const learning = () => {
  return (
    <Div1>
      <Div2>
        <p
          style={{
            height: "1rem",
            backgroundColor: "white",
          }}
          單元詞彙
        ></p>
        <div
          style={{
            backgroundColor: "#20639e",
            height: "3rem",
            borderRadius: "0.5rem",
          }}
          className=" mt"
        ></div>
        <p>二 十</p>
        <p>公 園</p>
        <p>刷 牙</p>
        <p>三 十</p>
        <p>四 十</p>
      </Div2>
      <VideoDiv>
        <p style={{ display: "flex" }} className=" mt-5">
          請對鏡頭比出手語動作：二十
          <img src="./Picture/圖片 1.png" className=" w-7 ml-1 mb-2" alt="qq" />
        </p>
        <video
          src="./video/2.mp4"
          width="700"
          height="400"
          autoplay="true"
          controls="true"
        ></video>
        <div>
          <button>開始錄製</button>
        </div>
      </VideoDiv>
    </Div1>
  );
};

export default learning;
