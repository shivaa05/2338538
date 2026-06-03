import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const NotificationCard = ({ notification, isHighPriority }) => {
  // Use localStorage to track read status across renders
  const [read, setRead] = useState(() => {
    return localStorage.getItem(`read_${notification.ID}`) === "true";
  });

  const handleToggleRead = () => {
    const newRead = !read;
    setRead(newRead);
    localStorage.setItem(`read_${notification.ID}`, newRead.toString());
  };

  return (
    <Card
      sx={{
        mb: 2,
        borderLeft: read ? "4px solid gray" : "4px solid blue",
        backgroundColor: isHighPriority && !read ? "#fff3e0" : "inherit",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            color={read ? "text.secondary" : "text.primary"}
          >
            {notification.Message}
            {isHighPriority && (
              <Chip
                size="small"
                label="High Priority"
                color="error"
                sx={{ ml: 1 }}
              />
            )}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {new Date(notification.Timestamp).toLocaleString()}
          </Typography>

          <Chip label={notification.Type} sx={{ mt: 1 }} size="small" />
        </Box>
        <Box>
          <IconButton
            onClick={handleToggleRead}
            color={read ? "default" : "primary"}
          >
            {read ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
