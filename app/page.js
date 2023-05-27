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
import { db } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc, updateDoc, deleteField } from "firebase/firestore";
import { useDisclosure, Button, Input } from "@chakra-ui/react";
import Notemodal from "./notemodal";
import Todomodal from "./todomodal";
import Todo from "./todo";
import DrawerMlist from "./drawerMlist";
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
  const [dMlOpen, setdMlOpen] = useState(false);
  const [listOpen, setlistOpen] = useState(false);
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
  const sendTodo = (array, color) => {
    const newlist = {
      id: uuidv4(),
      list: array,
      color: color,
      time: new Date(Date.now()).toLocaleString(),
    };
    setarray({ ...data, Todolist: [...list, newlist] });
  };

  useEffect(() => {
    const call = async () => {
      const res = await setDoc(doc(db, "notes", uid), {
        Todolist: list,
        Notes: note,
      });
    };

    const unsub = onSnapshot(doc(db, `notes`, uid), (snapshot) => {
      if (snapshot.data()) {
        setnote(snapshot.data().Notes);
        setdata(snapshot.data());
        setlist(snapshot.data().Todolist);
        console.log(snapshot.data());
      } else {
        call();
      }
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
  const deleteNote = (id) => {
    const filter = note.filter((c) => c.id !== id);
    setarray({ ...data, Notes: [...filter] });
  };
  const deleteList = (id) => {
    const filter = list.filter((c) => c.id !== id);
    setarray({ ...data, Todolist: [...filter] });
  };
  const closeList = () => {
    setlistOpen(!listOpen);
  };
  const DrawerMoC = () => {
    setdMlOpen(!dMlOpen);
  };
  return (
    <div className="h-screen w-screen flex bg-slate-900">
      <div className="sidepanel h-full w-40 bg-slate-100  hidden md:block">
        <button className="m-8" onClick={openNote}>
          Add note
        </button>
        <button className="m-8" onClick={closeList}>
          Add to do list
        </button>
        <button className="m-8" onClick={openColor}>
          Change Color
        </button>
      </div>
      {/* <input type="text" id="text" onChange={handle} /> */}
      {note.map((c) => (
        <Notes key={c.id} notes={c} delete={deleteNote} />
      ))}
      {list.map((c) => (
        <Todo lists={c} delete={deleteList} />
      ))}
      <button onClick={DrawerMoC}>openM</button>
      <Todomodal
        isOpen={listOpen}
        onClose={closeList}
        color={colorchange}
        submit={sendTodo}
      />
      <Notemodal
        note={handle}
        isOpen={modal}
        onClose={closeNote}
        submit={set}
        color={colorchange}
      />

      <DrawerMlist state={dMlOpen} close={DrawerMoC} />
      {/* <BotDrawer onClose={openColor} isOpen={isOpen} /> */}
    </div>
  );
}
