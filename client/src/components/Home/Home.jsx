import React, { useState } from "react";
import {
  Grow,
  Grid,
  Container,
  Paper,
  AppBar,
  TextField,
  Button,
  Autocomplete,
  Chip,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };
  return (
    <Grow in>
      <Container maxWidth="xl" fixed>
        <Grid
          container
          spacing={3}
          justify="space-between"
          alignItems="stretch"
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              position="static"
              color="inherit"
              elevation={2}
              sx={{ p: 1, mb: 1, borderRadius: 3 }}
            >
              <TextField
                id=""
                label="Search memories"
                name="Search"
                onKeyDown={handleOnKeyDown}
                fullWidth
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Autocomplete
                multiple
                id="tags-filled"
                options={[].map((option) => option.title)}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      onDelete={(e) => setTags(tags.filter((tag) => tag !== e))}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Search Tags"
                    onChange={(e) => setTags([...tags, e.target.value])}
                  />
                )}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ m: 1 }}
                onClick={searchPost}
              >
                Search
              </Button>
            </AppBar>
            <Form setCurrentId={setCurrentId} currentId={currentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={2} sx={{ mt: 1, p: 1, borderRadius: 3 }}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
