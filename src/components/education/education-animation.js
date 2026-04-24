import React from "react";
import styles from "../../styles/education.module.css";

function EducationAnimation({ color = "#1D9E75" }) {
  return (
    <div className={styles.sceneWrap}>
      <div className={styles.scene} style={{ "--accent": color }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`${styles.star} ${styles[`star${i + 1}`]}`} />
        ))}

        <div className={styles.ring} />
        <div className={styles.ring} />
        <div className={styles.ring} />

        <div className={styles.person}>
          <div className={styles.gown}>
            <div className={styles.gownStripe} />
          </div>
          <div className={styles.torso} />
          <div className={styles.collar} />
          <div className={styles.head}>
            <div className={`${styles.eye} ${styles.eyeL}`} />
            <div className={`${styles.eye} ${styles.eyeR}`} />
            <div className={styles.smile} />
          </div>
          <div className={`${styles.arm} ${styles.armL}`}>
            <div className={styles.hand} />
          </div>
          <div className={`${styles.arm} ${styles.armR}`}>
            <div className={styles.hand} />
          </div>
          <div className={styles.capToss}>
            <div className={styles.capBoard}>
              <div className={styles.capTopRim} />
              <div className={styles.capTassel} />
            </div>
          </div>
        </div>

        <div className={styles.shadow} />
      </div>
    </div>
  );
}

export default EducationAnimation;
