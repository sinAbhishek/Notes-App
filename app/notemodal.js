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
  const [color, setcolor] = useState("white");
  const changecolor = (value) => {
    setcolor(value);
  };
  // const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={prop.isOpen} onClose={prop.onClose}>
        <ModalOverlay />
        <ModalContent h={"60vh"} backgroundColor={color}>
          <ModalHeader>
            <input className="p-2 rounded-md" type="text" placeholder="Title" />
          </ModalHeader>
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
              <button onClick={prop.submit}>
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
