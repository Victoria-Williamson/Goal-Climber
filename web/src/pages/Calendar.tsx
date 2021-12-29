import Calendar from "../components/calendar/Calendar";
import { useState } from "react";
import { dateInfoInterface } from "../interfaces/Calendar";
import React, { ReactNode, SyntheticEvent, useEffect } from "react";
import { gapi, loadAuth2 } from "gapi-script";
interface userInterface {
  name: string;
  profileImage: string;
}
export default function CalendarPage() {
  const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [dateInfo, setDateInfo] = useState<dateInfoInterface>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    numDays: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      0
    ).getDate(),
    firstDay: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    ).getDay(),
    id: "",
  });

  const [user, setUser] = useState({
    name: "",
    profileImg: "",
    id: "",
  });
  function authenticate() {
    return gapi.auth2
      .getAuthInstance()
      .signIn({
        scope:
          "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly",
      })
      .then(
        function () {
          console.log("Sign-in successful");
        },
        function (err: any) {
          console.error("Error signing in", err);
        }
      );
  }
  function loadClient() {
    gapi.client.setApiKey(process.env.REACT_APP_API_KEY);
    return gapi.client
      .load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
      .then(
        function () {
          console.log("GAPI client loaded for API");
        },
        function (err: any) {
          console.error("Error loading GAPI client for API", err);
        }
      );
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.calendar.calendarList.list({}).then(
      function (response: any) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
      },
      function (err: any) {
        console.error("Execute error", err);
      }
    );
  }
  gapi.load("client:auth2", function () {
    gapi.auth2.getAuthInstance({
      client_id: process.env.REACT_APP_CLIENT_ID ?? "",
    });
  });
  const updateUser = (currentUser: any) => {
    const name = currentUser.getBasicProfile().getName();
    const profileImg = currentUser.getBasicProfile().getImageUrl();
    const id = currentUser.getBasicProfile().getId();
    setUser({
      name: name,
      profileImg: profileImg,
      id: id,
    });
  };

  function goBack() {
    var date = new Date(new Date().setMonth(dateInfo.month));
    var datewYear = new Date(date).setFullYear(dateInfo.year);
    var newDate = new Date(datewYear).setMonth(dateInfo.month - 1);
    setDateInfo({
      month: new Date(newDate).getMonth(),
      year: new Date(newDate).getFullYear(),
      numDays: new Date(
        new Date(newDate).getFullYear(),
        new Date(newDate).getMonth(),
        0
      ).getDate(),
      firstDay: new Date(
        new Date(newDate).getFullYear(),
        new Date(newDate).getMonth(),
        1
      ).getDay(),
      id: "",
    });
  }

  function goForward() {
    var date = new Date(new Date().setMonth(dateInfo.month));
    var datewYear = new Date(date).setFullYear(dateInfo.year);
    var newDate = new Date(datewYear).setMonth(dateInfo.month + 1);
    setDateInfo({
      month: new Date(newDate).getMonth(),
      year: new Date(newDate).getFullYear(),
      numDays: new Date(
        new Date(newDate).getFullYear(),
        new Date(newDate).getMonth(),
        0
      ).getDate(),
      firstDay: new Date(
        new Date(newDate).getFullYear(),
        new Date(newDate).getMonth(),
        1
      ).getDay(),
      id: "",
    });
  }
  return (
    <div className="h-screen w-screen flex flex-col p-8 gap-0 items-center justify-center ">
      <button onClick={() => authenticate().then(loadClient)}>
        authorize and load
      </button>
      <button onClick={() => execute()}>execute</button>

      <div className="flex flex-row mt-10">
        <button onClick={() => goBack()}> back </button>
        <div className="text-6xl font-bold px-5">
          {MONTH_NAMES[dateInfo.month]}{" "}
          <div className="font-medium"> {dateInfo.year} </div>
        </div>
        <button onClick={() => goForward()}> forward </button>
      </div>

      <Calendar {...dateInfo} {...user} />
    </div>
  );
}
