import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

const Notes = (prop) => {
  console.log(prop.notes);
  return (
    <div
      style={{ backgroundColor: prop.notes.color }}
      className="rounded-md relative w-60 h-max m-1 p-4 min-h-fit  "
    >
      <button
        className="absolute top-0 right-0"
        onClick={() => prop.delete(prop.notes.id)}
      >
        <IoMdCloseCircle size={"2rem"} />
      </button>
      <p>{prop.notes.text}</p>
    </div>
  );
};

export default Notes;
