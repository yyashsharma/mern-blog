import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getApprovalPosts, getposts, updateApproval, updatepost } from '../controllers/post.controllers.js';

const router = express.Router();

router.post('/create', verifyToken, create)

router.get('/getposts',verifyToken, getposts)

router.get('/getapprovalposts',verifyToken, getApprovalPosts)

router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)

router.put('/updatepost/:postId/:userId', verifyToken, updatepost)

router.put('/updateapproval/:postId/:userId', verifyToken, updateApproval)




export default router;