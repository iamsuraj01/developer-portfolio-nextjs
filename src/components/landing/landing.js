import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/theme-context";
import styles from "../../styles/landing.module.css";
import TypedComponent from "../animation/typed-component";
import { landingData } from "../../data/header-data";
import { socialLinksConfig, Socials } from "../socials/socials";
import { CodeBlock } from "../code-block/code-block";

const Landing = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section
      className={styles.landing}
      style={{ backgroundColor: theme.quaternary }}
    >
      <div className={styles.landingContainer}>
        {/* LEFT SIDE */}
        <div className={styles.landingLeft}>
          <div
            className={styles.landingContent}
            style={{ color: theme.tertiary }}
          >
            <p style={{ color: theme.primary }}>{landingData.greeting}</p>

            <h1>
              {landingData.intro} <br />
              <span style={{ color: theme.primary }}>
                {landingData.name}
              </span>, {landingData.title}
            </h1>

            <TypedComponent
              theme={theme}
              strings={landingData.roles}
              typeSpeed={40}
              backSpeed={50}
              className={styles.typedHeader}
              style={{
                color: theme.primary,
                fontSize: "2.5rem",
                fontWeight: "bold",
              }}
              loop
            />

            {/* Social Icons */}
            <Socials links={socialLinksConfig} size="medium" theme={theme} />

            {/* Buttons */}
            <div className={styles.buttonContainer}>
              <a
                href={landingData.buttons.resume.href}
                download
                target="_blank"
                rel="noreferrer"
              >
                <button className={styles.resumeBtn}>
                  {landingData.buttons.resume.icon}{" "}
                  {landingData.buttons.resume.label}
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Code Block */}
        <CodeBlock
          variable={landingData.codeBlock.variable}
          data={landingData.codeBlock.data}
          theme={theme}
        />
      </div>
    </section>
  );
};
export default Landing;
