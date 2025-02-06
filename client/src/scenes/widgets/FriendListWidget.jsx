import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  // Function to fetch friends
  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends(); // Fetch friends on component mount
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper data-cy="friend-list-widget">
      {/* Friend List Title */}
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
        data-cy="friend-list-title"
      >
        Friend List
      </Typography>
      
      {/* Friend List Container */}
      <Box
        display="flex"
        flexDirection="column"
        gap="1.5rem"
        data-cy="friend-list-container"
      >
        {/* Loop through friends and render each Friend component */}
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
            data-cy={`friend-item-${friend._id}`} // Adding data-cy to Friend component
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;



