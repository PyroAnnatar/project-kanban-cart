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
      const isTouch = window.matchMedia("(pointer:coarse)").matches;
      const isMouse = window.matchMedia("(pointer:fine)").matches;

      console.log("Has touchy pointy", isTouch);
      console.log("Has mousey", isMouse);

      setIsTouchy(isTouch && !isMouse);
    }
    checkDevice();

    const touchQ = window.matchMedia("(pointer:coarse)");
    const mouseQ = window.matchMedia("(pointer:fine)");

    touchQ.addEventListener("change", checkDevice);
    mouseQ.addEventListener("change", checkDevice);

    return () => {
      touchQ.removeEventListener("change", checkDevice);
      mouseQ.removeEventListener("change", checkDevice);
    };
  }, []);

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
