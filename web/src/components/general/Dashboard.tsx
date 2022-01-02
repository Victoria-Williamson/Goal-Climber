import { HiClock } from "react-icons/hi";
import { Link, Navigate, useNavigate } from "react-router-dom";
interface Widget {
  type: string;
  wid: string;
  lastModified: string;
  title: string;
}
export default function Dashboard() {
  const nav = useNavigate();
  const sampleWidgets: Array<Widget> = [
    {
      type: "timer",
      wid: "61d0e400080ad924007aeda7",
      title: "Studying",
      lastModified: "56 days",
    },
    {
      type: "timer",
      wid: "61d0e400080ad924007aeda7",
      title: "Journaling",
      lastModified: "56 days",
    },
  ];
  return (
    <div className="h-screen w-screen p-4">
      <div className="flex items-center justify-center flex-col px-4 h-full w-full">
        <div className="w-full h-full p-4">
          <h1 className="font-bold text-3xl mb-8"> Your Widgets</h1>
          <div className="flex rounded-lg  h-1/2 justify-center items-center md:justify-start md:items-start  p-4 flex-row flex-wrap gap-8">
            {sampleWidgets.map((widget) => {
              if (widget.type === "timer") {
                return (
                  <>
                    <button
                      onClick={() => {
                        const link = "/timer/edit/" + widget.wid;
                        nav(link);
                      }}
                    >
                      <div className="w-72 h-64 grid grid-rows-6 rounded-2xl shadow-lg">
                        <div className="row-span-4 bg-violet-300 rounded-t-xl p-5 flex items-center justify-center flex-col">
                          {" "}
                          <div className="text-2xl font-bold text-violet-900">
                            {" "}
                            Timer Widget{" "}
                          </div>
                          <HiClock className="w-auto h-full fill-violet-900" />
                        </div>
                        <div className="row-span-2  bg-white-100 p-4 rounded-b-xl">
                          {" "}
                          <h1 className="font-black"> {widget.title} </h1>
                          <h3> Last Modified: {widget.lastModified} ago </h3>
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
  );
}
