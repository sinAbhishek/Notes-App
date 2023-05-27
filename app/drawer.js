import React from "react";

const BotDrawer = (prop) => {
  return (
    <div className="color bg-slate-900 rounded-md relative md:absolute bottom-0 right-0 translate-y-full">
      <div className="flex justify-center">
        <div
          onClick={() => prop.color("#374151")}
          className=" bg-gray-700 rounded-full w-8 h-8 m-2 border-green-200 border-2"
        ></div>
        <div
          onClick={() => prop.color("#fdba74")}
          className=" bg-orange-300 rounded-full w-8 h-8 m-2 border-green-200 border-2"
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
    </div>
  );
};

export default BotDrawer;
