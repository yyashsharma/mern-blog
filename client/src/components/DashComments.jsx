import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/v1/comment/getComments`);
        const data = await res.json();
        if (data.success === false) {
          return toast.error(data.message);
        }
        setComments(data.comments);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        toast.error(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(`/api/v1/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (data.success === false) {
        return toast.error(data.message);
      }
      setComments((prev) => [...prev, ...data.comments]);
      if (data.comments.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const handleDeleteComment = async () => {
    setOpenModal(false);
    try {
      const res = await fetch(
        `/api/v1/comment/deleteComment/${commentIdToDelete}`,
        {
          method: `DELETE`,
        }
      );
      const data = await res.json();
      if (data.success === false) {
        return toast.error(data.message);
      }
      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentIdToDelete)
      );
      toast.success(data.message)
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body className="divide-y" key={comment._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setOpenModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          <div className="flex justify-center py-7">
            {showMore && (
              <Button
                onClick={handleShowMore}
                type="button"
                gradientDuoTone="purpleToBlue"
                outline
              >
                Show More
              </Button>
            )}
          </div>
        </>
      ) : (
        <p>You have no comments yet!</p>
      )}
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashComments;
