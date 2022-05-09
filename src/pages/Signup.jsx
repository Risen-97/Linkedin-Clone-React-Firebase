import React from "react";
import FormFooter from "../components/form/FormFooter";
import SignupForm from "../components/form/SignupForm";
import Linkdin from "../components/icons/Linkdin";

const Signup = () => {
  return (
    <section className="flex flex-col items-center justify-center pt-32 h-screen  px-4 lg:px-0">
      <div className=" absolute left-10 top-10">
        <div className="flex items-center">
          <span className="text-3xl font-medium"> Linked </span>
          <Linkdin />
        </div>
      </div>
      <h1 className="text-3xl mb-10">
        Make the most of your professional life
      </h1>
      <SignupForm />
      <FormFooter />
    </section>
  );
};

export default Signup;
