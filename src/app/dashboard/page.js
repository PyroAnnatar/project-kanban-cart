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
      const isMobileOrTablet =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      const isTouchOnly = window.matchMedia("(pointer:coarse)").matches;

      console.log("Is mobile/tablet", isMobileOrTablet);
      console.log("Is touchey-only device", isTouchOnly);

      setIsTouchy(isMobileOrTablet || isTouchOnly);
    }
    checkDevice();

    window.addEventListener("resize", checkDevice);
    return () => removeEventListener("resize", checkDevice);
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
