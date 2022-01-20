import Login from "../components/authentication/Login";
import NavBar from "../components/general/NavBar";
import "./styles.css";
export default function LoginPage() {
  return (
    <div>
      <div className="absolute h-full min-h-screen w-screen -z-0 md:bg-gradient-to-b md:from-violet-800 via-navy-500 to-sky-300 md:brightness-75 bg-white "></div>
      <div className="absolute h-full w-screen z-10">
        <div className="flex flex-col h-full min-h-screen w-screen justify-center items-center">
          <Login />
        </div>
      </div>
    </div>
  );
}
