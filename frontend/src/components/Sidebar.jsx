import {
  IoIosCompass,
  IoIosHeart,
  IoIosHelpCircle,
  IoIosHome,
} from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import SidebarLinks from "./SidebarLinks";

const Sidebar = () => {
  return (
    <div className=" flex flex-col h-screen fixed justify-between items-center p-3 max-md:p-1 max-sm:w-24 shadow-xl shadow-gray-900 lg:p-5 w-36">
      <img
        className="rounded-full shadow-lg drop-shadow-md shadow-red-800 max-w-28 m-2 max-md:max-w-20"
        src="/logo.jpg"
        alt=""
      />

      <div className="flex flex-col gap-16">
        <SidebarLinks
          icon={<IoIosHome />}
          text={"Main Page"}
          to={"/"}
          // active={"text-black font-extrabold"}
        />
        <SidebarLinks
          icon={<IoAddCircleSharp />}
          text={"Add Recipe"}
          to={"/add"}
        />
        <SidebarLinks icon={<IoIosCompass />} text={"Discover"} />
        <SidebarLinks icon={<IoIosHeart />} text={"Favourites"} />
        <SidebarLinks icon={<IoIosHelpCircle />} text={"Help"} />
      </div>

      <div className=" flex flex-col items-center justify-center max-md:hidden">
        <p className=" text-md mb-2 font-extrabold text-nowrap">
          Get Daily News
        </p>
        <button className=" bg-red-600 rounded-full px-4 py-1 text-white hover:bg-red-400 shadow-md shadow-gray-400">
          Subscribe
        </button>
      </div>

      <button className="md:hidden mb-2 text-xl bg-red-600 rounded-full p-2 text-white hover:bg-red-400 shadow-md shadow-gray-400">
        <FaBell />
      </button>
    </div>
  );
};

export default Sidebar;
