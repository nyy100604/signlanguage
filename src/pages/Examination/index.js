import React, { useEffect, useState } from "react";
import NavComponents from "../../components/NavComponents";
import axios from "axios";

// 第一次啟動攝影機

const Examination = () => {
  let [time, setTime] = useState(3);
  let [time2, setTime2] = useState(5);
  const [accuracyNum, setWord] = useState("");
  /**
   * MediaRecorder Related Event Handler
   */
  let mediaRecorder = null;
  let inputVideoURL = null;
  // let outputVideoURL = null;

  function start() {
    mediaRecorderSetup();
    let intetval1 = setInterval(() => {
      time--;
      setTime(time);
      console.log(time);
      if (time <= 1) {
        setTime(time);
        clearInterval(intetval1);
        setTime("start recoding");
        start2();
      }
    }, 1000);
  }

  function start2() {
    setTime();
    onStartRecording();
    let intetval2 = setInterval(() => {
      time2--;
      setTime2(time2);
      console.log(time2);
      if (time2 <= 0) {
        clearInterval(intetval2);
        onStopRecording();
        setTime("end of recording");
      }
    }, 1000);
  }

  let inputVideo;
  let constraints = {
    audio: true,
    video: {
      width: { min: 1280 },
      height: { min: 720 },
      frameRate: 20,
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
    // URL.revokeObjectURL(outputVideoURL);
    // outputVideo.src = "";
    // outputVideo.controls = false;

    // inputVideo.src = "";

    // 重新啟動攝影機

    setTime(3);
    setTime2(5);
    mediaRecorderSetup();
  }

  function mediaRecorderSetup() {
    inputVideo = document.querySelector("#inputVideo");
    let chunks = []; // 在 mediaRecord 要用的 chunks
    // 設定顯示的按鍵
    // isRecordingBtn("start");
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
          // outputVideo.controls = true;
          var file = new File(chunks, "video.mp4", { type: "video/mp4" });
          chunks = [];
          // outputVideoURL = URL.createObjectURL(blob);
          // console.log(outputVideoURL);
          // outputVideo.src = outputVideoURL;
          var formData = new FormData();
          formData.append("file", file);
          // const apiUrl = "http://localhost:5000/upload";
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
          setWord(response.data);

          // fetch(apiUrl, {
          //   method: "POST",
          //   body: formData,
          //   // mode: "no-cors",
          // })
          //   .then((response) => {
          //     console.log("hi" + response);
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });

          // 停止所有的輸入或輸出的串流裝置（例如，關攝影機）
          stream.getTracks().forEach(function (track) {
            track.stop();
          });
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
  }, []);

  return (
    <>
      {" "}
      <NavComponents needIcon={true} />
      <div className=" flex justify-center items-center relative mt-[5rem]">
        {" "}
        <video
          id="inputVideo"
          alt="在這裡錄影"
          className=" w-[800px] h-[410px]"
          muted
        >
          Video stream not available.
        </video>
        <p className=" absolute top-[50%] text-white text-[2rem]">{time}</p>
      </div>
      <button className="startBtn bg-red-600" onClick={start}>
        開始錄製
      </button>
      <button className="stopBtn bg-blue-400" onClick={onStopRecording}>
        結束錄製
      </button>
      <button className="resetBtn bg-slate-400" onClick={onReset}>
        下一題
      </button>
      <p>{time}</p>
      <p>{time2}</p>
      {time2 == 0 && <p>分數為：{accuracyNum}</p>}
    </>
  );
};

export default Examination;
