"use client";

import React, { useState, useContext, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { Authcontext } from "../authcontext";

const Login = () => {
  const router = useRouter();
  const uid = localStorage.getItem("uid");
  const { dispatch } = useContext(Authcontext);
  const [detail, setdetails] = useState({ email: "", password: "" });

  useEffect(() => {
    uid !== null && router.push("/");
  }, [uid]);
  const handlechange = (e) => {
    e.preventDefault();
    setdetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const login = (e) => {
    e.preventDefault();
    console.log(detail);
    signInWithEmailAndPassword(auth, detail.email, detail.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        dispatch({ type: "LOGIN", payload: user.uid });
        router.push("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className=" flex justify-center items-center w-screen h-screen">
      <div>
        <form
          className="flex bg-slate-400 justify-center items-center flex-col"
          onSubmit={login}
        >
          <input
            id="email"
            type="text"
            className=" text-sm border border-black p-2 w-64 h-8 m-3 rounded"
            placeholder="Email"
            required
            onChange={handlechange}
          />
          <input
            id="password"
            type="password"
            className="text-sm border border-black p-2 w-64 h-8 m-3 rounded"
            placeholder="Password"
            required
            onChange={handlechange}
          />
          <button
            type="submit"
            className=" bg-gray-800 w-64 h-8 rounded text-green-400"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
