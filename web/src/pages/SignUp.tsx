import SignUp from "../components/authentication/SignUp";
import NavBar from "../components/general/NavBar";
// import img from "./mountains-1412683.png";
import img from "../logos/mountain.webp";
import "./styles.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function SignUpPage() {
  const nav = useNavigate();

  useEffect(() => {
    // storing input name
    var temp = window.localStorage.getItem("uid");

    if (temp !== undefined && temp !== null) {
      nav("/dashboard");
    }
  }, []);
  return (
    <div>
      <div className="absolute h-full w-screen z-10">
        <div className="flex flex-col  overflow-y-auto  w-screen justify-center items-center">
          <div className="w-screen py-5 h-full min-h-screen flex items-center backgroundGradient justify-center gradientBackground z-10  lg:bg-transparent">
            <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
}
