import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "../../styles/CreateEditCommentForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";

function EditCommentForm(props) {
  const { setComments, id, text, setDisplayEditForm } = props;
  const [textContent, setTextContent] = useState(text);

  const handleChange = (event) => {
    setTextContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}`, {
        text: textContent,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                text: textContent,
                updated_at: "Just now",
              }
            : comment;
        }),
      }));
      setDisplayEditForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form className={styles.Form} onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          className={styles.CommentForm}
          as="textarea"
          rows={1}
          value={textContent}
          onChange={handleChange}
        />
      </Form.Group>
      <div className={styles.BtnDiv}>
        <Button
          className={`${styles.Button} mb-3 mr-5`}
          type="button"
          onClick={() => setDisplayEditForm(false)}
        >
          Cancel
        </Button>
        <Button className={`${styles.Button} mb-3 mr-5`} type="submit">
          Update
        </Button>
      </div>
    </Form>
  );
}

export default EditCommentForm;
