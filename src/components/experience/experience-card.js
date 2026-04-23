// components/experience/experience-card.jsx
import { motion, useInView } from "framer-motion";
import React, { useContext, useRef, useState, useEffect } from "react";
import { ThemeContext } from "../../contexts/theme-context";
import {
  Briefcase,
  Calendar,
  MapPin,
  Award,
  Target,
  Building2,
} from "lucide-react";

function ExperienceCard({ experience, index }) {
  const { theme } = useContext(ThemeContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleFlip = () => {
    if (isMobile) setIsFlipped(!isFlipped);
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: !isMobile && index % 2 === 0 ? -50 : !isMobile ? 50 : 0,
      y: isMobile ? 30 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative"
    >
      {/* Timeline dot - desktop only */}
      {!isMobile && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 w-4 h-4 rounded-full z-10"
          style={{ backgroundColor: theme.primary }}
        >
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{ backgroundColor: `${theme.primary}60` }}
          />
        </div>
      )}

      {/* Card Container */}
      <div
        className={`
          w-full
          ${!isMobile && (index % 2 === 0 ? "md:w-5/12 md:mr-auto" : "md:w-5/12 md:ml-auto")}
        `}
      >
        <div
          className="relative cursor-pointer"
          style={{ perspective: "1000px" }}
          onMouseEnter={() => !isMobile && setIsFlipped(true)}
          onMouseLeave={() => !isMobile && setIsFlipped(false)}
          onClick={handleFlip}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.5 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative"
          >
            {/* FRONT SIDE */}
            <div
              className="rounded-xl p-6 shadow-lg"
              style={{
                backgroundColor: theme.tertiary,
                border: `1px solid ${theme.primary}20`,
                backfaceVisibility: "hidden",
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: theme.primary }}
                  >
                    {experience.jobtitle}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Building2 size={14} />
                    <span>{experience.company}</span>
                  </div>
                </div>
                {experience.endYear === "Present" && (
                  <span
                    className="px-2 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${theme.primary}20`,
                      color: theme.primary,
                    }}
                  >
                    Current
                  </span>
                )}
              </div>

              {/* Meta Info */}
              <div className="space-y-2 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>
                    {experience.startYear} — {experience.endYear}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span>{experience.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={14} />
                  <span>
                    {experience.employmentType} • {experience.workType}
                  </span>
                </div>
              </div>

              {/* Top Achievement */}
              <div
                className="mt-3 pt-3 border-t"
                style={{ borderColor: `${theme.primary}20` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Award size={16} style={{ color: theme.primary }} />
                  <span
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: theme.primary }}
                  >
                    Key Achievement
                  </span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {experience.achievements[0]}
                </p>
              </div>

              {/* Flip Indicator */}
              <div className="mt-4 text-center">
                <span
                  className="text-xs opacity-60"
                  style={{ color: theme.primary }}
                >
                  {isMobile
                    ? "👆 Tap to see responsibilities"
                    : "🖱️ Hover to see responsibilities"}
                </span>
              </div>
            </div>

            {/* BACK SIDE - Responsibilities */}
            <div
              className="absolute top-0 left-0 w-full h-full rounded-xl p-6 shadow-lg overflow-y-auto"
              style={{
                backgroundColor: theme.tertiary,
                border: `1px solid ${theme.primary}20`,
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Target size={18} style={{ color: theme.primary }} />
                <h4 className="font-bold" style={{ color: theme.primary }}>
                  Responsibilities
                </h4>
              </div>

              <ul className="space-y-2">
                {experience.responsibilities.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span className="text-primary mt-0.5">▹</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              {experience.techStack && (
                <div
                  className="mt-4 pt-3 border-t"
                  style={{ borderColor: `${theme.primary}20` }}
                >
                  <div className="flex flex-wrap gap-2">
                    {experience.techStack.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded text-xs"
                        style={{
                          backgroundColor: `${theme.primary}15`,
                          color: theme.primary,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {isMobile && (
                <div className="mt-4 text-center text-xs opacity-60">
                  Tap to flip back
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default ExperienceCard;
