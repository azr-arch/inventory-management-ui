import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
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
} from "@mui/material";
import { products, vendors } from "../../lib/data";
import { Add, Delete, PriceChange } from "@mui/icons-material";
import { useState } from "react";
import { Product } from "../../lib/data";

// Name Price	Unit HSN Code	Quantity Total

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface OrderItem {
  productId: string;
  productName: string;
  hsncode: string;
  unit: string;
  quantity: number;
  price: number;
  total: number;
}

const defaultData = {
  productId: "",
  productName: "",
  hsncode: "",
  unit: "",
  quantity: 0,
  price: 0,
  total: 0,
};

export const AddPurchaseOrder = () => {
  const [productRows, setProductRows] = useState<OrderItem[]>([
    {
      productId: "",
      productName: "",
      hsncode: "",
      unit: "",
      quantity: 0,
      price: 0,
      total: 0,
    },
  ]);

  const handleProductChange = (
    option: { label: string; value: string } | null,
    rowIdx: number
  ) => {
    if (!option) return;
    const rows = [...productRows];
    const selectedProduct = products.find(
      (product) => product.id === option?.value
    );
    if (!selectedProduct) return;
    const currentQuantity =
      rows[rowIdx].quantity === 0 ? 1 : rows[rowIdx].quantity;

    rows[rowIdx] = {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      unit: selectedProduct.unitOfMeasurement,
      quantity: currentQuantity,
      hsncode: selectedProduct.hsnCode,
      price: selectedProduct.pricePerUnit,
      total: selectedProduct.pricePerUnit * currentQuantity,
    };

    setProductRows(rows);
  };

  const handleAddRows = () => {
    const rows = [...productRows];
    rows.push(defaultData);
    setProductRows(rows);
  };

  const handleQuantityChange = (quantity: number, rowIdx: number) => {
    const rows = [...productRows];
    rows[rowIdx] = {
      ...rows[rowIdx],
      quantity,
      total: quantity * rows[rowIdx].price,
    };

    setProductRows(rows);
  };

  const handleRemoveRow = (index: number) => {
    setProductRows((prev) => prev.filter((_, i) => i !== index));
  };

  const productOptions = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  const grandTotal = productRows.reduce(
    (acc, currentItem) => acc + currentItem.total,
    0
  );

  return (
    <Container maxWidth="xl" sx={{ paddingBlock: "2rem" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" component="h1">
          Add Purchase Order
        </Typography>
      </Box>

      <Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            mb: 2,
            mt: 1,
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Vendor</InputLabel>
            <Select label="Vendor" MenuProps={MenuProps}>
              {vendors.map((vendor) => (
                <MenuItem key={vendor.id} value={vendor.name}>
                  {vendor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
                <TableCell>HSN Code</TableCell>
                <TableCell sx={{ width: 80 }}>Unit</TableCell>
                <TableCell sx={{ width: 80 }}>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
                <TableCell sx={{ width: 40 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productRows.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <FormControl fullWidth size="small">
                      <Autocomplete
                        options={productOptions}
                        size="small"
                        id="controlled-demo"
                        value={{ label: row.productName, value: row.productId }}
                        onChange={(_, value) => handleProductChange(value, idx)}
                        renderInput={(params) => (
                          <TextField {...params} label={"Product"} />
                        )}
                      />
                    </FormControl>
                  </TableCell>

                  <TableCell size="small">{row.hsncode}</TableCell>
                  <TableCell>{row.unit}</TableCell>

                  <TableCell size="small">
                    <TextField
                      type="number"
                      size="small"
                      defaultValue={1}
                      value={row.quantity}
                      inputProps={{ min: 1 }}
                      onChange={(e) =>
                        handleQuantityChange(parseInt(e.target.value), idx)
                      }
                    />
                  </TableCell>
                  <TableCell size="small">{row.price}</TableCell>
                  <TableCell size="small">{row.total}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      disabled={productRows.length === 1}
                      onClick={() => handleRemoveRow(idx)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button onClick={handleAddRows} variant="outlined" startIcon={<Add />}>
          Add Item
        </Button>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Typography variant="h6">Total: $ {grandTotal}</Typography>
        </Box>
        <Button variant="contained" color="primary">
          Create Order
        </Button>
      </Box>
    </Container>
  );
};
