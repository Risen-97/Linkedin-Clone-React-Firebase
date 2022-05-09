import React from "react";
import Feed from "../components/layout/Feed";
import Rightbar from "../components/layout/Rightbar";
import Sidebar from "../components/layout/Sidebar";

const Home = () => {
  return (
    <section className="flex px-4 py-8 lg:px-0 gap-8 ">
      <Sidebar />
      <Feed />
      <Rightbar />
    </section>
  );
};

export default Home;
