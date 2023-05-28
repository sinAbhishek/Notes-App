import React, { useState } from "react";

import { CheckIcon } from "@chakra-ui/icons";
import BotDrawer from "./drawer";
import styles from "./styles.module.css";
import { CloseIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";

const DrawerNote = (prop) => {
  const [color, setcolor] = useState("#374151");
  const changecolor = (value) => {
    setcolor(value);
    prop.color(value);
  };
  return (
    <div
      className={
        prop.isOpen
          ? "color bg-slate-400 rounded-md absolute  w-screen  bottom-0 right-0 transition ease-in-out duration-700"
          : styles.hide
      }
      style={{ backgroundColor: color, height: "90%" }}
    >
      <div
        onClick={prop.onClose}
        className=" bg-red-500 rounded-full w-8 h-8 p-2 flex justify-center items-center"
      >
        <button>
          <CloseIcon />
        </button>
      </div>

      <h2 className=" text-lg font-semibold p-2">NOTE</h2>
      <div className="flex justify-center h-5/6">
        <textarea
          className=" w-11/12 p-4 h-2/3 rounded-md "
          name=""
          id="text"
          cols="30"
          rows="10"
          placeholder="Your note"
          onChange={prop.note}
        ></textarea>
      </div>

      <div className="flex justify-center">
        <button
          className="p-2  border-black border bg-cyan-300 rounded-md w-12 absolute bottom-16"
          onClick={prop.submit}
        >
          <CheckIcon />
        </button>

        <BotDrawer color={changecolor} />
      </div>
    </div>
  );
};

export default DrawerNote;
