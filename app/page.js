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
import { motion } from "framer-motion";
import Todo from "./todo";
import DrawerMlist from "./drawerMlist";
import { AddIcon } from "@chakra-ui/icons";
import { IoMdCloseCircle } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";
import { HiClipboardList } from "react-icons/hi";
import DrawerNote from "./drawerNote";
// Add a new document with a generated id.

export default function Home() {
  const router = useRouter();
  const { uid } = useContext(Authcontext);
  const [note, setnote] = useState([]);
  const [menu, setmenu] = useState(false);
  const [color, setcolor] = useState("#f1f5f9");
  const [data, setdata] = useState([]);
  const [list, setlist] = useState([]);
  const [text, settext] = useState("");
  const [array, setarray] = useState("");
  const [modal, setmodal] = useState(false);
  const [dMlOpen, setdMlOpen] = useState(false);
  const [dNoteOpen, setdNoteOpen] = useState(false);
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
    !dMlOpen && expand();
    setdMlOpen(!dMlOpen);
  };
  const expand = () => {
    setmenu(!menu);
  };
  const DrawerLM = () => {
    !dNoteOpen && expand();
    setdNoteOpen(!dNoteOpen);
  };
  return (
    <div className="h-max w-screen flex bg-slate-900 ">
      <div className="sidepanel sticky top-0 left-0 h-screen w-40 bg-slate-100  hidden md:block">
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
      <div className="flex flex-col">
        <div className="m-4">
          <h2 className=" text-slate-50 md:text-3xl">My Notes</h2>
          <div className="flex flex-wrap  ">
            {note.map((c) => (
              <Notes key={c.id} notes={c} delete={deleteNote} />
            ))}
          </div>
        </div>

        <div className="m-4">
          <h2 className=" text-slate-50 md:text-3xl">Tasks</h2>
          <div className="flex flex-wrap">
            {list.map((c) => (
              <Todo lists={c} delete={deleteList} />
            ))}
          </div>
        </div>
      </div>

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

      <DrawerMlist
        state={dMlOpen}
        onClose={DrawerMoC}
        submit={sendTodo}
        color={colorchange}
      />
      <DrawerNote
        note={handle}
        isOpen={dNoteOpen}
        onClose={DrawerLM}
        submit={set}
        color={colorchange}
      />
      <motion.div
        layout
        className="  absolute bottom-0 right-0 md:hidden m-4 w-max h-max"
      >
        {!menu && (
          <motion.div
            style={{ backgroundColor: "#00fff7" }}
            className="border-2 border-white flex justify-center items-center rounded-full w-16 h-16"
          >
            <button disabled={dMlOpen || dNoteOpen} onClick={expand}>
              <AddIcon />
            </button>
          </motion.div>
        )}
        {menu && (
          <motion.div
            layout
            className=" w-44 h-50 rounded-md "
            style={{ backgroundColor: "#f75774" }}
          >
            <motion.button onClick={expand}>
              <IoMdCloseCircle size={"2rem"} />
            </motion.button>
            <motion.div className="flex flex-col justify-center ">
              <motion.div
                onClick={DrawerLM}
                className="flex m-2 items-center justify-between"
              >
                <motion.p className=" inline-block">ADD NOTES</motion.p>
                <GiNotebook display={"inline-block"} size={"2rem"} />
              </motion.div>
              <motion.div
                onClick={DrawerMoC}
                className="flex m-2 items-center justify-between"
              >
                <motion.p className=" inline-block">ADD TODOLIST</motion.p>
                <HiClipboardList
                  color="red"
                  display={"inline-block"}
                  size={"2rem"}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
      {/* <BotDrawer onClose={openColor} isOpen={isOpen} /> */}
    </div>
  );
}
