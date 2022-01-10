import logo from "../../logos/Logo.svg";
import mountains from "../../logos/mountains.svg";
import title from "../../logos/Title.svg";
import backgroundLg from "../../logos/bg-desktop.svg";
import { Link, useNavigate } from "react-router-dom";
import { url } from "inspector";

export default function Home() {
  const nav = useNavigate();
  return (
    <div className=" overflow-hidden h-screen w-screen">
      <div className="w-screen h-screen md:grid grid-cols-2 items-center justify-center hidden">
        <div className="flex items-center justify-center flex-col gap-5 px-18 xl:px-24">
          <div className="xl:text-7xl text-6xl text-center font-black logoFont text-transparent bg-clip-text bg-gradient-to-r from-navy-500 to-sky-300">
            Goal Climber
          </div>
          <div className=" text-3xl px-2 text-navy-500 text-center">
            Create free, customizeable, and beautiful widgets in minutes
          </div>
          <div className="flex items-center justify-center flex-row gap-4 mt-4">
            <button
              className="h-16 bg-navy-500 text-white lg:w-48 w-36 rounded-lg lg:text-2xl text-xl font-bold hover:brightness-90"
              onClick={() => nav("/login")}
            >
              {" "}
              Log In
            </button>
            <button
              className="h-16 bg-white text-navy-500 border-4 border-navy-500 lg:w-48 w-36 rounded-lg lg:text-2xl text-xl font-bold hover:brightness-90"
              onClick={() => nav("/signup")}
            >
              {" "}
              Sign Up
            </button>
          </div>
        </div>
        <div className="h-screen bg-gradient-to-b from-navy-500 to-sky-300 flex items-end justify-center">
          <img className="object-cover h-full w-full" src={backgroundLg} />
        </div>
      </div>
      <div className="w-screen h-screen md:hidden bg-gradient-to-b  from-navy-500 to-sky-300">
        <div className="absolute z-10 h-3/4 overflow-hidden">
          <div className="flex h-5/6 items-center justify-center flex-col gap-5 py-24 px-4">
            <div className="text-6xl font-black logoFont text-white">
              Goal Climber
            </div>
            <div className="text-xl text-white text-center">
              Create free, customizeable, and beautiful widgets in minutes
            </div>
            <div className="flex items-center justify-center flex-row gap-4 mt-4">
              <button
                className="h-12 bg-white shadow-lg text-navy-400 lg:w-48 w-40 rounded-lg  text-xl font-bold hover:brightness-90"
                onClick={() => nav("/login")}
              >
                {" "}
                Log In
              </button>
              <button
                className="h-12 bg-white  shadow-lg text-navy-400  lg:w-48 w-40 rounded-lg text-xl font-bold hover:brightness-90"
                onClick={() => nav("/signup")}
              >
                {" "}
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div className="absolute  overflow-hidden z-0 opacity-95 h-screen w-screen flex items-end">
          <img className="absolute w-screen  h-auto " src={mountains} />
        </div>
      </div>

      {/* <div className="flex w-full h-full items-center justify-center flex-col lg:flex-row px-8 gap-4">
        <div className="lg:w-1/2 w-full flex items-center flex-col justify-center gap-3 px-12 text-center lg:text-left">
          {" "}
          <div className="font-bold text-2xl lg:text-5xl text-violet-900 lg:mt-0 mt-8">
            {" "}
            Widgets that will help you reach your goals.
          </div>
          <div className="text-xl lg:text-3xl text-violet-900 mb-8">
            Create free, customizeable, and beautiful widgets in minutes{" "}
          </div>
          <div className="flex items-center justify-center mt-4 flex-row  gap-5">
            <button
              className="h-16 bg-violet-700 text-white lg:w-48 w-40 rounded-lg lg:text-2xl text-xl font-bold hover:brightness-90"
              onClick={() => nav("/login")}
            >
              {" "}
              Log In
            </button>
            <button
              className="h-16 bg-white text-violet-700 border-4 border-violet-700 lg:w-48 w-40 rounded-lg lg:text-2xl text-xl font-bold hover:brightness-90"
              onClick={() => nav("/signup")}
            >
              {" "}
              Sign Up
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}
