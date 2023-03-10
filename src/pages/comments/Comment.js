import React, { useState } from "react";
import { Media, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileAvatar from "../../components/ProfileAvatar";
import styles from "../../styles/Comment.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { EditDeleteDropdown } from "../../components/EditDeleteDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import EditCommentForm from "./EditCommentForm";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    text,
    owner,
    id,
    setPost,
    setComments,
    updated_at,
    num_of_comment_likes,
    comment_liked_id,
  } = props;

  const [displayEditForm, setDisplayEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_comment_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            num_of_comments: prevPost.results[0].num_of_comments - 1,
          },
        ],
      }));
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentLike = async () => {
    try {
      const { data } = await axiosRes.post("/comments/likes/", { comment: id });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                num_of_comment_likes: comment.num_of_comment_likes + 1,
                comment_liked_id: data.id,
              }
            : comment;
        }),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentUnlike = async () => {
    try {
      await axiosRes.delete(`/comments/likes/${comment_liked_id}`);
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                num_of_comment_likes: comment.num_of_comment_likes - 1,
                comment_liked_id: null,
              }
            : comment;
        }),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.Comment}>
      <Media className="align-items-center justify-content-between">
        <Link to={`/profiles/${profile_id}`}>
          <ProfileAvatar src={profile_image} size={55} />
        </Link>
        <Media.Body>
          <Link className={styles.OwnerLink} to={`/profiles/${profile_id}`}>
            <span className={styles.Owner}>{owner}</span>
          </Link>
          <span className={`${styles.Timestamp}`}>{updated_at}</span>
          {displayEditForm ? (
            <EditCommentForm
              id={id}
              profile_id={profile_id}
              text={text}
              profileImage={profile_image}
              setComments={setComments}
              setDisplayEditForm={setDisplayEditForm}
            />
          ) : (
            <p className="mt-1">{text}</p>
          )}
        </Media.Body>

        <div>
          {comment_liked_id ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>{num_of_comment_likes} like this</Tooltip>}
            >
              <button className={btnStyles.LikeBtn} onClick={handleCommentUnlike}>
                <i className="fa-solid fa-thumbs-up"></i>
              </button>
            </OverlayTrigger>
          ) : currentUser ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>{num_of_comment_likes} like this</Tooltip>}
            >
              <button className={btnStyles.LikeBtn} onClick={handleCommentLike}>
                <i className="fa-regular fa-thumbs-up"></i>
              </button>
            </OverlayTrigger>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like comments</Tooltip>}
            >
              <button className={btnStyles.LikeBtn}>
                {num_of_comment_likes}
                <i className="fa-regular fa-thumbs-up"></i>
              </button>
            </OverlayTrigger>
          )}
        </div>

        {is_comment_owner && (
          <EditDeleteDropdown
            handleEdit={() => setDisplayEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </div>
  );
};

export default Comment;
