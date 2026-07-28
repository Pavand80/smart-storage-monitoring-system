// AlertCard.jsx
import { Paper, Typography, Divider, Grid } from "@mui/material";

function AlertCard({ inventory }) {
  const total = inventory.length;

  const present = inventory.filter((item) => item.status === "Present").length;

  const missing = inventory.filter((item) => item.status === "Missing").length;

  const status = missing > 0 ? "Warning" : "Normal";

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        borderRadius: 3,
        height: "80%",
        minHeight: 150,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
        }}
      >
        🚨 Inventory Status
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <Typography>
            <b>Total :</b> {total}
          </Typography>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Typography>
            <b>Missing :</b> {missing}
          </Typography>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Typography>
            <b>Present :</b> {present}
          </Typography>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Typography>
            <b>Status :</b> {status}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 1 }} />

      <Typography
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: missing > 0 ? "#d32f2f" : "#2e7d32",
        }}
      >
        {missing > 0 ? "⚠ Please Check Missing Items" : "All Items Verified"}
      </Typography>
    </Paper>
  );
}

export default AlertCard;
