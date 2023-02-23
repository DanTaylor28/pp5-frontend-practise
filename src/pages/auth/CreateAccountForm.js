import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Image,
  Alert,
} from "react-bootstrap";
import styles from "../../styles/CreateAccountForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { Link, useHistory } from "react-router-dom";
import signup from "../../assets/signup.png";
import axios from "axios";
import { UseRedirect } from "../../hooks/UseRedirect";

const CreateAccountForm = () => {
  UseRedirect('loggedIn')
  const [createProfileData, setCreateProfileData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = createProfileData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setCreateProfileData({
      ...createProfileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", createProfileData);
      history.push("/signin");
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto" md={6}>
        <Container className={styles.Form}>
          <h1 className={styles.Heading}>create an account</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className={styles.FormFields} controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.FormTextBox}
                type="text"
                placeholder="Enter Username"
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
            <Form.Group className={styles.FormFields} controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.FormTextBox}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert
                className={appStyles.AlertMessages}
                key={idx}
                variant="danger"
              >
                {message}
              </Alert>
            ))}
            <Form.Group className={styles.FormFields} controlId="password2">
              <Form.Label className="d-none">Confirm Password</Form.Label>
              <Form.Control
                className={styles.FormTextBox}
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert
                className={appStyles.AlertMessages}
                key={idx}
                variant="danger"
              >
                {message}
              </Alert>
            ))}
            <Button className={btnStyles.Button} type="submit">
              Join
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
          <div className={`${styles.SignUpText} text-muted`}>
            Already a member?
            <span>
              <Link className={styles.Link} to="/signin">
                {" "}
                Sign In here
              </Link>
            </span>
          </div>
        </Container>
      </Col>
      <Col
        className={`${styles.SignUpImgCol} my-auto d-none d-md-block`}
        md={6}
      >
        <Image className={styles.FormImage} src={signup} />
        {/* <Container className={styles.SignUpIntroCon} md={12}>
          <div className={styles.SignUpIntroText}>
            come and join the community!
          </div>
        </Container> */}
      </Col>
    </Row>
  );
};

export default CreateAccountForm;
