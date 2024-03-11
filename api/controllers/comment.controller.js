import { Comment } from "../models/comment.model.js";


export const createComment = async (req, res, next) => {
    try {
        const { content, postId, userId } = req.body;

        if (userId !== req.user.id) {
            return next(errorHandler(403, 'You are not allowed to create this comment'))
        }

        const newComment = new Comment({
            content,
            postId,
            userId,

        });
        await newComment.save();

        res.status(200).json({ success: true, message: "Commented successfully", newComment });
    } catch (error) {
        next(error)
    }
}

export const getPostComments = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ postId })
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, comments });
    } catch (error) {
        next(error)
    }
}