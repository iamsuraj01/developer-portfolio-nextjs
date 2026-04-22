import React from "react";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import styles from "@styles/socials.module.css";

interface SocialLink {
  name: string;
  url: string;
  icon: IconType;
}

interface SocialsProps {
  links: SocialLink[];
  size?: "small" | "medium" | "large";
  theme?: {
    primary: string;
  };
}

export const Socials: React.FC<SocialsProps> = ({
  links,
  size = "medium",
  theme,
}) => {
  return (
    <div className={`${styles.socials} ${styles[size]}`}>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            title={link.name}
            className={styles.socialLink}
            style={{ color: theme?.primary }}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
};

export const socialLinksConfig: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: FaLinkedin,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: FaTwitter,
  },
  {
    name: "Facebook",
    url: "https://facebook.com/yourusername",
    icon: FaFacebook,
  },
];
