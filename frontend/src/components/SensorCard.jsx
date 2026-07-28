import { Card, CardContent, Typography } from "@mui/material";

function SensorCard({ title, value }) {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 2,
        height: 70,
        display: "flex",
        alignItems: "center",
      }}
    >
      <CardContent
        sx={{
          width: "100%",
          textAlign: "center",
          py: 1,
          "&:last-child": {
            pb: 1,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {value}
        </Typography>

        <Typography
          sx={{
            fontSize: "13px",
            color: "gray",
            mt: 0.5,
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SensorCard;
