import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileAvatar from "../../components/ProfileAvatar";
import styles from "../../styles/Comment.module.css";
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
