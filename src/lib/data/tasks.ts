type Task = {
  id: string;
  name: string;
  description?: string;
  date?: Date;
  tasks?: Task[];
}

export default [
  {
    id: "setup",
    name: "First Steps",
    description: "Setup a coding environment",
    date: new Date('2023-04-21'),
    tasks: [
      {
        id: "setup-github",
        name: "Github Account erstellen",
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
    id: "setup",
    name: "Learn CSS",
    description: "Learn CSS",
    date: new Date('2023-05-05')
  },
  {
    id: "setup",
    name: "Learn HTML",
    description: "Learn HTML",
    date: new Date('2023-05-19')
  },
  {
    id: "setup",
    name: "Learn HTML",
    description: "Learn HTML",
    date: new Date('2023-05-19')
  },
  {
    id: "setup",
    name: "Learn HTML",
    description: "Learn HTML",
    date: new Date('2023-06-02')
  },
  {
    id: "setup",
    name: "Learn HTML",
    description: "Learn HTML",
    date: new Date('2023-06-16')
  }
] satisfies Task[];
