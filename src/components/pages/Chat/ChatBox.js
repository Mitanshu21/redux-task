import React from "react";

function ChatBox({ ChatListData, msg, handleChange, handleSubmit }) {
  return (
    <div className="flex flex-col flex-grow w-full max-w-full-xl min-h-[89vh] bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="flex flex-col-reverse flex-grow h-0 p-1 overflow-auto">
        {/* chat */}
        {ChatListData}

        {/* chat ends */}
      </div>

      <form className="bg-gray-300 p-4 flex ">
        <input
          className="flex items-center h-10 w-full rounded px-3 text-sm"
          type="text"
          value={msg}
          onChange={handleChange}
          placeholder="Type your message…"
        />
        <button
          className="bg-green-600 p-2 ml-2 text-white rounded-md"
          type="submit"
          onClick={handleSubmit}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
