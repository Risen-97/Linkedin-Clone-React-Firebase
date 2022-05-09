import { useState, useRef, useEffect } from "react";
import { ImImage } from "react-icons/im";
import { MdArticle } from "react-icons/md";
import { BsPlayBtnFill, BsCalendar2Event } from "react-icons/bs";
import { useSelector } from "react-redux";
import { db, storage } from "../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const SendPost = () => {
  const messageRef = useRef();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const fileRef = useRef();

  const checkAvatar = user?.avatar.split("-")[0] === "bg";

  const imageUploadHandler = (e) => {
    fileRef.current.click();
  };

  const handleChange = (e) => {
    const currentFile = e.target.files[0];
    currentFile && currentFile.type.slice(0, 5) === "image"
      ? setFile(currentFile)
      : setFile(null);
  };

  const postSubmitHandler = (e) => {
    e.preventDefault();

    if (messageRef.current.value) {
      setLoading(true);

      addDoc(collection(db, "posts"), {
        imageUrl: file ? "" : null,
        message: messageRef.current.value,
        avatar: user.avatar || user.customImage,
        user: user.firstName + " " + user.lastName,
        email: user.email,
        timestamp: serverTimestamp(),
      }).then((resp) => {
        if (file) {
          const name = new Date().getTime() + file.name;
          const storageRef = ref(storage, `posts/$${name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            "state_changed",
            null,
            (error) => {
              console.log(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const postRef = doc(db, "posts", resp.id);
                setDoc(
                  postRef,
                  {
                    imageUrl: downloadURL,
                  },
                  { merge: true }
                );
              });
            }
          );
        }
      });
    }

    messageRef.current.value = "";
    setFile(null);
    setLoading(false);
  };
  useEffect(() => {}, [file]);
  return (
    <div className="card p-4">
      <div className="flex items-center  gap-3 mb-1">
        <div
          className={`w-11 h-11 md:w-14 md:h-14 overflow-hidden ${
            checkAvatar ? user.avatar : ""
          } rounded-full flex items-center justify-center text-3xl text-white`}
        >
          {checkAvatar ? (
            user?.firstName[0].toUpperCase()
          ) : (
            <img src={user.avatar} className="object-cover" />
          )}
        </div>
        <form
          onSubmit={postSubmitHandler}
          className="flex-1 flex items-center  rounded-3xl border border-slate-500 cursor-pointer overflow-hidden text-sm smtext-md"
        >
          <input
            ref={messageRef}
            type="text"
            className="flex-1 bg-transparent p-2 sm:p-4 outline-none border-none"
            placeholder="Start a post"
          />
          <button className="bg-sky-700 h-full p-2 sm:p-4 text-white">
            Send
          </button>
        </form>
      </div>

      <div className="flex item-center flex-wrap justify-between">
        <div className="relative">
          <button
            disabled={loading}
            onClick={imageUploadHandler}
            className="postBtn"
          >
            <ImImage size={20} color="#60a5fa" />
            <span>Photo</span>
          </button>
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
          />

          <p className="absolute -bottom-2 right-5 text-sm">
            {file && file.name}
          </p>
        </div>
        <button className="postBtn">
          <BsPlayBtnFill
            size={20}
            color="#34d399
"
          />
          <span>Video</span>
        </button>
        <button className="postBtn">
          <BsCalendar2Event
            size={20}
            color="#fde047
"
          />
          <span>Events</span>
        </button>
        <button className="postBtn">
          <MdArticle
            size={20}
            color="#f87171
"
          />
          <span>Articles</span>
        </button>
      </div>
    </div>
  );
};

export default SendPost;
