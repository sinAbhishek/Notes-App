import React, { useState } from "react";
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
const Notemodal = (prop) => {
  const [color, setcolor] = useState("#374151");
  const changecolor = (value) => {
    setcolor(value);
    prop.color(value);
  };

  return (
    <>
      <Modal isOpen={prop.isOpen} onClose={prop.onClose}>
        <ModalOverlay />
        <ModalContent
          h={"60vh"}
          backgroundColor={color}
          style={{ transition: "ease-in-out .7s" }}
        >
          <ModalHeader>NOTE</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <textarea
              className=" w-full p-4 h-2/3 rounded-md"
              name=""
              id="text"
              cols="30"
              rows="10"
              placeholder="Your note"
              onChange={prop.note}
            ></textarea>
            <div className="flex justify-center">
              <button
                className="p-2  border-black border bg-cyan-300 rounded-md w-12 absolute bottom-8"
                onClick={prop.submit}
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

export default Notemodal;
