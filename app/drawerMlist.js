import React from "react";
import { useState } from "react";
import { CheckIcon, CloseIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import BotDrawer from "./drawer";
import Todomodal from "./todomodal";
import styles from "./styles.module.css";
function DrawerMlist(prop) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [color, setcolor] = useState("#f1f5f9");
  const [list, setlist] = useState([]);
  const [count, setcount] = useState([0]);
  const [id, setid] = useState([1]);
  const changecolor = (value) => {
    setcolor(value);
  };
  const clickhandle = () => {
    var number = count[count.length - 1];
    number += 1;
    setcount((prev) => [...prev, number]);
    const generate = uuidv4();
    setid((prev) => [...prev, generate]);
  };
  const test = () => {
    const arr = Object.values(list);
    prop.submit(arr, color);
    console.log(count.length);
    console.log(arr);
    console.log(color);
  };
  const handlechange = (e) => {
    console.log(e.target.id);
    setlist((prev) => ({
      ...prev,
      [e.target.id]: {
        text: e.target.value,
        id: e.target.id,
        checked: false,
      },
    }));
  };
  const remove = (value, i) => {
    // const filterId=id.filter((c)=>c!==id)
    // const filterlist=list.filter((c)=>)
    // setid(filterId)
    delete list[value];
    // const arr = count;
    // arr.pop();
    // setcount(arr);
    const arr = [...count];
    arr.splice(i, 1);
    setcount(arr);
  };

  return (
    <>
      <div
        className={
          prop.state
            ? "color bg-slate-400 rounded-md absolute w-full  bottom-0 right-0 transition ease-in-out duration-700"
            : styles.hide
        }
        style={{ backgroundColor: color, height: "90%" }}
      >
        <div className="flex">
          <button className="m-2" onClick={prop.onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="flex justify-center flex-col">
          {count.map((c, i) => (
            <div key={i} className="inputcont flex justify-center m-2">
              <input
                className="p-2 rounded-sm w-72 sm:w-2/3 h-12"
                onChange={handlechange}
                id={id[c]}
                type="text"
                placeholder="Your task"
              />
              <button onClick={() => remove(id[c], i)}>
                <DeleteIcon w={"2rem"} h={"1.2rem"} />
              </button>
            </div>
          ))}

          <button onClick={clickhandle}>
            <AddIcon />
          </button>
          <div className="flex justify-center">
            <button
              className="p-2  border-black border bg-cyan-300 rounded-md w-12 absolute bottom-16"
              onClick={() => test()}
            >
              <CheckIcon />
            </button>
            <BotDrawer color={changecolor} />
          </div>
        </div>
      </div>
    </>
  );
}
export default DrawerMlist;
