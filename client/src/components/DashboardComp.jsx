import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

const DashboardComp = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/v1/user/getusers?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/v1/comment/getComments?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/v1/post/getposts?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchComments();
      fetchPosts();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className=" flex flex-col p-3 dark:bg-slate-800 md:w-72 w-full rounded-md shadow-md">
          <div className=" flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-500 text-white rounded-full text-5xl p-3 shadow-lg " />
          </div>
          <div className="flex gap-2 text-sm mt-3">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <span className="text-gray-500">Last Month</span>
          </div>
        </div>
        <div className=" flex flex-col p-3 dark:bg-slate-800 md:w-72 w-full rounded-md shadow-md">
          <div className=" flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-indigo-500 text-white rounded-full text-5xl p-3 shadow-lg " />
          </div>
          <div className="flex gap-2 text-sm mt-3">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <span className="text-gray-500">Last Month</span>
          </div>
        </div>
        <div className=" flex flex-col p-3 dark:bg-slate-800 md:w-72 w-full rounded-md shadow-md">
          <div className=" flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-500 text-white rounded-full text-5xl p-3 shadow-lg " />
          </div>
          <div className="flex gap-2 text-sm mt-3">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <span className="text-gray-500">Last Month</span>
          </div>
        </div>
      </div>
      <div className=" flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className=" flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Link to={"/dashboard?tab=users"}>
              <Button gradientDuoTone="purpleToPink" outline>
                See all
              </Button>
            </Link>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>User image</TableHeadCell>
              <TableHeadCell>Username</TableHeadCell>
            </TableHead>
            {users &&
              users.map((user) => (
                <TableBody className="divide-y" key={user._id}>
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>
                      <img
                        src={user.profilePicture}
                        alt="user"
                        className="w-10 h-10 rounded-full bg-gray-500 object-cover"
                      />
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </div>
        <div className=" flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Link to={"/dashboard?tab=comments"}>
              <Button gradientDuoTone="purpleToPink" outline>
                See all
              </Button>
            </Link>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Comment Content</TableHeadCell>
              <TableHeadCell>Likes</TableHeadCell>
            </TableHead>
            {comments &&
              comments.map((comment) => (
                <TableBody className="divide-y" key={comment._id}>
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </TableCell>
                    <TableCell>{comment.numberOfLikes}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </div>
        <div className=" flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Posts</h1>
            <Link to={"/dashboard?tab=posts"}>
              <Button gradientDuoTone="purpleToPink" outline>
                See all
              </Button>
            </Link>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Post image</TableHeadCell>
              <TableHeadCell>Post title</TableHeadCell>
              <TableHeadCell>Post category</TableHeadCell>
            </TableHead>
            {posts &&
              posts.map((post) => (
                <TableBody className="divide-y" key={post._id}>
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>
                      <img
                        src={post.image}
                        alt="post"
                        className="w-14 h-10 rounded-md bg-gray-500 object-cover"
                      />
                    </TableCell>
                    <TableCell className="w-96">{post.title}</TableCell>
                    <TableCell className="w-5">{post.category}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
