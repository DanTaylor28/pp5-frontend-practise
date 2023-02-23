import React from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import ProfileAvatar from "../../components/ProfileAvatar";
import { Button } from "react-bootstrap";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  const { mobile, profile, avatarSize = 55 } = props;
  const { id, following_id, profile_image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_profile_owner = currentUser?.username === owner;

  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
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
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_profile_owner &&
          (following_id ? (
            <Button className={btnStyles.UnfollowButton} onClick={() => handleUnfollow(profile)}>
              unfollow
            </Button>
          ) : (
            <Button className={btnStyles.FollowButton} onClick={() => handleFollow(profile)}>
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
