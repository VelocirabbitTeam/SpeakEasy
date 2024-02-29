<<<<<<< HEAD
import React from 'react';
import Record from '../components/Record.jsx';
import WebSocketCom from '../components/WebSocketCom.jsx';
import { useSelect } from '@react-three/drei';

const PlayContainer = () => {

   return (
    <div className='bg-black min-h-screen text-white'>
=======
import React from "react";
import Record from "../components/Record.jsx";
import { logout } from "../slices/reducers/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WebSocketCom from "../components/WebSocketCom.jsx";

const PlayContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
>>>>>>> dev

  const logOutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="bg-black min-h-screen text-white">
      {/* return (
    <div className="bg-black h-100vh text-white"> */}
      <div className="grid grid-cols-2 py-8 px-12">
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
            className="border py-2 px-4 rounded-md
          hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300"
          >
            Logout
          </button>
        </div>
      </div>

      <div className=" items-center">
        {/* <Record /> */}
        <WebSocketCom />
      </div>
    </div>
  );
};

export default PlayContainer;
