import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { UserContext } from "../context/UserContext";
import Modal from "./Model";
import { userRequest } from "../util/Request";

export default function Login() {
  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify(
        "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3NzBiMDg1YmY2NDliNzI2YjM1NzQ3NjQwMzBlMWJkZTlhMTBhZTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODM2NzIzMDYsImF1ZCI6IjM4ODQ3OTE5ODg1Ny0xaGZzOGJsc2g1OTM4dHA4dnJwYmE5MHA5MDRnNmlmaS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMTQwNjU2MDY5MjE2NDU4NTgyNCIsImVtYWlsIjoiYW5hb21hcnRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjM4ODQ3OTE5ODg1Ny0xaGZzOGJsc2g1OTM4dHA4dnJwYmE5MHA5MDRnNmlmaS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJvbWFyIGFzaGFyZiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhSGJWcEJ0cjZMWGhkbUU1bUxFM1p5c3pobUs2MnpmVVE2dTlmTD1zOTYtYyIsImdpdmVuX25hbWUiOiJvbWFyIiwiZmFtaWx5X25hbWUiOiJhc2hhcmYiLCJpYXQiOjE2ODM2NzI2MDYsImV4cCI6MTY4MzY3NjIwNiwianRpIjoiZGMzNDczYjU4MjE4ZDFlOWRlMTE0NzcyODI2ODhlYWIyYjIyNmZhNCJ9.xZqi4R2lSztUEl3TWKPmpkJIm_T9qVcUA4fDVPQKrKAGpLGyVXdNulQMJ1p6899pzrpbzDTK871dvwGD8KHbhSA21Z4NjsOtU0kI5EISE_X5w_x8RHAQAiaFvyqY8SQb0a28YoHhNnizo1B0g8E4WGJQ-Tlq07kpGd0IsRdWy0ECTbFac6SpRa7wKq9OxFj8wuJlbv_IqmStsorUZEpX23g13dqA5b5x3sZb807jHAByEA9ZSolbn6EsCaujszvDAVSYDh5pR9RkeCnbBGPM0_EhsQnVZUNKens1gXs2NIKYbB8p-9hQrD8cx6hzxe28X6el9uVXWc_aJo_xEQ8sLw"
      )
    );
  }, []);
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
