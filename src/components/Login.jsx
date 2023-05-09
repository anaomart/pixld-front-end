import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { UserContext } from "../context/UserContext";
import Modal from "./Model";
import { userRequest } from "../util/Request";

export default function Login() {
  const shareVideo =
    "https://s3.eu-north-1.amazonaws.com/pixld.agency/share.mp4";
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(false);
  const URL = "https://share-me-n2qk.onrender.com/";
  const onSuccessLogin = async (response) => {
    const JWT = response.credential;
    localStorage.setItem("user", JSON.stringify(JWT));
    setUser(JWT);
    window.location.reload();
    await sendJWTToServer(JWT);
    navigate("/");
  };
  useEffect(() => {
    async function ssl() {
      try {
        console.log("hello");
        const response = await fetch(URL + "/test");
        console.log(response);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }
    ssl();
  });
  async function sendJWTToServer(JWT) {
    const response = await fetch(URL + "/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ JWT }),
    });

    setError(false);
  }

  return (
    <div className="flex justify-start items-center flex-col h-screen ">
      <div className="relative w-full h-full">
        <video
          className="w-full h-full object-cover"
          loop
          controls={false}
          muted
          autoPlay
        >
          <source src={shareVideo} type="video/mp4"></source>
        </video>
        <div className="absolute flex flex-col justify-center items-center inset-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} className="w-[130px]" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={(response) => {
                onSuccessLogin(response);
              }}
              onError={() => {
                console.log({ Error: "Login Failed" });
              }}
              useOneTap
            />
          </div>
        </div>
      </div>
    </div>
  );
}
