"use client";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import React, { useState, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Authcontext } from "../authcontext";
import Link from "next/link";

const Register = () => {
  const router = useRouter();
  const [detail, setdetail] = useState({ email: "", password: "" });
  const [msg, setmsg] = useState("");
  const { dispatch } = useContext(Authcontext);
  const send = (e) => {
    e.preventDefault();
    console.log(detail);
    createUserWithEmailAndPassword(auth, detail.email, detail.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user.uid });
        router.push("/");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
        setmsg(error.message);
        setTimeout(() => setmsg(""), 4000);

        // ..
      });
  };

  const handle = (e) => {
    e.preventDefault();
    setdetail((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen h-screen bg-slate-300">
        <h2 className=" text-3xl my-16 font-bold">REGISTER</h2>
        <div className=" bg-slate-900 rounded-md flex flex-col justify-center items-center">
          <form className="flex flex-col m-8 " onSubmit={send}>
            <input
              id="email"
              type="text"
              onChange={handle}
              required
              placeholder="Email"
              autoComplete="on"
              className="m-2 rounded-md h-8 p-2"
            />
            <input
              id="password"
              type="password"
              onChange={handle}
              required
              placeholder="Password"
              autoComplete="on"
              className="m-2 rounded-md h-8 p-1"
            />
            <button
              className=" bg-green-300 m-2 rounded-md h-8 p-1"
              type="submit"
            >
              Submit
            </button>
          </form>
          <Link className="flex justify-center items-center" href="/login">
            <p className=" text-slate-50">Already registered? </p>
            <h2 className="text-sky-500  text-lg">Login</h2>
          </Link>
        </div>

        {msg && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Password error</AlertTitle>
            <AlertDescription>{msg}</AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
};

export default Register;
