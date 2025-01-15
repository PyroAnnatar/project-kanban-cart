import React, { useRef, useState } from "react";
import mock from "../mock";
import TaskDetails from "./TaskDetails";
import Board from "./Board";

const taskTemplate = {
  title: {
    text: "Operasyon Birimi",
    color: "#F38744",
  },
  description:
    "Bu örnek görevdir. Örnek görevin içeriğine dair açıklama detail’da bulunmaktadır.",
  date: "05.02.2024-10.02.2024",
  milestone: "Milestone Name",
  priority: "green",
  people: [
    {
      name: "p1",
      photo: "/p1.png",
    },
    {
      name: "p2",
      photo: "/p2.png",
    },
  ],
};

const Boards = () => {
  const [projects, setProjects] = useState(mock);
  const [modalAddOpen, setmodalAddOpen] = useState(false);
  const [modalDetailsOpen, setModalDetailsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
  });
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  function taskSelect(task) {
    setSelectedTask(task);
    setModalDetailsOpen(true);
  }

  function taskDeselect() {
    setSelectedTask(null);
    setModalDetailsOpen(false);
  }

  function handleTaskDrop(taskId, sourceProjectId, targetProjectId) {
    if (sourceProjectId === targetProjectId) return;
    setProjects((prevProjects) => {
      const newProjects = [...prevProjects];
      const sourceProject = newProjects.find(
        (p) => p.title === sourceProjectId
      );
      const targetProject = newProjects.find(
        (p) => p.title === targetProjectId
      );
      if (!sourceProject || !targetProject) return prevProjects;
      const taskIndex = sourceProject.tasks.findIndex(
        (t) => t.title.text === taskId
      );
      if (taskIndex === -1) return prevProjects;
      const [task] = sourceProject.tasks.splice(taskIndex, 1);
      targetProject.tasks.push(task);
      return newProjects;
    });
  }

  function handleMouseDown(e) {
    if (
      sliderRef.current.contains(e.target) &&
      !e.target.closest(".task") &&
      !e.target.closest("button")
    ) {
      e.preventDefault();
      setIsDragging(true);
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  }

  function handleTouchStart(e) {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartX(touch.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  }

  function handleTouchMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const x = touch.pageX - sliderRef.current.offsetLeft;
    const walk = x - startX;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  }

  function handleMouseLeave() {
    setIsDragging(false);
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = x - startX;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  }

  function handleChange(e) {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setProjects([...projects, { ...newProject, tasks: [], notifications: 0 }]);
    setNewProject({ title: "", description: "" });
    setmodalAddOpen(false);
  }

  // function handleAddTask(projectTitle, newTaskTitle) {
  //   setProjects((prev) => {
  //     const dummy = prev[0];
  //     return prev.map((project) =>
  //       project.title === projectTitle
  //         ? {
  //             ...(project.tasks && project.tasks.length > 0 ? project : dummy),
  //             title: project.title,
  //             tasks: [
  //               ...(project.tasks && project.tasks.length > 0
  //                 ? project.tasks
  //                 : ""),
  //               {
  //                 ...(project.tasks && project.tasks.length > 0
  //                   ? project.tasks[0]
  //                   : dummy.tasks[0]),
  //                 title: {
  //                   ...(project.tasks?.[0]?.title || dummy.tasks[0].title),
  //                   text: newTaskTitle,
  //                 },
  //               },
  //             ],
  //           }
  //         : project
  //     );
  //   });
  // }

  function handleAddTask(projectTitle, newTaskTitle) {
    setProjects((prev) => {
      return prev.map((project) =>
        project.title === projectTitle
          ? {
              ...project,
              tasks: [
                ...(project.tasks && project.tasks.length > 0
                  ? project.tasks
                  : []),
                {
                  ...taskTemplate,
                  title: {
                    ...taskTemplate.title,
                    text: newTaskTitle,
                  },
                },
              ],
            }
          : project
      );
    });
  }

  function handleDelete(task) {
    setProjects((prev) => {
      return prev.map((project) => ({
        ...project,
        tasks: project.tasks.filter((t) => {
          if (t.title.text === "Operasyon Birimi") return true;
          return t.title.text !== task.title.text;
        }),
      }));
    });
    setModalDetailsOpen(false);
  }

  return (
    <div className="min-h-screen w-full flex flex-col gap-2 sm:gap-4 bg-[#F3F6FD] p-2 sm:p-4 md:p-8 overflow-x-hidden">
      <h1 className="text-[#145389] text-lg sm:text-[22px] font-semibold pt-14 md:pt-10 lg:pt-0">
        Frontend Case
      </h1>
      <ul className="flex flex-wrap sm:flex-nowrap overflow-x-auto">
        <li className="border border-[#D0D5DD] bg-white hover:bg-[#ececec] transition-colors duration-500 rounded-l-md text-sm sm:text-base">
          <a href="" className="block p-1 sm:p-2">
            Boards
          </a>
        </li>
        <li className="border border-[#D0D5DD] bg-white hover:bg-[#ececec] transition-colors duration-500 text-sm sm:text-base">
          <a href="" className="block p-1 sm:p-2">
            List
          </a>
        </li>
        <li className="border border-[#D0D5DD] bg-white hover:bg-[#ececec] transition-colors duration-500 text-sm sm:text-base">
          <a href="" className="block p-1 sm:p-2">
            Other
          </a>
        </li>
        <li className="border border-[#D0D5DD] bg-white hover:bg-[#ececec] transition-colors duration-500 text-sm sm:text-base">
          <a href="" className="block p-1 sm:p-2">
            Other
          </a>
        </li>
        <li className="border border-[#D0D5DD] bg-white hover:bg-[#ececec] transition-colors duration-500 text-sm sm:text-base">
          <a href="" className="block p-1 sm:p-2">
            Other
          </a>
        </li>
        <li className="border border-[#D0D5DD] bg-white hover:bg-[#ececec] transition-colors duration-500 text-sm sm:text-base">
          <a href="" className="block p-1 sm:p-2">
            Other
          </a>
        </li>
        <li className="border border-[#D0D5DD] bg-white hover:bg-[#ececec] transition-colors duration-500 rounded-r-md text-sm sm:text-base">
          <a href="" className="block p-1 sm:p-2">
            Other
          </a>
        </li>
      </ul>
      <ul
        className="flex gap-2 items-stretch overflow-x-auto overflow-y-hidden scrollbar-hide select-none py-2 px-1 sm:px-2"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {projects.map((project) => (
          <Board
            key={project.title}
            project={project}
            taskSelect={taskSelect}
            onTaskDrop={handleTaskDrop}
            handleAddTask={handleAddTask}
            className="bg-white border border-[#EAECF0] shadow-[0_1px_2px_rgba(16, 24, 40, 0.05)] rounded-xl min-w-[280px] sm:min-w-[250px] sm:max-w-[250px] text-xs min-h-[400px] sm:min-h-[600px]"
          />
        ))}
        <div
          className="bg-white flex flex-col items-center justify-center text-[#98A2B3] text-lg sm:text-xl font-medium min-w-[280px] max-w-[280px] sm:max-w-[250px] sm:min-w-[250px] group cursor-pointer border border-[#EAECF0] shadow-[0_1px_2px_rgba(16, 24, 40, 0.05)] rounded-xl"
          onClick={() => setmodalAddOpen(true)}
        >
          <p>+</p>
          <p>Add Board</p>
        </div>
      </ul>
      {modalAddOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Add New Board
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2"
                >
                  Board Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newProject.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-2"
                >
                  Board Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={newProject.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setmodalAddOpen(false)}
                  className="px-3 sm:px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 sm:px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md"
                >
                  Add Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {modalDetailsOpen && (
        <TaskDetails
          task={selectedTask}
          taskDeselect={taskDeselect}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Boards;
