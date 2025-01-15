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
  const [key, setKey] = useState(0); // Add a key state

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    setIsTouchy(isMobile);

    let resizeTimer;
    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const shouldBeTouchy = window.innerWidth <= 768;
        if (shouldBeTouchy !== isTouchy) {
          setIsTouchy(shouldBeTouchy);
          setKey((prev) => prev + 1);
        }
      }, 250);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [isTouchy]);

  if (isLoading) {
    return (
      <div className="bg-slate-400 min-h-screen flex justify-center items-center">
        <p className="text-white font-semibold">Loading..</p>
      </div>
    );
  }

  return (
    <DndProvider
      key={`${isTouchy ? "touch" : "html5"}-${key}`}
      backend={isTouchy ? TouchBackend : HTML5Backend}
      options={
        isTouchy
          ? {
              enableMouseEvents: true,
              delay: 200,
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
