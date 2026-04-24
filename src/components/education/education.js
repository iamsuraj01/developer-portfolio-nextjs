import { Container } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/theme-context";
import { educationData } from "../../data/education-data";
import styles from "../../styles/education.module.css";
import EducationCard from "./education-card";
import EducationAnimation from "./education-animation";

function Education() {
  const { theme } = useContext(ThemeContext);
  return (
    <div style={{ backgroundColor: theme.secondary }} id="education">
      <Container className={styles.education}>
        <h2
          style={{ color: theme.primary }}
          className="text-3xl md:text-5xl font-bold mb-4 text-center"
        >
          Education
        </h2>
        <div
          style={{ backgroundColor: theme.primary }}
          className="w-20 h-1 mx-auto rounded-full"
        />
        <div className={styles.educationBody}>
          <div className={styles.educationImage}>
            <EducationAnimation color={theme.primary} />
          </div>
          <div className={styles.educationDescription}>
            {educationData.map((edu) => (
              <EducationCard
                key={edu.id}
                id={edu.id}
                institution={edu.institution}
                course={edu.course}
                startYear={edu.startYear}
                endYear={edu.endYear}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Education;
