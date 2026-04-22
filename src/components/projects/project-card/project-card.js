import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { FaCode, FaPlay } from "react-icons/fa";
import placeholder from "../../../assets/png/placeholder.png";
import styles from "../../../styles/singleProject.module.css";

function SingleProject({ id, name, desc, tags, code, demo, image, theme }) {
  return (
    <motion.div
      className={styles.singleProject}
      style={{ backgroundColor: theme.quaternary }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.projectContent}>
        <h2
          id={name.replace(" ", "-").toLowerCase()}
          style={{ color: theme.tertiary }}
        >
          {name}
        </h2>
        <Image src={image ? image : placeholder} alt={name} />
        <div className={styles.projectShowcaseBtn}>
          <a
            href={demo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-[40px] h-[40px] rounded-[50px] border-2 border-[#EFF3F4] hover:border-[#15202B] text-[#EFF3F4] hover:text-[#1D9BF0] transition hover:scale-[1.1]"
            aria-labelledby={`${name.replace(" ", "-").toLowerCase()} ${name
              .replace(" ", "-")
              .toLowerCase()}-demo`}
          >
            <FaPlay
              id={`${name.replace(" ", "-").toLowerCase()}-demo`}
              className="text-[1.1rem] transition"
              aria-label="Demo"
            />
          </a>
          <a
            href={code}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-[40px] h-[40px] rounded-[50px] border-2 border-[#EFF3F4] hover:border-[#15202B] text-[#EFF3F4] hover:text-[#1D9BF0] transition hover:scale-[1.1]"
            aria-labelledby={`${name.replace(" ", "-").toLowerCase()} ${name
              .replace(" ", "-")
              .toLowerCase()}-code`}
          >
            <FaCode
              id={`${name.replace(" ", "-").toLowerCase()}-code`}
              className="text-[1.1rem] transition"
              aria-label="Code"
            />
          </a>
        </div>
      </div>
      <p
        className={styles.projectDesc}
        style={{
          background: theme.secondary,
          color: theme.tertiary,
        }}
      >
        {desc}
      </p>
      <div
        className={styles.projectLang}
        style={{
          background: theme.secondary,
          color: theme.tertiary,
        }}
      >
        {tags.map((tag, id) => (
          <span key={id}>{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default SingleProject;
