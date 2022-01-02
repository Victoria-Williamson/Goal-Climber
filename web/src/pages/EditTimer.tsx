import EditTimer from "../components/timer/EditTimer";
import NavBar from "../components/general/NavBar";
export default function EditTimerPage() {
  return (
    <div className="w-screen h-full">
      <div className="sticky top-0">
        <NavBar />
      </div>
      <div className="overflow-auto overflow-hidden">
        <EditTimer />
      </div>
    </div>
  );
}
