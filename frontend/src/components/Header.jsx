import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";

function Header() {
  return (
    <AppBar
      position="static"
      elevation={4}
      sx={{
        background: "linear-gradient(90deg, #1f1f1f, #4a4a4a)",
        color: "#fff",
      }}
    >
      <Toolbar sx={{ minHeight: "60px" }}>
        <StorageIcon
          sx={{
            color: "#C0C0C0",
            fontSize: 30,
            mr: 2,
          }}
        />

        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              letterSpacing: 0.5,
            }}
          >
            Smart Storage Monitoring System
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "#d9d9d9",
            }}
          >
            IoT Inventory Management Dashboard
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
