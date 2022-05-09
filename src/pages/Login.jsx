import React from "react";
import FormFooter from "../components/form/FormFooter";
import LoginForm from "../components/form/LoginForm";
import Linkdin from "../components/Icons/Linkdin";
const Login = () => {
  return (
    <section className="flex flex-col items-center justify-center pt-32 h-screen  ">
      <div className=" absolute left-10 top-10">
        <div className="flex items-center">
          <span className="text-3xl font-medium"> Linked </span>
          <Linkdin />
        </div>
      </div>
      <LoginForm />
      <FormFooter />
    </section>
  );
};

export default Login;
