import { useState } from "react";
import logo from "../../logos/Logo-with-Title.svg";
import * as EmailValidator from "email-validator";
import PasswordStrengthBar from "react-password-strength-bar";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { TailSpin } from "react-loader-spinner";

export default function SignUp() {
  function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(" ");
  }

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState({
    value: "",
    validEmail: true,
  });

  const [password, setPassword] = useState({
    value: "",
    confirm: "",
    validPassword: true,
    securePassword: true,
  });

  const nav = useNavigate();

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    firstError: false,
    lastError: false,
  });

  const [errorMsg, setError] = useState("");

  function EmailError() {
    if (email.value !== "" && !EmailValidator.validate(email.value)) {
      return <div className="text-red-700 text-xs"> Invalid Email. </div>;
    } else {
      return <></>;
    }
  }
  function ToggleLoading() {
    if (!loading) {
      return <></>;
    } else {
      return (
        <>
          <div className="w-screen h-min-h-full absolute   z-10 bg-gray-800 bg-opacity-75 transition-opacity"></div>
          <div className="absolute w-screen h-screen flex z-20 items-center justify-center flex-col gap-4">
            <div className="font-bold text-xl text-white"> Loading...</div>
            <TailSpin color={"white"} arialLabel="loading-indicator" />
          </div>{" "}
        </>
      );
    }
  }
  function isValidPassword(isConfirm: boolean, value: string) {
    if (!isConfirm) {
      return password.confirm === value && password.securePassword;
    } else {
      return password.value === value && password.securePassword;
    }
  }

  function PasswordError() {
    if (!password.validPassword) {
      if (!password.securePassword) {
        return (
          <div className="text-red-700 text-xs"> Password is not secure. </div>
        );
      } else {
        return (
          <div className="text-red-700 text-xs"> Passwords do not match </div>
        );
      }
    } else {
      return <></>;
    }
  }
  function FirstNameError() {
    if (userInfo.firstName.length === 0) {
      return <div className="text-red-700 text-xs"> Required. </div>;
    } else {
      return <></>;
    }
  }
  function LastNameError() {
    if (userInfo.lastName.length === 0) {
      return <div className="text-red-700 text-xs"> Required. </div>;
    } else {
      return <></>;
    }
  }

  function doSignUp() {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email.value,
      password: password.value,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("https://api.goal-climber.com/auth/register", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const resultObj = JSON.parse(result);
        setLoading(false);
        // Firebase Error
        if (resultObj.errors !== null && resultObj.errors !== undefined) {
          setError("Please make sure all inputs are filled");
        } else if (
          resultObj.message !== null &&
          resultObj.message !== undefined
        ) {
          setError(resultObj.message);
        }
        // Sign Up Sucessful
        else {
          console.log("user created");
          setError("");
        }
      })
      .catch((error) => console.log("error", error));
  }

  function Error() {
    var msg = errorMsg.replaceAll("_", " ").toLowerCase();

    msg = msg.charAt(0).toUpperCase() + msg.slice(1) + ".";

    if (errorMsg !== "") {
      return (
        <div className="text-red-700 text-lg text-left mb-2">
          {" "}
          Error: {msg}{" "}
        </div>
      );
    } else {
      return (
        <div className="text-gray-500 text-lg mb-2">
          {" "}
          Sign Up to get started{" "}
        </div>
      );
    }
  }
  return (
    <div className="w-screen  h-full flex items-center justify-center mx-12">
      <div className="mx-10 hidden h-full smd:grid md:grid-cols-2 md:justify-center md:items-center bg-white rounded-xl">
        <div>
          <div className="  flex flex-col  items-center  justify-center p-8 h-auto  gap-2 my-5">
            <div className="text-4xl mb-3  text-violet-800 ">
              {" "}
              Welcome to <text className="logoFont">Goal Climber </text>{" "}
            </div>
            <Error />
            <div className="flex flex-row items-start justify-center gap-2 text-gray-700 w-5/6">
              <div className="flex flex-col items-start justify-center gap-2 text-gray-700 w-5/6">
                <label> First Name</label>
                <input
                  placeholder="John"
                  type={"text"}
                  name="fName"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, firstName: e.target.value })
                  }
                  className={classNames(
                    userInfo.firstName.length === 0 && userInfo.firstError
                      ? "border-red-700 bg-red-100 placeholder-red-600 text-red-700"
                      : "border-gray-400 focus:border-violet-700 bg-blueGray-100 text-gray-500 ",
                    "appearance-none  h-12 rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-2"
                  )}
                />
                <FirstNameError />
              </div>

              <div className="flex flex-col items-start justify-center gap-2 text-gray-700 w-5/6">
                <label> Last Name</label>
                <input
                  placeholder="Doe"
                  type={"text"}
                  name="lName"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, lastName: e.target.value })
                  }
                  className={classNames(
                    userInfo.lastName.length === 0 && userInfo.lastError
                      ? "border-red-700 bg-red-100 placeholder-red-600 text-red-700"
                      : "border-gray-400 focus:border-violet-700 bg-blueGray-100 text-gray-500 ",
                    "appearance-none  h-12 rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-2"
                  )}
                />
                <LastNameError />
              </div>
            </div>

            <div
              className={classNames(
                !email.validEmail ? "text-red-700 " : "text-slate-700 ",
                "flex flex-col items-start justify-center gap-2 w-5/6"
              )}
            >
              <label> Email </label>
              <input
                placeholder="Email"
                type={"email"}
                onChange={(e) =>
                  setEmail({
                    ...email,
                    value: e.target.value,
                    validEmail: EmailValidator.validate(e.target.value),
                  })
                }
                className={classNames(
                  !email.validEmail
                    ? "border-red-700 bg-red-100 placeholder-red-600 text-red-700"
                    : "border-gray-400 focus:border-violet-700 bg-blueGray-100 text-gray-500 ",
                  "appearance-none  h-12 rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-2"
                )}
              />
              <EmailError />
            </div>

            <div
              className={classNames(
                !password.validPassword ? "text-red-700" : "text-slate-700 ",
                "flex flex-col items-start justify-center gap-2 w-5/6"
              )}
            >
              <label> Password </label>
              <input
                placeholder="Password"
                type="password"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    value: e.target.value,
                    validPassword: isValidPassword(false, e.target.value),
                  })
                }
                className={classNames(
                  !password.validPassword
                    ? "border-red-700 bg-red-100 text-red-700 placeholder-red-600 "
                    : "border-gray-400 focus:border-violet-700 bg-blueGray-100 text-gray-500 ",
                  "appearance-none  h-12 rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-2"
                )}
              />
              <PasswordStrengthBar
                password={password.value}
                onChangeScore={(score) =>
                  setPassword({ ...password, securePassword: score >= 2 })
                }
              />
            </div>

            <div
              className={classNames(
                !password.validPassword ? "text-red-700" : "text-slate-700 ",
                "flex flex-col items-start justify-center gap-2 w-5/6"
              )}
            >
              <label> Confirm Password </label>
              <input
                placeholder="Password"
                type="password"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    confirm: e.target.value,
                    validPassword: isValidPassword(true, e.target.value),
                  })
                }
                className={classNames(
                  !password.validPassword
                    ? "border-red-700 bg-red-100 text-red-700 placeholder-red-600 "
                    : "border-gray-400 focus:border-violet-700 bg-blueGray-100 text-gray-500 ",
                  "appearance-none  h-12 rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-2"
                )}
              />
              <PasswordError />
            </div>

            <br />
            <button
              disabled={
                email.validEmail &&
                email.value.length > 0 &&
                password.validPassword &&
                password.value.length > 0 &&
                userInfo.firstName.length > 0 &&
                userInfo.lastName.length > 0
              }
              className={classNames(
                email.validEmail &&
                  email.value.length > 0 &&
                  password.validPassword &&
                  password.value.length > 0 &&
                  userInfo.firstName.length > 0 &&
                  userInfo.lastName.length > 0
                  ? "p-4 w-1/2 text-white bg-violet-800 rounded-lg bg-gradient-to-r hover:bg-violet-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-lg font-bold"
                  : "p-4 w-1/2 text-white bg-violet-800 brightness-50 rounded-lg text-lg font-bold"
              )}
              onClick={() => doSignUp()}
            >
              {" "}
              Register{" "}
            </button>
            <br />
            <button className=" text-violet-700">
              {" "}
              <Link to="/login"> Have an Account? Sign in</Link>
            </button>
            <button className=" italic">
              {" "}
              <Link to="/reset"> Reset Password</Link>
            </button>
          </div>
        </div>
        <div className="flex items-center flex-col justify-center gap-4">
          <button onClick={() => nav("/")}>
            <img src={logo} className="h-72 w-auto" alt="logo" />
          </button>
        </div>
      </div>
      <div className="smd:hidden block h-full p-8 max-h-screen overflow-y-auto">
        <div className="bg-white overflow-y-auto h-full rounded-xl flex flex-col  items-center  justify-center px-8 py-10 w-screen max-w-md smd:border-2 border-gray-100 gap-1">
          <button onClick={() => nav("/")}>
            <img src={logo} className="h-48 w-auto" alt="logo" />
          </button>

          <Error />

          <div className="flex flex-col items-start justify-center gap-2 text-gray-700 w-5/6">
            <label> First Name</label>
            <input
              placeholder="John"
              type={"text"}
              name="fName"
              onChange={(e) =>
                setUserInfo({ ...userInfo, firstName: e.target.value })
              }
              className={classNames(
                userInfo.firstName.length === 0 && userInfo.firstError
                  ? "border-red-700 bg-red-100 placeholder-red-600 text-red-700"
                  : "border-gray-400 focus:border-violet-700 bg-blueGray-100 text-gray-500 ",
                "appearance-none  h-12 rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-2"
              )}
            />
            <FirstNameError />
          </div>

          <div className="flex flex-col items-start justify-center gap-2 text-gray-700 w-5/6">
            <label> Last Name</label>
            <input
              placeholder="Doe"
              type={"text"}
              name="lName"
              onChange={(e) =>
                setUserInfo({ ...userInfo, lastName: e.target.value })
              }
              className={classNames(
                userInfo.lastName.length === 0 && userInfo.lastError
                  ? "border-red-700 bg-red-100 placeholder-red-600 text-red-700"
                  : "border-gray-400 focus:border-violet-700 bg-blueGray-100 text-gray-500 ",
                "appearance-none  h-12 rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-2"
              )}
            />
            <LastNameError />
          </div>

          <div
            className={classNames(
              !email.validEmail ? "text-red-700 " : "text-slate-700 ",
              "flex flex-col items-start justify-center gap-2 w-5/6"
            )}
          >
            <label> Email </label>
            <input
              placeholder="Email"
              type={"email"}
              onChange={(e) =>
                setEmail({
                  ...email,
                  value: e.target.value,
                  validEmail: EmailValidator.validate(e.target.value),
                })
              }
              className={classNames(
                !email.validEmail
                  ? "border-red-700 bg-red-100 placeholder-red-600 text-red-700"
                  : "border-gray-400 focus:border-violet-700 bg-blueGray-100 text-gray-500 ",
                "appearance-none  h-12 rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-2"
              )}
            />
            <EmailError />
          </div>

          <div
            className={classNames(
              !password.validPassword ? "text-red-700" : "text-slate-700 ",
              "flex flex-col items-start justify-center gap-2 w-5/6"
            )}
          >
            <label> Password </label>
            <input
              placeholder="Password"
              type="password"
              onChange={(e) =>
                setPassword({
                  ...password,
                  value: e.target.value,
                  validPassword: isValidPassword(false, e.target.value),
                })
              }
              className={classNames(
                !password.validPassword
                  ? "border-red-700 bg-red-100 text-red-700 placeholder-red-600 "
                  : "border-gray-400 focus:border-violet-700 bg-blueGray-100 text-gray-500 ",
                "appearance-none  h-12 rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-2"
              )}
            />
            <PasswordStrengthBar
              password={password.value}
              onChangeScore={(score) =>
                setPassword({ ...password, securePassword: score >= 2 })
              }
            />
          </div>

          <div
            className={classNames(
              !password.validPassword ? "text-red-700" : "text-slate-700 ",
              "flex flex-col items-start justify-center gap-2 w-5/6"
            )}
          >
            <label> Confirm Password </label>
            <input
              placeholder="Password"
              type="password"
              onChange={(e) =>
                setPassword({
                  ...password,
                  confirm: e.target.value,
                  validPassword: isValidPassword(true, e.target.value),
                })
              }
              className={classNames(
                !password.validPassword
                  ? "border-red-700 bg-red-100 text-red-700 placeholder-red-600 "
                  : "border-gray-400 focus:border-violet-700 bg-blueGray-100 text-gray-500 ",
                "appearance-none  h-12 rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-2"
              )}
            />
            <PasswordError />
          </div>

          <br />
          <button
            className={classNames(
              email.validEmail &&
                email.value.length > 0 &&
                password.validPassword &&
                password.value &&
                userInfo.firstName.length > 0 &&
                userInfo.lastName.length > 0
                ? "p-2 w-1/2 text-white bg-violet-800 rounded-lg bg-gradient-to-r hover:bg-violet-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-lg font-bold"
                : "p-2 w-1/2 text-white bg-violet-800 brightness-50 rounded-lg text-lg font-bold"
            )}
            onClick={() => doSignUp()}
          >
            {" "}
            Register{" "}
          </button>
          <br />
          <button className=" text-violet-700">
            {" "}
            <Link to="/login"> Have an Account? Sign in</Link>
          </button>
          <button className=" italic">
            {" "}
            <Link to="/reset"> Reset Password</Link>
          </button>
          <ToggleLoading />
        </div>
      </div>
    </div>
  );
}
