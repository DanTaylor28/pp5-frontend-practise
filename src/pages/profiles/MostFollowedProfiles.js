import React from "react";
import { Container } from "react-bootstrap";
import Asset from "../../components/Asset";
import Profile from "./Profile";
import styles from "../../styles/Profile.module.css";
import { useProfileData } from "../../contexts/ProfileDataContext";

const MostFollowedProfiles = ({ mobile }) => {
  const { mostFollowedProfiles } = useProfileData();
  return (
    <Container
      className={`${styles.Container} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {mostFollowedProfiles.results.length ? (
        <>
          <p
            className={`${styles.Heading} ${
              mobile && "d-none d-lg-block p-0 p-lg-2"
            }`}
          >
            Popular Profiles
          </p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {mostFollowedProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            mostFollowedProfiles.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default MostFollowedProfiles;

