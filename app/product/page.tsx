"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { Add, Edit, Delete, Visibility } from "@mui/icons-material"
import Link from "next/link"
import { products, warehouses } from "@/lib/data"

export default function ProductPage() {
  const [productList, setProductList] = useState(products)

  const handleDeleteProduct = (id) => {
    setProductList(productList.filter((p) => p.id !== id))
  }

  const getWarehouseName = (warehouseId) => {
    const warehouse = warehouses.find((w) => w.id === warehouseId)
    return warehouse ? warehouse.name : "Unknown"
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Products
        </Typography>
        <Button variant="contained" color="primary" startIcon={<Add />} component={Link} href="/product/add">
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
              <TableCell>
                <strong>Price</strong>
              </TableCell>
              <TableCell>
                <strong>Unit</strong>
              </TableCell>
              <TableCell>
                <strong>Available Stock</strong>
              </TableCell>
              <TableCell>
                <strong>Warehouse</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{getWarehouseName(product.warehouse)}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    component={Link}
                    href={`/product/${product.id}`}
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    component={Link}
                    href={`/product/edit/${product.id}`}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
