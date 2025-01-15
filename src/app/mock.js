const data = [
  {
    title: "OPEN",
    notifications: 3,
    tasks: [
      {
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
      },
      {
        title: {
          text: "Teknik Birimi",
          color: "#2083D7",
        },
        description: "İkinci bir görev.",
        date: "05.02.2024-10.02.2024",
        milestone: "Milestone Name",
        priority: "blue",

        people: [
          {
            name: "p1",
            photo: "/p1.png",
          },
          {
            name: "p3",
            photo: "/p3.png",
          },
        ],
      },
      {
        title: {
          text: "Test ve Onay Birimi",
          color: "#C80B0B",
        },
        description:
          "Bu örnek görevdir. Örnek görevin içeriğine dair açıklama detail’da bulunmaktadır.",
        date: "05.02.2024-10.02.2024",
        milestone: "Milestone Name",
        priority: "red",

        people: [
          {
            name: "p5",
            photo: "/p5.png",
          },
        ],
      },
    ],
  },
  {
    title: "129f",
    notifications: 3,
    tasks: [],
  },
];

export default data;
