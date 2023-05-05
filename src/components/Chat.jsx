import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className=" h-full w-[65%] overflow-hidden">
      <div className="flex items-center justify-between h-[60px] w-full bg-gray-600 p-2">
        <span className="text-white font-semibold">
          {data?.user.displayName}
        </span>
        <div className="flex text-gray-400 cursor-pointer gap-2 pr-2">
          <img src={Cam} alt="" className="h-6" />
          <img src={Add} alt="" className="h-6" />
          <img src={More} alt="" className="h-6" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
