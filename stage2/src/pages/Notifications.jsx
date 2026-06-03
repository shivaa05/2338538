import React, { useEffect, useState } from "react";
import {
  Container,
  Pagination,
  Select,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
} from "@mui/material";

import NotificationCard from "../components/NotificationCard";
import { getNotifications } from "../services/notificationService";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Determine max pages conceptually or via a large number since API does not return total count
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    loadData();
  }, [page, limit, type]);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getNotifications(page, limit, type);
      // Ensure we extract the array properly
      const items = data.notifications || data || [];
      if (!Array.isArray(items)) {
        throw new Error("Invalid API response format");
      }
      setNotifications(items);
      // Since we don't know total count, we can just let it go further if length > 0
      if (items.length < limit && page === 1) {
        setTotalPages(1);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Notifications
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl minWidth={120} size="small">
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
          </Select>
        </FormControl>

        <FormControl minWidth={120} size="small">
          <InputLabel>Limit</InputLabel>
          <Select
            label="Limit"
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {notifications.map((item) => (
            <NotificationCard
              key={item.ID || Math.random()}
              notification={item}
            />
          ))}
          {!error && notifications.length === 0 && (
            <Typography sx={{ my: 2 }}>No notifications found.</Typography>
          )}
        </>
      )}

      {notifications.length > 0 && !loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default Notifications;
