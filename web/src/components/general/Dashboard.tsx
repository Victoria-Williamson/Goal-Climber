import { useEffect, useState, Fragment, useRef } from "react";
import { FiMenu } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { HiClock } from "react-icons/hi";
import { ExclamationIcon } from "@heroicons/react/outline";
import { RiAddFill } from "react-icons/ri";
import { Link, Navigate, useNavigate } from "react-router-dom";
interface Widget {
  type: string;
  wid: string;
  lastModified: string;
  name: string;
}

const emptyWidget = {
  type: "timer",
  wid: "",
  lastModified: "",
  name: "",
};
export default function Dashboard() {
  const [widgets, setWidgets] = useState<Array<Widget> | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newWidget, setNewWidget] = useState<Widget>(emptyWidget);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    const _id = localStorage.getItem("_id");
    fetch(`https://api.goal-climber.com/auth/get/widgets/${_id}`)
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => {
        setWidgets(data.widgets);
        setIsLoaded(true);
      });
  }, []);

  function createWidget() {
    // Change to only do this if selected timers when more widgets are added
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const _id = localStorage.getItem("_id");

    var raw = JSON.stringify({
      uid: localStorage.getItem("_id"),
      type: newWidget.type,
      name: newWidget.name,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    fetch("https://api.goal-climber.com/timer/create", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const resultObj = JSON.parse(result);
        // Input Error

        if (resultObj.errors !== null && resultObj.errors !== undefined) {
        } else {
          fetch(`https://api.goal-climber.com/auth/get/widgets/${_id}`)
            .then((response) => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
            .then((data) => {
              setWidgets(data.widgets);
              // setIsLoaded(true);
            });
        }
      });
  }
  return (
    <>
      <button
        className="bg-violet-900
             text-5xl text-white
             w-14 h-14 rounded-full mx-4 mb-8 flex text-center justify-center font-bold
             fixed
             inset-x-0
             bottom-0
             shadow-lg
             "
        onClick={() => setOpen(true)}
      >
        <RiAddFill className="h-full fill-white text-white w-auto p-4 " />
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
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
                        Create New Widget
                      </Dialog.Title>
                      <div className="mt-2 w-full">
                        <div className="flex flex-col  items-start justify-center gap-3 text-gray-700 w-full">
                          <label> Name </label>
                          <input
                            placeholder="Widget Name"
                            type={"text"}
                            value={newWidget.name}
                            onChange={(e) => {
                              setNewWidget({
                                ...newWidget,
                                name: e.target.value,
                              });
                            }}
                            className="border-gray-400 focus:border-violet-700 bg-blueGray-100 text-gray-500 
                    appearance-none  h-12 rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-2"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col  items-start justify-center gap-3 text-gray-700 w-full mt-4">
                        <label> Type </label>
                        <select
                          value={newWidget.type}
                          onChange={(e) => {
                            setNewWidget({
                              ...newWidget,
                              type: e.target.value,
                            });
                          }}
                          className="border-gray-400 focus:bri bg-blueGray-100 text-gray-500 
                    appearance-none  h-12 rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-2"
                        >
                          <option value="timer"> Timer</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 py-4 flex items-center justify-center gap-5 px-12">
                  <button
                    type="button"
                    className="border-gray-400 font-semibold text-lg text-white bg-violet-800 hover:brightness-75 rounded-lg 
                    appearance-none  h-auto  w-full py-3 px-4  leading-tight"
                    onClick={() => {
                      createWidget();
                      setOpen(false);
                    }}
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className=" font-semibold text-lg text-white bg-violet-500 hover:brightness-75 rounded-lg 
                    appearance-none  h-12  w-full py-3 px-4  leading-tight focus:outline-none   focus:border-2"
                    onClick={() => {
                      setOpen(false);
                    }}
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
      <div className="h-screen w-screen">
        <div className="flex items-center justify-center flex-col h-full w-full">
          <div className="w-full h-full items-center justify-center text-center ">
            <div className="w-screen   h-auto mt-5  px-0  grid grid-auto-rows  items-center justify-center md:px-14">
              <div className="w-full  h-full px-1 grid grid-rows-2 md:grid-cols-2 md:grid-rows-none mt-5 items-center  justify-center gap-4">
                <div className="flex items-center justify-start gap-3 md:max-w-md w-full">
                  <div className="text-lg font-semibold text-gray-500 w-24">
                    Filter by:
                  </div>

                  <select
                    value={"All"}
                    className="border-gray-400 focus:bri bg-blueGray-100 text-gray-500 
                    appearance-none  h-12 rounded  py-2 px-4 w-72 leading-tight focus:outline-none   focus:border-2"
                  >
                    <option value="timer"> All </option>
                  </select>
                </div>
                <div className="flex items-center justify-start gap-3  md:max-w-md w-full">
                  <div className="text-lg font-semibold text-gray-500 w-24">
                    Sort by:
                  </div>

                  <select
                    value={"All"}
                    className="border-gray-400 focus:bri bg-blueGray-100 text-gray-500 
                    appearance-none  h-12 rounded  py-2 px-4 w-72 leading-tight focus:outline-none   focus:border-2"
                  >
                    <option value="timer"> All </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center  rounded-lg flex-wrap  h-auto w-screen  p-4 gap-8 mt-8 lg:px-28">
              {widgets?.map((widget) => {
                if (widget.type === "timer") {
                  return (
                    <>
                      <button
                        key={widget.wid}
                        onClick={() => {
                          const link = "/timer/edit/" + widget.wid;
                          nav(link);
                        }}
                      >
                        <div className="hover:transform hover:scale-90 transition duration-500 ease-in-out w-screen max-w-sm mx-8 lg:mx-2  hover:brightness-90  h-64 grid grid-rows-6 rounded-lg shadow-md">
                          <div className=" row-span-4 bg-violet-200 rounded-t-lg p-5 flex items-center justify-center flex-col">
                            {" "}
                            <HiClock className="w-auto h-3/4 fill-violet-900" />
                          </div>
                          <div className="row-span-2  bg-white-100  rounded-b-lg items-start justify-start text-left p-6">
                            {" "}
                            <h1 className="font-bold"> {widget.name} </h1>
                            <h3> Last Modified: 2 days ago </h3>
                          </div>
                        </div>
                      </button>
                    </>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
