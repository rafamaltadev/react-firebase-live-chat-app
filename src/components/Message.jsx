import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={ref}>
      {message.senderId === currentUser.uid ? (
        <div className="flex flex-row-reverse items-start mb-5 gap-5">
          <div className="flex flex-col items-center justify-center text-gray-700">
            <img
              src={currentUser.photoURL}
              alt=""
              className="bg-gray-200 rounded-full h-10 w-10 object-cover"
            />
            <span className="font-light text-sm">time</span>
          </div>
          <div className="max-h-[70%] flex flex-col items-end gap-2">
            <p className="bg-sky-300 text-white py-2 px-4 rounded-lg rounded-tr-none max-w-max	">
              {message.text}
            </p>

            {message.img && (
              <img
                src={message.img}
                alt=""
                className="bg-gray-200 w-[40%] object-cover"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-start mb-5 gap-5">
          <div className="flex flex-col items-center justify-center text-gray-700">
            <img
              src={data.user.photoURL}
              alt=""
              className="bg-gray-200 rounded-full h-10 w-10 object-cover"
            />
            <span className="font-light text-sm">time</span>
          </div>
          <div className="max-h-[70%] flex flex-col gap-2">
            <p className="bg-white py-2 px-4 rounded-lg rounded-tl-none max-w-max	">
              {message.text}
            </p>

            {message.img && (
              <img
                src={message.img}
                alt=""
                className="bg-gray-200 w-[40%] object-cover"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
