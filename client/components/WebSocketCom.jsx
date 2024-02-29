import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function WebSocketCom() {
  const [initialized, setInitialized] = useState(false);
  const [re, setRe] = useState(false);

  const DEEPGRAM_API_KEY_2 = process.env.REACT_APP_DEEPGRAM_API_KEY_2;

  let socket = "";
  let mediaRecorder;
  useEffect(() => {
    console.log("re", re);
  }, [re]);

  async function initialize() {
    setRe(true);

    // console.log('re', re)

    try {
      //require to access microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log({ stream });

      if (!MediaRecorder.isTypeSupported("audio/webm")) {
        alert("Browser not supported");
        return;
      }

      mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      //connect socket with deepgram
      socket = new WebSocket("wss://api.deepgram.com/v1/listen", [
        "token",
        DEEPGRAM_API_KEY_2,
      ]);

      socket.onopen = () => {
        console.log({ event: "onopen" });
        mediaRecorder.addEventListener("dataavailable", async (event) => {
          if (event.data.size > 0 && socket.readyState === 1) {
            socket.send(event.data);
          }
        });
        mediaRecorder.start(1000);
        setInitialized(true);
      };

      //listen
      socket.onmessage = (message) => {
        const received = JSON.parse(message.data);
        const transcript = received.channel.alternatives[0].transcript;
        if (transcript && received.is_final) {
          console.log(transcript);
          document.querySelector("#transcript").textContent += transcript + " ";
        }
      };

      socket.onclose = () => {
        console.log({ event: "onclose" });
      };

      socket.onerror = (error) => {
        console.log({ event: "onerror", error });
      };

      function stopRecording() {
        mediaRecorder.stop(); // Stop MediaRecorder
        socket.close(); // Close WebSocket connection
        setInitialized("");
        console.log(initialized);
        setRe(false);
      }

      // Add click event listener to stop button
      document
        .getElementById("stopButton")
        .addEventListener("click", stopRecording);
    } catch (error) {
      console.error("Error initializing:", error);
    }
  }

  return (
    <div className=" mx-28 mt-10">
      {/* CONTENT  */}
      <div className="border h-96 rounded-xl text-4xl overflow-scroll px-16 pt-8 leading-loose">
        <p id="transcript">
          {/* Your personal speaking coach. Practice anytime, get instant feedback,
          and master your presentation professionalism. Your personal speaking
          coach. Practice anytime, get instant feedback, and master your
          presentation professionalism. Your personal speaking coach. Practice
          anytime, get instant feedback, and master your presentation
          professionalism. Your personal speaking coach. Practice anytime, get
          instant feedback, and master your presentation professionalism. Your
          personal speaking coach. Practice anytime, get instant feedback, and
          master your presentation professionalism. Your personal speaking
          coach. Practice anytime, get instant feedback, and master your
          presentation professionalism. Your personal speaking coach. Practice
          anytime, get instant feedback, and master your presentation
          professionalism. */}
        </p>
      </div>

      <div className="flex justify-center">
        {/* <button
          onClick={initialize}
          disabled={initialized}
          className="border px-8 py-4"
        >
          {initialized ? "Initialized" : "Initialize"}
        </button> */}
        <div className=" grid-cols-1 items-center mt-4 flex gap-6">
          <button
            onClick={initialize}
            className={`mx-autofont-bold mt-6 record-btn
            hover:bg-slate-900`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              viewBox="0 0 26 26"
            >
              <path
                fill="currentColor"
                d="M13 6.188a6.812 6.812 0 1 0 0 13.625a6.812 6.812 0 1 0 0-13.625z"
              />
            </svg>

            <p>{`${re ? "Recording" : "I'm Ready"}`}</p>
          </button>

          <button
            id="stopButton"
            className={`mx-auto font-bold mt-6 record-btn hover:bg-slate-900
            ${re && "pulse-animation"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              viewBox="0 0 26 26"
            >
              <path
                fill="currentColor"
                d="M13 6.188a6.812 6.812 0 1 0 0 13.625a6.812 6.812 0 1 0 0-13.625z"
              />
            </svg>

            <p>Stop</p>
          </button>

          {/* <button
            id="stopButton"
            // onClick={initialize}
            className=" left-6 border px-12 py-2"
          >
            Stop
          </button> */}

          {/* ANALYZE BUTTON  */}
          <Link to='/results'>
            <button
              className="border-2 mx-auto text-gray-950 font-bold py-3 mt-6 px-12
              rounded-3xl 
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300
            hover:text-white"
            >
              <p>Analyze</p>
            </button>
          </Link>
        </div>

        {/* <p id="status">{initialized ? "Connected" : "Not Connected"}</p> */}
      </div>
    </div>
  );
}
