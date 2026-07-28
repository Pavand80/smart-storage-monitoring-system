import { useEffect, useState } from "react";
import { Container, Grid, Box } from "@mui/material";

import Header from "../components/Header";
import SensorCard from "../components/SensorCard";
import InventoryTable from "../components/InventoryTable";
import QRScanner from "../components/QRScanner";
import AddItem from "../components/AddItem";
import AlertPanel from "../components/AlertPanel";
import AlertCard from "../components/AlertCard";
import api from "../services/api";

function Dashboard() {
  const [inventory, setInventory] = useState([]);
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    motion: false,
    smoke: 0,
    fire: false,
  });

  const loadInventory = () => {
    api
      .get("/inventory")
      .then((res) => setInventory(res.data))
      .catch((err) => console.log(err));
  };

  const loadSensors = () => {
    api
      .get("/sensors")
      .then((res) => setSensorData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadInventory();
    loadSensors();

    const interval = setInterval(loadSensors, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Sensor Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <SensorCard
              title="🌡 Temperature & Humidity"
              value={`${sensorData.temperature}°C | ${sensorData.humidity}%`}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <SensorCard
              title="🚶 PIR Motion"
              value={sensorData.motion ? "Motion Detected" : "No Motion"}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <SensorCard
              title="🔥 Smoke & Fire"
              value={`Smoke: ${sensorData.smoke} | Fire: ${
                sensorData.fire ? "YES" : "NO"
              }`}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <SensorCard
              title="🚨 Alerts"
              value={
                sensorData.fire
                  ? "Fire Alert"
                  : sensorData.motion
                    ? "Motion"
                    : sensorData.smoke > 3000
                      ? "Smoke"
                      : "Normal"
              }
            />
          </Grid>
        </Grid>

        {/* Inventory + QR */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <InventoryTable
                inventory={inventory}
                refreshInventory={loadInventory}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <QRScanner refreshInventory={loadInventory} />
            </Grid>
          </Grid>
        </Box>

        {/* Add Item + Inventory Status */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <AddItem refreshInventory={loadInventory} />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <AlertCard inventory={inventory} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
