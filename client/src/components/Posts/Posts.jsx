import React from "react";
import { Grid, CircularProgress, Typography } from "@mui/material";
import Post from "./Post/Post";
import { useSelector } from "react-redux";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.postsReducer);

  if (!posts.length && !isLoading) {
    return (
      <Typography variant="h5" color="primary">
        There is no posts
      </Typography>
    );
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={2} rowSpacing={1}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
