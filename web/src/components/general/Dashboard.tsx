import { useEffect, useState } from "react";
import { HiClock } from "react-icons/hi";
import { Link, Navigate, useNavigate } from "react-router-dom";
interface Widget {
  type: string;
  wid: string;
  lastModified: string;
  name: string;
}
export default function Dashboard() {
  const [widgets, setWidgets] = useState<Array<Widget> | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const _id = localStorage.getItem("_id");
    fetch(`https://api.goal-climer.com/auth/get/widgets/${_id}`)
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => {
        setWidgets(data.widgets);
        setIsLoaded(true);
      });
  }, []);
  return (
    <div className="h-screen w-screen p-4">
      <div className="flex items-center justify-center flex-col px-4 h-full w-full">
        <div className="w-full h-full p-4">
          <h1 className="font-bold text-3xl mb-8"> Your Widgets</h1>
          <div className="flex rounded-lg  h-1/2 justify-center items-center md:justify-start md:items-start  p-4 flex-row flex-wrap gap-8">
            {widgets?.map((widget) => {
              if (widget.type === "timer") {
                return (
                  <>
                    <button
                      onClick={() => {
                        const link = "/timer/edit/" + widget.wid;
                        nav(link);
                      }}
                    >
                      <div className=" w-96 h-64 grid grid-rows-6 rounded-2xl shadow-lg">
                        <div className="row-span-4 bg-violet-300 rounded-t-xl p-5 flex items-center justify-center flex-col">
                          {" "}
                          <HiClock className="w-auto h-3/4 fill-violet-900" />
                        </div>
                        <div className="row-span-2  bg-white-100 p-4 rounded-b-xl items-start justify-start text-left">
                          {" "}
                          <h1 className="font-black"> {widget.name} </h1>
                          <h3> Last Modified: XX days ago </h3>
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
