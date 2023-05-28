import React from "react";

const Notes = (prop) => {
  console.log(prop.notes);
  return (
    <div
      style={{ backgroundColor: prop.notes.color }}
      className="rounded-md w-60 h-max m-1 p-4 min-h-fit  "
    >
      <p>{prop.notes.text}</p>
      <button onClick={() => prop.delete(prop.notes.id)} className="bg-red">
        delete
      </button>
    </div>
  );
};

export default Notes;
