import React from "react";
import { navLinks } from "../../data";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
const Icons = ({ showMenu, setShowMenu }) => {
  const activeNav = ({ isActive }) => (isActive ? "active" : null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

      <button
        onClick={() => dispatch(authActions.logout())}
        className="lg:hidden bg-red-600 text-white py-2"
      >
        Logout
      </button>
    </ul>
  );
};

export default Icons;
