import React from "react";
import styles from "../styles/ProfileAvatar.module.css";

const ProfileAvatar = ({ src, size = 50, text }) => {
  return (
    <span>
      <img
        src={src}
        height={size}
        width={size}
        alt="avatar"
        className={styles.ProfileAvatar}
      />
      {text}
    </span>
  );
};

export default ProfileAvatar;
