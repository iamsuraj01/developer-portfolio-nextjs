import { motion, useInView } from "framer-motion";
import React, { useContext, useRef } from "react";
import { ThemeContext } from "../../contexts/theme-context";
import { Briefcase, Calendar, MapPin } from "lucide-react";

function ExperienceCard({ experience, index }) {
  const { theme } = useContext(ThemeContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative flex flex-col md:flex-row items-start md:items-center gap-4"
    >
      {/* Timeline dot */}
      <div
        className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full z-10"
        style={{ backgroundColor: theme.primary }}
      >
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: `${theme.primary}80` }}
        />
      </div>

      {/* Card content */}
      <div
        className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}
      >
        <motion.div
          whileHover={{
            scale: 1.02,
            y: -5,
            transition: { duration: 0.2 },
          }}
          className="rounded-2xl p-6 shadow-xl cursor-pointer"
          style={{
            backgroundColor: theme.tertiary,
            border: `1px solid ${theme.primary}20`,
          }}
        >
          {/* Job title and company */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3
                className="text-xl font-bold mb-1"
                style={{ color: theme.primary }}
              >
                {experience.jobtitle}
              </h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Briefcase size={14} />
                <span>{experience.company}</span>
              </div>
            </div>
            <div
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: `${theme.primary}20`,
                color: theme.primary,
              }}
            >
              {experience.endYear === "Present" ? "Current" : "Completed"}
            </div>
          </div>

          {/* Date and location */}
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>
                {experience.startYear} — {experience.endYear}
              </span>
            </div>
            {experience.location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>{experience.location}</span>
              </div>
            )}
          </div>

          {/* Description bullets */}
          {experience.description && (
            <ul className="mt-4 space-y-1 text-sm text-gray-300 list-disc list-inside">
              {experience.description.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          )}

          {/* Hover glow effect */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              boxShadow: `0 0 20px ${theme.primary}40`,
              backgroundColor: `${theme.primary}05`,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ExperienceCard;
