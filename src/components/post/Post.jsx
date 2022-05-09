import { useState, forwardRef } from "react";
import { BsThreeDots, BsShare } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
import { modalActions } from "../../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceStrict } from "date-fns";

const Post = forwardRef((props, ref) => {
  const [moreText, setMoreText] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { postInfo, removePost } = props;

  let date;
  let result;
  if (postInfo.timestamp) {
    date = formatDistanceStrict(postInfo.timestamp.toDate(), new Date());
    result = date.split(" ")[0] + date.split(" ")[1][0];
  }

  const checkAvatar = postInfo?.avatar.split("-")[0] === "bg";

  return (
    <div ref={ref} className="card">
      <div className="flex justify-between p-2 items-center">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 ${postInfo?.avatar} overflow-hidden rounded-full flex items-center justify-center text-white`}
          >
            {checkAvatar ? (
              postInfo.user[0].toUpperCase()
            ) : (
              <img src={postInfo.avatar} className="object-cover" />
            )}
          </div>

          <div className="flex flex-col ">
            <span className="text-sm sm:text-md">{postInfo?.user}</span>
            <span className="text-xs sm:text-sm opacity-70">
              {postInfo?.email}
            </span>
            {postInfo.timestamp && (
              <span className="text-xs opacity-70">{result}</span>
            )}
          </div>
        </div>

        {user.email === postInfo.email ? (
          <button
            className="flex h-fit px-3 py-1 bg-red-600 hover:bg-red-700 transition duration-300 rounded-lg text-white"
            onClick={() => removePost()}
          >
            Delete
          </button>
        ) : (
          <button className="flex h-fit pr-2">
            <BsThreeDots size={20} />
          </button>
        )}
      </div>

      <div className="text-xs sm:text-md">
        {postInfo?.message.length > 300 && (
          <div className="">
            <p className="p-4">
              {moreText
                ? postInfo?.message.slice(0)
                : postInfo?.message.slice(0, 300)}
              {!moreText && (
                <button
                  className="outline-none border-none text-blue-500"
                  onClick={() => setMoreText(true)}
                >
                  ...see more
                </button>
              )}
            </p>
          </div>
        )}
        {postInfo?.message.length < 300 && (
          <p className=" p-4">{postInfo?.message}</p>
        )}

        {postInfo?.imageUrl !== null && (
          <div
            onClick={() =>
              dispatch(modalActions.openModal({ ...postInfo, result }))
            }
            className="cursor-pointer md:min-h-[300px]"
          >
            {postInfo?.imageUrl == "" && (
              <div className="bg-slate-800 animate-pulse w-full h-[300px] z-10"></div>
            )}
            <img
              className={`max-h-[300px] md:max-h-[600px] w-full object-cover`}
              src={postInfo?.imageUrl}
            />
          </div>
        )}

        <div className="p-4 flex items-center justify-around ">
          <div className="flex items-center gap-2">
            <AiOutlineLike />
            <span>Like</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRegCommentDots />
            <span>Comment</span>
          </div>
          <div className="flex items-center gap-2">
            <BsShare />
            <span>Share</span>
          </div>
          <div className="flex items-center gap-2">
            <FiSend />
            <span>Send</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Post;
