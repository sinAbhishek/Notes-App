import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  calc,
} from "@chakra-ui/react";
import { useDisclosure, Button, Input } from "@chakra-ui/react";
import styles from "./styles.module.css";
const BotDrawer = (prop) => {
  return (
    <div
      className={
        prop.isOpen
          ? "color bg-slate-950 absolute bottom-0 right-0 transition delay-100"
          : styles.hide
      }
    >
      {/* {" "}
      <Drawer onOverlayClick={null} isOpen={prop.isOpen} placement="bottom">
        <DrawerContent
          left={"10rem !important"}
          w={"calc(100% - 10rem)"}
          maxW={"100px"}
          h={"4rem"}
          backgroundColor={"black"}
        > */}
      <div className="flex justify-center">
        <div
          onClick={() => prop.color("#374151")}
          className=" bg-gray-700 rounded-full w-8 h-8 m-2 border-green-200 border-2"
        ></div>
        <div
          onClick={() => prop.color("#fb923c")}
          className=" bg-orange-400 rounded-full w-8 h-8 m-2 border-green-200 border-2"
        ></div>
        <div
          onClick={() => prop.color("#4ade80")}
          className=" bg-green-400 rounded-full w-8 h-8 m-2 border-green-200 border-2"
        ></div>
        <div
          onClick={() => prop.color("#60a5fa")}
          className=" bg-blue-400 rounded-full w-8 h-8 m-2 border-green-200 border-2"
        ></div>
        <div
          onClick={() => prop.color("#f9a8d4")}
          className=" bg-pink-300 rounded-full w-8 h-8 m-2 border-green-200 border-2"
        ></div>
      </div>
      {/* </DrawerContent>
      </Drawer> */}
    </div>
  );
};

export default BotDrawer;
