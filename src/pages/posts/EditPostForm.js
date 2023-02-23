import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Image,
  Alert,
} from "react-bootstrap";
import styles from "../../styles/CreateEditPostForm.module.css";
import formStyles from "../../styles/CreateAccountForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function EditPostForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    caption: "",
    post_image: "",
    category: "",
  });
  const { title, caption, post_image, category } = postData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}`);
        const { title, caption, category, post_image, is_post_owner } = data;
        is_post_owner
          ? setPostData({ title, caption, category, post_image })
          : history.push("/");
      } catch (error) {
        console.log(error);
      }
    };
    handleMount();
  }, [id, history]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(post_image);
      setPostData({
        ...postData,
        post_image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("category", category);
    if (imageInput?.current?.files[0]) {
      formData.append("post_image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}`, formData);
      history.push(`/posts/${id}`);
    } catch (error) {
      console.log(error);
      if (error.response?.status !== 401) {
        setErrors(error.response?.data);
      }
    }
  };

  const form = (
    <>
      <Form.Group>
        <Form.Label className="d-none">Title</Form.Label>
        <Form.Control
          className={formStyles.FormTextBox}
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert key={idx} variant="danger">
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label className="d-none">Caption</Form.Label>
        <Form.Control
          className={formStyles.FormTextBox}
          as="textarea"
          name="caption"
          rows={6}
          placeholder="Caption"
          value={caption}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.caption?.map((message, idx) => (
        <Alert key={idx} variant="danger">
          {message}
        </Alert>
      ))}
      <Form.Group className={formStyles.FormTextBox}>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          custom
          name="category"
          value={category}
          onChange={handleChange}
        >
          <option value="1">general</option>
          <option value="2">landscapes</option>
          <option value="3">portraits</option>
        </Form.Control>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert key={idx} variant="danger">
          {message}
        </Alert>
      ))}
      <div className={btnStyles.BtnDiv}>
        <Button
          className={btnStyles.PostButton}
          onClick={() => history.goBack()}
        >
          Cancel
        </Button>
        <Button className={btnStyles.PostButton} type="submit">
          Upload
        </Button>
      </div>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="d-none d-md-block p-0 p-md-2" md={5} lg={5}>
          <Container className={styles.CreatePostForm}>
            <h1 className={styles.Heading}>edit your post</h1>
            <Form.Group className={formStyles.FormFields}>
              <Form.Label className="d-none">Title</Form.Label>
              <Form.Control
                className={formStyles.FormTextBox}
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
              <Alert key={idx} variant="danger">
                {message}
              </Alert>
            ))}
            <Form.Group className={formStyles.FormFields}>
              <Form.Label className="d-none">Caption</Form.Label>
              <Form.Control
                className={formStyles.FormTextBox}
                as="textarea"
                name="caption"
                rows={6}
                placeholder="Caption"
                value={caption}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.caption?.map((message, idx) => (
              <Alert key={idx} variant="danger">
                {message}
              </Alert>
            ))}
            <Form.Group className={formStyles.FormTextBox}>
              <Form.Label>Category</Form.Label>
              <Form.Control
                className={formStyles.FormFields}
                as="select"
                custom
                name="category"
                value={category}
                onChange={handleChange}
              >
                <option value="1">general</option>
                <option value="2">landscapes</option>
                <option value="3">portraits</option>
              </Form.Control>
            </Form.Group>
            {errors?.category?.map((message, idx) => (
              <Alert key={idx} variant="danger">
                {message}
              </Alert>
            ))}
            <div className={btnStyles.BtnDiv}>
              <Button
                className={btnStyles.PostButton}
                onClick={() => history.goBack()}
              >
                Cancel
              </Button>
              <Button className={btnStyles.PostButton} type="submit">
                Update
              </Button>
            </div>
          </Container>
        </Col>
        <Col className="py-2 p-0 p-md-2" md={7} lg={7}>
          <Container
            className={`${styles.ImagePreview} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image src={post_image} className={styles.Image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.PostButton} btn`}
                  htmlFor="image-upload"
                >
                  Change Image
                </Form.Label>
              </div>
              <Form.File
                className="d-none"
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.post_image?.map((message, idx) => (
              <Alert key={idx} variant="danger">
                {message}
              </Alert>
            ))}
            <div className="d-md-none mt-5">{form}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default EditPostForm;
