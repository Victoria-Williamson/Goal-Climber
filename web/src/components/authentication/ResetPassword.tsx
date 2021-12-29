import { useState } from "react";
import logo from "../../logos/Logo-with-Title.svg";
import * as EmailValidator from "email-validator";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(" ");
  }

  const [user, setuser] = useState({
    email: "",
    validEmail: true,
  });

  const [errorMsg, setError] = useState("");

  function EmailError() {
    if (user.email.length > 0 && !EmailValidator.validate(user.email)) {
      return <div className="text-red-700 text-xs"> Invalid Email. </div>;
    } else {
      return <></>;
    }
  }

  function Error() {
    var msg = errorMsg.replaceAll("_", " ").toLowerCase();

    msg = msg.charAt(0).toUpperCase() + msg.slice(1) + ".";

    if (errorMsg !== "") {
      return (
        <div className="text-red-700 text-md text-left"> Error: {msg} </div>
      );
    } else {
      return (
        <div className="text-gray-500 text-md"> Log in to get started </div>
      );
    }
  }

  function doReset() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
    };

    fetch(
      "https://goal-climb.herokuapp.com/auth/emailReset/" + user.email,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const resultObj = JSON.parse(result);
        // Input Error
        if (resultObj.errors !== null && resultObj.errors !== undefined) {
          setError("TRY_AGAIN_LATER");
        }
        // Firebase Error
        else if (
          resultObj.message !== null &&
          resultObj.message !== undefined
        ) {
          setError(resultObj.message);
        }
        // Login Sucessful
        else {
          console.log("password reset");
        }
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div className="bg-white rounded-xl flex flex-col  items-center  justify-center p-8 h-auto w-full max-w-md smd:border-2 border-gray-100 gap-5 px-10">
      <img src={logo} className="h-48 w-auto" alt="logo" />
      <div className="text-gray-500 text-md text-left">
        {" "}
        Please enter the email you created an account with.
      </div>

      <div className="flex flex-col items-start justify-center gap-2 text-slate-700 w-5/6">
        <label
          className={classNames(
            !user.validEmail ? "text-red-700" : "text-slate-700 ",
            "flex flex-col items-start justify-center gap-2 w-5/6"
          )}
        >
          {" "}
          Email{" "}
        </label>
        <input
          placeholder="Email"
          type={"email"}
          onChange={(e) =>
            setuser({
              ...user,
              email: e.target.value,
              validEmail: EmailValidator.validate(e.target.value),
            })
          }
          className={classNames(
            !user.validEmail
              ? "border-red-700 bg-red-100 text-red-700 placeholder-red-600 "
              : "border-gray-400 focus:border-violet-700 bg-blueGray-100 text-gray-500 ",
            "appearance-none  h-12 rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-2"
          )}
        />
        <EmailError />
      </div>

      <button
        className={classNames(
          user.validEmail && user.email.length > 0
            ? "p-2 w-1/2 text-white bg-violet-800 rounded-lg bg-gradient-to-r hover:from-violet-800 via-purple-800 to-pink-800 text-lg font-bold"
            : "p-2 w-1/2 text-white bg-gray-400 rounded-lg text-lg font-bold"
        )}
        onClick={() => doReset()}
      >
        {" "}
        Reset{" "}
      </button>
      <button className=" text-violet-700">
        {" "}
        <Link to="/login"> Sign in</Link>
      </button>
      <button className=" italic">
        {" "}
        <Link to="/signup"> Need an Account? Sign Up</Link>
      </button>
    </div>
  );
}
