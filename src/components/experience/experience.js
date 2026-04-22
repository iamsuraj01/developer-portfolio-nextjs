import { Container } from "@mui/material";
import React, { useContext } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThemeContext } from "../../contexts/theme-context";
import { experienceData } from "../../data/experience-data";
import ExperienceCard from "./experience-card";

function Experience() {
  const { theme } = useContext(ThemeContext);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <div style={{ backgroundColor: theme.secondary }} className="py-20">
      <Container maxWidth="lg" id="experience">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            style={{ color: theme.primary }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Work Experience
          </h2>
          <div
            style={{ backgroundColor: theme.primary }}
            className="w-20 h-1 mx-auto rounded-full"
          />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div
            style={{ backgroundColor: `${theme.primary}30` }}
            className="absolute left-8 md:left-1/2 transform md:-translate-x-px h-full w-0.5"
          />

          <div className="space-y-8">
            {experienceData.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Experience;
