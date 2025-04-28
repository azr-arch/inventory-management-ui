import {
  Box,
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
import React from "react";
import { useParams } from "react-router-dom";
import { purchaseOrders } from "../../lib/data";

export const PurchaseOrderDetail = () => {
  const params = useParams();
  const currentOrder = purchaseOrders.find((order) => order.id === params.id);

  return (
    <Container maxWidth="xl" sx={{ paddingBlock: "2rem" }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
       Order Details - {currentOrder?.id}
      </Typography>
      <Box px={1} mt={5}>
        {currentOrder && (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                mb: 3,
              }}
            >
              <Typography variant="body1">
                <strong>Vendor:</strong> {currentOrder.vendor}
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
        <TableCell>HSN Code</TableCell>
        <TableCell>Unit</TableCell>
        <TableCell>Quantity</TableCell>
        <TableCell>Unit Price</TableCell>
        <TableCell>Total</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {currentOrder.items.map((item, index) => (
        <TableRow key={index}>
          <TableCell>{item.product}</TableCell>
          <TableCell>{item.hsncode}</TableCell>
          <TableCell>{item.unit}</TableCell>
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
      </Box>
    </Container>
  );
};
