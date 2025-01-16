"use client";
import React from "react";
import Sidebar from "../Sidebar";
import Boards from "../components/Boards";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

const Home = () => {
  return (
    // <DndProvider backend={HTML5Backend}>
    <div className="flex">
      <Sidebar />
      <Boards />
    </div>
    // </DndProvider>
  );
};

export default Home;
