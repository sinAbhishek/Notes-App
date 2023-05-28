import React from "react";

const BotDrawer = (prop) => {
  return (
    <div
      style={{ width: "70%", margin: "0 auto", display: "inline-block" }}
      className="color bg-slate-900 rounded-md fixed bottom-0 md:right-0 md:absolute  md:translate-y-full"
    >
      <div className="flex justify-center">
        <div
          onClick={() => prop.color("#f1f5f9")}
          className=" bg-slate-100 rounded-full w-8 h-8 m-2 border-green-200 border-2"
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
