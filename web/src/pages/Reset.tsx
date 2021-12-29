import SignUp from "../components/authentication/ResetPassword";
// import img from "./mountains-1412683.png";
import img from "../logos/mountain.webp";
export default function ResetPage() {
  return (
    <div className="flex flex-col h-screen bg-white w-screen justify-center items-center">
      {/* <div className="absolute w-screen h-screen z-0  contrast-25">
            <img className="h-screen w-screen" src={img}/>
        </div> */}
      <div className="absolute w-screen h-screen z-10 flex items-center justify-center">
        <SignUp />
      </div>
    </div>
  );
}
