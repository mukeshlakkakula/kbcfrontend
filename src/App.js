// src/App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuestionScreen from "./components/QuestionScreen";
import MobileScreen from "./components/MobileScreen";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={QuestionScreen} />
        <Route path="/mobile" Component={MobileScreen} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
