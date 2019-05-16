import React from "react";
import NavBar from "./components/navBar";
import Blog from "./components/blog";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Blog />
    </div>
  );
}

export default App;
