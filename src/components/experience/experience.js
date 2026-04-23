// components/experience/experience.jsx
import { Container } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../contexts/theme-context";
import { experienceData } from "../../data/experience-data";
import ExperienceCard from "./experience-card";

function Experience() {
  const { theme } = useContext(ThemeContext);
  const [visibleCount, setVisibleCount] = useState(2);
  const [isClient, setIsClient] = useState(false);

  // This ensures we only access window on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, experienceData.length));
  };

  const showLess = () => {
    setVisibleCount(2);
  };

  const visibleExperiences = experienceData.slice(0, visibleCount);
  const hasMore = visibleCount < experienceData.length;
  const hasVisible = visibleCount > 2;

  return (
    <div
      style={{ backgroundColor: theme.secondary }}
      className="py-12 md:py-20"
      id="experience"
    >
      <Container maxWidth="lg" id="experience">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2
            style={{ color: theme.primary }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Work Experience
          </h2>
          <div
            style={{ backgroundColor: theme.primary }}
            className="w-20 h-1 mx-auto rounded-full"
          />
          <p className="mt-4 text-gray-400 text-sm md:text-base">
            {isClient && window.innerWidth >= 768
              ? "Hover on cards to explore details"
              : "Tap on cards to see responsibilities"}
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line - desktop only */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 hidden md:block"
            style={{
              backgroundColor: `${theme.primary}30`,
              height: "calc(100% - 50px)",
            }}
          />

          <div className="space-y-8 md:space-y-12">
            {visibleExperiences.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>

          {/* Show More / Show Less Button */}
          {(hasMore || hasVisible) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-12"
            >
              {hasMore ? (
                <motion.button
                  onClick={showMore}
                  className="group relative px-8 py-3 rounded-full font-semibold transition-all duration-300 overflow-hidden"
                  style={{
                    backgroundColor: `${theme.primary}15`,
                    color: theme.primary,
                    border: `1px solid ${theme.primary}30`,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Show More Experiences
                    <svg
                      className="w-4 h-4 group-hover:translate-y-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </motion.button>
              ) : (
                <motion.button
                  onClick={showLess}
                  className="group px-8 py-3 rounded-full font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: `${theme.primary}10`,
                    color: theme.primary,
                    border: `1px solid ${theme.primary}30`,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    Show Less
                    <svg
                      className="w-4 h-4 group-hover:-translate-y-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 11l7-7 7 7M5 19l7-7 7 7"
                      />
                    </svg>
                  </span>
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Experience;
