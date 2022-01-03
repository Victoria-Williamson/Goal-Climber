import ViewTimer from "../components/timer/ViewTimer";
import { useState, useEffect, useCallback, Fragment } from "react";
import { Timer, subTimer } from "../interfaces/Timer";
import { useParams } from "react-router-dom";

const emptyTimer: Timer = {
  _id: "",
  uid: "",
  title: "Cannot Find Timer",
  color: "green",
  isDarkMode: false,
  timers: [
    {
      length: 0,
      type: "Timer cannot be found",
    },
  ],
};

export default function TimerPage() {
  const [timer, setTimer] = useState<Timer>(emptyTimer);
  const params = useParams();

  function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(" ");
  }
  useEffect(() => {
    fetch("https://api.goal-climber.com/timer/" + params.timerId)
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data: Timer) => {
        setTimer(data);
      });
  }, []);

  return (
    <div
      className={classNames(
        timer?.isDarkMode ? "bg-notionDark-100" : "bg-white",
        "h-screen"
      )}
    >
      {" "}
      <ViewTimer {...timer} />
    </div>
  );
}
