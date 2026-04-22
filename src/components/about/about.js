import React, { useContext } from "react";
import Image from "next/image";
import { ThemeContext } from "../../contexts/theme-context";
import styles from "../../styles/about.module.css";
import { aboutData } from "../../data/about-data";

const About = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section
      className={styles.about}
      style={{ backgroundColor: theme.quaternary }}
    >
      <div className={styles.aboutContainer}>
        {/* LEFT: Text Content */}
        <div className={styles.aboutLeft}>
          <h2 className={styles.aboutTitle} style={{ color: theme.primary }}>
            {aboutData.title}
          </h2>

          <p
            className={styles.aboutDescription}
            style={{ color: theme.tertiary }}
          >
            {aboutData.description}
          </p>

          {/* Highlights */}
          <div className={styles.highlightsContainer}>
            {aboutData.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className={styles.highlight}
                style={{
                  borderColor: theme.primary,
                  color: theme.primary,
                }}
              >
                ✓ {highlight}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Profile Image */}
        <div className={styles.aboutRight}>
          <div className={styles.imageWrapper}>
            <Image
              src={aboutData.image}
              alt={aboutData.title}
              width={400}
              height={500}
              className={styles.aboutImage}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
