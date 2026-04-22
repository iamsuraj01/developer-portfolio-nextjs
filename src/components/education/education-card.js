import { motion } from "framer-motion";
import Image from "next/image";
import React, { useContext } from "react";
import eduImgBlack from "../../assets/svg/education/eduImgBlack.svg";
import eduImgWhite from "../../assets/svg/education/eduImgWhite.svg";
import { ThemeContext } from "../../contexts/theme-context";
import styles from "../../styles/education.module.css";

function EducationCard({ id, institution, course, startYear, endYear }) {
  const { theme } = useContext(ThemeContext);

  return (
    <motion.div
      key={id}
      className={`${styles.educationCard} bg-[#1E2732]`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={styles.educardImg}
        style={{ backgroundColor: theme.primary }}
      >
        <Image
          src={theme.type === "light" ? eduImgBlack : eduImgWhite}
          alt=""
        />
      </div>
      <div className={styles.educationDetails}>
        <h6 style={{ color: theme.primary }}>
          {startYear}-{endYear}
        </h6>
        <h4 style={{ color: theme.tertiary }}>{course}</h4>
        <h5 style={{ color: theme.tertiary }}>{institution}</h5>
      </div>
    </motion.div>
  );
}

export default EducationCard;
