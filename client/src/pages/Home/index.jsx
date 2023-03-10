import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux"
import NavBar from "pages/Navbar";
import UserWidget from "pages/widgets/UserWidget";
import PostMedia from "pages/widgets/PostMedia";
import Posts from "pages/widgets/Posts"
import FriendListWidget from "pages/widgets/FriendListWidget";

const HomePage = () => {
const isNotMobile = useMediaQuery("(min-width:1000px)");
const {_id, picturePath} = useSelector((state) => state.user);

  return (
    <Box>
     <NavBar/>
     <Box 
     width="100%"
     padding= "2rem 6%"
     display={isNotMobile ? "flex" : "block"}
     gap="0.5rem"
     justifyContent="space-between">

      <Box flexBasis={isNotMobile ? "26%" : undefined}>
        <UserWidget userId={_id} picturePath={picturePath} />
      </Box>
      <Box 
      flexBasis={isNotMobile ? "42%" : undefined}
      mt={isNotMobile ? undefined : "2rem"}>

        <PostMedia picturePath={picturePath}/>
        <Posts userId={_id} />
      </Box>
      {isNotMobile && <Box flexBasis="26%">
      {isNotMobile && (
          <Box flexBasis="26%">
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
        </Box>}
     </Box>
    </Box>

  )
};

export default HomePage;