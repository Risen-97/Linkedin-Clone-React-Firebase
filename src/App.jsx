import { format } from "date-fns";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Modal from "./components/modal/Modal";
import Pages from "./pages/Pages";

function App() {
  const { isModalOpen } = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    const dateFormated = format(date, "d /M/yyyy");

    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div className="min-h-screen  bg-gray-200 text-black">
      {isModalOpen && <Modal />}
      {user && <Navbar />}
      <div className="max-w-6xl mx-auto">
        <Pages />
      </div>
    </div>
  );
}

export default App;
