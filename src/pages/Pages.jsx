import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import RequireAuth from "./RequireAuth";
import Signup from "./Signup";

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route
          path="*"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default Pages;
