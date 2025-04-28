import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { salesOrders } from "../../lib/data";
import { getStatusColor } from "../purchase/purchase-order";
import { Visibility } from "@mui/icons-material";

export const SalesOrderPage = () => {
  return (
    <Container maxWidth="xl" sx={{ marginBlock: "2rem" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" component="h1">
          Sales Orders
        </Typography>
        {/* <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          // onClick={handleOpenDialog}
        >
          Create Sales Order
        </Button> */}
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="sales orders table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Order ID</strong>
              </TableCell>
              <TableCell>
                <strong>Customer</strong>
              </TableCell>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell>
                <strong>Total</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    // onClick={() => handleOpenDetailsDialog(order)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Sales Order Dialog */}
      {/* <Dialog
  
  // open={openDialog}
   onClose={handleCloseDialog}
    maxWidth="md" fullWidth>

    <DialogTitle>Create New Sales Order</DialogTitle>
    <DialogContent>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2, mt: 1 }}>
        <TextField label="Customer Name" type="text" fullWidth variant="outlined" />
        <TextField
          label="Order Date"
          type="date"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          defaultValue={new Date().toISOString().split("T")[0]}
        />
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Order Items
      </Typography>

      <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <FormControl fullWidth size="small">
                  <InputLabel>Product</InputLabel>
                  <Select label="Product">
                    <MenuItem value="Laptop">Laptop</MenuItem>
                    <MenuItem value="Desk Chair">Desk Chair</MenuItem>
                    <MenuItem value="Printer Paper">Printer Paper</MenuItem>
                    <MenuItem value="Stapler">Stapler</MenuItem>
                    <MenuItem value="Ink Cartridge">Ink Cartridge</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <TextField type="number" size="small" defaultValue={1} inputProps={{ min: 1 }} />
              </TableCell>
              <TableCell>
                <TextField type="number" size="small" defaultValue={0} inputProps={{ min: 0, step: 0.01 }} />
              </TableCell>
              <TableCell>$0.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="outlined" startIcon={<Add />}>
        Add Item
      </Button>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Typography variant="h6">Total: $0.00</Typography>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDialog}>Cancel</Button>
      <Button variant="contained" color="primary">
        Create Order
      </Button>
    </DialogActions>
  </Dialog> */}

      {/* Order Details Dialog */}
      {/* <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog} maxWidth="md" fullWidth>
    <DialogTitle>Order Details - {currentOrder?.id}</DialogTitle>
    <DialogContent>
      {currentOrder && (
        <>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 3 }}>
            <Typography variant="body1">
              <strong>Customer:</strong> {currentOrder.customer}
            </Typography>
            <Typography variant="body1">
              <strong>Date:</strong> {currentOrder.date}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {currentOrder.status}
            </Typography>
            <Typography variant="body1">
              <strong>Total:</strong> ${currentOrder.total.toFixed(2)}
            </Typography>
          </Box>

          <Typography variant="h6" gutterBottom>
            Order Items
          </Typography>

          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentOrder.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDetailsDialog}>Close</Button>
    </DialogActions>
  </Dialog> */}
    </Container>
  );
};
