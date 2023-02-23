import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import MostFollowedProfiles from "./MostFollowedProfiles";
import styles from "../../styles/ProfilePage.module.css";
import btnStyles from "../../styles/Button.module.css";
import profStyles from "../../styles/Profile.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../posts/Post";
import NoResults from "../../assets/no-results.png";
import { getMoreData } from "../../utils/utils";
import { EditProfileDropdown } from "../../components/EditDeleteDropdown";

function ProfilePage() {
  const [profileLoaded, setProfileLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_profile_owner = currentUser?.username === profile?.owner;

  const [profilePosts, setProfilePosts] = useState({ results: [] });

  useEffect(() => {
    const getData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setProfileLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id, setProfileData]);

  const profileContent = (
    <>
      <Row
        className={`${profStyles.Container} ${styles.StatsContainer} px-3 text-center`}
      >
        <Col lg={4}>
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.profile_image}
          />
          <div className="mt-4">
            <span>
              <h4 className={styles.Username}>{profile?.owner}</h4>
              {profile?.is_profile_owner && (
                <EditProfileDropdown id={profile?.id} />
              )}
            </span>
          </div>
        </Col>
        <Col lg={8}>
          <Row
            className={`${styles.StatsRow} justify-content-center no-gutters`}
          >
            <Col xs={3} className="my-2">
              <div>{profile?.num_of_posts}</div>
              <div className={styles.StatNames}>posts</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.num_of_followers}</div>
              <div className={styles.StatNames}>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.num_of_following}</div>
              <div className={styles.StatNames}>following</div>
            </Col>
          </Row>
          <Container className="mt-4">
            {currentUser &&
              !is_profile_owner &&
              (profile?.following_id ? (
                <Button
                  className={btnStyles.PostButton}
                  onClick={() => handleUnfollow(profile)}
                >
                  Unfollow Profile
                </Button>
              ) : (
                <Button
                  className={btnStyles.PostButton}
                  onClick={() => handleFollow(profile)}
                >
                  Follow Profile
                </Button>
              ))}
          </Container>
          {profile?.bio && (
            <Container className="pt-3 text-center">{profile.bio}</Container>
          )}
        </Col>
      </Row>
    </>
  );

  const profileOwnerPosts = (
    <>
      <p className={styles.Heading}>{profile?.owner}'s posts</p>
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => getMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`Nothing to show.. ${profile?.owner} has not posted anything yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col lg={8}>
        <MostFollowedProfiles mobile />
        <Container>
          {profileLoaded ? (
            <>
              {profileContent}
              {profileOwnerPosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <MostFollowedProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
