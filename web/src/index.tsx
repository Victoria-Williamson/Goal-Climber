import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import ResetPage from "./pages/Reset";
import CalendarPage from "./pages/Calendar";
import TimerPage from "./pages/Timer";
import EditTimerPage from "./pages/EditTimer";
import NavBar from "../src/components/general/NavBar";
import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/reset" element={<ResetPage />} />
        <Route path="/dashboard" element={<CalendarPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/timer" element={<TimerPage />} />
        <Route path="/timer/view/:timerId" element={<TimerPage />} />
        <Route path="/timer/edit/:timerId" element={<EditTimerPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
