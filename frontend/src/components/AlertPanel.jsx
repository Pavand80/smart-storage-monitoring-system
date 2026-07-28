import { Paper, Typography } from "@mui/material";

function AlertPanel({ sensorData }) {
  let alert = "🟢 All Systems Safe";

  if (sensorData.fire) {
    alert = "🔥 Fire Detected";
  } else if (sensorData.smoke > 1000) {
    alert = "💨 Smoke Detected";
  } else if (sensorData.motion) {
    alert = "🚶 Motion Detected";
  } else if (sensorData.temperature > 40) {
    alert = "🌡 High Temperature";
  }

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        🚨 Alert Panel
      </Typography>

      <Typography
        sx={{
          fontWeight: "bold",
          color: alert === "🟢 All Systems Safe" ? "green" : "red",
        }}
      >
        {alert}
      </Typography>
    </Paper>
  );
}

export default AlertPanel;
