import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form, Row, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";

const UsernameForm = () => {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      history.push("/");
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("dj-rest-auth/user/", {
        username,
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      history.goBack();
    } catch (error) {
      console.log(error);
      setErrors(error.response?.data);
    }
  };

  return (
    <Row>
      <Col md={6}>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Update Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>
            {errors?.username?.map((message, idx) => (
              <Alert key={idx} variant="danger">
                {message}
              </Alert>
            ))}
            <Button
              onClick={() => history.goBack()}
              className={btnStyles.PostButton}
            >
              Cancel
            </Button>
            <Button
              onClick={() => history.goBack}
              className={btnStyles.PostButton}
              type="submit"
            >
              Update
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UsernameForm;
