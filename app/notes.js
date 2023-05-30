import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";

const Notes = (prop) => {
  return (
    <div
      style={{ backgroundColor: prop.notes.color, minHeight: "12rem" }}
      className="rounded-md relative w-72 h-max m-1 p-4  "
    >
      <button
        className="absolute top-0 right-0 px-2"
        onClick={() => prop.delete(prop.notes.id)}
      >
        <CloseIcon w={".8rem"} height={".8rem"} color={"#a6115e"} />
      </button>
      <p className=" text-sm md:text-base">{prop.notes.text}</p>
    </div>
  );
};

export default Notes;
