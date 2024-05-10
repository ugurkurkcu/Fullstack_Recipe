import React from "react";
import { NavLink } from "react-router-dom";

const SidebarLinks = ({ icon, text, active, to }) => {
  return (
    <>
      <NavLink
      
        to={to}
        className={`flex items-center text-nowrap gap-3 max-md:text-3xl transition hover:text-black font-bold ${
          !active ? "text-gray-400" : "text-black font-extrabold"
        }`}
      >
        {icon}
        <span className=" max-md:hidden">{text}</span>
      </NavLink>
    </>
  );
};

export default SidebarLinks;
