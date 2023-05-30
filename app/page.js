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
import { AiOutlineLogout } from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";
import { HiClipboardList } from "react-icons/hi";
import DrawerNote from "./drawerNote";
import { getAuth, signOut } from "firebase/auth";
import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import dynamic from "next/dynamic";
// Add a new document with a generated id.

export default function Home() {
  const router = useRouter();
  const auth = getAuth();
  const { uid, dispatch } = useContext(Authcontext);
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

  const signout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
      })
      .catch((error) => {
        // An error happened.
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
  const checked = (id, fieldId) => {
    const filterlist = list.filter((c) => c.id === id);
    const unchanged = list.filter((c) => c.id !== id);
    const update = filterlist[0].list;
    const arr = update.filter((c) => c.id === fieldId);
    const unchangedlist = update.filter((c) => c.id !== fieldId);
    const state = arr[0].checked;
    const changed = { ...arr[0], checked: !state };
    const pushlist = [...unchangedlist, changed];
    const finalpush = [{ ...filterlist[0], list: pushlist }];
    const combine = [...unchanged, finalpush[0]];
    setarray({ ...data, Todolist: combine });
    // const final=[...]
  };
  useEffect(() => {
    console.log(router.isFallback);
    const call = async () => {
      const res = await setDoc(doc(db, "notes", uid), {
        Todolist: list,
        Notes: note,
      });
    };
    const def = () => {
      const unsub = onSnapshot(doc(db, `notes`, uid), (snapshot) => {
        if (snapshot.data()) {
          setnote(snapshot.data().Notes);
          setdata(snapshot.data());
          setlist(snapshot.data().Todolist);
        } else {
          call();
        }
      });
      return () => {
        unsub();
      };
    };
    uid !== null && def();
  }, [uid]);
  const set = async () => {
    setarray({ ...data, Notes: [...note, text] });
  };
  useEffect(() => {
    const call = async () => {
      const res = await setDoc(doc(db, "notes", uid), { ...array });
    };
    array && call();
  }, [array, uid]);
  useEffect(() => {
    uid === null && router.push("login");
  }, [uid, router]);

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
    if (dMlOpen) {
      console.log("cant");
    } else if (dNoteOpen) {
      console.log("cant");
    } else {
      setmenu(!menu);
    }
  };
  const DrawerLM = () => {
    !dNoteOpen && expand();
    setdNoteOpen(!dNoteOpen);
  };

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="md:h-max h-max w-screen flex bg-slate-900 "
    >
      <div className="sidepanel md:flex md:flex-col md:justify-between sticky top-0 left-0 h-screen w-40 bg-slate-700  hidden ">
        <div className="">
          <div
            className="my-8 flex justify-between  items-cente bg-slate-300 w-full p-4 cursor-pointer"
            onClick={openNote}
          >
            <h2 className=" font-semibold text-xl">Note</h2>
            <GiNotebook
              color="#1b65c4"
              display={"inline-block"}
              size={"2rem"}
            />
          </div>
          <div
            className="my-8 flex justify-between items-center bg-slate-300 w-full p-4 cursor-pointer"
            onClick={closeList}
          >
            <h2 className=" font-semibold text-xl">List</h2>
            <HiClipboardList
              color="#1b65c4"
              display={"inline-block"}
              size={"2rem"}
            />
          </div>
        </div>

        <button
          className=" bg-red-500 rounded-md my-4 w-max mx-auto p-2"
          onClick={() => signout()}
        >
          logout
        </button>
      </div>

      {/* <input type="text" id="text" onChange={handle} /> */}
      <div className="flex flex-col">
        {note[0] ? (
          <div className="m-4">
            <h2 className=" text-slate-50 text-2xl md:text-3xl font-semibold my-4">
              My Notes
            </h2>
            <div className="flex flex-wrap  ">
              {note.map((c) => (
                <Notes key={c.id} notes={c} delete={deleteNote} />
              ))}
            </div>
          </div>
        ) : (
          <div className="m-4">
            <h2 className=" text-slate-50 text-2xl md:text-3xl font-semibold my-4">
              My Notes
            </h2>
            <div className=" bg-green-400 w-60 h-48 rounded-md flex justify-center items-center m-4">
              <p className=" font-semibold text-base">Start adding notes</p>
            </div>
          </div>
        )}

        {list[0] ? (
          <div className="m-4">
            <h2 className=" text-slate-50 text-2xl md:text-3xl font-semibold my-4">
              Tasks
            </h2>
            <div className="flex flex-wrap">
              {list.map((c, i) => (
                <Todo key={i} check={checked} lists={c} delete={deleteList} />
              ))}
            </div>
          </div>
        ) : (
          <div className="m-4">
            <h2 className=" text-slate-50 text-2xl md:text-3xl font-semibold my-4">
              Tasks
            </h2>
            <div className=" bg-red-400 w-60 h-48 rounded-md flex justify-center items-center m-4">
              <p className=" font-semibold text-base">Create your todo list</p>
            </div>
          </div>
        )}
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
      <div
        onClick={signout}
        className=" bg-red-500 p-2 m-4 rounded-md w-12 h-12 flex  justify-center items-center fixed top-0 right-0 md:hidden cursor-pointer"
      >
        <button>
          <AiOutlineLogout size={"1.5rem"} />
        </button>
      </div>
      <div className="">
        <motion.div layout className="  fixed bottom-0 right-0 md:hidden m-4 ">
          {!menu && (
            <motion.div
              onClick={expand}
              style={{ backgroundColor: "#00fff7" }}
              className="border-2 border-white flex justify-center items-center rounded-full cursor-pointer w-16 h-16"
            >
              <button>
                <AddIcon w={"1rem"} h={"1rem"} />
              </button>
            </motion.div>
          )}
          {menu && (
            <motion.div
              layout
              className=" w-44 h-50 rounded-md "
              style={{ backgroundColor: "#134b57" }}
            >
              <motion.button onClick={expand} className="m-2">
                <CloseIcon w={"1rem"} h={"1rem"} color={"white"} />
              </motion.button>
              <motion.div className="flex flex-col justify-center ">
                <motion.div
                  onClick={DrawerLM}
                  className="flex m-2 items-center justify-between cursor-pointer"
                >
                  <motion.p className=" inline-block font-semibold text-lg text-gray-100">
                    Add Notes
                  </motion.p>
                  <GiNotebook
                    color="#e6eef0"
                    display={"inline-block"}
                    size={"2rem"}
                  />
                </motion.div>
                <motion.div
                  onClick={DrawerMoC}
                  className="flex m-2 items-center justify-between cursor-pointer"
                >
                  <motion.p className=" inline-block font-semibold text-lg text-gray-100">
                    Add Todolist
                  </motion.p>
                  <HiClipboardList
                    color="#e6eef0"
                    display={"inline-block"}
                    size={"2rem"}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
      {/* <BotDrawer onClose={openColor} isOpen={isOpen} /> */}
    </div>
  );
}
