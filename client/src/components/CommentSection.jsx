import { Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Comment from "./Comment";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch(`/api/v1/comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        return toast.error(data.message);
      }
      setComment("");
      setComments([data.newComment, ...comments]);
      toast.success(data.message);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/v1/comment/getPostComments/${postId}`);
        const data = await res.json();
        if (data.success === false) {
          return toast.error(data.message);
        }
        setComments(data.comments);
      } catch (error) {
        toast.error(error);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/v1/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (data.success === false) {
        return toast.error(data.message);
      }
      setComments(
        comments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likes: data.comment.likes,
                numberOfLikes: data.comment.likes.length,
              }
            : comment
        )
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id
          ? {
              ...c,
              content: editedContent,
            }
          : c
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-3 w-full">
      {currentUser ? (
        <div className="flex items-center gap-1 text-gray-500 my-5 text-sm">
          <p>Signed in as:</p>
          <img
            className="w-5 h-5 rounded-full object-cover"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link to={"/sign-in"} className=" text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-between mt-5 items-center">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button type="submit" outline gradientDuoTone="purpleToBlue">
              Submit
            </Button>
          </div>
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex gap-1 items-center">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-md">
              {comments.length}
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CommentSection;
