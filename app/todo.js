import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";

const Todo = (prop) => {
  const handle = (e) => {
    prop.check(prop.lists.id, e.target.id);
  };

  return (
    <div
      style={{ backgroundColor: prop.lists.color }}
      className=" w-64 p-4 m-1 rounded-md h-40 relative"
    >
      <button
        className="absolute top-0 right-0 px-2"
        onClick={() => prop.delete(prop.lists.id)}
      >
        <CloseIcon w={".8rem"} height={".8rem"} color={"#a6115e"} />
      </button>
      {prop.lists.list.map((c, i) => (
        <div key={i} className="flex items-center">
          <input
            className="w-4 h-4"
            id={c.id}
            checked={c.checked}
            type="checkbox"
            onChange={handle}
          />
          <p
            style={{ textDecoration: c.checked ? "line-through" : "none" }}
            className=" mx-2 text-sm md:text-base"
          >
            {c.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Todo;
