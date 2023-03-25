import React, { useState, useEffect } from "react";
import { Paper, TextField, Button, Typography } from "@mui/material";
import FileBase from "react-file-base64";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const user = JSON.parse(localStorage.getItem("profile"));
  const auth = useSelector((state) => state.authReducer);

  const post = useSelector((state) =>
    currentId
      ? state.postsReducer.find((message) => message._id === currentId)
      : null
  );

  useEffect(() => {
    if (post) setPostData(post);
    console.log(auth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const submit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}>
        <Typography variant="title" fontWeight={700} align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ borderRadius: 3 }}>
      <form
        autoComplete="off"
        noValidate
        method="post"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "5px",
        }}
      >
        <TextField
          name="title"
          variant="outlined"
          value={postData.title}
          label="Title"
          fullWidth
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          value={postData.message}
          multiline
          rows={4}
          fullWidth
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          value={postData.tags}
          label="Tags"
          fullWidth
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className="input-file">
          <FileBase
            type="file"
            multiple={false}
            value={postData.selectedFile}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          sx={{ mx: 1, mt: 1 }}
          onClick={submit}
        >
          Submit
        </Button>
        <Button
          variant="text"
          color="error"
          size="small"
          fullWidth
          sx={{ textTransform: "none" }}
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
