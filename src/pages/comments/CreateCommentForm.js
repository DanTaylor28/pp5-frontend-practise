import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileAvatar from "../../components/ProfileAvatar";
import styles from "../../styles/CreateEditCommentForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";

function CreateCommentForm(props) {
  const { post, setPost, setComments, profile_id, profileImage } = props;
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        text,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            num_of_comments: prevPost.results[0].num_of_comments + 1,
          },
        ],
      }));
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form className={styles.Form} onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <ProfileAvatar src={profileImage} size={55} />
          </Link>
          <Form.Control
            className={styles.CommentForm}
            placeholder="Leave a comment.."
            as="textarea"
            rows={1}
            value={text}
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>
      <div className={styles.BtnDiv}>
        <Button className={`${styles.Button} mb-3 mr-5`} type="submit">
          Comment
        </Button>
      </div>
    </Form>
  );
}

export default CreateCommentForm;
