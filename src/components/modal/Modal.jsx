import { useSelector, useDispatch } from "react-redux";
import useClickOutside from "../../hooks/useClickOutside";
import { modalActions } from "../../store/modalSlice";
import { RiEarthFill } from "react-icons/ri";
import { IoMdHappy } from "react-icons/io";
import { ImImage } from "react-icons/im";
import { AiOutlineClose, AiOutlineLike } from "react-icons/ai";
import { BsShare } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
const Modal = () => {
  const { modalPost } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const modalRef = useClickOutside(() => dispatch(modalActions.closeModal()));

  const checkAvatar = modalPost?.avatar.split("-")[0] === "bg";

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black bg-opacity-70 fixed z-30 px-4 lg:px-0">
      <div
        ref={modalRef}
        className=" max-w-6xl w-full h-[750px] shadow-xl bg-white text-zinc-700  rounded-lg grid grid-cols-1 lg:grid-cols-3 overflow-hidden "
      >
        <div className="h-full flex items-center bg-slate-800 lg:col-span-2">
          <img
            className="object-cover h-full lg:h-[450px] w-full"
            src={modalPost.imageUrl}
          />
        </div>

        <div className=" relative overflow-auto">
          <div className="flex items-center   sticky top-0 bg-white p-4">
            <div className="flex gap-2 items-center flex-1">
              <div
                className={`w-14 h-14 rounded-full flex items-center text-white text-2xl justify-center overflow-hidden ${
                  checkAvatar ? modalPost.avatar : ""
                }`}
              >
                {checkAvatar ? (
                  modalPost.user[0].toUpperCase()
                ) : (
                  <img src={modalPost.avatar} className="object-cover" />
                )}
              </div>
              <div className="">
                <h4 className="text-sm font-bold">{modalPost.user}</h4>
                <p className="text-xs">{modalPost.email}</p>
                <span className="text-sm flex items-center gap-1">
                  {modalPost.result} •{" "}
                  <RiEarthFill
                    color="#44403c
"
                  />
                </span>
              </div>
            </div>
            <button
              onClick={() => dispatch(modalActions.closeModal())}
              className="text-2xl"
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className=" p-4 ">
            <div className="text-sm">
              <h5 className=" border-b border-zinc-300 pb-3 mb-3 leading-6">
                {modalPost.message}
              </h5>

              <div className="flex items-center justify-between text-sm mt-6 mb-10">
                <div className="flex items-center gap-2 cursor-pointer">
                  <AiOutlineLike size={20} />
                  <span>Like</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <FaRegCommentDots size={20} />
                  <span>Comment</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <BsShare size={20} />
                  <span>Share</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <FiSend size={20} />
                  <span>Send</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center text-white text-md justify-center ${modalPost.avatar}`}
                >
                  {modalPost.user[0].toUpperCase()}
                </div>

                <div className="flex-1 flex items-center rounded-3xl border border-slate-500  overflow-hidden">
                  <input
                    type="text"
                    className="flex-1 bg-transparent px-4 py-3 outline-none border-none"
                    placeholder="Add a comment"
                  />

                  <div className="flex item-center gap-3 pr-2">
                    <IoMdHappy size={22} />
                    <ImImage size={22} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
