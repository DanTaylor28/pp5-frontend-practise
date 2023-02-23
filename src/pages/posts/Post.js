import React from "react";
import {
  Button,
  Card,
  Container,
  Media,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import ProfileAvatar from "../../components/ProfileAvatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Post.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import { EditDeleteDropdown } from "../../components/EditDeleteDropdown";

const Post = (props) => {
  const {
    id,
    caption,
    // category,
    num_of_comments,
    num_of_pins,
    owner,
    pinned_id,
    post_image,
    profile_id,
    profile_image,
    title,
    updated_at,
    postDetail,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_post_owner = currentUser?.username === owner;
  const history = useHistory();

  const handlePin = async () => {
    try {
      const { data } = await axiosRes.post("/pins/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, num_of_pins: post.num_of_pins + 1, pinned_id: data.id }
            : post;
        }),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnpin = async () => {
    try {
      await axiosRes.delete(`/pins/${pinned_id}`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, num_of_pins: post.num_of_pins - 1, pinned_id: null }
            : post;
        }),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    history.push(`/posts/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`posts/${id}`);
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link className={styles.Owner} to={`/profiles/${profile_id}`}>
            <ProfileAvatar src={profile_image} size={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            {is_post_owner && postDetail && (
              <EditDeleteDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
        <div>
          <span className={`${styles.TimeStamp} text-muted`}>{updated_at}</span>
        </div>
      </Card.Body>
      <Card.Body>
        {title && <Card.Title className={styles.Title}>{title}</Card.Title>}
        <Container>{caption && <Card.Text>{caption}</Card.Text>}</Container>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={post_image} alt={title} />
      </Link>
      <Card.Body>
        <div className={styles.StatsDiv}>
          <span className={`${styles.PinSpan}`}>
            <i className="fa-solid fa-thumbtack"></i>
            {num_of_pins}
          </span>
          <span className={styles.CommentSpan}>
            <Link className={styles.CommentLink} to={`/posts/${id}`}>
              <i className="fa-solid fa-comments"></i>
              {num_of_comments}
            </Link>
          </span>
        </div>
        <div>
          {pinned_id ? (
            <Button className={btnStyles.UnpinButton} onClick={handleUnpin}>
              <i className="fa-solid fa-location-pin"></i>
              Unpin
            </Button>
          ) : currentUser ? (
            <Button className={btnStyles.PinButton} onClick={handlePin}>
              <i className="fa-solid fa-thumbtack"></i>
              Pin
            </Button>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts</Tooltip>}
            >
              <Button className={btnStyles.PinButton}>
                <i className="fa-regular fa-heart"></i>
                Pin
              </Button>
            </OverlayTrigger>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
