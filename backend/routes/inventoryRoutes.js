const express = require("express");
const router = express.Router();

const {
  getAllInventory,
  getInventoryByQR,
  startCheck,
  finishCheck,
  resetCheck,
  addInventoryItem,
  deleteInventoryItem,
} = require("../controllers/inventoryController");

// ===============================
// Inventory Routes
// ===============================

// Get all inventory
router.get("/", getAllInventory);

// Scan item by QR
router.get("/scan/:qr", getInventoryByQR);

// Start inventory check
router.get("/start-check", startCheck);

// Finish inventory check
router.post("/finish-check", finishCheck);

// Reset inventory check
router.post("/reset-check", resetCheck);

// Add new inventory item
router.post("/add", addInventoryItem);

// Delete Inventory Item
router.delete("/:id", deleteInventoryItem);

module.exports = router;
