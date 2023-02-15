import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "pages/Navbar";
import FriendListWidget from "pages/widgets/FriendListWidget";
import Posts from "pages/widgets/Posts";
import UserWidget from "pages/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNotMobile= useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
    <NavBar/>
    <Box 
    width="100%"
    padding= "2rem 6%"
    display={isNotMobile ? "flex" : "block"}
    gap="2rem"
    justifyContent="center">
     <Box display={isNotMobile ? "flex" : "block"} flexDirection="column" gap= "1rem" flexBasis={isNotMobile ? "26%" : undefined}>
       <UserWidget userId={userId} picturePath={user.picturePath} />
       <FriendListWidget userId={userId} />
     </Box>
     <Box 
     flexBasis={isNotMobile ? "55%" : undefined}
     mt={isNotMobile ? undefined : "1rem"}>
      <Posts userId={userId} isProfile />
     </Box>
    </Box>
   </Box>
  )
};

export default ProfilePage;