import React, { useState } from "react";

const Sidebar = () => {
  const [toggledProjects, setToggledProjects] = useState({});
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  function toggleProject(id) {
    setToggledProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const things = [
    {
      id: 1,
      title: "Proje İsim 1",
      color: "red",
      sublist: [
        { title: "Overview", notifications: 10 },
        { title: "Notifications", notifications: 10 },
        { title: "Analytics", notifications: 10 },
        { title: "Reports", notifications: 10 },
      ],
    },
    {
      id: 2,
      title: "Proje İsim 2",
      color: "blue",
      sublist: [
        { title: "Overview", notifications: 10 },
        { title: "Notifications", notifications: 10 },
        { title: "Analytics", notifications: 10 },
        { title: "Reports", notifications: 10 },
      ],
    },
    {
      id: 3,
      title: "Proje İsim 3",
      color: "yellow",
      sublist: [
        { title: "Overview", notifications: 10 },
        { title: "Notifications", notifications: 10 },
        { title: "Analytics", notifications: 10 },
        { title: "Reports", notifications: 10 },
      ],
    },
    {
      id: 4,
      title: "Proje İsim 4",
      color: "purple",
      sublist: [
        { title: "Overview", notifications: 10 },
        { title: "Notifications", notifications: 10 },
        { title: "Analytics", notifications: 10 },
        { title: "Reports", notifications: 10 },
      ],
    },
  ];

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#363F72] border border-[#667085]"
        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
      >
        <div className="w-6 h-6 relative">
          <div className="absolute top-1 bg-white w-6 h-[3px] rounded-sm"></div>
          <div className="absolute top-3 bg-white w-6 h-[3px] rounded-sm"></div>
          <div className="absolute top-5 bg-white w-6 h-[3px] rounded-sm"></div>
        </div>
      </button>

      <div
        className={`
          fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden
          ${
            isMobileNavOpen
              ? "opacity-100 z-40"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() => setIsMobileNavOpen(false)}
      />

      <div
        className={`
          flex min-h-screen fixed lg:static
          ${
            isMobileNavOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          transition-transform duration-300 z-40
        `}
      >
        <div className="w-[72px] min-h-screen">
          <div className="flex flex-col justify-between items-center h-full w-[72px] pb-4 pt-16 lg:pt-6 bg-[#363F72]">
            <ul className="flex flex-col gap-2 cursor-pointer">
              {[1, 2, 3, 4].map((item) => (
                <li
                  key={item}
                  className="p-4 hover:bg-[#fefefe] rounded-lg transition-colors duration-300"
                >
                  <img
                    src="/bell.png"
                    alt=""
                    className="w-[20px] h-[20px] text-white"
                  />
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-2 cursor-pointer">
              {[1, 2, 3, 4].map((item) => (
                <li
                  key={item}
                  className="p-4 hover:bg-[#fefefe] rounded-lg transition-colors duration-300"
                >
                  <img
                    src="/bell.png"
                    alt=""
                    className="w-[20px] h-[20px] text-white"
                  />
                </li>
              ))}
              <div className="mt-4">
                <img src="/Avatar.png" alt="" />
              </div>
            </ul>
          </div>
        </div>

        <div className="w-[282px] p-6 flex flex-col justify-between border-r border-[#dee2e9] bg-white">
          <ul className="flex flex-col gap-2">
            {things.map((project) => (
              <React.Fragment key={project.id}>
                <li
                  className="flex justify-between items-center cursor-pointer hover:bg-[#F3F6FD] transition-colors duration-300 rounded-md py-1 px-2"
                  onClick={() => toggleProject(project.id)}
                >
                  <div className="flex items-center gap-2 p-1">
                    <div
                      className={`w-[8px] h-[8px] bg-${project.color}-500 rounded-full`}
                    ></div>
                    {project.title}
                  </div>
                  <img src="/Icon(2).png" alt="" />
                </li>
                <ul
                  className={`transition-[max-height] duration-300 overflow-hidden flex flex-col gap-2 text-sm ${
                    toggledProjects[project.id] ? "max-h-48" : "max-h-0"
                  }`}
                >
                  {project.sublist.map((item) => (
                    <li
                      key={item.title}
                      className="hover:bg-[#F3F6FD] transition-colors duration-300 flex justify-center items-center rounded-md"
                    >
                      <a
                        href="#"
                        className="flex justify-between p-1 pl-8 w-full"
                      >
                        {item.title}
                        <div className="border border-[#EAECF0] rounded-full text-sm px-1 bg-[#F9FAFB]">
                          {item.notifications}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            ))}

            <li className="flex gap-4 items-center cursor-pointer text-[#98A2B3] hover:bg-[#F3F6FD] transition-colors duration-300 rounded-md py-1 px-2">
              <img
                src="/Icon(1).png"
                alt=""
                className="w-full h-[16px] max-w-[14px]"
              />
              Proje Oluştur
            </li>
          </ul>

          <div className="flex justify-between text-sm">
            <div>
              <p className="font-bold">Olivia Rhye</p>
              <p>olivia@untitledui.com</p>
            </div>
            <div className="w-[16px] h-[16px] border-2 border-[#475467] rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
