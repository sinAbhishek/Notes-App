"use client";
import { Authcontext } from "./authcontext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { auth } from "./firebase";
import { useEffect } from "react";
import React, { useEffect, useState } from "react";
import "./home.css";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { collection, addDoc, updateDoc, deleteField } from "firebase/firestore";

// Add a new document with a generated id.

export default function Home() {
  const router = useRouter();
  const { uid } = useContext(Authcontext);
  const [data, setdata] = useState([]);
  const [text, settext] = useState("");
  const [array, setarray] = useState([]);
  const handle = (e) => {
    e.preventDefault();
    settext(([e.target.id] = e.target.value));
  };
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "cities"), (snapshot) => {
      console.log(snapshot.docs);
      console.log(snapshot.docs[1].data().array);
      setdata(snapshot.docs[1].data().array);
      console.log(...snapshot.docs[1].data().array);
      setdata(snapshot.docs[1].data().array);
    });
    return () => {
      unsub();
    };
  }, []);
  const set = async () => {
    // console.log(data);
    // setarray([...data, text]);
    // const docRef = await addDoc(collection(db, "cities"), {
    //   name: { text },
    //   country: "Japan",
    // });

    // console.log(data);
    const cityRef = doc(db, "cities", "Xnn39q3PCH8Iz7qrjDDv", "array");

    // Remove the 'capital' field from the document
    await updateDoc(cityRef, {
      hehe: deleteField(),
    });
  };
  useEffect(() => {
    const call = async () => {
      const res = await setDoc(doc(db, "cities", "Xnn39q3PCH8Iz7qrjDDv"), {
        name: "ayhid",
        array: array,
        country: "USA",
      });
      setarray([]);
    };
    array[0] && call();
  }, [array]);
  useEffect(() => {
    uid === null && router.push("login");
  }, [uid]);
  useEffect(() => {
    auth.currentUser !== null && console.log(auth.currentUser);
  }, [auth.currentUser]);
  const test = () => {
    console.log(auth.currentUser);
  };
  return (
    <div>
      <button onClick={test}>Get user</button>
    </div>
  );
}
