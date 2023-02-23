import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form, Row, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";

const PasswordForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      history.push("/");
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("dj-rest-auth/password/change/", userData);
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
              <Form.Label>Update Password</Form.Label>
              <Form.Control
                type="password"
                value={new_password1}
                placeholder="Update Password"
                name="new_password1"
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="danger">
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                value={new_password2}
                placeholder="Confirm New Password"
                name="new_password2"
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.new_password2?.map((message, idx) => (
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

export default PasswordForm;
