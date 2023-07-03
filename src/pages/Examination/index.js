import React, { useEffect, useState } from "react";
import NavComponents from "../../components/NavComponents";
import Footer from "../../components/Footer";
import axios from "axios";
import { unit1 } from "../../Hooks/wordsHook";


// 第一次啟動攝影機

const Practice = () => {
  let words = unit1;
  let [time, setTime] = useState(3);
  let [time2, setTime2] = useState(5);
  let [question, setQuestion] = useState(1);
  let [recording, setRecording] = useState(false);
  const [accuracyNum, setAccuracyNum] = useState(null);
  let [wait, setWait] = useState(false);

  /**
   * MediaRecorder Related Event Handler
   */
  let mediaRecorder = null;
  let inputVideoURL = null;
  // let outputVideoURL = null;

  function start() {
    // mediaRecorderSetup();
    // console.log(mediaRecorder);
    let intetval1 = setInterval(() => {
      setWait(true);
      time--;
      setTime(time);
      if (time <= 0) {
        clearInterval(intetval1);
        setTime("start recording");
        setWait(false);
        start2();
      }
    }, 1000);
  }

  function start2() {
    console.log(time2);

    console.log(recording);
    setTime();
    setRecording(true);
    onStartRecording();
    let intetval2 = setInterval(() => {
      time2--;
      setTime2(time2);
      setRecording(!recording);
      // console.log(time2);
      if (time2 <= 0) {
        clearInterval(intetval2);
        onStopRecording();
        setTime("End of recording");
        setRecording(false);
      }
    }, 1000);
  }

  let inputVideo;
  let constraints = {
    audio: true,
    video: {
      width: { min: 1280 },
      height: { min: 720 },
      frameRate: { ideal: 20, max: 20 },
    },
  };

  /**
   * MediaRecorder Methods
   */
  // Start Recording: mediaRecorder.start()
  function onStartRecording() {
    console.log(mediaRecorder);
    mediaRecorder.start(1000);
    console.log("mediaRecorder.start()");
    if (time2 <= 0) {
      onStopRecording();
    }
  }

  // Stop Recording: mediaRecorder.stop()
  function onStopRecording() {
    mediaRecorder.stop();
    console.log("mediaRecorder.stop()");
  }

  // Reset Recording
  function onReset() {
    // 釋放記憶體
    URL.revokeObjectURL(inputVideoURL);
    // 重新啟動攝影機
    setTime(3);
    setTime2(5);
    setQuestion((q) => {
      return q + 1;
    });
  }

  function mediaRecorderSetup() {
    inputVideo = document.querySelector("#inputVideo");
    let chunks = []; // 在 mediaRecord 要用的 chunks
    /**
     * DOM EventListener
     */
    /* 當媒體的 metadata 載入後即播放媒體 */

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        /**
         * inputVideo Element
         * 將串流的 inputVideo 設定到 <video> 上
         **/
        // Older browsers may not have srcObject
        if ("srcObject" in inputVideo) {
          inputVideo.srcObject = stream;
        } else {
          // Avoid using this in new browsers, as it is going away.
          inputVideo.src = window.URL.createObjectURL(stream);
        }
        inputVideo.controls = false; // 要不要顯示播放控制器
        /**
         * 透過 MediaRecorder 錄製影音串流
         */
        // 建立 MediaRecorder 準備錄影
        // 如果沒有指定 mimeType，錄下來的 webm 影片在 Firefox 上可能不能看（Firefox 也不支援 h264)
        mediaRecorder = new MediaRecorder(stream, {
          mimeType: "video/webm;codecs=VP9",
          // bitsPerSecond: '512000',
        });
        /* MediaRecorder EventHandler */
        mediaRecorder.addEventListener(
          "dataavailable",
          mediaRecorderOnDataAvailable
        ); // 有資料傳入時觸發

        mediaRecorder.addEventListener("stop", mediaRecorderOnStop); // 停止錄影時觸發

        function mediaRecorderOnDataAvailable(e) {
          console.log("mediaRecorder on dataavailable", e.data);
          chunks.push(e.data);
        }
        async function mediaRecorderOnStop(e) {
          console.log("mediaRecorder on stop");
          // 停止所有的輸入或輸出的串流裝置（例如，關攝影機）
          stream.getTracks().forEach(function (track) {
            console.log("Close Camera");
            track.stop();
          });

          // outputVideo.controls = true;
          var file = new File(chunks, "video.mp4", { type: "video/mp4" });
          chunks = [];
          // outputVideoURL = URL.createObjectURL(blob);
          // console.log(outputVideoURL);
          // outputVideo.src = outputVideoURL;

          var id = localStorage.getItem("id");
          console.log("hello", id);
          // 使用AJAX發送POST請求
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "http://localhost:5000/data",true);
          xhr.setRequestHeader("Content-Type", "application/json");

          xhr.onreadystatechange = function() {
         if (xhr.readyState === 4 && xhr.status === 200) {
           // 請求成功，可以處理後端返回的結果
          var response = JSON.parse(xhr.responseText);
            console.log(response);
            }
          };

          var data = JSON.stringify({ id: id });
          xhr.send(data);


          var formData = new FormData();
          formData.append("file", file);
          formData.append("words", unit1[question-1]);
          console.log(unit1[question-1]);
          // const apiUrl = "http://localhost:5000/upload";

          const response = await axios.post(
            "http://localhost:5000/exam",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(response.data);
          setAccuracyNum(response.data);
        }
      })
      .catch(function (error) {
        console.warn("some error occurred" + error);
      });
    inputVideo.addEventListener("loadedmetadata", function () {
      inputVideo.play();
      console.log("inputVideo on loadedmetadata");
    });
  }

  useEffect(() => {
    mediaRecorderSetup();
  }, [question]);

  return (
    <>
      {" "}
      <NavComponents needIcon={true} />
      <div className="min-h-[85vh] flex">
        <div className="left flex flex-col justify-center items-center relative w-[1000px] mt-[2rem]">
          {" "}
          <p className=" text-[1.5rem]">{`${question}、${
            words[question - 1]
          }`}</p>
          <video
            id="inputVideo"
            alt="在這裡錄影"
            className=" w-[800px] h-[410px] "
            muted
          >
            Video stream not available.
          </video>
          <p className=" absolute top-[50%] text-white text-[3.5rem]">{time}</p>
        </div>

        <div className="right flex items-center w-[100%] justify-center flex-col  w-[240px] mt-[2rem]">
          {" "}
          {time == 3 && (
            <button
              className="rounded-lg text-white text-[1.2rem] bg-red-600 py-[0.7rem] px-[1rem]"
              onClick={start}
            >
              開始錄製
            </button>
          )}
          {time2 == 0 && (
            <button
              className="rounded-lg text-white text-[1.2rem] bg-sky-600 py-[0.7rem] px-[1rem]"
              onClick={onReset}
            >
              下一題
            </button>
          )}
          {wait && <p className="text-[2rem] mt-5">準備3秒</p>}
          {recording && (
            <div>
              {" "}
              <img
                className="w-[200px] "
                src={`${require("./picture/recording.png")}`}
              />{" "}
              <p className="text-[2rem]">{`倒數秒數：${time2}`}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Practice;
