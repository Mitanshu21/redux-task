import React from "react";

function ReceiverMsg({ msg, time }) {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs">
      <div className="pl-10">
        <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
          <p className="text-sm px-1">{msg}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">{time}</span>
      </div>
    </div>
  );
}

export default ReceiverMsg;
