import logo from "../../logos/Logo.svg";
import title from "../../logos/Title.svg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-800 w-screen h-screen overflow-hidden">
      <div className="flex w-full h-full items-center justify-center flex-col lg:flex-row px-8 gap-4">
        <div className="flex no-wrap flex-col items-center justify-center gap-2 w-full lg:w-1/2">
          <img className="lg:w-3/4 w-1/2 h-auto" src={logo} />
          <img className="lg:w-3/4 w-1/2 h-auto" src={title} />
        </div>
        <div className="lg:w-1/2 w-full flex items-center flex-col justify-center gap-3 px-12 text-center lg:text-left">
          {" "}
          <div className="font-bold text-2xl lg:text-5xl text-white lg:mt-0 mt-8">
            {" "}
            Create Notion widgets that will help you reach your goals.
          </div>
          <div className="text-xl lg:text-3xl text-white mb-8">
            Looking for ways to upgrade your Notion page? Create one of widgets
            to add additional functionallity and style to your Notion.{" "}
          </div>
          <div className="flex items-center justify-center mt-4 flex-row  gap-5">
            <button className="h-16 bg-violet-700 text-white lg:w-48 w-40 rounded-lg lg:text-2xl text-xl font-bold hover:brightness-90">
              {" "}
              <Link to="/login"> Log In </Link>
            </button>
            <button className="h-16 bg-white text-violet-700 border-4 border-violet-700 lg:w-48 w-40 rounded-lg lg:text-2xl text-xl font-bold hover:brightness-90">
              {" "}
              <Link to="/signup"> Sign Up</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}