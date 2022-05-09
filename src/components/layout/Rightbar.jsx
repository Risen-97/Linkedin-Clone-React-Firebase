import React from "react";
import { feedUsers } from "../../data";
import { BsThreeDots } from "react-icons/bs";
const Rightbar = () => {
  return (
    <div className="hidden lg:block flex-[2]">
      <div className="card p-4">
        <div className="flex items-center justify-between mb-5">
          <h4 className="text-md">Add to your feed</h4>
          <div className="w-4 h-4 bg-zinc-800 rounded-md" />
        </div>

        {feedUsers.map((user, idx) => {
          return (
            <div key={idx} className="flex  gap-3 mt-2">
              <div className="w-12 h-12 bg-slate-700 rounded-full  overflow-hidden">
                <img
                  src={user.photo}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="">
                <span className="font-medium text-sm capitalize">
                  {user.name}
                </span>
                <p className="text-xs text-gray-400 max-w-[170px]">
                  {user.title.length <= 50
                    ? user.title
                    : user.title.slice(0, 50) + "..."}
                </p>

                <button className="border border-gray-400 py-1 px-4 my-2 rounded-full hover:border-black hover:bg-gray-200 transition duration-300">
                  + Follow
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card sticky top-20 p-4">
        <div className="text-xs flex items-center justify-end gap-1">
          Ad <BsThreeDots size={18} />
        </div>

        <div className="flex flex-col items-center justify-center text-center gap-3 mt-5">
          <p className="text-xs text-gray-500">
            Find the experts you need to scale your business affordably on
            Upwork.
          </p>

          <img src="/images/upwork.jpg" alt="" />

          <span className="font-medium">Get help with a project</span>
          <button className="border border-blue-500 rounded-full py-1 px-4 text-blue-500 font-medium">
            Jump Back In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
