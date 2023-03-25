import React from "react";
import {
  Card,
  Container,
  CardActions,
  CardContent,
  Divider,
  CardMedia,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { media, card, cardActions, overlay, overlay2 } from "./styles";
import moment from "moment";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import { Delete } from "@mui/icons-material";
import { MoreVert } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const Likes = () => {
    if (post.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <FaThumbsUp fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <FaRegThumbsUp fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <FaRegThumbsUp fontSize="small" />
        &nbsp;Like
      </>
    );
  };
  return (
    <Card sx={card} elevation={2}>
      <CardMedia sx={media} image={post.selectedFile} title="title" />
      <Container sx={overlay}>
        <Typography variant="title" fontWeight={700}>
          {post?.name}
        </Typography>
        <Typography variant="caption" component="p">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </Container>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <IconButton
          aria-label="settings"
          onClick={() => setCurrentId(post._id)}
          sx={overlay2}
        >
          <MoreVert />
        </IconButton>
      )}

      <CardContent sx={{ px: 2, py: 1 }}>
        <Typography
          variant="caption"
          color="textSecondary"
          textAlign="start"
          component="p"
        >
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>

        <Typography
          variant="title"
          fontWeight={700}
          textAlign="start"
          color="textPrimary"
        >
          {post.title}
        </Typography>

        <Typography variant="caption" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>

      <Divider variant="middle" textAlign="center" sx={{ mb: 1 }} />
      <CardActions sx={cardActions}>
        <Button
          size="small"
          color="primary"
          fullWidth
          variant="contained"
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <Delete fontSize="small" />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
