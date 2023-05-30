"use client";

import React, { useState, useContext, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { Authcontext } from "../authcontext";
import Link from "next/link";
import { Spinner } from "@chakra-ui/react";

const Login = () => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const { uid, dispatch } = useContext(Authcontext);
  const [detail, setdetails] = useState({ email: "", password: "" });
  const demoUser = () => {
    setdetails({ email: "demo@gmail.com", password: "123456" });
  };
  useEffect(() => {
    detail.email === "demo@gmail.com" && login();
  }, [detail]);
  const handlechange = (e) => {
    e.preventDefault();
    setdetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const login = (e) => {
    setloading(true);
    e && e.preventDefault();
    console.log(detail);
    signInWithEmailAndPassword(auth, detail.email, detail.password)
      .then((userCredential) => {
        // Signed in
        setloading(false);
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
    <div className=" flex justify-center items-center w-screen h-screen bg-slate-300">
      <div className="flex flex-col justify-center items-center">
        <h2 className=" text-3xl my-16 font-bold">Login</h2>
        <form
          className="flex bg-slate-900 p-8 rounded-md justify-center items-center flex-col"
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
            className=" bg-gray-700 w-64 h-8 rounded my-2 text-green-400"
          >
            LOGIN
          </button>
          {loading && (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          )}
          <Link href="/register">
            {" "}
            <h2 className=" text-sky-500 my-2">Register</h2>
          </Link>
        </form>
        <button
          onClick={demoUser}
          className=" bg-green-500 w-64 h-8 rounded my-2 text-slate-100"
        >
          Login as guest
        </button>
      </div>
    </div>
  );
};

export default Login;
