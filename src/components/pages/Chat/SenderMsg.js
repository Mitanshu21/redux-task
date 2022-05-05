import React from "react";

function SenderMsg({ msg, time }) {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div className="pr-10">
        <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
          <p className="text-sm px-1">{msg}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">{time}</span>
      </div>
    </div>
  );
}

export default SenderMsg;
