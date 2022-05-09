import React from "react";
import { BsLinkedin } from "react-icons/bs";
const FormFooter = () => {
  return (
    <footer className="hidden lg:flex self-start items-center justify-center w-full  mt-20">
      <ul className="flex items-center gap-5">
        <li className="footer__link">
          <div className="flex items-center gap-1">
            Linked
            <BsLinkedin />
            <span className="text-xs">©2022</span>
          </div>
        </li>
        <li className="footer__link">User Agreement</li>
        <li className="footer__link">Privacy Policy</li>
        <li className="footer__link">Community Guidelines</li>
        <li className="footer__link">Cookie Policy</li>
        <li className="footer__link">Copyright Policy</li>
        <li className="footer__link">Send Feedback</li>
        <li className="footer__link">Language</li>
      </ul>
    </footer>
  );
};

export default FormFooter;
