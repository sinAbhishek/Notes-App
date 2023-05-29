import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
const Todo = (prop) => {
  const handle = (e) => {
    console.log(e.target.id);
    prop.check(prop.lists.id, e.target.id);
    console.log(prop.lists.id);
  };
  console.log(prop.lists);
  return (
    <div
      style={{ backgroundColor: prop.lists.color }}
      className=" w-64 p-4 m-1 rounded-md h-40 relative"
    >
      <button
        className="absolute top-0 right-0"
        onClick={() => prop.delete(prop.lists.id)}
      >
        <IoMdCloseCircle size={"2rem"} />
      </button>
      {prop.lists.list.map((c) => (
        <div className="flex items-center">
          <input
            className="w-4 h-4"
            id={c.id}
            checked={c.checked}
            type="checkbox"
            onChange={handle}
          />
          <p className=" mx-2 text-sm md:text-base">{c.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Todo;
