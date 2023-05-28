import React from "react";

const Todo = (prop) => {
  const handle = (e) => {
    console.log(e.target.id);
  };
  console.log(prop.lists.list);
  return (
    <div
      style={{ backgroundColor: prop.lists.color }}
      className=" w-64 p-4 h-40"
    >
      {prop.lists.list.map((c) => (
        <div className="flex items-center">
          <input
            className="w-4 h-4"
            id="cyz"
            checked="true"
            type="checkbox"
            onChange={handle}
          />
          <p className=" mx-2">{c.text}</p>
        </div>
      ))}
      <button onClick={() => prop.delete(prop.lists.id)}>delete</button>
    </div>
  );
};

export default Todo;
