import Drawer from "@mui/material/Drawer";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { FaFolderOpen, FaUser } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import { IoHomeSharp, IoMenuSharp } from "react-icons/io5";
import { MdPhone } from "react-icons/md";
import { ThemeContext } from "../../contexts/theme-context";
import { headerData } from "../../data/header-data";
import styles from "../../styles/navbar.module.css";
import Link from "../link";

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4, delay },
});

function Navbar() {
  const { theme, setHandleDrawer, changeTheme, isDark } =
    useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    setHandleDrawer();
  };
  const handleDrawerClose = () => {
    setOpen(false);
    setHandleDrawer();
  };

  const shortname = (name) => (name.length > 12 ? name.split(" ")[0] : name);

  const navItems = [
    {
      href: "/",
      icon: <IoHomeSharp className="text-xl sm:text-2xl" />,
      label: "Home",
    },
    {
      href: "/#about",
      icon: <FaUser className="text-xl sm:text-2xl" />,
      label: "About",
    },
    {
      href: "/#resume",
      icon: <HiDocumentText className="text-xl sm:text-2xl" />,
      label: "Resume",
    },
    {
      href: "/#blog",
      icon: <FaFolderOpen className="text-xl sm:text-2xl" />,
      label: "Blog",
    },
    {
      href: "/#contacts",
      icon: <MdPhone className="text-xl sm:text-2xl" />,
      label: "Contact",
    },
  ];

  const itemClass =
    "my-[2em] mx-auto rounded-[78.8418px] text-[#1D9BF0] bg-[#15202B] sm:w-[85%] w-[100%] h-[55px] sm:h-[60px] flex items-center justify-evenly px-[25px] sm:px-[30px] box-border border-2 border-[#1D9BF0] hover:text-[#15202B] hover:bg-[#1D9BF0] transition-colors";
  const labelClass = "w-6/12 text-[1.125rem] sm:text-[1.3rem] font-semibold";

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <h1 style={{ color: theme.primary }}>{shortname(headerData.name)}</h1>
        <IoMenuSharp
          className={`text-3xl md:text-4xl text-[${theme.tertiary}] cursor-pointer translate-y-3 xs:text-2xl transition-colors hover:text-[${theme.primary}]`}
          onClick={handleDrawerOpen}
          aria-label="Menu"
        />
      </div>

      <Drawer
        variant="temporary"
        onClose={(_, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown")
            handleDrawerClose();
        }}
        anchor="left"
        open={open}
        className={styles.drawer}
        classes={{
          paper:
            "p-[1.8em] w-[12em] sm:w-[14em] text-2xl bg-[#15202B] overflow-hidden rounded-t-[40px] rounded-b-[40px]",
        }}
        disableScrollLock={true}
      >
        <AiOutlineCloseCircle
          onClick={handleDrawerClose}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              handleDrawerClose();
            }
          }}
          className="text-3xl font-bold cursor-pointer text-[#1D9BF0] absolute sm:right-[40] sm:top-[40] right-[20] top-[20] transition-colors hover:text-[#EFF3F4]"
          role="button"
          tabIndex="0"
          aria-label="Close"
        />
        <br />

        <div onClick={handleDrawerClose} className={styles.navLinkContainer}>
          {navItems.map(({ href, icon, label }, i) => (
            <motion.div key={href} {...fadeLeft(i * 0.08)}>
              <Link href={href}>
                <div className={itemClass}>
                  {icon}
                  <span className={labelClass}>{label}</span>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Theme toggle — not a link, so handled separately */}
          <motion.div
            {...fadeLeft(navItems.length * 0.08)}
            onClick={changeTheme}
          >
            <div className={itemClass}>
              {isDark ? (
                <BsFillSunFill className="text-xl sm:text-2xl" />
              ) : (
                <BsFillMoonFill className="text-xl sm:text-2xl" />
              )}
              <span className={labelClass}>{isDark ? "Light" : "Dark"}</span>
            </div>
          </motion.div>
        </div>
      </Drawer>
    </div>
  );
}

export default Navbar;
