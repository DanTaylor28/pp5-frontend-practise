import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";

const Asset = ({ src, message, spinner }) => {
  return (
    <div className={styles.Asset}>
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
      {spinner && <Spinner animation="grow" />}
    </div>
  );
};

export default Asset;
