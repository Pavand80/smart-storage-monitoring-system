// QRScanner.jsx
import { useState } from "react";
import Scanner from "react-qr-barcode-scanner";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import api from "../services/api";

function QRScanner({ refreshInventory }) {
  const [qrCode, setQrCode] = useState("");
  const [item, setItem] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);

  const fetchItem = async (code) => {
    try {
      const res = await api.get(`/inventory/scan/${code}`);

      setItem(res.data);

      refreshInventory && refreshInventory();

      setCameraOn(false);

      setQrCode("");
    } catch (err) {
      alert("Item Not Found");
      setCameraOn(false);
    }
  };

  const handleManualScan = () => {
    if (!qrCode.trim()) return;
    fetchItem(qrCode);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 3,
        minHeight: 335,
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        📷 QR Scanner
      </Typography>

      <Divider sx={{ my: 1.5 }} />

      <Grid container spacing={2} alignItems="flex-start">
        {/* LEFT SIDE */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography fontWeight="bold" mb={1}>
            Manual Scan
          </Typography>

          <TextField
            fullWidth
            size="small"
            label="Enter QR Code"
            value={qrCode}
            onChange={(e) => setQrCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleManualScan();
              }
            }}
          />

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1.5 }}
            onClick={handleManualScan}
          >
            Scan
          </Button>

          <Box sx={{ mt: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                mb: 0.5,
              }}
            >
              Last Scanned Item
            </Typography>

            {item ? (
              <Box sx={{ lineHeight: 1.8 }}>
                <Typography>
                  <b>Item :</b> {item.item_name}
                </Typography>

                <Typography>
                  <b>Category :</b> {item.category}
                </Typography>

                <Typography>
                  <b>Location :</b> {item.location}
                </Typography>

                <Typography>
                  <b>Status :</b> {item.status}
                </Typography>
              </Box>
            ) : (
              <Typography color="text.secondary">
                No item scanned yet.
              </Typography>
            )}
          </Box>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography fontWeight="bold" mb={1}>
            Camera Scanner
          </Typography>

          <Box
            sx={{
              width: "100%",
              height: 170,
              overflow: "hidden",
              borderRadius: 2,
              border: "1px solid #ddd",
            }}
          >
            {cameraOn ? (
              <Scanner
                width="100%"
                height={170}
                onUpdate={(err, result) => {
                  if (result) {
                    fetchItem(result.text);
                  }
                }}
              />
            ) : (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#777",
                }}
              >
                Camera Preview
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              mt: 1.5,
            }}
          >
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setCameraOn(true)}
            >
              Start
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => setCameraOn(false)}
            >
              Stop
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default QRScanner;
