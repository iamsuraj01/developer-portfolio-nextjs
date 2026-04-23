// about.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ThemeContext } from "../../contexts/theme-context";
import styles from "../../styles/about.module.css";
import { aboutData } from "../../data/about-data";

const About = () => {
  const { theme } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleContactScroll = () => {
    const contactSection = document.getElementById("contacts");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={styles.about}
      style={{ backgroundColor: theme.quaternary }}
      id="about"
    >
      <div className={styles.aboutHeader}>
        <h1 style={{ color: theme.primary }} className={styles.sectionTitle}>
          {aboutData.title}
        </h1>
        <div
          className={styles.titleUnderline}
          style={{ backgroundColor: theme.primary }}
        />
      </div>

      <div className={styles.aboutContainer}>
        {/* LEFT: Text Content */}
        <div
          className={`${styles.aboutLeft} ${isVisible ? styles.fadeInLeft : ""}`}
        >
          <div
            className={styles.welcomeBadge}
            style={{
              backgroundColor: `${theme.primary}15`,
              color: theme.primary,
            }}
          >
            👋 About Me
          </div>

          <p
            className={styles.aboutDescription}
            style={{ color: theme.tertiary }}
          >
            {aboutData.description}
          </p>

          {/* Call to Action */}
          <div className={styles.ctaContainer}>
            <button
              className={styles.ctaButton}
              style={{
                backgroundColor: theme.primary,
                color: theme.quaternary,
              }}
              onClick={handleContactScroll}
            >
              Let's Connect
              <span className={styles.buttonArrow}>→</span>
            </button>
          </div>
        </div>

        {/* RIGHT: Profile Image */}
        <div
          className={`${styles.aboutRight} ${isVisible ? styles.fadeInRight : ""}`}
        >
          <div className={styles.imageWrapper}>
            <div
              className={styles.imageGlow}
              style={{
                background: `radial-gradient(circle, ${theme.primary}20 0%, transparent 70%)`,
              }}
            />
            <div
              className={styles.imageBorder}
              style={{ borderColor: theme.primary }}
            />
            <Image
              src={aboutData.image}
              alt={aboutData.title}
              width={500}
              height={600}
              className={styles.aboutImage}
              priority
            />
            <div className={styles.imageOverlay}>
              <div className={styles.quoteText} style={{ color: "white" }}>
                "AI gives you solutions. Together, we find the ones that
                actually work for you"
              </div>
            </div>
          </div>

          {/* Floating badge — outside imageWrapper so it never covers the overlay */}
          <div
            className={styles.floatingBadge}
            style={{
              backgroundColor: theme.primary,
              color: theme.quaternary,
            }}
          >
            💡 Open for opportunities
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
