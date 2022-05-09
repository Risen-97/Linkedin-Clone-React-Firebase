import React from "react";
import {
  BsFillPersonPlusFill,
  BsSlashSquareFill,
  BsFillBookmarkFill,
} from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkAvatar = user?.avatar.split("-")[0] === "bg";
  return (
    <div className="hidden lg:block flex-[2]">
      <div className="card">
        <div className="relative  w-full">
          <img src="/images/banner.svg" className="object-cover" />
          <div
            className={`w-20 h-20 overflow-hidden rounded-full text-white border-2 border-white z-[1] absolute -bottom-8 left-2/4 -translate-x-2/4 flex items-center justify-center text-3xl ${
              checkAvatar && user.avatar
            }`}
          >
            {checkAvatar ? (
              user?.firstName[0].toUpperCase()
            ) : (
              <img src={user.avatar} className="object-cover" />
            )}
          </div>
        </div>
        <div className="text-center pt-14 pb-5">
          <h4 className="text-lg">Welcome, {user.firstName}!</h4>
          <span className="text-sm">Add a photo</span>
        </div>
        <hr />

        <div className="flex justify-between  p-4 px-2">
          <div className="">
            <span className="text-xs">Connections</span>
            <p className="text-sm font-medium">Grow your network</p>
          </div>

          <BsFillPersonPlusFill />
        </div>

        <hr />
        <div className="p-4 px-2">
          <span className="text-xs">Access exclusive tools & insights</span>
          <div className="flex items-center gap-2">
            <BsSlashSquareFill />
            <p className="text-sm font-medium">Try Premium for free</p>
          </div>
        </div>
        <hr />
        <div className="flex items-center gap-2 p-4 px-2">
          <BsFillBookmarkFill />
          <p className="text-sm font-medium">My items</p>
        </div>
      </div>
      <div className="card sticky top-20">
        <div className="flex item-center justify-between p-4 px-2">
          <div className="flex flex-col gap-2">
            <span className="sidebarLinks">Groups</span>
            <span className="sidebarLinks">Events</span>
            <span className="sidebarLinks">Followed Hashtags</span>
          </div>

          <button className="text-xl">
            <AiOutlinePlus />
          </button>
        </div>
        <hr />
        <div className=" text-center bg-red-600 text-white font-bold">
          {/* <p className="text-md text-center opacity-70">Discover Me</p> */}
          <button
            onClick={() => {
              dispatch(authActions.logout());
              navigate("/login");
            }}
            className="py-4 text-md text-center w-full h-full"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
