import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import Loading from "../ui/Loading";
import { doc, getDoc } from "firebase/firestore";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((resp) => {
        const result = resp.user;
        dispatch(
          authActions.login({
            firstName: result.displayName,
            lastName: "",
            email: result.email,
            avatar: result.photoURL,
          })
        );

        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  };
  const loginHandler = async () => {
    try {
      const signiIn = await signInWithEmailAndPassword(auth, email, password);
      const cred = await signiIn.user;
      const docRef = await doc(db, "users", cred.uid);
      const docSnap = await getDoc(docRef);

      dispatch(authActions.login(docSnap.data()));
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      setPassword("");
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (email && password) {
      setLoading(true);
      loginHandler();
    }
  };
  return (
    <>
      <form
        onSubmit={formSubmitHandler}
        className="bg-gray-100 shadow-xl px-5 py-7 rounded-lg w-96"
      >
        <h3 className="text-4xl ">Sign in</h3>
        <p className="text-sm mt-2 mb-8 text-gray-400">
          Stay updated on your professional world
        </p>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="block w-full p-4 rounded-sm outline-none border-[1px] border-slate-500 bg-transparent mb-6"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="block w-full p-4  rounded-sm outline-none border-[1px] border-slate-500 bg-transparent "
          placeholder="password"
        />

        <span className="block mt-3 text-sm text-sky-500 font-medium hover:underline hover:underline-offset-8 cursor-pointer">
          Forgot password ?
        </span>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-900 mt-8 w-full rounded-full py-3 transition duration-300 disabled:bg-gray-400 disabled:text-black disabled:cursor-not-allowed"
        >
          {loading && <Loading />}
          Sign in
        </button>

        <div className="flex items-center justify-center px-2 my-3">
          <div className="border-b border-slate-600 w-full"></div>
          <span className="px-4">or</span>
          <div className="border-b border-slate-600 w-full"></div>
        </div>

        <button
          onClick={signInWithGoogle}
          type="button"
          className="bg-white bg-opacity-80 hover:bg-gray-300 shadow-lg  text-black text-lg w-full rounded-full py-3 transition duration-300 flex items-center gap-5 justify-center"
        >
          <FcGoogle size={24} /> Sign in with Google
        </button>
      </form>
      {error && (
        <p className="text-sm mt-5 text-red-500">email or password is wrong</p>
      )}
      <div className="my-10 flex item-center gap-2 text-lg ">
        <p>New to LinkedIn? </p>
        <Link
          to="/signup"
          className="text-sky-500 hover:underline hover:underline-offset-8 font-medium "
        >
          Join now
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
