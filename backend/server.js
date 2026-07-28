const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mqtt = require("mqtt");
const pool = require("./config/db");
const inventoryRoutes = require("./routes/inventoryRoutes");

dotenv.config();

const mqttClient = mqtt.connect(process.env.MQTT_BROKER);

let latestSensorData = {
  temperature: 0,
  humidity: 0,
  motion: false,
  smoke: 0,
  fire: false,
};

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/inventory", inventoryRoutes);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Smart Storage Backend Running",
      database: "Connected",
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      database: "Connection Failed",
      error: error.message,
    });
  }
});

mqttClient.on("connect", () => {
  console.log("✅ Connected to HiveMQ");

  mqttClient.subscribe("smartinventory/sensors", (err) => {
    if (!err) {
      console.log("📡 Subscribed to smartinventory/sensors");
    }
  });
});

mqttClient.on("message", (topic, message) => {
  latestSensorData = JSON.parse(message.toString());
  console.log("📩", latestSensorData);
});

mqttClient.on("error", (err) => {
  console.error("❌ MQTT Error:", err.message);
});

mqttClient.on("offline", () => {
  console.log("⚠️ MQTT Client Offline");
});

mqttClient.on("reconnect", () => {
  console.log("🔄 Reconnecting to HiveMQ...");
});

app.get("/api/sensors", (req, res) => {
  res.json(latestSensorData);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});