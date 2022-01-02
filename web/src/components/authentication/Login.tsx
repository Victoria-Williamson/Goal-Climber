import { useState, useEffect } from "react";
import logo from "../../logos/Logo-with-Title.svg";
import * as EmailValidator from "email-validator";
import { inputError } from "../../interfaces/Auth";
import { Link, Navigate, useNavigate } from "react-router-dom";

interface User {
  idToken: string;
  localId: string;
}
export default function Login() {
  function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(" ");
  }

  const [login, setLogin] = useState({
    email: "",
    validEmail: true,
    password: "",
    validPassword: true,
  });

  const [user, setUser] = useState(undefined);
  const [errorMsg, setError] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    // storing input name
    var temp = window.localStorage.getItem("uid");

    if (temp !== undefined && temp !== null) {
      navigate("/dashboard");
    }
  }, [user]);

  function EmailError() {
    if (login.email !== "" && !EmailValidator.validate(login.email)) {
      return <div className="text-red-700 text-xs"> Invalid Email </div>;
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

  function doLogin() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: login.email,
      password: login.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("http://localhost:5500/auth/login", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const resultObj = JSON.parse(result);
        console.log(resultObj);
        // Input Error
        if (resultObj.errors !== null && resultObj.errors !== undefined) {
          resultObj.errors.forEach((error: inputError) => {
            if (error.param === "email") {
              setLogin({ ...login, validEmail: false });
            } else {
              setLogin({ ...login, validPassword: false });
            }
          });
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
          // setUser(resultObj);
          window.localStorage.setItem("uid", resultObj.localId);
          window.localStorage.setItem("token", resultObj.idToken);
          navigate("/dashboard");
        }
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div className="bg-white rounded-xl flex flex-col  items-center  justify-center p-8 h-auto w-full max-w-md smd:border-2 border-gray-100 gap-1">
      <img src={logo} className="h-48 w-auto" alt="logo" />

      <Error />
      <div className="flex flex-col items-start justify-center gap-2 text-slate-700 w-5/6">
        <label
          className={classNames(
            !login.validEmail ? "text-red-700" : "text-slate-700 ",
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
            setLogin({
              ...login,
              email: e.target.value,
              validEmail: EmailValidator.validate(e.target.value),
            })
          }
          className={classNames(
            !login.validEmail
              ? "border-red-700 bg-red-100 text-red-700 placeholder-red-600 "
              : "border-gray-400 focus:border-violet-700 bg-blueGray-100 text-gray-500 ",
            "appearance-none  h-12 rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-2"
          )}
        />
        <EmailError />
      </div>

      <div className="flex flex-col items-start justify-center gap-2 text-gray-700 w-5/6">
        <label> Password </label>
        <input
          placeholder="Password"
          type="password"
          onChange={(e) =>
            setLogin({
              ...login,
              password: e.target.value,
              validPassword: e.target.value.length > 0,
            })
          }
          className="bg-blueGray-100 appearance-none  h-12 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none border-gray-400 focus:border-violet-700 focus:border-2"
        />
      </div>
      <br />

      <button
        className={classNames(
          login.validEmail &&
            login.email.length > 0 &&
            login.validPassword &&
            login.password
            ? "p-2 w-1/2 text-white bg-violet-800 rounded-lg bg-gradient-to-r hover:from-violet-800 via-purple-800 to-pink-800 text-lg font-bold"
            : "p-2 w-1/2 text-white bg-gray-400 rounded-lg text-lg font-bold"
        )}
        onClick={() => doLogin()}
      >
        {" "}
        Log In{" "}
      </button>
      <br />

      <button className=" text-violet-700">
        {" "}
        <Link to="/signup"> Need an Account? Sign Up</Link>
      </button>
      <button className=" italic">
        {" "}
        <Link to="/reset"> Forgot Password</Link>
      </button>
    </div>
  );
}
