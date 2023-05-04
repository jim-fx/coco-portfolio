export type Task = {
  id: string;
  name: string;
  description?: string;
  done?: boolean;
  date?: Date;
  tasks?: Task[];
}

export default [
  {
    id: "setup",
    name: "First Steps",
    date: new Date('2023-04-21'),
    tasks: [
      {
        id: "setup-github",
        name: "Github Account erstellen",
        description: "Erstelle einen Github Account",
      },
      {
        id: "setup-ssh-key",
        name: "Public SSH Key bei Github hinterlegen",
      },
      {
        id: "setup-page",
        name: "Github Page erstellen",
      },
      {
        id: "setup-clone",
        name: "Repository klonen"
      },
      {
        id: "setup-open",
        name: "Repository in VSCode öffnen"
      },
      {
        id: "setup-index-html",
        name: "index.html erstellen"
      }
    ]
  },
  {
    id: "learn-css",
    name: "Learn CSS",
    date: new Date('2023-05-05'),
    tasks: [
      {
        id: "learn-css-1",
        name: "CSS Grundlagen",
        description: "[InternetingIsHard Tutorial](https://internetingishard.netlify.app/html-and-css/hello-css/index.html)",
      },
      {
        id: "learn-css-2",
        name: "CSS Layout",
      },
      {
        id: "learn-css-3",
        name: "Fonts",
      },
    ],
  },
  {
    id: "tbd",
    name: "tdb",
    date: new Date('2023-05-19')
  },
  {
    id: "tbd",
    name: "tdb",
    date: new Date('2023-05-19')
  },
  {
    id: "tbd",
    name: "tdb",
    date: new Date('2023-06-02')
  },
  {
    id: "tbd",
    name: "tdb",
    date: new Date('2023-06-16')
  }
] satisfies Task[];
