import Login from "../components/authentication/Login";
import NavBar from "../components/general/NavBar";
export default function LoginPage() {
  return (
    <div>
      <div className="sticky top-0">
        <NavBar />
      </div>
      <div className="flex flex-col h-screen w-screen justify-center items-center">
        <Login />
      </div>
    </div>
  );
}
