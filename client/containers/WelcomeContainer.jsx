import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../components/Button.jsx";

import Animation from "../components/Animation.jsx";
import { motion, useTime, useTransform } from "framer-motion";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import TypeWriter from "../components/TypeWriter.jsx";
// import '../styles2.css'

const WelcomeContainer = () => {
  const activeState = useSelector((state) => state.audio.render);
  const dispatch = useDispatch();

  return (
    <div className="bg-black text-white   w-full md:h-100vh">
      <div className=" p-20 flex gap-4 items-center ">
        <h3 className="text-4xl ">SpeechEasy</h3>
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

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="col-span-1 p-20 ">
          <h1 className="text-5xl uppercase">Your speech teacher</h1>
          <p className="mt-8">
            Your personal speaking coach. Practice anytime, get instant
            feedback, and master your presentation professionalism.
          </p>
          {/* <ButtonComponent to='/record' btnText='Start!' /> */}
          <div className="mt-8 flex">
            <Link to="/signup">
              <button className="border px-4 py-2 rounded-md mr-4
              transition duration-150 ease-in-out
              hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300
              hover:border-none
              ">
                Sign up
              </button>
            </Link>
            <Link to="/login">
              <button className="border px-4 py-2 rounded-md
              hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300
              hover:border-none
              ">Sign in</button>
            </Link>
          </div>
        </div>

        <div
          className="col-span-1 mx-auto mt-6 border rounded-md w-4/5
        p-10  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300
        text-wrap"
        >
          <Animation />
          <TypeWriter />
        </div>
      </div>
    </div>
  );
};

export default WelcomeContainer;
