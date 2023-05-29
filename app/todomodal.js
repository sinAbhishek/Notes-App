import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import BotDrawer from "./drawer";
import { CloseIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
const Todomodal = (prop) => {
  const [color, setcolor] = useState("#f1f5f9");
  const [list, setlist] = useState([]);
  const [count, setcount] = useState([0]);
  const [id, setid] = useState([1]);

  const changecolor = (value) => {
    setcolor(value);
    prop.color(value);
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
      <Modal isOpen={prop.isOpen} onClose={prop.onClose}>
        <ModalOverlay />
        <ModalContent h={"60vh"} backgroundColor={color}>
          <ModalHeader>NOTE</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
            <div className="flex justify-center">
              <button className="mx-auto" onClick={clickhandle}>
                <AddIcon />
              </button>
            </div>

            <div className="flex justify-center">
              <button
                className="p-2  border-black border bg-cyan-300 rounded-md w-12 absolute bottom-8"
                onClick={() => test()}
              >
                <CheckIcon />
              </button>
            </div>
          </ModalBody>

          <ModalFooter>
            <BotDrawer color={changecolor} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Todomodal;
