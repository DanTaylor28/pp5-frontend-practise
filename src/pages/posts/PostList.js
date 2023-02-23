import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import CompressedPost from "./CompressedPost";
import Asset from "../../components/Asset";
import styles from "../../styles/PostList.module.css";
import noResultImg from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { getMoreData } from "../../utils/utils";
import MostFollowedProfiles from "../profiles/MostFollowedProfiles";

function PostList({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [postLoaded, setPostLoaded] = useState(false);
  const { pathname } = useLocation();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axiosReq.get(
          `/posts/?${filter}search=${searchQuery}`
        );
        setPosts(data);
        setPostLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    setPostLoaded(false);
    const timer = setTimeout(() => {
      getPosts();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, pathname, searchQuery]);

  return (
    <Row>
      <Col className="d-none d-lg-block p-0 p-lg-2" md={3}>
        <p>Profile I follow - desktop</p>
      </Col>
      <Col className="py-2 p-0 p-lg-2" lg={6}>
        <MostFollowedProfiles mobile />
        {postLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <CompressedPost key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset grow />}
                hasMore={!!posts.next}
                next={() => getMoreData(posts, setPosts)}
              />
            ) : (
              <Container>
                <Asset src={noResultImg} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col className="d-none d-lg-block p-0 p-lg-2" md={3}>
        <i className={`${styles.Icon} fa-solid fa-magnifying-glass`}></i>
        <Form
          className={styles.Search}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            type="text"
            placeholder="Search Posts"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          ></Form.Control>
        </Form>
        <MostFollowedProfiles />
      </Col>
    </Row>
  );
}

export default PostList;
