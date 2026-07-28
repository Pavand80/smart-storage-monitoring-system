import api from "../services/api";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Chip,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";

function InventoryTable({ inventory, refreshInventory }) {
  // Start Check
  const handleStartCheck = async () => {
    try {
      await api.get("/inventory/start-check");

      alert("Inventory Check Started");

      if (refreshInventory) {
        refreshInventory();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Finish Check
  const handleFinishCheck = async () => {
    try {
      await api.post("/inventory/finish-check");

      alert("Inventory Check Completed");

      if (refreshInventory) {
        refreshInventory();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = async () => {
    try {
      await api.post("/inventory/reset-check");

      alert("Inventory Reset Successfully");

      refreshInventory();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/inventory/${id}`);

      alert("Item Deleted Successfully");

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to Delete Item");
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "#333",
        }}
      >
        📦 Inventory Management
      </Typography>

      <hr
        style={{
          border: "1px solid #e5e5e5",
          marginTop: "8px",
          marginBottom: "18px",
        }}
      />

      <TableContainer
        sx={{
          maxHeight: 220,
          overflow: "auto",
          borderRadius: 2,
          border: "1px solid #e5e5e5",
        }}
      >
        <Table stickyHeader size="small">
          <TableHead
            sx={{
              backgroundColor: "#f5f5f5",
            }}
          >
            <TableRow hover>
              <TableCell>
                <b>QR</b>
              </TableCell>
              <TableCell>
                <b>Item</b>
              </TableCell>
              <TableCell>
                <b>Category</b>
              </TableCell>
              <TableCell>
                <b>Location</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
              <TableCell>
                <b>Action</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {inventory.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  backgroundColor: item.id % 2 === 0 ? "#fafafa" : "#ffffff",
                  "&:hover": {
                    backgroundColor: "#f2f2f2",
                  },
                }}
              >
                <TableCell>{item.qr_code}</TableCell>

                <TableCell>{item.item_name}</TableCell>

                <TableCell>{item.category}</TableCell>

                <TableCell>{item.location}</TableCell>

                <TableCell>
                  <Chip
                    label={item.status}
                    color={item.status === "Present" ? "success" : "default"}
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleStartCheck}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            color: "#333",
            borderColor: "#bdbdbd",
            px: 3,
            "&:hover": {
              borderColor: "#616161",
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          ▶ Start Check
        </Button>

        <Button
          variant="outlined"
          onClick={handleFinishCheck}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            color: "#333",
            borderColor: "#bdbdbd",
            px: 3,
            "&:hover": {
              borderColor: "#616161",
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          ✔ Finish Check
        </Button>

        <Button
          variant="outlined"
          onClick={handleReset}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            color: "#333",
            borderColor: "#bdbdbd",
            px: 3,
            "&:hover": {
              borderColor: "#616161",
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          ↻ Reset
        </Button>
      </Box>
    </Paper>
  );
}

export default InventoryTable;
