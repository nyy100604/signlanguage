import React, { useEffect, useState } from "react";
import NavComponents from "../../components/NavComponents";
import Footer from "../../components/Footer";
import ReviewVideo from "./components/ReviewVideo";
import SelectWords from "./components/SelectWords";
import axios from "axios";
import { VscPlayCircle } from "react-icons/vsc";
import { VscChevronRight } from "react-icons/vsc";
import { useWords } from "../../Hooks/wordsHook";
import { VscChromeClose } from "react-icons/vsc";
import { useHover } from "../..//Hooks/hoverHook";

// 第一次啟動攝影機

const IconHint = ({ hint, isHover }) => {
  return isHover && <div className="iconHint">{hint}</div>;
};


const Practice = () => {
  let [unitname, setUnitname, unit, setUnit, nowWords, setNowWords] =
    useWords();
  const [viewReview, setViewReview] = useState(false);
  const [shoswSelect, setShowSelect] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showAccuracy, setShowAccuracy] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [hover, isHover] = useHover();

 

  console.log(unitname)
  const handleNextQuestion = () => {
    setNextQuestion(!nextQuestion);
  };
  const handleRevewVideo = () => {
    if (!unit || !unit[nowWords]) {
      // 沒有選擇動作，顯示提示或其他處理方式
      alert("請先選擇手語動作");
    } else {
      setViewReview(!viewReview);
    }
  };


  const handleShoswSelect = () => {
    setShowSelect(!shoswSelect);
  };

  const handleShowVideo = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };
  const handleStartRecording = () => {
    if (!unit || !unit[nowWords]) {
      // 沒有選擇動作，顯示提示或其他處理方式
      alert("請先選擇手語動作");
    } else {
      start();
    }
  };

  
  

  let [time, setTime] = useState(3);
  let [time2, setTime2] = useState(5);
  let [wait, setWait] = useState(false);
  let [recording, setRecording] = useState(false);
  const [accuracyNum, setAccuracyNum] = useState(null);
  /**
   * MediaRecorder Related Event Handler
   */
  let mediaRecorder = null;
  let inputVideoURL = null;
  // let outputVideoURL = null;

  function start() {
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
      frameRate: { ideal: 9, max: 9 },
    },
  };

  /**
   * MediaRecorder Methods
   */
  // Start Recording: mediaRecorder.start()
  function onStartRecording() {
    console.log(mediaRecorder);
    if (mediaRecorder) {
      mediaRecorder.start(1000);
      console.log("mediaRecorder.start()");
      if (time2 <= 0) {
        onStopRecording();
      }
    }
  }

  // Stop Recording: mediaRecorder.stop()
  function onStopRecording() {
    if (mediaRecorder) {
      mediaRecorder.stop();
      console.log("mediaRecorder.stop()");
    }
  }

  // Reset Recording
  function onReset() {
    // 釋放記憶體
    URL.revokeObjectURL(inputVideoURL);
    // 重新啟動攝影機
    setTime(3);
    setTime2(5);
    setWait(false);
    setRecording(false);
    setVideoData(null);
    setShowVideo(false);
    setAccuracyNum(null);
    setShowAccuracy(true);
    setShowResult(false);
    setShowSelect(false);
    setViewReview(false);
  }
  useEffect(() => {
    onReset();
  }, [nextQuestion]);
  
  

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
          setVideoData(file);

          var formData = new FormData();
          formData.append("file", file);
          formData.append("words", unit[nowWords]);
          formData.append("unit", unitname);
          // console.log(unit[nowWords]);
          //add a the action name, type as a string.

          const response = await axios.post(
            "http://localhost:5000/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(response.data);
          setAccuracyNum(response.data);
          setShowAccuracy(true); 
          setShowResult(true);
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
    if (time === 3) {
      mediaRecorderSetup();
    }
  }, [nextQuestion, showAccuracy , time, viewReview]);

  return (
    <>
      {" "}
      <NavComponents needIcon={true} />
      {viewReview && (
        <ReviewVideo
          handleRevewVideo={handleRevewVideo}
          unit={unit}
          nowWords={nowWords}
          unitname={unitname}
        />
      )}
      {shoswSelect && (
        <SelectWords
          handleShoswSelect={handleShoswSelect}
          setUnit={setUnit}
          setNowWords={setNowWords}
          unit={unit}
          unitname={unitname}
          setUnitname={setUnitname}
          handleNextQuestion={handleNextQuestion}
        />
      )}
      <div className="min-h-[85vh] flex">
        <div className="left flex flex-col justify-center items-center relative w-[900px] mt-[2rem]">
          {" "}
          <p className="flex justify-center items-center text-[1.5rem] mb-2">
            <span
              className="text-white bg-black w-[20rem] flex items-center justify-center mr-[1rem] rounded-lg cursor-pointer"
              onClick={handleShoswSelect}
            >
              {/* //改 */}
              {unit && `${unit[nowWords]}`}
              {!unit && `請選擇手語動作`}
              <VscChevronRight />
            </span>
            <span className="text-[2rem] cursor-pointer">
              {" "}
              <div className="relative" ref={hover}>
              <VscPlayCircle onClick={handleRevewVideo} />
              <div className=" absolute">
                  <IconHint hint={"觀看學習影片"} isHover={isHover} />
                </div>
              </div>
            </span>
          </p>
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

          {" "}
          {showVideo && (
             <div className="z-[500] bg-black opacity-85 w-[100%] h-[100vh] absolute top-0 flex flex-col items-center justify-center">
             <div
               className=" text-white text-[2rem] mb-6 bg-slate-800 cursor-pointer rounded-full p-[0.5rem]"
                onClick={handleCloseVideo}
              >
             <VscChromeClose />
             </div>
            <video
              controls
              className=" w-[950px] h-[470px] z-[510]]"
              src={URL.createObjectURL(videoData)}
            />
        </div>
      )}
       <div className="right flex items-center w-[400px] justify-center flex-col  mt-[2rem]">
          {time === 3 &&  (
            <button
              className="rounded-lg text-white text-[1.5rem] bg-red-600 py-[0.7rem] px-[1rem]"
              onClick={handleStartRecording}
            >
              開始錄製
            </button>
          )}
          {time === 3 &&  (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-600 text-base" >
                請選擇較亮的環境錄製並盡量保持上半身在鏡頭內
            <br />
                按下開始錄製後會倒數三秒才會正式錄製
            <br />
                動作請在五秒內完成
            <br />
                動作正確會顯示：你做對了！
            <br />
                不正確則會顯示：你做錯囉！
            <br />
                準備好就開始吧！
        <span role="img" aria-label="開心">😄</span>
             </p>
               </div>
     )}
          <div className="my-2"></div> 
          {time2 === 0 && (
             <div className="mt-12">
            <button
              className="rounded-lg text-white text-[1.5rem] bg-sky-600  py-[0.5rem] px-[1rem]"
              onClick={onReset}
            >
              再來一次
            </button>
            </div>
          )}
          <div className="my-2"></div> 
           {time2 === 0 && (
            <button
              className="rounded-lg text-white text-[1.5rem] bg-sky-600  py-[0.5rem] px-[1rem]"
              onClick={handleShowVideo}
            >
              回放影片
            </button>
           )}
          {time2 === 0 && !accuracyNum &&(
            <div role="status" className="flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className=" text-slate-400 mt-5">等待手語成績回傳...</span>
            </div>
          )}
          {recording && (
            <img
              alt="錄製中"
              className="w-[200px] "
              src={`${require("./picture/recording.png")}`}
            />
          )}
          {wait && <p className="text-[2rem] mt-5">準備3秒</p>}
          {recording && (
            <p className="text-[2rem] mt-5">{`剩餘秒數： ${time2}`}</p>
          )}
          {showAccuracy && accuracyNum && <p className=" text-[1.5rem] text-center mt-[0.5rem]">你的分數評語：{accuracyNum}</p>}
        </div>
       </div>
      <Footer />
    </>
  );
          
};

  export default Practice;
