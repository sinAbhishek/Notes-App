"use client";
import { Authcontext } from "./authcontext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { auth } from "./firebase";
import React, { useEffect, useState } from "react";
import { doc, setDoc, onSnapshot, getDoc } from "firebase/firestore";
import Notes from "./notes";
import BotDrawer from "./drawer";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { db } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc, updateDoc, deleteField } from "firebase/firestore";
import { useDisclosure, Button, Input } from "@chakra-ui/react";
import Notemodal from "./notemodal";
// Add a new document with a generated id.

export default function Home() {
  const router = useRouter();
  const { uid } = useContext(Authcontext);
  const [note, setnote] = useState([]);
  const [color, setcolor] = useState("#374151");
  const [data, setdata] = useState([]);
  const [list, setlist] = useState([]);
  const [text, settext] = useState("");
  const [array, setarray] = useState("");
  const [modal, setmodal] = useState(false);

  const [isOpen, setisOpen] = useState(false);
  const btnRef = React.useRef();
  const handle = (e) => {
    e.preventDefault();
    settext({
      id: uuidv4(),
      [e.target.id]: e.target.value,
      color: color,
      time: new Date(Date.now()).toLocaleString(),
    });
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
  const closeNote = () => {
    setmodal(!modal);
  };

  const openNote = () => {
    setmodal(!modal);
  };
  const openColor = () => {
    setisOpen(!isOpen);
  };
  const colorchange = (value) => {
    setcolor(value);
  };
  const drop = (id) => {
    const filter = note.filter((c) => c.id !== id);
    setarray({ ...data, Notes: [...filter] });
  };
  return (
    <div className="h-screen w-screen flex bg-slate-900">
      <div className="sidepanel h-full w-40 bg-slate-100">
        <button className="m-8">Add note</button>
        <button className="m-8" onClick={openNote}>
          Add to do list
        </button>
        <button className="m-8" onClick={openColor}>
          Change Color
        </button>
      </div>
      {/* <input type="text" id="text" onChange={handle} /> */}
      {note.map((c) => (
        <Notes key={c.id} notes={c} delete={drop} />
      ))}

      <Notemodal
        note={handle}
        isOpen={modal}
        onClose={closeNote}
        submit={set}
        color={colorchange}
      />
      {/* <BotDrawer onClose={openColor} isOpen={isOpen} /> */}
    </div>
  );
}
