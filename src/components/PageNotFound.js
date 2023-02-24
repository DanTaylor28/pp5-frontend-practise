import React from 'react'
import NothingToShow from "../assets/no-results.png"
import Asset from "../components/Asset"
import styles from "../styles/PageNotFound.module.css"

const PageNotFound = () => {
  return (
    <div className={styles.Asset}>
        <Asset src={NothingToShow} message="Sorry, the page you're looking for does not exist.." />
    </div>
  )
}

export default PageNotFound