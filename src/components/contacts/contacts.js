import emailjs from "@emailjs/browser";
import Image from "next/image";
import React, { useContext, useRef, useState, useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineSend } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import {
  FaFacebook,
  FaGithub,
  FaLinkedinIn,
  FaMediumM,
  FaStackOverflow,
  FaTwitter,
} from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import isEmail from "validator/lib/isEmail";
import { ThemeContext } from "../../contexts/theme-context";
import { contactsData } from "../../data/contacts-data";
import { socialsData } from "../../data/socials-data";
import styles from "../../styles/contacts.module.css";

function Contacts() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [wantPromos, setWantPromos] = useState(false);

  const form = useRef();
  const { theme } = useContext(ThemeContext);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showSuccessModal || showErrorModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showSuccessModal, showErrorModal]);

  const handleContactForm = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !message) {
      setErrorMessage("Please fill in all fields before sending.");
      setShowErrorModal(true);
      return;
    }

    if (!isEmail(email)) {
      setErrorMessage(
        "Please enter a valid email address (e.g., name@example.com).",
      );
      setShowErrorModal(true);
      return;
    }

    setIsSending(true);

    try {
      // Send notification to yourself
      const notificationResult = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );

      console.log("Notification sent:", notificationResult.text);

      // Prepare auto-reply parameters
      const autoReplyParams = {
        user_name: name,
        user_email: email,
        message: message,
        submission_date: new Date().toLocaleString(),
        your_name: "Suraj Gaire",
        your_title: "Full Stack Developer",
        your_email: "iamsurajgdeveloper01@email.com",
        github: "https://github.com/iamsuraj01",
        linkedin: "https://www.linkedin.com/in/gairesuraj/",
        your_portfolio_url: "https://surajgaire.com.np",
      };

      // Send auto-reply email
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_ID,
        autoReplyParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );

      console.log("Auto-reply sent successfully");

      // Clear form
      setName("");
      setEmail("");
      setMessage("");

      // Show success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.error("EmailJS Error:", error);

      // Show specific error messages
      if (
        error.text?.includes("public key") ||
        error.text?.includes("API key")
      ) {
        setErrorMessage(
          "Configuration error. Please contact the site administrator.",
        );
      } else if (
        error.text?.includes("network") ||
        error.text?.includes("fetch")
      ) {
        setErrorMessage(
          "Network error. Please check your internet connection and try again.",
        );
      } else {
        setErrorMessage(
          error.text ||
            "Something went wrong. Please try again in a few moments.",
        );
      }
      setShowErrorModal(true);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubscribe = () => {
    if (subscribeEmail && isEmail(subscribeEmail)) {
      console.log("Subscribed:", { email: subscribeEmail, promos: wantPromos });
      // You can add newsletter subscription API here
      setSubscribeEmail("");
      setWantPromos(false);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    setShowErrorModal(false);
    setErrorMessage("");
  };

  return (
    <div
      className={styles.contacts}
      id="contacts"
      style={{ backgroundColor: theme.secondary }}
    >
      <div className={styles.contactsContainer}>
        <h1 style={{ color: theme.primary }}>Get In Touch</h1>
        <div className={styles.contactsBody}>
          <div className={styles.contactsForm}>
            <form ref={form} onSubmit={handleContactForm}>
              <div className={styles.inputContainer}>
                <label
                  htmlFor="Name"
                  className={styles.formLabel}
                  style={{ color: theme.tertiary }}
                >
                  Your Name
                </label>
                <input
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="user_name"
                  className={styles.formInput}
                  style={{
                    borderColor: theme.tertiary,
                    backgroundColor: theme.secondary,
                    color: theme.tertiary,
                  }}
                  disabled={isSending}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label
                  htmlFor="Email"
                  className={styles.formLabel}
                  style={{ color: theme.tertiary }}
                >
                  Email Address
                </label>
                <input
                  placeholder="john@doe.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="user_email"
                  className={styles.formInput}
                  style={{
                    borderColor: theme.tertiary,
                    backgroundColor: theme.secondary,
                    color: theme.tertiary,
                  }}
                  disabled={isSending}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label
                  htmlFor="Message"
                  className={styles.formLabel}
                  style={{ color: theme.tertiary }}
                >
                  Your Message
                </label>
                <textarea
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name="message"
                  className={styles.formMessage}
                  style={{
                    borderColor: theme.tertiary,
                    backgroundColor: theme.secondary,
                    color: theme.tertiary,
                  }}
                  disabled={isSending}
                  required
                />
              </div>

              <div className={styles.submitBtn}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  style={{
                    backgroundColor: theme.primary,
                    color: theme.secondary,
                  }}
                  disabled={isSending}
                >
                  {isSending ? (
                    <>
                      <FaSpinner className={styles.spinningIcon} />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <AiOutlineSend className={styles.sendIcon} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className={styles.contactsDetails}>
            <a
              href={`mailto:${contactsData.email}`}
              className={styles.personalDetails}
              style={{ textDecoration: "none" }}
            >
              <div
                className={styles.iconWrapper}
                style={{ backgroundColor: theme.primary }}
              >
                <FiAtSign style={{ color: theme.secondary }} />
              </div>
              <p style={{ color: theme.tertiary }}>{contactsData.email}</p>
            </a>

            <div className={styles.personalDetails}>
              <div
                className={styles.iconWrapper}
                style={{ backgroundColor: theme.primary }}
              >
                <HiOutlineLocationMarker style={{ color: theme.secondary }} />
              </div>
              <p style={{ color: theme.tertiary }}>{contactsData.address}</p>
            </div>

            <div className={styles.socialmediaIcons}>
              <p style={{ color: theme.tertiary, marginBottom: "1rem" }}>
                Connect with me
              </p>
              <div className={styles.socialIconsContainer}>
                {socialsData.twitter && (
                  <a
                    href={socialsData.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialIcon}
                    style={{ backgroundColor: theme.primary }}
                  >
                    <FaTwitter style={{ color: theme.secondary }} />
                  </a>
                )}
                {socialsData.github && (
                  <a
                    href={socialsData.github}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialIcon}
                    style={{ backgroundColor: theme.primary }}
                  >
                    <FaGithub style={{ color: theme.secondary }} />
                  </a>
                )}
                {socialsData.linkedIn && (
                  <a
                    href={socialsData.linkedIn}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialIcon}
                    style={{ backgroundColor: theme.primary }}
                  >
                    <FaLinkedinIn style={{ color: theme.secondary }} />
                  </a>
                )}
                {socialsData.medium && (
                  <a
                    href={socialsData.medium}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialIcon}
                    style={{ backgroundColor: theme.primary }}
                  >
                    <FaMediumM style={{ color: theme.secondary }} />
                  </a>
                )}
                {socialsData.stackOverflow && (
                  <a
                    href={socialsData.stackOverflow}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialIcon}
                    style={{ backgroundColor: theme.primary }}
                  >
                    <FaStackOverflow style={{ color: theme.secondary }} />
                  </a>
                )}
                {socialsData.facebook && (
                  <a
                    href={socialsData.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialIcon}
                    style={{ backgroundColor: theme.primary }}
                  >
                    <FaFacebook style={{ color: theme.secondary }} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.successIconCircle}>
                <AiOutlineCheckCircle />
              </div>
              <button className={styles.modalClose} onClick={closeModal}>
                ✕
              </button>
            </div>

            <h2 className={styles.modalTitle}>Thank you! 🎉</h2>
            <p className={styles.modalMessage}>
              We've received your message.
              <br />
              Someone from our team will contact you soon.
            </p>

            <div className={styles.modalButtons}>
              <button className={styles.closeButton} onClick={closeModal}>
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={`${styles.modalContent} ${styles.errorModal}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.errorIconCircle}>
                <BiErrorCircle />
              </div>
              <button className={styles.modalClose} onClick={closeModal}>
                ✕
              </button>
            </div>

            <h2 className={styles.modalTitle}>Error! 😔</h2>
            <p className={styles.modalMessage}>{errorMessage}</p>

            <div className={styles.modalButtons}>
              <button className={styles.okButton} onClick={closeModal}>
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      <Image
        src={theme.contactsimg}
        alt="Contact illustration"
        className={styles.contactsImg}
        width={280}
        height={280}
        style={{ width: "auto", height: "auto" }}
        priority={false}
      />
    </div>
  );
}

export default Contacts;
