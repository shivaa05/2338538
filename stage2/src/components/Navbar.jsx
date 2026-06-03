import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import {Bell} from "lucide-react";
const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Notification Portal</Typography>

        <Box>
          <Button color="inherit" component={Link} to="/">
            <Bell style={{ marginRight: 8 }} /> All Notifications
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
