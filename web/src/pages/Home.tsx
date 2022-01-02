import Home from "../components/general/Home";
import NavBar from "../components/general/NavBar";
export default function HomePage() {
  return (
    <div className="w-screen h-screen">
      <div className="sticky top-0">
        <NavBar />
      </div>
      <Home />
    </div>
  );
}
