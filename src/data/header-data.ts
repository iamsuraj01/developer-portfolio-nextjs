export const headerData = {
  name: "Suraj Gaire",
  title: "Hello! I am",
  description:
    "Hello! I am Suraj Gaire, a professional and passionate programmer in my daily life. A quick learner with a self-learning attitude. I love to learn and explore new technologies and am Passionate about Problem Solving. ",
  image:
    "https://res.cloudinary.com/dtobk2sho/image/upload/v1776837011/1748021898052_tboo40.jpg",
  imagebw: "https://i.ibb.co/Cw2Xp90/abu-said-bw.jpg",
  resumePdf:
    "https://res.cloudinary.com/dtobk2sho/raw/upload/v1776837063/suraj_developer_resume_2026_dymqfb.docx",
};

export interface CoderSkills {
  name: string;
  skills: string[];
  hardWorker: boolean;
  quickLearner: boolean;
  problemSolver: boolean;
  hireable: () => boolean;
}

export const landingData = {
  greeting: "Hello,",
  intro: "This is",
  name: "SURAJ GAIRE",
  title: "I'm a Professional",
  roles: ["Software Developer", "Full Stack Developer", "Backend Developer"],

  buttons: {
    contact: {
      label: "CONTACT ME",
      icon: "👤",
      href: "#contacts",
    },
    resume: {
      label: "GET RESUME",
      icon: "⬇️",
      href: "/resume.pdf", // Place your resume in public folder
    },
  },

  // Code block data - this is what displays in the right side
  codeBlock: {
    variable: "coder",
    data: {
      name: "Abu Said",
      skills: [
        "React",
        "NextJS",
        "Redux",
        "Express",
        "NestJS",
        "MySQL",
        "MongoDB",
        "Docker",
        "AWS",
      ],
      hardWorker: true,
      quickLearner: true,
      problemSolver: true,
    } as CoderSkills,
  },
};
