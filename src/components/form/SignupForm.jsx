import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import Loading from "../ui/Loading";

const SignupForm = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const colors = ["bg-red-500", "bg-indigo-500", "bg-zinc-800", "bg-green-500"];

  let random = Math.floor(Math.random() * colors.length);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (data.firstName && data.lastName && data.email && data.password) {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          return setDoc(doc(db, "users", user.uid), {
            ...data,
            timestamp: serverTimestamp(),
            image: null,
            avatar: colors[random],
          });
        })
        .then(() => {
          navigate("/login");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);

          // ..
        });
    }
  };
  return (
    <>
      <form
        onSubmit={formSubmitHandler}
        className="bg-gray-100 shadow-xl px-5 py-7 text-center rounded-lg max-w-[700px] w-full"
      >
        <h3 className="text-4xl ">Sign up</h3>
        <p className="text-sm mt-2 mb-8 text-gray-400">
          Stay updated on your professional world
        </p>

        <div className="flex item-center gap-5 mb-6">
          <input
            name="firstName"
            onChange={handleChange}
            type="text"
            className="block w-full p-4 rounded-sm outline-none border-[1px] border-slate-500 bg-transparent"
            placeholder="First Name"
          />
          <input
            name="lastName"
            onChange={handleChange}
            type="text"
            className="block w-full p-4  rounded-sm outline-none border-[1px] border-slate-500 bg-transparent "
            placeholder="Last Name"
          />
        </div>
        <div className="flex item-center gap-5">
          <input
            name="email"
            onChange={handleChange}
            type="email"
            className="block w-full p-4 rounded-sm outline-none border-[1px] border-slate-500 bg-transparent"
            placeholder="Email"
          />
          <input
            name="password"
            onChange={handleChange}
            type="password"
            className="block w-full p-4  rounded-sm outline-none border-[1px] border-slate-500 bg-transparent "
            placeholder="password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 mt-8 w-full rounded-full py-3 transition duration-300 disabled:bg-gray-400 disabled:text-black disabled:cursor-not-allowed"
        >
          {loading && <Loading />}
          Sign up
        </button>
      </form>

      <div className="my-10 flex item-center gap-2 text-lg ">
        <p>Already on LinkedIn? </p>
        <Link
          to="/login"
          className="text-sky-600 font-medium hover:underline hover:underline-offset-8 "
        >
          Sign in
        </Link>
      </div>
    </>
  );
};

export default SignupForm;
