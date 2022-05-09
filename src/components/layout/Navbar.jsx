import React, { useState } from "react";
import { BiSearchAlt2, BiMenu } from "react-icons/bi";
import Linkdin from "../icons/Linkdin";
import useClickOutside from "../../hooks/useClickOutside";
import Icons from "../icons/Icons";
const Navbar = () => {
  const [searchWidth, setSearchWidth] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const searchRef = useClickOutside(() => setSearchWidth(false));
  return (
    <nav className="h-14 w-full bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-full relative">
        <div className="flex items-center gap-2 px-4 xl:px-0 ">
          <Linkdin />
          <div
            ref={searchRef}
            onClick={() => setSearchWidth(true)}
            className={`bg-slate-200  flex  px-3 rounded-md items-center transition-width duration-300 w-40 ${
              searchWidth ? "sm:w-80" : "sm:w-60"
            } `}
          >
            <BiSearchAlt2 color="#5F6163" size={20} />
            <input
              type="text"
              className="outline-none border-0 px-2 py-2 bg-transparent w-full"
              placeholder="Search"
            />
          </div>
        </div>
        <Icons showMenu={showMenu} setShowMenu={setShowMenu} />

        <button
          onClick={() => setShowMenu(!showMenu)}
          className="block px-4 lg:hidden"
        >
          <BiMenu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
