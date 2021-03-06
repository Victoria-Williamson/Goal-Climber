import { useState, useEffect, useCallback, Fragment } from "react";
import { Timer, subTimer } from "../../interfaces/Timer";
import useCountDown from "react-countdown-hook";
import FastForward from "./Fast Forward.svg";
import { VscDebugRestart } from "react-icons/vsc";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Play from "./Play.svg";
import { HiDotsHorizontal } from "react-icons/hi";
import "./styles.css";
import useSound from "use-sound";
import logo from "../../logos/Logo-white.svg";
import { useParams } from "react-router-dom";
import { FaPlay, FaPause, FaForward } from "react-icons/fa";
import { RestartAlt } from "@mui/icons-material";
import { theme } from "../../../tailwind.config";
import { time } from "console";

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
export default function ViewTimer(timer: Timer) {
  const params = useParams();

  const [showStop, setshowStop] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [timerIndex, setTimerIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const initialTime = 60 * 1000; // initial time in milliseconds, defaults to 60000
  const interval = 1000; // interval to change remaining time amount, defaults to 1000

  const [timeLeft, { start, pause, resume, reset }] = useCountDown(
    initialTime,
    interval
  );

  function getThemeColor900() {
    if (timer.color === "emerald") {
      return "bg-emerald-900";
    } else if (timer.color === "sky") {
      return "bg-sky-900";
    } else if (timer.color === "orange") {
      return "bg-orange-900";
    } else if (timer.color === "pink") {
      return "bg-pink-900";
    } else if (timer.color === "yellow") {
      return "bg-yellow-900";
    } else if (timer.color === "violet") {
      return "bg-violet-900";
    } else if (timer.color === "red") {
      return "bg-red-900";
    } else if (timer.color === "white") {
      return "bg-white";
    } else if (timer.color === "black") {
      return "bg-gray-900";
    }

    return "bg-emerald-900";
  }

  function getThemeColor700() {
    if (timer.color === "emerald") {
      return "bg-emerald-700";
    } else if (timer.color === "sky") {
      return "bg-sky-700";
    } else if (timer.color === "orange") {
      return "bg-orange-700";
    } else if (timer.color === "pink") {
      return "bg-pink-700";
    } else if (timer.color === "yellow") {
      return "bg-yellow-700";
    } else if (timer.color === "violet") {
      return "bg-violet-700";
    } else if (timer.color === "red") {
      return "bg-red-700";
    } else if (timer.color === "white") {
      return "bg-white";
    } else if (timer.color === "black") {
      return "bg-gray-700";
    }

    return "bg-emerald-700";
  }

  function getThemeColor400() {
    if (timer.color === "emerald") {
      return "bg-emerald-400";
    } else if (timer.color === "sky") {
      return "bg-sky-400";
    } else if (timer.color === "orange") {
      return "bg-orange-400";
    } else if (timer.color === "pink") {
      return "bg-pink-400";
    } else if (timer.color === "yellow") {
      return "bg-yellow-400";
    } else if (timer.color === "violet") {
      return "bg-violet-400";
    } else if (timer.color === "red") {
      return "bg-red-400";
    } else if (timer.color === "white") {
      return "bg-white";
    } else if (timer.color === "black") {
      return "bg-gray-400";
    }

    return "bg-emerald-400";
  }
  function getThemeColorBackround() {
    if (timer.color === "emerald") {
      return "bg-emerald-500";
    } else if (timer.color === "sky") {
      return "bg-sky-500";
    } else if (timer.color === "orange") {
      return "bg-orange-500";
    } else if (timer.color === "pink") {
      return "bg-pink-500";
    } else if (timer.color === "yellow") {
      return "bg-yellow-500";
    } else if (timer.color === "violet") {
      return "bg-violet-500";
    } else if (timer.color === "red") {
      return "bg-red-500";
    } else if (timer.color === "white") {
      return "bg-white";
    } else if (timer.color === "black") {
      return "bg-black";
    }

    return "bg-emerald-500";
  }

  function getThemeColorText() {
    if (timer.color === "emerald") {
      return "text-emerald-500";
    } else if (timer.color === "sky") {
      return "text-sky-500";
    } else if (timer.color === "orange") {
      return "text-orange-500";
    } else if (timer.color === "pink") {
      return "text-pink-500";
    } else if (timer.color === "yellow") {
      return "text-yellow-500";
    } else if (timer.color === "violet") {
      return "text-violet-500";
    } else if (timer.color === "red") {
      return "text-red-500";
    } else if (timer.color === "white") {
      return "text-white";
    } else if (timer.color === "black") {
      return "text-black";
    }

    return "text-emerald-500";
  }

  function getThemeColorFill() {
    if (timer.color === "emerald") {
      return "fill-emerald-500";
    } else if (timer.color === "sky") {
      return "fill-sky-500";
    } else if (timer.color === "orange") {
      return "fill-orange-500";
    } else if (timer.color === "pink") {
      return "fill-pink-500";
    } else if (timer.color === "yellow") {
      return "fill-yellow-500";
    } else if (timer.color === "violet") {
      return "fill-violet-500";
    } else if (timer.color === "red") {
      return "fill-red-500";
    } else if (timer.color === "white") {
      return "fill-white-500";
    } else if (timer.color === "black") {
      return "fill-black-500";
    }

    return "fill-emerald-500";
  }
  if (timeLeft === 0 && hasStarted) {
  }

  /* For a given subtimer index, this returns the appropriate UI to describe an upcoming timer */
  function getSubTimer(index: number) {
    if (timerIndex + index < timer.timers.length) {
      if (timer.timers[timerIndex + index].type === "work") {
        return (
          <div className="grid grid-cols-6 rounded-tl-lg rounded-bl-lg w-full h-16 border-2 border-gray-200 rounded-md">
            <div
              className={classNames(
                getThemeColor900(),
                " col-span-2  flex-col rounded-tl-md rounded-bl-md w-auto flex items-center justify-center text-white font-bold "
              )}
            >
              {timer.timers[timerIndex + index].length}
              <div>mins</div>
            </div>
            <div className="bg-gray-white w-full col-span-4  flex items-center justify-center font-bold text-gray-700 rounded-tr-md rounded-br-md  text-xl">
              {" "}
              {timer.timers[timerIndex + index].type}
            </div>
          </div>
        );
      } else if (timer.timers[timerIndex + index].type === "long") {
        return (
          <div className="grid grid-cols-6 rounded-tl-lg rounded-bl-lg w-full h-16 border-2 border-gray-200 rounded-md">
            <div
              className={classNames(
                getThemeColor700(),
                " l col-span-2  flex-col rounded-tl-md rounded-bl-md w-auto flex items-center justify-center text-white font-bold "
              )}
            >
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
          <div className="grid grid-cols-6 rounded-tl-lg rounded-bl-lg w-full h-16 border-2 border-gray-200 rounded-md">
            <div
              className={classNames(
                getThemeColor400(),
                " l col-span-2  flex-col rounded-tl-md rounded-bl-md w-auto flex items-center justify-center text-white font-bold "
              )}
            >
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
        <div className="mt-8 w-4/6  px-12 py-8 h-auto  mx-12 text-center lowbackground rounded-md font-black  text-lg sm:text-xl text-white flex items-center justify-center max-w-sm">
          {Math.floor(timeLeft / 60000) !== 0
            ? Math.floor(timeLeft / 60000)
            : "00"}{" "}
          :{" "}
          {Math.floor((timeLeft / 1000) % 60) !== 0
            ? Math.floor((timeLeft / 1000) % 60)
            : "00"}
        </div>
      );
    } else if (timer.timers.length === 0) {
      return (
        <div className="mt-8 w-4/6 px-12 py-8 h-auto mx-12 text-center lowbackground rounded-md font-black sm:text-center text-xl sm:text-5xl text-white flex items-center justify-center max-w-sm">
          00:00
        </div>
      );
    }
    return (
      <div className="mt-8 w-full px-12 py-8 h-auto mx-12 text-center lowbackground rounded-md font-black sm:text-center text-xl sm:text-5xl text-white flex items-center justify-center max-w-sm">
        {Math.floor(timer.timers[timerIndex].length) !== 0
          ? Math.floor(timer.timers[timerIndex].length)
          : "00"}{" "}
        : {"00"}
      </div>
    );
  }

  function GetTaskTitle() {
    if (timer.timers === undefined) {
      return <></>;
    }

    if (timer.timers.length === 0) {
      return <></>;
    }

    return (
      <>
        <div
          className={classNames(
            timer.timers[timerIndex].type === "work"
              ? classNames(
                  getThemeColorText(),
                  "font-black px-4  py-2  text-center w-28 text-md mt-4 rounded-full bg-white"
                )
              : "text-white font-black px-4  py-2  text-center text-md mt-4 rounded-full border-4 w-28 border-white hidden"
          )}
        >
          {" "}
          work
        </div>
        <div
          className={classNames(
            timer.timers[timerIndex].type === "short"
              ? classNames(
                  getThemeColorText(),
                  "font-black px-4  py-2  text-center w-28 text-md mt-4 rounded-full bg-white"
                )
              : "text-white font-black px-4  py-2  text-center text-md mt-4 rounded-full border-4 w-28 border-white hidden"
          )}
        >
          {" "}
          short break
        </div>
        <div
          className={classNames(
            timer.timers[timerIndex].type === "long"
              ? classNames(
                  getThemeColorText(),
                  "font-black px-4  py-2  text-center w-28 text-md mt-4 rounded-full bg-white"
                )
              : "text-white font-black px-4  py-2  text-center text-md mt-4 rounded-full border-4 w-28 border-white hidden "
          )}
        >
          {" "}
          long break
        </div>
      </>
    );
  }

  /* Allows a user to start or stop the clock */
  function ToggleStopStart() {
    if (showStop) {
      if (!hasStarted) {
        return (
          <button
            className="rounded-full bg-white h-12 w-12  mb-1 p-3 flex items-center justify-center"
            onClick={() => {
              setshowStop(false);
              setHasStarted(true);
              start(timer.timers[timerIndex].length * 60000);
            }}
          >
            <FaPlay
              className={classNames("h-full w-full", getThemeColorFill())}
            />
          </button>
        );
      }
      if (timeLeft !== 0) {
        return (
          <button
            className="rounded-full bg-white h-12 w-12 mb-1 p-3 flex items-center justify-center"
            onClick={() => {
              setshowStop(false);
              resume();
            }}
          >
            <FaPlay
              className={classNames("h-full w-full", getThemeColorFill())}
            />
          </button>
        );
      }
    }

    if (hasStarted && timeLeft === 0) {
      return (
        <button
          className="rounded-full bg-white h-12 w-12 mb-1 p-3 flex items-center justify-center"
          onClick={() => {
            setTimerIndex(timerIndex + 1);
            start(timer.timers[timerIndex].length * 60000);
          }}
        >
          <FaForward
            className={classNames("h-full w-full", getThemeColorFill())}
          />
        </button>
      );
    }
    return (
      <button
        className="rounded-full bg-white h-12 w-12  mb-1 p-3 flex items-center justify-center"
        onClick={() => {
          setshowStop(true);
          pause();
        }}
      >
        <FaPause className={classNames("h-full w-full", getThemeColorFill())} />
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
        "h-full w-full flex items-center justify-center flex-col"
      )}
    >
      <div
        className={classNames(
          getThemeColorBackround(),
          "w-full h-auto max-w-sm  p-4 m-4 rounded-md flex justify-center items-center flex-col gap-2 "
        )}
      >
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 overflow-hidden"
            onClose={setOpen}
          >
            <div className="absolute inset-0 overflow-hidden">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>
              <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <div className="relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-2xl flex items-center justify-center font-bold text-gray-800">
                          Upcoming Timers
                        </Dialog.Title>
                      </div>
                      <div className="mt-6 relative flex-1 px-4 sm:px-6">
                        <div className="w-full  border-b-2 border-white" />

                        <div className="flex flex-col gap-4 items-center justify-center w-full p-8">
                          {getSubTimer(1)}
                          {getSubTimer(2)}
                          {getSubTimer(3)}
                          {getUpcoming()}
                        </div>
                        <div className="absolute inset-0 px-4 sm:px-6">
                          <div className="h-full" aria-hidden="true" />
                        </div>
                        {/* /End replace */}
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <div className="font-black largeTxt text-white w-screen text-center mt-10 ">
          {timer.title}
        </div>

        <div className="flex flex-no-wrap flex-row items-center justify-center gap-4 text-xs  text-center">
          <GetTaskTitle />
        </div>

        <ToggleClock />

        <div className="w-full items-center justify-center flex gap-4 mt-7 mb-5">
          <button
            className={classNames(
              getThemeColorText(),
              "rounded-full bg-white h-10 w-10 mb-1 p-1 flex items-center justify-center font-black text-emerald"
            )}
            onClick={() => {
              reset();
              setshowStop(false);
              setHasStarted(false);
            }}
          >
            <VscDebugRestart
              className={classNames(getThemeColorFill(), "h-full  w-full")}
            />
          </button>
          <ToggleStopStart />
          <button
            className="rounded-full bg-white h-10 w-10 mb-1 p-1 flex items-center justify-center font-black text-emerald-500"
            onClick={() => setOpen(true)}
          >
            <HiDotsHorizontal
              className={classNames(getThemeColorFill(), "h-full  w-full")}
            />
          </button>
        </div>
        {/* <div className="flex w-full h-16 m-0 p-0items-center justify-end">
          <img
            className={classNames("h-16 w-16 ", getThemeColorFill())}
            src={logo}
          />
        </div> */}
      </div>
      {/* <CountdownCircleTimer
        isPlaying
        duration={10}
        colors="#A30000"
        onComplete={() => {
          // do your stuff here
          return { shouldRepeat: true, delay: 1.5 }; // repeat animation in 1.5 seconds
        }}
      /> */}
    </div>
  );
}
