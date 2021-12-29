import { dateInfoInterface } from "../../interfaces/Calendar";
import { gapi, loadAuth2 } from "gapi-script";
import useScript from "../../hooks/Gapi";
export default function Calendar(props: dateInfoInterface) {
  useScript();
  const days = [];

  for (var i = 0; i < 5; i++) {
    days.push(
      0 + i * 7,
      1 + i * 7,
      2 + i * 7,
      3 + i * 7,
      4 + i * 7,
      5 + i * 7,
      6 + i * 7
    );
  }
  const DAYSOFWEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="p-4 h-full w-full">
      <div className="grid grid-cols-7 grid-rows-6 w-full  h-full p-5  text-gray-500 justify-center items-center font-bold">
        {DAYSOFWEEK.map((day) => {
          return (
            <div className="flex items-center justify-center text-lg">
              {" "}
              {day}{" "}
            </div>
          );
        })}

        {days.map((day) => {
          const calculateDay = day - props.firstDay + 1;

          // Need Top Border
          if (day < 7) {
            if (calculateDay < 1) {
              if (day === 0)
                return (
                  <div
                    key={day}
                    className=" border-y-2 border-l-2 border-gray-400 h-full w-full p-2"
                  ></div>
                );
              else if (day === 6) {
                return (
                  <div
                    key={day}
                    className=" border-gray-400 border-x-2 border-t-2 h-full w-full p-2"
                  ></div>
                );
              } else {
                return (
                  <div
                    key={day}
                    className="border-l-2 border-t-2 border-gray-400 h-full w-full p-2"
                  ></div>
                );
              }
            } else if (day === 0)
              return (
                <div
                  key={day}
                  className=" border-y-2 border-l-2 border-gray-400 h-full w-full p-2"
                >
                  {calculateDay}
                </div>
              );
            else if (day === 6) {
              return (
                <div
                  key={day}
                  className=" border-gray-400 border-x-2 border-t-2 h-full w-full p-2"
                >
                  {calculateDay}
                </div>
              );
            } else {
              return (
                <div
                  key={day}
                  className="border-l-2 border-t-2 border-gray-400 h-full w-full p-2"
                >
                  {calculateDay}
                </div>
              );
            }
          }
          if (day < 28) {
            if (day % 7 === 0)
              return (
                <div
                  key={day}
                  className=" border-b-2 border-l-2 border-gray-400 h-full w-full p-2"
                >
                  {calculateDay}
                </div>
              );
            else if (day === 13 || day === 20 || day === 27) {
              return (
                <div
                  key={day}
                  className=" border-gray-400 border-x-2 border-t-2 h-full w-full p-2"
                >
                  {calculateDay}
                </div>
              );
            } else {
              return (
                <div
                  key={day}
                  className="border-l-2 border-t-2 border-gray-400 h-full w-full p-2"
                >
                  {calculateDay}
                </div>
              );
            }
          } else {
            if (calculateDay >= props.numDays) {
              if (day === 28)
                return (
                  <div
                    key={day}
                    className=" border-b-2 border-l-2 border-gray-400 h-full w-full p-2"
                  ></div>
                );
              else if (day === 34) {
                return (
                  <div
                    key={day}
                    className=" border-gray-400 border-x-2 border-b-2 border-t-2 h-full w-full p-2"
                  ></div>
                );
              } else {
                return (
                  <div
                    key={day}
                    className="border-l-2 border-t-2 border-b-2 border-gray-400 h-full w-full p-2"
                  ></div>
                );
              }
            } else if (day === 28)
              return (
                <div
                  key={day}
                  className=" border-b-2 border-l-2 border-gray-400 h-full w-full p-2"
                >
                  {calculateDay}
                </div>
              );
            else if (day === 34) {
              return (
                <div
                  key={day}
                  className=" border-gray-400 border-x-2 border-b-2 border-t-2 h-full w-full p-2"
                >
                  {calculateDay}
                </div>
              );
            } else {
              return (
                <div
                  key={day}
                  className="border-l-2 border-t-2 border-b-2 border-gray-400 h-full w-full p-2"
                >
                  {calculateDay}
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
}
