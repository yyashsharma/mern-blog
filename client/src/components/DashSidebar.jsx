import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUser,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const DashSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);

  const location = useLocation();
  const [tab, setTab] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      // dispatch(deleteUserStart());
      const res = await fetch(`/api/v1/user/signout`, {
        method: "POST",
      });

      const data = await res.json();
      if (data.success === false) {
        // dispatch(deleteUserFailure());
        return toast.error(data.message);
      }
      dispatch(signoutSuccess());
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
      // dispatch(deleteUserFailure());
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to={"/dashboard?tab=posts"}>
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <>
              <Link to={"/dashboard?tab=users"}>
                <Sidebar.Item
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to={"/dashboard?tab=comments"}>
                <Sidebar.Item
                  active={tab === "comments"}
                  icon={HiAnnotation}
                  as="div"
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )}

          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
