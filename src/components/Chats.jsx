import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="flex-col items-center justify-between">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
            className="p-2 flex items-center gap-2 cursor-pointer text-white font-medium hover:bg-gray-700"
          >
            <img
              src={chat[1].userInfo.photoURL}
              alt=""
              className="bg-gray-200 rounded-full h-6 w-6 md:h-12 md:w-12 object-cover"
            />
            <div className="userChatInfo">
              <span className="text-xs md:text-base font-semibold">
                {chat[1].userInfo.displayName}
              </span>
              <p className="hidden sm:block text-xs font-light text-gray-300">
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
