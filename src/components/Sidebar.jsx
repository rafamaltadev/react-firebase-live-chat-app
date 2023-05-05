import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <div className="w-[35%] h-full flex flex-col gap-3 bg-gray-700">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
