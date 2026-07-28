const pool = require("../config/db");

// ===============================
// Get All Inventory
// ===============================
const getAllInventory = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventory ORDER BY id");

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database Error",
    });
  }
};

// ===============================
// Scan Item By QR
// ===============================
const getInventoryByQR = async (req, res) => {
  try {
    const { qr } = req.params;

    await pool.query("UPDATE inventory SET scanned = true WHERE qr_code = $1", [
      qr,
    ]);

    const result = await pool.query(
      "SELECT * FROM inventory WHERE qr_code = $1",
      [qr],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Item Not Found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database Error",
    });
  }
};

// ===============================
// Start Inventory Check
// ===============================
const startCheck = async (req, res) => {
  try {
    await pool.query("UPDATE inventory SET scanned = false");

    res.json({
      message: "Inventory Check Started Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database Error",
    });
  }
};

// ===============================
// Finish Inventory Check
// ===============================
const finishCheck = async (req, res) => {
  try {
    await pool.query(`
      UPDATE inventory
      SET status = CASE
        WHEN scanned = true THEN 'Present'
        ELSE 'Missing'
      END
    `);

    const result = await pool.query("SELECT * FROM inventory ORDER BY id");

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database Error",
    });
  }
};

// ===============================
// Reset Inventory Check
// ===============================
const resetCheck = async (req, res) => {
  try {
    await pool.query(`
      UPDATE inventory
      SET
        scanned = false,
        status = 'Present'
    `);

    const result = await pool.query("SELECT * FROM inventory ORDER BY id");

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database Error",
    });
  }
};

// ===============================
// Add Inventory Item
// ===============================
const addInventoryItem = async (req, res) => {
  try {
    const { item_name, category, location } = req.body;

    const lastItem = await pool.query(
      "SELECT qr_code FROM inventory ORDER BY id DESC LIMIT 1",
    );

    let nextQR = "QR001";

    if (lastItem.rows.length > 0) {
      const lastQR = lastItem.rows[0].qr_code;
      const number = parseInt(lastQR.replace("QR", ""));
      nextQR = `QR${String(number + 1).padStart(3, "0")}`;
    }

    const result = await pool.query(
      `INSERT INTO inventory
      (item_name, category, qr_code, location, status, scanned)
      VALUES ($1, $2, $3, $4, 'Present', false)
      RETURNING *`,
      [item_name, category, nextQR, location],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database Error",
    });
  }
};

// ===============================
// Delete Inventory Item
// ===============================
const deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM inventory WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Item Not Found",
      });
    }

    res.json({
      message: "Item Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database Error",
    });
  }
};

module.exports = {
  getAllInventory,
  getInventoryByQR,
  startCheck,
  finishCheck,
  resetCheck,
  addInventoryItem,
  deleteInventoryItem,
};
