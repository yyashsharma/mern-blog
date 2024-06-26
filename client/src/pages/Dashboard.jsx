import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardComp from "../components/DashboardComp";
import DashApproval from "../components/DashApproval";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  // console.log(location)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* sidebar */}
        <DashSidebar />
      </div>

      {/* profile */}
      {tab === "profile" && <DashProfile />}

      {/* posts */}
      {tab === "posts" && <DashPosts />}

      {/* users */}
      {tab === "users" && <DashUsers />}

      {/* comments */}
      {tab === "comments" && <DashComments />}

      {/* dashboard comp */}
      {tab === "dash" && <DashboardComp />}

      {/* dashboard comp */}
      {tab === "approval" && <DashApproval />}
    </div>
  );
};

export default Dashboard;
