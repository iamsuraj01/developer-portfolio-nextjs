import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import styles from "@styles/socials.module.css";
import { socialsData } from "@data/socials-data";

export const Socials = ({ links, size = "medium", theme }) => {
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

export const socialLinksConfig = [
  {
    name: "GitHub",
    url: socialsData.github,
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    url: socialsData.linkedIn,
    icon: FaLinkedin,
  },
  // {
  //   name: "Twitter",
  //   url: socialsData.twitter || "https://twitter.com/yourusername",
  //   icon: FaTwitter,
  // },
  // {
  //   name: "Facebook",
  //   url: socialsData.facebook || "https://facebook.com/yourusername",
  //   icon: FaFacebook,
  // },
];
