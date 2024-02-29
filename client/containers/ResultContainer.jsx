import React from "react";
import Button from "../components/Button.jsx";
import CurrentSession from "../components/CurrentSession.jsx";
import SessionTrends from "../components/SessionTrends.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../slices/reducers/userSlice.js";
import { useNavigate } from "react-router-dom";
import Result from "../components/Result.jsx";
import { GiJourney } from "react-icons/gi";
import { CurTransAna } from "../components/CurTransAna.jsx";
import History from '../components/History.jsx'
import { FaHistory } from "react-icons/fa";

const ResultContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };
  const { isLoggedIn, sessionData } = useSelector((state) => state.user);

  const currSession = sessionData[sessionData.length - 1];

  const wordCountTrends = [];
  const wordPerSec = [];
  const avgPauseDur = [];
  const totalPauses = [];

  for (let i = 0; i < sessionData.length; i++) {
    wordCountTrends.push(sessionData[i].wordCount);
    wordPerSec.push(sessionData[i].wordPerSec);
    avgPauseDur.push(sessionData[i].averagePauseDuration);
    totalPauses.push(sessionData[i].totalPauses);
  }

  // useEffect(() => {
  //   fetch()
  // });

  return (
    <>
      <div className="bg-black text-white relative overflow-scroll min-h-screen pb-32">
        {/* ---------------------------------------------------- */}
        <div className="grid grid-cols-2 py-8 px-16">
          <div className="col-span-1 flex items-center text-4xl">
            <h3 className="mr-2">Speechr</h3>
            <svg
              className="logo-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M18 0H2a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-4 4a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 14 4zM6 4a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 6 4zm4 8c-2.61 0-4.83-.67-5.65-3h11.3c-.82 2.33-3.04 3-5.65 3z"
              />
            </svg>
          </div>

          <div className="col-span-1 flex justify-end text-xl">
            <button
              onClick={logOutHandler}
              className="border px-6  rounded-md h-14
    hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300"
            >
              Logout
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        <div className="px-28 text-center">
          {/* <CurrentSession
            className="curr-session-div"
            currSession={currSession}
          /> */}

          {/* CURRENT TRANSCRIPT ANALYSE --------------------------------------------------- */}
          <CurTransAna />

          {/* RESULT --------------------------------------------------- */}
          <div className="text-4xl mt-32 mb-14 flex mx-auto justify-center
          text-indigo-200">
            Your Journey so far
            <GiJourney className="ml-4" />{" "}
          </div>
          {/* <SessionTrends dataArr={wordCountTrends} title="wordCountTrends" />
          <SessionTrends dataArr={wordPerSec} title="wordPerSec" />
          <SessionTrends dataArr={avgPauseDur} title="avgPauseDur" />
          <SessionTrends dataArr={totalPauses} title="totalPauses" /> */}
          <Result />


          {/* CURRENT TRANSCRIPT ANALYSE --------------------------------------------------- */}
          <div className="text-4xl mt-32 mb-14 flex mx-auto justify-center
          text-indigo-200">
            History Tracker
            <FaHistory className="ml-4" />{" "}
          </div>
          
          <History />



          {/* RECORD BUTTON---------------------------------------------------- */}
          <div
            className="w-full flex justify-center
          fixed bottom-0 right-0 z-20 py-6
          bg-white 
          text-white
          hover:text-black font-bold text-2xl
          bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300"
          >
            <Link to="/play">
              <button className="text-2xl">Record Again!</button>
            </Link>
          </div>
        </div>
      </div>

      {/* <Link to="/record">
        <button className="record-btn data-container-btn">Record Again!</button>
      </Link> */}

      {/*---------------------------------------------------- */}

    </>
  );
};

export default ResultContainer;
