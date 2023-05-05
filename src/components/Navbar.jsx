import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-between bg-gray-800 h-[60px] text-gray-200 p-4">
      <span className="font-bold hidden md:block">React Chat</span>
      <div className="flex gap-2">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.photoURL}
            alt=""
            className="bg-gray-200 rounded-full h-6 w-6 object-cover"
          />
          <span className="hidden lg:block">{currentUser.displayName}</span>
        </div>
        <button
          className="bg-gray-500 text-gray-200 text-sm border-none cursor-pointer rounded py-1 px-2"
          onClick={() => signOut(auth)}
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Navbar;
