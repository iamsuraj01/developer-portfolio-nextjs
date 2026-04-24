import React, { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/theme-context";
import styles from "../../styles/education.module.css";

function EducationCard({ id, institution, course, startYear, endYear }) {
  const { theme } = useContext(ThemeContext);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`${styles.educationCard} ${expanded ? styles.active : ""}`}
      onClick={() => setExpanded((prev) => !prev)}
      style={{ "--accent": theme.primary }}
    >
      <div className={styles.educardImg}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke={theme.primary}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      </div>

      <div className={styles.educationDetails}>
        <h6 style={{ color: theme.primary }}>
          {startYear} – {endYear}
        </h6>
        <h4 style={{ color: theme.tertiary }}>{institution}</h4>
        <h5>{course}</h5>
      </div>

      <div className={styles.educardArrow} style={{ color: theme.primary }}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </div>
    </div>
  );
}

export default EducationCard;
