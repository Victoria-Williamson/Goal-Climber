import Login from "../components/authentication/Login";
import NavBar from "../components/general/NavBar";
import "./styles.css";
export default function LoginPage() {
  return (
    <div>
      <div className="absolute h-full w-screen -z-0 bg-gradient-to-b from-violet-800 via-navy-500 to-sky-300 brightness-75 "></div>
      <div className="absolute h-full w-screen z-10">
        <div className="flex flex-col h-screen w-screen justify-center items-center">
          <Login />
        </div>
      </div>
    </div>
  );
}
