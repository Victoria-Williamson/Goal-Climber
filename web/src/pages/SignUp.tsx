import SignUp from "../components/authentication/SignUp";
import NavBar from "../components/general/NavBar";
// import img from "./mountains-1412683.png";
import img from "../logos/mountain.webp";
export default function SignUpPage() {
  return (
    <div>
      <div className="sticky top-0">
        <NavBar />
      </div>
      {/* <div className="absolute w-screen h-screen z-0  contrast-25">
            <img className="h-screen w-screen" src={img}/>
        </div> */}
      <div className="flex flex-col max-h-screen h-screen overflow-y-auto bg-white w-screen justify-center items-center">
        <div className="absolute w-screen mt-5 h-screen z-10 flex items-center justify-center">
          <SignUp />
        </div>
      </div>
    </div>
  );
}
