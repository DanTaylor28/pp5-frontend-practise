import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Alert,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import signin from "../../assets/signin.png";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      history.push("/");
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto" md={6}>
        <Container className={styles.Form}>
          <h1 className={styles.Heading}>sign in to your account</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className={styles.FormFields} controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.FormTextBox}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert
                className={appStyles.AlertMessages}
                key={idx}
                variant="danger"
              >
                {message}
              </Alert>
            ))}
            <Form.Group
              className={styles.FormFields}
              controlId="formBasicPassword"
            >
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.FormTextBox}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password?.map((message, idx) => (
              <Alert
                className={appStyles.AlertMessages}
                key={idx}
                variant="danger"
              >
                {message}
              </Alert>
            ))}
            <Button className={btnStyles.Button} type="submit">
              Sign In
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert
                className={`${appStyles.AlertMessages} mt-3`}
                key={idx}
                variant="danger"
              >
                {message}
              </Alert>
            ))}
          </Form>
          <div className={`${styles.SignInText} text-muted`}>
            Not signed up yet?
            <span>
              <Link className={styles.Link} to="/create/account">
                {" "}
                Create an account here
              </Link>
            </span>
          </div>
        </Container>
      </Col>
      <Col
        className={`${styles.SignInImageCol} my-auto d-none d-md-block`}
        md={6}
      >
        <Image className={styles.FormImage} src={signin} />
      </Col>
    </Row>
  );
};

export default SignInForm;
