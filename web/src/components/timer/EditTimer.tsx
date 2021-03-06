import ViewTimer from "./ViewTimer";
import { useState, useEffect, useCallback, Fragment, useRef } from "react";
import { Timer, subTimer } from "../../interfaces/Timer";
import { useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { FaCopy, FaLink, FaPlus } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./styles.css";
import { TailSpin } from "react-loader-spinner";
import { IoIosArrowBack } from "react-icons/io";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ExclamationIcon } from "@heroicons/react/outline";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
const emptyTimer: Timer = {
  _id: "",
  uid: "",
  title: "Cannot Find Timer",
  color: "emerald",
  isDarkMode: false,
  timers: [
    {
      length: 0,
      type: "Timer cannot be found",
    },
  ],
};

const emptySub: subTimer = {
  length: 0,
  type: "work",
};

export default function EditTimer() {
  const [timer, setTimer] = useState<Timer>(emptyTimer);
  const [editTimer, setEditTimer] = useState<subTimer>(emptySub);
  const [length, setEditLength] = useState(0);
  const [type, setEditType] = useState("none");
  const params = useParams();
  const [newSub, setNewSub] = useState<subTimer>(emptySub);
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const nav = useNavigate();

  var count = -1;

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

  function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(" ");
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
  window.scrollTo(0, 0);
  const viewLink = "https://goal-climber.com/timer/view/" + params.timerId;
  useEffect(() => {
    fetch("https://api.goal-climber.com/timer/" + params.timerId)
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data: Timer) => {
        if (data.uid !== localStorage.getItem("_id")) {
          nav("/login");
        }
        setTimer(data);
        setIsLoaded(true);
      });
  }, []);

  function deleteTimer() {
    var requestOptions = {
      method: "DELETE",
    };

    fetch(`https://api.goal-climber.com/timer/${timer._id}`, requestOptions)
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data: any) => {
        if (data.success !== undefined && data.success != null) {
          nav("/dashboard");
        }
      });
  }
  function saveSubTimer() {
    for (var i = 0; i < timer.timers.length; i++) {
      if (timer.timers[i] === editTimer) {
        console.log("found");
      }
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      _id: timer._id,
      update: {
        title: timer.title,
        color: timer.color,
        isDarkMode: timer.isDarkMode,
      },
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
    };
    fetch("https://api.goal-climber.com/timer/edit", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const resultObj = JSON.parse(result);
        // Input Error
        if (resultObj.errors !== null && resultObj.errors !== undefined) {
        } else {
          setOpenNew(false);
          setNewSub(emptySub);
          fetch("https://api.goal-climber.com/timer/" + params.timerId)
            .then((response) => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
            .then((data: Timer) => {
              setTimer(data);
            });
        }
      });
  }
  function addSubTimer() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      _id: timer._id,
      update: {
        type: newSub.type,
        length: newSub.length,
      },
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
    };
    fetch("https://api.goal-climber.com/timer/addSubTimer", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const resultObj = JSON.parse(result);
        // Input Error
        if (resultObj.errors !== null && resultObj.errors !== undefined) {
        } else {
          setOpenNew(false);
          setNewSub(emptySub);
          fetch("https://api.goal-climber.com/timer/" + params.timerId)
            .then((response) => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
            .then((data: Timer) => {
              setTimer(data);
            });
        }
      });
  }

  function deletesubTimer(subTimer: subTimer) {
    var tempTimers = [];

    for (var i = 0; i < timer.timers.length; i++) {
      if (timer.timers[i] !== subTimer) {
        tempTimers.push(timer.timers[i]);
      }
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      _id: timer._id,
      update: {
        timers: tempTimers,
      },
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
    };
    fetch("https://api.goal-climber.com/timer/edit", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const resultObj = JSON.parse(result);
        // Input Error
        if (resultObj.errors !== null && resultObj.errors !== undefined) {
        } else {
          setOpenNew(false);
          setNewSub(emptySub);
          fetch("https://api.goal-climber.com/timer/" + params.timerId)
            .then((response) => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
            .then((data: Timer) => {
              setIsLoaded(true);
              setTimer(data);
            });
        }
      });
  }

  function editSubTimer() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var tempTimers: Array<subTimer> = [];

    for (var i = 0; i < timer.timers.length; i++) {
      if (timer.timers[i] === editTimer) {
        var temp: subTimer = {
          length: length,
          type: type,
        };
        tempTimers.push(temp);
      } else {
        tempTimers.push(timer.timers[i]);
      }
    }

    var raw = JSON.stringify({
      _id: timer._id,
      update: {
        timers: tempTimers,
      },
    });

    setEditTimer(emptySub);
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
    };
    fetch("https://api.goal-climber.com/timer/edit", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const resultObj = JSON.parse(result);
        // Input Error
        if (resultObj.errors !== null && resultObj.errors !== undefined) {
        } else {
          setOpenNew(false);
          setNewSub(emptySub);
          fetch("https://api.goal-climber.com/timer/" + params.timerId)
            .then((response) => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
            .then((data: Timer) => {
              setTimer(data);
              setOpenEdit(false);
            });
        }
      });
  }
  const cancelButtonRef = useRef(null);

  function ToggleLoading() {
    if (isLoaded) {
      return <></>;
    } else {
      return (
        <>
          <div className="w-screen h-screen min-h-full min-w-full absolute top-0 left-0   z-10 bg-gray-800 bg-opacity-75 transition-opacity"></div>
          <div className="absolute w-screen h-screen flex z-20 items-center top-0 left-0 justify-center flex-col gap-4">
            <div className="font-bold text-xl text-white"> Loading...</div>
            <TailSpin color={"white"} arialLabel="loading-indicator" />
          </div>{" "}
        </>
      );
    }
  }
  return (
    <>
      <Transition.Root show={openEdit} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpenEdit}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600  bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8  w-screen max-w-md">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                  <div className="flex items-start w-full px-8">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl text-center font-semibold text-violet-900"
                      >
                        Edit Sub Timer
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="w-full flex flex-col items-center mt-3 justify-center gap-2">
                          <div className="flex flex-col  items-start justify-center gap-3 text-gray-700 w-full">
                            <label> Type </label>
                            <select
                              value={type}
                              onChange={(e) => {
                                setEditType(e.target.value);
                              }}
                              className="border-gray-400 focus:border-violet-700 bg-blueGray-100 text-gray-500 
                    appearance-none  h-12 rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-2"
                            >
                              <option value="work"> Work </option>
                              <option value="long"> Long Break </option>
                              <option value="short"> Short Break</option>
                            </select>
                          </div>
                          <div className="flex flex-col  items-start justify-center gap-2 text-gray-700 w-full">
                            <label> Length </label>
                            <input
                              placeholder="0"
                              type={"number"}
                              value={length}
                              min={0}
                              onChange={(e) => {
                                setEditLength(parseInt(e.target.value));
                              }}
                              className="border-gray-400 focus:border-violet-700 bg-blueGray-100 text-gray-500 
                    appearance-none  h-12 rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3  gap-2 flex items-center w-full  justify-center flex-col  pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="grid grid-cols-2 w-full gap-2 items-center justify-center">
                    <button
                      type="button"
                      className="w-full h-12 inline-flex  items-center justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-violet-800 text-base font-medium text-white hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring--500 sm:ml-3 "
                      onClick={() => editSubTimer()}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="w-full h-12 inline-flex items-center justify-center rounded-md shadow-sm px-4 py-2 bg-white border-2 border-violet-800 text-base font-medium text-violet-800 hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring--500 sm:ml-3"
                      onClick={() => {
                        deletesubTimer(editTimer);
                        setOpenEdit(false);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={openNew} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpenNew}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8  w-screen max-w-md">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                  <div className="flex items-start w-full px-8 ">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl text-center m-4 font-semibold text-violet-900"
                      >
                        Add Sub Timer
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="w-full flex flex-col items-center mt-3 justify-center gap-2">
                          <div className="flex flex-col  items-start justify-center gap-3 text-gray-700 w-full">
                            <label> Type </label>
                            <select
                              value={newSub.type}
                              onChange={(e) =>
                                setNewSub({
                                  ...newSub,
                                  type: e.target.value,
                                })
                              }
                              className="border-gray-400 focus:border-violet-700 bg-blueGray-100 text-gray-500 
                    appearance-none  h-12 rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-2"
                            >
                              <option value="work"> Work </option>
                              <option value="long"> Long Break </option>
                              <option value="short"> Short Break</option>
                            </select>
                          </div>
                          <div className="flex flex-col  items-start justify-center gap-2 text-gray-700 w-full">
                            <label> Length </label>
                            <input
                              placeholder="0"
                              type={"number"}
                              value={newSub.length}
                              min={0}
                              onChange={(e) => {
                                setNewSub({
                                  ...newSub,
                                  length: parseInt(e.target.value),
                                });
                              }}
                              className="border-gray-400 focus:border-violet-700 bg-blueGray-100 text-gray-500 
                    appearance-none  h-12 rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <div className="grid grid-cols-2 items-center justify-center w-full gap-2">
                    <button
                      type="button"
                      className=""
                      onClick={() => addSubTimer()}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="font-semibold text-lg text-white bg-violet-500 hover:brightness-75 rounded-lg 
                    appearance-none  h-12  w-full py-3 px-4  leading-tight focus:outline-none   focus:border-2"
                      onClick={() => setOpenNew(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="flex flex-col lg:flex-row w-full h-full lg:h-screen  gap-4 items-center justify-center overflow-hidden  ">
        <div className="max-h-screen overflow-y-auto w-full h-fl lg:min-h-screen bg-blueGray-100 pb-4 lg:w-1/3">
          <div className=" w-full  h-full lg:mb-24   bg-blueGray-100 py-4  lg:overflow-y-scroll  flex items-center justify-center flex-col gap-2 ">
            <div className=" w-full">
              <button
                className="font-medium text-lg text-gray-600 flex items-start mx-4 mt-4 justify-items-start flex-rowpx-0 gap-0"
                onClick={() => nav("/dashboard")}
              >
                {" "}
                <IoIosArrowBack className="h-8 w-7" /> Go Back{" "}
              </button>
            </div>

            <div className="w-full flex items-center justify-center lg:w-5/6 px-8 lg:px-4  ">
              <div className="max-w-lg w-screen  ">
                <div className="grid grid-cols-2 w-full gap-2 my-3">
                  <button
                    className={classNames(
                      "bg-violet-900 text-center text-white hover:brightness-75 text-base flex items-center justify-center w-full h-14  rounded-md font-semibold"
                    )}
                    onClick={() => saveSubTimer()}
                  >
                    Save Changes
                  </button>
                  <button
                    className={classNames(
                      " bg-violet-400 text-center text-white hover:brightness-75 text-base flex items-center justify-center w-full h-14  rounded-md font-semibold"
                    )}
                    onClick={() => deleteTimer()}
                  >
                    Delete Widget
                  </button>
                </div>
                <div className="flex flex-col lg:mt-8  items-start justify-center gap-2  mb-4 text-gray-700 w-full">
                  <label> Title </label>
                  <input
                    placeholder="Title"
                    type={"text"}
                    value={timer.title}
                    onChange={(e) =>
                      setTimer({
                        ...timer,
                        title: e.target.value,
                      })
                    }
                    className="bg-white appearance-none  h-12 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none border-gray-400 focus:border--700 focus:border-2"
                  />
                </div>{" "}
                <div className="flex flex-col  items-start justify-center gap-2 mb-4 text-gray-700 w-full">
                  <label> Color </label>
                  <div className="grid grid-cols-6 w-full ">
                    <select
                      value={timer.color}
                      onChange={(e) =>
                        setTimer({
                          ...timer,
                          color: e.target.value,
                        })
                      }
                      className="bg-white appearance-none  col-span-5 h-12 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none border-gray-400 focus:border--700 focus:border-2"
                    >
                      <option value="emerald"> Green</option>
                      <option value="sky">Blue</option>
                      <option value="orange">Orange</option>
                      <option value="pink">Pink</option>
                      <option value="yellow">Yellow</option>
                      <option value="violet"> Violet</option>
                      <option value="red">Red</option>
                      <option value="black">Black</option>
                    </select>
                    <div
                      className={classNames(
                        "col-span-1 h-12 w-full",
                        getThemeColorBackround()
                      )}
                    />
                  </div>
                </div>{" "}
                <div className="flex flex-col  items-start justify-center gap-2 mb-4text-gray-700 w-full">
                  <label> Dark Mode? </label>

                  <select
                    value={timer.isDarkMode ? "yes" : "no"}
                    onChange={(e) =>
                      setTimer({
                        ...timer,
                        isDarkMode: e.target.value === "yes" ? true : false,
                      })
                    }
                    className="bg-white appearance-none  col-span-5 h-12 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none border-gray-400 focus:border--700 focus:border-2"
                  >
                    <option value="yes"> Yes </option>
                    <option value="no"> No </option>
                  </select>
                </div>
                <label className="flex items-center justify-start w-full mt-3">
                  {" "}
                  Sub Timers{" "}
                </label>
                <div className="flex flex-col items-center justify-center gap-2 w-full max-w-lg mt-1">
                  {timer.timers.map((subTimer: subTimer) => {
                    count++;
                    if (subTimer.type === "work") {
                      return (
                        <div
                          onClick={() => {
                            setEditTimer(subTimer);
                            setEditLength(subTimer.length);
                            setEditType(subTimer.type);
                            setOpenEdit(true);
                          }}
                          key={count}
                          className="grid grid-cols-6 rounded-tl-lg hover:brightness-95 rounded-bl-lg w-full h-16 border-2 border-gray-200 rounded-md"
                        >
                          <div
                            className={classNames(
                              getThemeColor900(),
                              " l col-span-2  flex-col rounded-tl-md rounded-bl-md w-auto flex items-center justify-center text-white font-bold "
                            )}
                          >
                            {subTimer.length}
                            <div>mins</div>
                          </div>
                          <div className="bg-gray-white w-full col-span-4  flex items-center justify-center font-bold text-gray-700 rounded-tr-md rounded-br-md  text-xl bg-white">
                            {" "}
                            {subTimer.type}
                          </div>
                        </div>
                      );
                    } else if (subTimer.type === "long") {
                      return (
                        <div
                          onClick={() => {
                            setEditTimer(subTimer);
                            setEditLength(subTimer.length);
                            setEditType(subTimer.type);
                            setOpenEdit(true);
                          }}
                          key={count}
                          className="grid grid-cols-6 hover:brightness-95 rounded-tl-lg rounded-bl-lg w-full h-16 border-2 border-gray-200 rounded-md"
                        >
                          <div
                            className={classNames(
                              getThemeColor700(),
                              " l col-span-2  flex-col rounded-tl-md rounded-bl-md w-auto flex items-center justify-center text-white font-bold "
                            )}
                          >
                            {subTimer.length}
                            <div>mins</div>
                          </div>
                          <div className="bg-white w-full col-span-4 flex items-center justify-center font-bold text-gray-700 rounded-tr-md rounded-br-md  text-xl">
                            {" "}
                            {subTimer.type}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          onClick={() => {
                            setEditTimer(subTimer);
                            setEditLength(subTimer.length);
                            setEditType(subTimer.type);
                            setOpenEdit(true);
                          }}
                          key={count}
                          className="grid grid-cols-6 hover:brightness-95 rounded-tl-lg rounded-bl-lg w-full h-16 border-2 border-gray-200 rounded-md"
                        >
                          <div
                            className={classNames(
                              getThemeColor400(),
                              " l col-span-2  flex-col rounded-tl-md rounded-bl-md w-auto flex items-center justify-center text-white font-bold "
                            )}
                          >
                            {subTimer.length}
                            <div>mins</div>
                          </div>
                          <div className="bg-white w-full col-span-4 flex items-center justify-center font-bold text-gray-700 rounded-tr-md rounded-br-md  text-xl">
                            {" "}
                            {subTimer.type}
                          </div>
                        </div>
                      );
                    }
                  })}
                  <button
                    onClick={() => setOpenNew(true)}
                    className={classNames(
                      " bg-slate-300 text-center text-white hover:brightness-75 text-xl flex items-center justify-center w-full h-14  rounded-md font-bold"
                    )}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/3 mx-8 t-0 min-h-full h-full  flex items-center justify-center px-5 col-span-5 flex-col gap-4 my-10">
          <div
            className={classNames(
              timer.isDarkMode
                ? " bg-notionDark-100"
                : "bg-white border-2 border-dashed",
              "h-auto max-w-md p-8 mx-8  rounded-lg outline-offset-8"
            )}
          >
            <ViewTimer {...timer} />
          </div>

          <label className="font-bold text-lg mt-2"> Embedd Link </label>
          <div className="max-w-lg w-full grid grid-cols-6 gap-0 no-wrap text-clip h-12 bg-gray-white rounded-md mb-12">
            <div className="flex bg-white border-2 items-center px-4 justify-start max-w-fit no-wrap break-normal col-span-5  text-md  overflow-x-auto space-x-8">
              {viewLink.replaceAll("-", "-\u2060")}
            </div>
            <button
              className={classNames(
                getThemeColor900(),
                "w-full flex items-center col-span-1 justify-center"
              )}
              onClick={() => {
                navigator.clipboard
                  .writeText(
                    "https://goal-climber.com/timer/view/" + params.timerId
                  )
                  .then(
                    function () {
                      console.log(
                        "Async: Copying to clipboard was successful!"
                      );
                    },
                    function (err) {
                      console.error("Async: Could not copy text: ", err);
                    }
                  );
              }}
            >
              <FaLink className="fill-white" />
            </button>
            <ToggleLoading />
          </div>
        </div>
      </div>
    </>
  );
}
