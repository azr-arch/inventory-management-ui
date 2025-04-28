import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
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
import { Link } from "react-router-dom";
import {
  Product,
  products as productsData,
  Warehouse,
  warehouses,
} from "../../lib/data";
import { ConfirmModal } from "../../components/modal/confirm-modal";
import { useState } from "react";

export const ProductList = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const products = productsData;
  const newProducts: (Product & {
    warehouse: Warehouse;
  })[] = [];

  products.forEach((product) => {
    // find warehouse
    const warehouse = warehouses.find(
      (warehouse) => warehouse.id === product.warehouseId
    );

    newProducts.push({
      ...product,
      warehouse: warehouse as Warehouse,
    });
  });

  return (
    <>
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => setModalOpen(false)}
        title="Delete product"
        description="Are you sure you want to delete this product?
                This action cannot be undone and will permanently remove the product from your inventory."
      />
      <Container maxWidth="xl" sx={{ paddingBlock: "2rem" }}>
        <Box
          component={"div"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.8rem",
          }}
        >
          <Typography component={"h1"} sx={{ fontSize: "2.4rem" }}>
            Products
          </Typography>

          <Button
            variant="contained"
            startIcon={<Add />}
            component={Link}
            to="/products/add"
          >
            Add Product
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="products table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Price</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Unit</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Available Stock</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>HSN Code</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Warehouse</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell align="right">
                    ${product.pricePerUnit.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {product.unitOfMeasurement}
                  </TableCell>
                  <TableCell align="right">{product.availableStock}</TableCell>
                  <TableCell align="right">{product.hsnCode}</TableCell>
                  <TableCell align="right">{product.warehouse.name}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      startIcon={<Visibility />}
                      component={Link}
                      to={`/products/${product.id}`}
                      sx={{ mr: 1 }}
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Edit />}
                      component={Link}
                      to={`/products/edit/${product.id}`}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => setModalOpen(true)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};
