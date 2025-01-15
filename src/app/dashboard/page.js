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
    function checkDevice() {
      const isMobileWidth = window.innerWidth <= 768;
      console.log("Mobile Rocket Launcher", isMobileWidth);

      setIsTouchy(isMobileWidth);
    }
    checkDevice();

    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  console.log("Current iteration of hell:", isTouchy ? "Touchy" : "Mouse");

  if (isLoading) {
    return (
      <div className="bg-slate-400 min-h-screen flex justify-center items-center">
        <p className="text-white font-semibold">Loading..</p>
      </div>
    );
  }
  return (
    <DndProvider
      backend={isTouchy ? TouchBackend : HTML5Backend}
      options={
        isTouchy
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
