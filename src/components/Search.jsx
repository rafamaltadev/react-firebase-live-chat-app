import {
  collection,
  getDocs,
  query,
  setDoc,
  doc,
  where,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    // Create a reference to the cities collection
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // verificar se o group (chats no Firestore) existe. se não existir criar
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // cria um chat na chats collection do firebade
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // adiciona o usuário na lista de usuários
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {}

    setUser(null);
    setUserName("");
  };

  return (
    <div className="border-b border-gray-400">
      <div className=" border-none py-1 px-2  w-full">
        <input
          type="text"
          placeholder="Encontre um usuário"
          className="bg-transparent text-white text-sm w-full outline-none"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKey}
          value={userName || ""}
        />
      </div>

      {error && <span>Usuário não encontrado!</span>}
      {user && (
        <div
          className="p-2 flex items-center gap-2 cursor-pointer text-white font-medium hover:bg-gray-700"
          onClick={handleSelect}
        >
          <img
            src={user.photoURL}
            alt=""
            className="bg-gray-200 rounded-full h-6 w-6 md:h-12 md:w-12 object-cover"
          />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
