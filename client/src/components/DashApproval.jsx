import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const DashApproval = () => {

  const { currentUser } = useSelector((state) => state.user);

  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await fetch(
        `/api/v1/post/getApprovalPosts`
      );
      const data = await res.json();
      if (data.success === false) {
        return toast.error(data.message);
      }
      setPosts(data.posts);
      if (data.posts.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);


  const handleDeletepost = async () => {
    setOpenModal(false);
    try {
      const res = await fetch(
        `/api/v1/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: `DELETE`,
        }
      );
      const data = await res.json();
      if (data.success === false) {
        return toast.error(data.message);
      }
      setPosts((prev) =>
        prev.filter((post) => post._id !== postIdToDelete)
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const handleApprovedPost = async () => {
    setOpenModal(false);
    try {
      const res = await fetch(
        `/api/v1/post/updateApproval/${postIdToDelete}/${currentUser._id}`,
        {
          method: `PUT`,
        }
      );
      const data = await res.json();
      if (data.success === false) {
        return toast.error(data.message);
      }
      toast.success("Post approved")
     fetchPosts();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && posts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date published</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>
                <span>View</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span>Approval</span>
              </Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {posts.map((post) => (
              <Table.Body className="divide-y" key={post._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-300"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>View</span>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                  <span 
                      onClick={() => {
                        setOpenModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer flex justify-center"
                    >
                      <FaCheck className="text-green-500" />
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setOpenModal(true);
                        setPostIdToDelete(post._id);
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
          {/* <div className="flex justify-center py-7">
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
          </div> */}
        
        </>
      ) : (
        <p>You have no posts yet!</p>
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
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletepost}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
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
              Are you sure you want to approved this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleApprovedPost}>
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
  )
}

export default DashApproval
