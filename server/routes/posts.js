import express from "express";
import { createPost, getPosts, getPost, updatePost, deletePost, likePost, searchPost } from "../controllers/posts.js";


const router = express.Router();
import auth from '../middleware/auth.js';


router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.get('/search', searchPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;