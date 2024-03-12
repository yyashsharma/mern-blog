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


export const likeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return next(errorHandler(403, 'Comment not found'))
        }

        const userIndex = comment.likes.indexOf(req.user.id);
        if (userIndex === -1) {
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id);
        } else {
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1);
        }

        await comment.save();

        res.status(200).json({ success: true, comment });
    } catch (error) {
        next(error)
    }
}


export const editComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return next(errorHandler(403, 'Comment not found'))
        }

        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to edit this comment'))
        }

        const editedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                content: req.body.content,
            },
            { new: true }
        );
        res.status(200).json({ success: true, editedComment });
    } catch (error) {
        next(error)
    }
}