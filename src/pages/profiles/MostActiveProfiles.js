import React, { useEffect, useState } from "react";
import styles from "../../styles/Profile.module.css";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";
import ActiveProfiles from "../profiles/ActiveProfiles"

const MostActiveProfiles = () => {
  const [profileData, setProfileData] = useState({
    mostActiveProfiles: { results: [] },
  });
  const { mostActiveProfiles } = profileData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-num_of_posts"
        );
        setProfileData((prevState) => ({
          ...prevState,
          mostActiveProfiles: data,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    handleMount();
  }, [currentUser]);

  return (
    <Container className={styles.Container}>
      <p className={styles.Heading}>Active Profiles</p>
      {mostActiveProfiles.results.length ? (
        <>
        {mostActiveProfiles.results.map(profile => (
        <ActiveProfiles key={profile.id} profile={profile} />
      ))} 
        </>
      ) : (
        <Asset spinner />
      )}
      
    </Container>
  );
};

export default MostActiveProfiles;
