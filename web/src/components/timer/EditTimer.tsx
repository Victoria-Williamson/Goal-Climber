import ViewTimer from "./ViewTimer";
import { useState, useEffect, useCallback, Fragment, useRef } from "react";
import { Timer, subTimer } from "../../interfaces/Timer";
import { useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { FaCopy, FaLink, FaPlus } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./styles.css";
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

  console.log(timer);
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
        console.log(data);
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

  if (!isLoaded) {
    return (
      <div className="h-full w-full items-center justify-center">
        {" "}
        Is Loading
      </div>
    );
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
              <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg--100 sm:mx-0 sm:h-10 sm:w-10 bg-violet-100">
                      <AiFillEdit
                        className="h-6 w-6 text--600 text-violet-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-xl leading-6 font-medium text-gray-900"
                      >
                        Edit Sub Timer
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-lg text-gray-500">
                          Edit a previously existing Sub Timer
                        </p>
                        <div className="w-full flex flex-col items-center mt-3 justify-center gap-2">
                          <div className="flex flex-col  items-start justify-center gap-2 text-gray-700 w-full">
                            <label> Type </label>
                            <select
                              value={type}
                              onChange={(e) => {
                                setEditType(e.target.value);
                              }}
                              className="bg-white appearance-none  col-span-5 h-12 rounded w-full py-2 px-4 text-gray-500 leading-tight border-gray-400 focus:outline-none border-2 focus:border-violet-800 focus:border--700 focus:border-2"
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
                              className="bg-white appearance-none  h-12 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none border-gray-400 border-2 hover:border-violet-500 focus:border--700 focus:border-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3  gap-2 flex items-center w-full  justify-center flex-col  pt-5 pb-4 sm:p-6 sm:pb-4">
                  <button
                    type="button"
                    className="w-full h-12 inline-flex  items-center justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-violet-600 text-base font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring--500 sm:ml-3  sm:text-sm"
                    onClick={() => editSubTimer()}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="w-full h-12 inline-flex items-center justify-center rounded-md shadow-sm px-4 py-2 bg-white border-2 border-violet-600 text-base font-medium text-violet-600 hover:bg-violet-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring--500 sm:ml-3  sm:text-sm"
                    onClick={() => {
                      deletesubTimer(editTimer);
                      setOpenEdit(false);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="w-full h-12 items-center inline-flex justify-center rounded-md border-2 border-gray-300 text-gray-500 shadow-sm px-4 py-2  text-base font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring--500 sm:ml-3  sm:text-sm"
                    onClick={() => setOpenEdit(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
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
              <div className="inline-block align-bottom bg-white rounded-lg text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg--100 sm:mx-0 sm:h-10 sm:w-10 bg-violet-100">
                      <FaPlus
                        className="h-6 w-6 text--600 text-violet-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-xl leading-6 font-medium text-gray-900"
                      >
                        Create new sub timer
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-lg text-gray-500">
                          Want to add onto this routine? Add a new subtimer
                        </p>
                        <div className="w-full flex flex-col items-center mt-3 justify-center gap-2">
                          <div className="flex flex-col  items-start justify-center gap-2 text-gray-700 w-full">
                            <label> Type </label>
                            <select
                              value={newSub.type}
                              onChange={(e) =>
                                setNewSub({
                                  ...newSub,
                                  type: e.target.value,
                                })
                              }
                              className="bg-white appearance-none  col-span-5 h-12 rounded w-full py-2 px-4 text-gray-500 leading-tight border-gray-400 focus:outline-none border-2 focus:border-violet-800 focus:border--700 focus:border-2"
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
                              className="bg-white appearance-none  h-12 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none border-gray-400 border-2 hover:border-violet-500 focus:border--700 focus:border-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-violet-600 text-base font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring--500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => addSubTimer()}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpenNew(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="flex flex-col lg:flex-row w-full h-full  gap-4 items-center justify-center overflow-hidden ">
        <div className="max-h-screen overflow-y-auto w-full h-full lg:min-h-screen bg-blueGray-100 pb-4 lg:w-1/3">
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
                        "col-span-1 h-full w-full",
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

        <div className="lg:w-2/3 w-full t-0 min-h-full h-full  flex items-center justify-center px-5 col-span-5 flex-col gap-4 my-10 ">
          <div className="text-2xl font-bold text-gray-700">Widget Preview</div>
          <div className="demoHeight   p-8 border-2 border-dashed rounded-lg outline-offset-8">
            <ViewTimer {...timer} />
          </div>
          <div className="w-full flex items-center lg:flex-row flex-col justify-center no-wrap px-8 gap-3">
            <button
              className={classNames(
                " bg-green-700 text-center text-white hover:brightness-75 brightness-100 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none text-lg max-w-xs lg:w-48 flex items-center justify-center w-full h-12  rounded-md font-bold"
              )}
              onClick={() => saveSubTimer()}
            >
              Save Changes
            </button>
            <button
              className={classNames(
                "bg-red-700",
                "text-center text-white hover:brightness-75 brightness-100 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none text-lg max-w-xs lg:w-48 flex items-center justify-center w-full h-12  rounded-md font-bold"
              )}
              onClick={() => deleteTimer()}
            >
              Delete Widget
            </button>
          </div>
          <label className="font-bold text-lg mt-2"> Embedd Link </label>
          <div className="max-w-lg w-full grid grid-cols-6 gap-0 no-wrap text-clip h-12 bg-gray-white rounded-md mb-12">
            <div className="flex bg-white border-2 items-center px-4 justify-start max-w-fit no-wrap break-normal col-span-5  text-md  overflow-x-auto space-x-8">
              {viewLink.replaceAll("-", "-\u2060")}
            </div>
            <button
              className={classNames(
                getThemeColor400(),
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
          </div>
        </div>
      </div>
    </>
  );
}
