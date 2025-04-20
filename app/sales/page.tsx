"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material"
import { Add, Edit, Visibility } from "@mui/icons-material"

// Mock data for sales orders
const initialSalesOrders = [
  {
    id: "SO-2023-001",
    customer: "Acme Corp",
    date: "2023-06-15",
    total: 2499.97,
    status: "Delivered",
    items: [
      { product: "Laptop", quantity: 2, price: 999.99 },
      { product: "Desk Chair", quantity: 2, price: 199.5 },
      { product: "Stapler", quantity: 5, price: 5.99 },
    ],
  },
  {
    id: "SO-2023-002",
    customer: "TechStart Inc",
    date: "2023-06-18",
    total: 1249.95,
    status: "Processing",
    items: [
      { product: "Laptop", quantity: 1, price: 999.99 },
      { product: "Ink Cartridge", quantity: 10, price: 24.99 },
    ],
  },
  {
    id: "SO-2023-003",
    customer: "Global Services",
    date: "2023-06-20",
    total: 599.4,
    status: "Shipped",
    items: [{ product: "Desk Chair", quantity: 3, price: 199.5 }],
  },
  {
    id: "SO-2023-004",
    customer: "Local Business",
    date: "2023-06-22",
    total: 1199.88,
    status: "Pending",
    items: [
      { product: "Printer Paper", quantity: 20, price: 9.99 },
      { product: "Ink Cartridge", quantity: 40, price: 24.99 },
    ],
  },
]

export default function SalesOrderPage() {
  const [salesOrders, setSalesOrders] = useState(initialSalesOrders)
  const [openDialog, setOpenDialog] = useState(false)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(null)

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleOpenDetailsDialog = (order) => {
    setCurrentOrder(order)
    setOpenDetailsDialog(true)
  }

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "success"
      case "Shipped":
        return "info"
      case "Processing":
        return "warning"
      case "Pending":
        return "default"
      default:
        return "default"
    }
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Sales Orders
        </Typography>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleOpenDialog}>
          Create Sales Order
        </Button>
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
              <TableCell>
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
                  <Chip label={order.status} color={getStatusColor(order.status)} size="small" />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => handleOpenDetailsDialog(order)}
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                  <Button size="small" startIcon={<Edit />}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Sales Order Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
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
      </Dialog>

      {/* Order Details Dialog */}
      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog} maxWidth="md" fullWidth>
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
      </Dialog>
    </Box>
  )
}
