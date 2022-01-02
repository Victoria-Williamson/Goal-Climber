import logo from "../../logos/Logo.svg";
import title from "../../logos/Title.svg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-800 w-full h-full mb-8">
      <div className="flex w-full h-full items-center justify-center flex-col lg:flex-row px-8 gap-4">
        <div className="flex no-wrap flex-col items-center justify-center gap-2 w-full lg:w-1/2 w-4/6 ">
          <img src={logo} />
          <img src={title} />
        </div>
        <div className="lg:w-1/2 w-full flex items-center flex-col justify-center gap-3 px-12 text-center lg:text-left">
          {" "}
          <div className="font-bold text-2xl lg:text-5xl text-white">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className="text-xl lg:text-3xl text-white">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className="flex items-center justify-center mt-4 flex-row  gap-5">
            <button className="h-16 bg-violet-700 text-white w-48 rounded-lg text-2xl font-bold hover:brightness-90">
              {" "}
              <Link to="/login"> Log In </Link>
            </button>
            <button className="h-16 bg-white text-violet-700 border-4 border-violet-700 w-48 rounded-lg text-2xl font-bold hover:brightness-90">
              {" "}
              <Link to="/signup"> Sign Up</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
