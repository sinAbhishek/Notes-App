import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import React from "react";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import BotDrawer from "./drawer";

function DrawerMlist(prop) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Drawer
        isOpen={prop.state}
        placement="bottom"
        onClose={prop.close}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />

        <DrawerContent h={"90vh"} backgroundColor={"grey"} className="">
          <DrawerCloseButton />
          <textarea
            className=" w-full p-4 h-2/3 rounded-md"
            name=""
            id="text"
            cols="30"
            rows="10"
            placeholder="Your note"
            // onChange={prop.note}
          ></textarea>
          <div className="flex justify-center">
            <button
              className="p-2  border-black border bg-cyan-300 rounded-md w-12 absolute bottom-8"
              //   onClick={prop.submit}
            >
              {/* <CheckIcon /> */}
            </button>
            <BotDrawer />
          </div>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default DrawerMlist;
