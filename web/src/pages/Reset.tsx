import SignUp from "../components/authentication/ResetPassword";
import NavBar from "../components/general/NavBar";
import "./styles.css";

export default function ResetPage() {
  return (
    <div>
      <div className="flex flex-col h-screen gradientBackground  w-screen justify-center items-center">
        <div className="absolute w-screen h-full min-h-screen z-10 flex items-center justify-center">
          <SignUp />
        </div>
      </div>
    </div>
  );
}
