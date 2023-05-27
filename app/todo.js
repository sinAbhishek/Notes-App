import React from "react";

const Todo = (prop) => {
  console.log(prop.lists.list);
  return (
    <div
      style={{ backgroundColor: prop.lists.color }}
      className=" w-64 p-4 h-40"
    >
      {prop.lists.list.map((c) => (
        <p className="">{c.text}</p>
      ))}
      <button onClick={() => prop.delete(prop.lists.id)}>delete</button>
    </div>
  );
};

export default Todo;
