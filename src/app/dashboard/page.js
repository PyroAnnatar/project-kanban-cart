"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
// import { SortableContext } from "@dnd-kit/sortable";
import Sidebar from "../Sidebar";
import Boards from "../components/Boards";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  // const [isTouchy, setIsTouchy] = useState(false);
  const boardsRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("fakeToken");
    if (!token) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  // useEffect(() => {
  //   const isMobile = window.innerWidth <= 768;
  //   setIsTouchy(isMobile);

  //   let resizeTimer;
  //   function handleResize() {
  //     clearTimeout(resizeTimer);
  //     resizeTimer = setTimeout(() => {
  //       const shouldBeTouchy = window.innerWidth <= 768;
  //       if (shouldBeTouchy !== isTouchy) {
  //         setIsTouchy(shouldBeTouchy);
  //         // setKey((prev) => prev + 1);
  //       }
  //     }, 250);
  //   }

  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //     clearTimeout(resizeTimer);
  //   };
  // }, [isTouchy]);

  if (isLoading) {
    return (
      <div className="bg-slate-400 min-h-screen flex justify-center items-center">
        <p className="text-white font-semibold">Loading..</p>
      </div>
    );
  }

  return (
    <DndContext
      // key={`${isTouchy ? "touch" : "html5"}-${key}`}
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={(event) => boardsRef.current?.handleDragStart(event)}
      onDragEnd={(event) => boardsRef.current?.handleDragEnd(event)}
    >
      <div className="flex">
        <Sidebar />
        <Boards ref={boardsRef} />
      </div>
    </DndContext>
  );
};

export default Home;
