import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const Home = () => {
  return (
    <div className="bg-indigo-300 w-screen h-screen flex items-center justify-center">
      <div className="flex border rounded-md w-[80%] md:w-[70%] h-[90%]  md:h-[80%] overflow-hidden">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
