export interface AboutSection {
  title: string;
  description: string;
  image: string;
  highlights: string[];
}

export const aboutData: AboutSection = {
  title: "WHO I AM?",
  description: `My name is Suraj Gaire. I am a professional and enthusiastic programmer in my daily life. I am a quick learner with a self-learning attitude. I love to learn and explore new technologies and am passionate about problem-solving. 
  
  As of now, I love to work with modern technologies like React, Next.js, TypeScript, Tailwind CSS, Node.js, Express, MongoDB, and Firebase. I am available for any kind of paid work related to my field.`,

  image:
    "https://res.cloudinary.com/dtobk2sho/image/upload/v1776868550/IMG_3312_2_hkzn4u.jpg", // Place this in public folder

  highlights: [
    "Quick Learner",
    "Problem Solver",
    "Team Player",
    "Self-Motivated",
    "Passionate Developer",
  ],
};
