import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";
import CreateCommentForm from "../comments/CreateCommentForm";
import Post from "./Post";
import Asset from "../../components/Asset";
import { getMoreData } from "../../utils/utils";
import MostFollowedProfiles from "../profiles/MostFollowedProfiles";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (error) {
        console.log(error);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row>
      <Col lg={8}>
        <Container>
          <MostFollowedProfiles mobile />
        </Container>
        <Container>
          <Post {...post.results[0]} postDetail setPosts={setPost} />
        </Container>
        <Container className="mb-3">
          {currentUser ? (
            <CreateCommentForm
              post={id}
              setPost={setPost}
              setComments={setComments}
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setPost={setPost}
                  setComments={setComments}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => getMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <span>Be the first to comment!</span>
          ) : (
            <span>No comments to show..</span>
          )}
        </Container>
      </Col>
      <Col className="d-none d-lg-block" lg={4}>
        <MostFollowedProfiles />
      </Col>
    </Row>
  );
}

export default PostDetail;
