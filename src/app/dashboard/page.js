"use client";
import React, { useEffect, useState } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import Sidebar from "../Sidebar";
import Boards from "../components/Boards";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("fakeToken");
    if (!token) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [router]);
  const [isTouchy, setIsTouchy] = useState(false);

  useEffect(() => {
    setIsTouchy("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);
  // function isTouchyDevice() {
  //   if (typeof window !== "undefined") {
  //     const isMobileOrTablet =
  //       /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  //         navigator.userAgent
  //       );
  //     return isMobileOrTablet;
  // console.log("Is mobile/tablet:", isMobileOrTablet);
  // const isTouchy = "ontouchstart" in window || navigator.maxTouchPoints;
  // console.log("is touchy", isTouchy);
  // return isTouchy;
  //   }
  //   return false;
  // }

  // const backend = isTouchyDevice() ? TouchBackend : HTML5Backend;
  // console.log("using", backend.name);
  if (isLoading) {
    return (
      <div className="bg-slate-400 min-h-screen flex justify-center items-center">
        <p className="text-white font-semibold">Loading..</p>
      </div>
    );
  }
  return (
    <DndProvider
      backend={isTouchy() ? TouchBackend : HTML5Backend}
      options={
        isTouchy()
          ? {
              enableMouseEvents: true,
              delay: 300,
              // delayTouchStart: 300,
              // touchSlop: 20,
            }
          : {}
      }
    >
      <div className="flex">
        <Sidebar />
        <Boards />
      </div>
    </DndProvider>
  );
};

export default Home;
