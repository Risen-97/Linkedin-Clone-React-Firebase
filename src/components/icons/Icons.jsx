import React from "react";
import { navLinks } from "../../data";
import { NavLink } from "react-router-dom";
const Icons = ({ showMenu, setShowMenu }) => {
  const activeNav = ({ isActive }) => (isActive ? "active" : null);

  return (
    <ul
      className={`flex flex-col top-full gap-4 py-4 bg-white w-full lg:w-fit lg:items-center absolute lg:py-0 lg:flex-row lg:h-full lg:static ${
        showMenu ? "flex" : "hidden lg:flex"
      }`}
    >
      {navLinks.map((item) => {
        return (
          <NavLink
            to={item.path}
            key={item.name}
            className={`lg:h-full flex items-center text-gray-600 ${activeNav} px-5 cursor-pointer`}
            onClick={() => setShowMenu(false)}
          >
            <div href="" className="flex flex-col items-center ">
              <div className="hidden lg:block relative">
                {item.icon}
                {item?.badge && item.badge()}
              </div>
              <span className="text-sm">{item.name}</span>
            </div>
          </NavLink>
        );
      })}
    </ul>
  );
};

export default Icons;
