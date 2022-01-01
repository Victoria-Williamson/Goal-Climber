import { useState, useEffect, useCallback } from "react";
import { Timer, subTimer } from "../../interfaces/Timer";
import Countdown from "react-countdown";
import useCountDown from "react-countdown-hook";
import FastForward from "./Fast Forward.svg";
import Play from "./Play.svg";
import "./styles.css";
import { useParams } from "react-router-dom";
import {
  FaPlay,
  FaStop,
  FaFastForward,
  FaPause,
  FaForward,
} from "react-icons/fa";

interface propsI {
  total: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
  api: {
    pause: () => void;
    start: () => void;
  };
}

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
export default function ViewTimer() {
  const params = useParams();
  const [timer, setTimer] = useState<Timer>(emptyTimer);
  const [showStop, setshowStop] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [timerIndex, setTimerIndex] = useState(0);

  const initialTime = 60 * 1000; // initial time in milliseconds, defaults to 60000
  const interval = 1000; // interval to change remaining time amount, defaults to 1000

  const [timeLeft, { start, pause, resume, reset }] = useCountDown(
    initialTime,
    interval
  );

  useEffect(() => {
    fetch("http://localhost:5500/timer/" + params.timerId)
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data: Timer) => {
        setTimer(data);
      });
  }, []);

  if (timeLeft === 0 && hasStarted) {
    const alarmSound = require("./mixkit-warning-alarm-buzzer-991.wav");
    const alarmAudio = new Audio(alarmSound.default);
    alarmAudio.play();
  }

  /* For a given subtimer index, this returns the appropriate UI to describe an upcoming timer */
  function getSubTimer(index: number) {
    if (timerIndex + index < timer.timers.length) {
      if (timer.timers[timerIndex + index].type === "work") {
        return (
          <div className="grid grid-cols-6 rounded-tl-lg rounded-bl-lg w-full h-16">
            <div className="bg-emerald-900 l col-span-2  flex-col rounded-tl-md rounded-bl-md w-auto flex items-center justify-center text-white font-bold ">
              {timer.timers[timerIndex + index].length}
              <div>mins</div>
            </div>
            <div className="bg-white w-full col-span-4  flex items-center justify-center font-bold text-gray-700 rounded-tr-md rounded-br-md  text-xl">
              {" "}
              {timer.timers[timerIndex + index].type}
            </div>
          </div>
        );
      } else if (timer.timers[timerIndex + index].type === "long") {
        return (
          <div className="grid grid-cols-6 rounded-tl-lg rounded-bl-lg w-full h-16">
            <div className="bg-emerald-700 flex-col col-span-2 rounded-tl-md rounded-bl-md w-auto flex items-center justify-center text-white font-bold ">
              {timer.timers[timerIndex + index].length}
              <div>mins</div>
            </div>
            <div className="bg-white w-full col-span-4 flex items-center justify-center font-bold text-gray-700 rounded-tr-md rounded-br-md  text-xl">
              {" "}
              {timer.timers[timerIndex + index].type}
            </div>
          </div>
        );
      } else if (timer.timers[timerIndex + index].type === "short") {
        return (
          <div className="grid grid-cols-6 rounded-tl-lg rounded-bl-lg w-full h-16">
            <div className="bg-emerald-400 flex-col col-span-2 rounded-tl-md rounded-bl-md w-auto flex items-center justify-center text-white font-bold ">
              {timer.timers[timerIndex + index].length}
              <div>mins</div>
            </div>
            <div className="bg-white w-full col-span-4 flex items-center justify-center font-bold text-gray-700 rounded-tr-md rounded-br-md  text-xl">
              {" "}
              {timer.timers[timerIndex + index].type}
            </div>
          </div>
        );
      }
    } else {
      return;
      <></>;
    }
  }

  /* If there are > 3 timers left, this will tell the user how many sub timers are elft */
  function getUpcoming() {
    if (timerIndex + 4 < timer.timers.length) {
      return (
        <div className="italic text-white text-xl">
          {" "}
          and {timer.timers.length - (timerIndex + 3)} more upcoming timers...
        </div>
      );
    }
    if (timerIndex + 1 === timer.timers.length)
      return (
        <div className="italic text-white text-xl">
          {" "}
          No more upcoming timers...
        </div>
      );
  }

  /* If the clock has not started this shows how long the alarm is */
  function ToggleClock() {
    if (hasStarted) {
      return (
        <div className="mt-8 w-full h-48 mx-12 text-center lowbackground rounded-md font-black text-5xl sm:text-6xl md:text-8xl text-white flex items-center justify-center">
          {Math.floor(timeLeft / 60000) !== 0
            ? Math.floor(timeLeft / 60000)
            : "00"}{" "}
          :{" "}
          {Math.floor((timeLeft / 1000) % 60) !== 0
            ? Math.floor((timeLeft / 1000) % 60)
            : "00"}
        </div>
      );
    }
    return (
      <div className="mt-8 w-full h-48 mx-12 text-center lowbackground rounded-md font-black text-5xl sm:text-centertext-6xl md:text-8xl text-white flex items-center justify-center">
        {Math.floor(timer.timers[timerIndex].length) !== 0
          ? Math.floor(timer.timers[timerIndex].length)
          : "00"}{" "}
        : {"00"}
      </div>
    );
  }

  /* Allows a user to start or stop the clock */
  function ToggleStopStart() {
    if (showStop) {
      if (!hasStarted) {
        return (
          <button
            className="rounded-full bg-white h-20 w-20 mb-4 p-4 flex items-center justify-center"
            onClick={() => {
              setshowStop(false);
              setHasStarted(true);
              start(timer.timers[timerIndex].length * 60000);
            }}
          >
            <FaPlay className="fill-emerald-500 h-full" />
          </button>
        );
      }
      if (timeLeft !== 0) {
        return (
          <button
            className="rounded-full bg-white h-20 w-20 mb-4 p-4 flex items-center justify-center"
            onClick={() => {
              setshowStop(false);
              resume();
            }}
          >
            <FaPlay className="fill-emerald-500 h-full" />
          </button>
        );
      }
    }

    if (hasStarted && timeLeft === 0) {
      return (
        <button
          className="rounded-full bg-white h-20 w-20 mb-4 p-4 flex items-center justify-center"
          onClick={() => {
            setTimerIndex(timerIndex + 1);
            start(timer.timers[timerIndex].length * 60000);
          }}
        >
          <FaForward className="fill-emerald-500 h-full" />
        </button>
      );
    }
    return (
      <button
        className="rounded-full bg-white h-20 w-20 mb-4 p-4 flex items-center justify-center"
        onClick={() => {
          setshowStop(true);
          pause();
        }}
      >
        <FaPause className="fill-emerald-500 h-full" />
      </button>
    );
  }

  /* TWCSS helper function */
  function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div
      className={classNames(
        timer?.isDarkMode ? "bg-notionDark-100" : "bg-white",
        "h-screen w-full flex items-center justify-center flex-col"
      )}
    >
      <div className="px-12 w-5/6 h-max rounded-md flex py-8 max-w-lg justify-center items-center flex-col gap-2  bg-emerald-500">
        <div className="font-black  text-4xl lg:text-5xl text-white w-screen text-center mt-10 mb-5">
          {timer.title}
        </div>

        <div className="flex flex-no-wrap flex-row items-center justify-center gap-4 text-lg  md:text-sm  text-center">
          <div
            className={classNames(
              timer.timers[timerIndex].type === "work"
                ? "text-emerald-500 font-black px-4  py-2  text-center w-28 text-md mt-4 rounded-full bg-white"
                : "text-white font-black px-4  py-2  text-center text-md mt-4 rounded-full border-4 w-28 border-white hidden sm:block"
            )}
          >
            {" "}
            work
          </div>
          <div
            className={classNames(
              timer.timers[timerIndex].type === "short"
                ? "text-emerald-500 font-black px-4 w-max py-2  text-md mt-4 rounded-full bg-white"
                : "text-white font-black px-4  py-2 w-max text-md mt-4 rounded-full border-4 border-white hidden sm:block"
            )}
          >
            {" "}
            short break
          </div>

          <div
            className={classNames(
              timer.timers[timerIndex].type === "long"
                ? "text-emerald-500 font-black px-4  py-2 text-md mt-4 rounded-full bg-white"
                : "text-white font-black px-4  py-2 text-md mt-4 rounded-full border-4 border-white hidden sm:block"
            )}
          >
            {" "}
            long break
          </div>
        </div>
        <ToggleClock />

        <div className="w-full items-center justify-center flex gap-5 mt-5">
          <ToggleStopStart />
        </div>

        <div className="text-white flex items-start justify-start  w-full">
          <div className="font-bold text-left text-2xl"> Upcoming Timers </div>
        </div>
        <div className="w-full  border-b-2 border-white" />

        <div className="flex flex-col gap-4 items-center justify-center w-full md:p-8">
          {getSubTimer(1)}
          {getSubTimer(2)}
          {getSubTimer(3)}
          {getUpcoming()}
        </div>
      </div>
      <p> </p>
    </div>
  );
}
