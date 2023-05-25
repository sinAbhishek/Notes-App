"use client";
import { Authcontext } from "./authcontext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { auth } from "./firebase";
import React, { useEffect, useState } from "react";
import { doc, setDoc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { collection, addDoc, updateDoc, deleteField } from "firebase/firestore";

// Add a new document with a generated id.

export default function Home() {
  const router = useRouter();
  const { uid } = useContext(Authcontext);
  const [note, setnote] = useState([]);
  const [data, setdata] = useState([]);
  const [list, setlist] = useState([]);
  const [text, settext] = useState("");
  const [array, setarray] = useState("");
  const handle = (e) => {
    e.preventDefault();
    settext({ id: 1, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    const call = async () => {
      const res = await setDoc(doc(db, "notes", uid), {
        Todolist: list,
        Notes: note,
      });
    };

    // const call = async () => {
    //   const docRef = doc(db, `cities/${uid}`);
    //   const docSnap = await getDoc(docRef);

    //   if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    //   } else {
    //     // docSnap.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // };
    // call();

    const unsub = onSnapshot(doc(db, `notes`, uid), (snapshot) => {
      if (snapshot.data()) {
        setnote(snapshot.data().Notes);
        setdata(snapshot.data());
        setlist(snapshot.data().List);
        console.log(snapshot.data());
      } else {
        call();
      }

      // if (snapshot.docs.length !== 0) {
      //   const array = snapshot.docs.filter(
      //     (cr) => cr.id === "Xnn39q3PCH8Iz7qrjDDv"
      //   );
      //   console.log(snapshot.data());
      //   setdata(array);
      // } else {
      //   console.log("no such document");
      // }
    });
    return () => {
      unsub();
    };
  }, []);
  const set = async () => {
    console.log(data);
    console.log(note);
    console.log(text);
    setarray({ ...data, Notes: [...note, text] });
    // const docRef = await addDoc(collection(db, "cities"), {
    //   name: { text },
    //   country: "Japan",
    // });

    // console.log(data);
    // const cityRef = doc(db, "cities", "Xnn39q3PCH8Iz7qrjDDv", "array");

    // Remove the 'capital' field from the document
    // await updateDoc(cityRef, {
    //   hehe: deleteField(),
    // });
  };
  useEffect(() => {
    const call = async () => {
      const res = await setDoc(doc(db, "notes", uid), { ...array });
    };
    array && call();
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
      <input type="text" id="text" onChange={handle} />
      <button onClick={set}>Get user</button>
    </div>
  );
}
