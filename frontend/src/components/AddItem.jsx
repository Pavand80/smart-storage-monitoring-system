// AddItem.jsx
import { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import api from "../services/api";

function AddItem({ refreshInventory }) {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const handleAddItem = async () => {
    if (!itemName || !category || !location) {
      alert("Please fill all fields");
      return;
    }
    try {
      await api.post("/inventory/add", {
        item_name: itemName,
        category,
        location,
      });
      alert("Item Added Successfully");
      setItemName("");
      setCategory("");
      setLocation("");
      if (refreshInventory) {
        refreshInventory();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to Add Item");
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mt: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
        }}
      >
        ➕ Add New Item
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            size="small"
            label="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            size="small"
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            size="small"
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} display="flex" alignItems="center">
          <Button
            fullWidth
            variant="outlined"
            onClick={handleAddItem}
            sx={{
              height: 48,
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            + Add Item
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AddItem;
