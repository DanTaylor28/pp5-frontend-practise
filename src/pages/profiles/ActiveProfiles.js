import React from "react";
import { Link } from "react-router-dom";
import ProfileAvatar from "../../components/ProfileAvatar";
import styles from "../../styles/Profile.module.css";

const Profile = (props) => {
  const { profile, avatarSize = 55 } = props;
  const { id, profile_image, owner } = profile;

  return (
    <div
      className="my-3 d-flex align-items-center ml-4"
    >
      <div>
        <Link
          className={`${styles.Link} align-self-center`}
          to={`/profiles/${id}`}
        >
          <ProfileAvatar src={profile_image} size={avatarSize} />
          <span className={styles.Owner}>{owner}</span>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
