"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material"
import { ArrowBack, Save } from "@mui/icons-material"
import Link from "next/link"
import { productSchema, type ProductFormValues } from "@/lib/validations"
import { products, warehouses } from "@/lib/data"

export default function AddProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ProductFormValues>({
    name: "",
    price: 0,
    unit: "",
    stock: 0,
    warehouse: 0,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitError(null)

    try {
      // Validate form data
      productSchema.parse(formData)

      // If validation passes, add the product (in a real app, this would be an API call)
      const newId = Math.max(...products.map((p) => p.id), 0) + 1

      // In a real app, you would update the database here
      console.log("Adding product:", { id: newId, ...formData })

      // Navigate back to product list
      router.push("/product")
    } catch (error) {
      if (error.errors) {
        // Format Zod validation errors
        const formattedErrors = {}
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message
        })
        setErrors(formattedErrors)
      } else {
        setSubmitError("An error occurred while saving the product.")
      }
    }
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={4}>
        <Button component={Link} href="/product" startIcon={<ArrowBack />} sx={{ mr: 2 }}>
          Back to Products
        </Button>
        <Typography variant="h4" component="h1">
          Add New Product
        </Typography>
      </Box>

      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
      )}

      <Card>
        <CardHeader title="Product Information" />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              sx={{ mb: 3 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="price"
              label="Price per Unit"
              name="price"
              type="number"
              inputProps={{ step: "0.01" }}
              value={formData.price}
              onChange={handleInputChange}
              error={!!errors.price}
              helperText={errors.price}
              sx={{ mb: 3 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="unit"
              label="Unit of Measurement"
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              error={!!errors.unit}
              helperText={errors.unit}
              sx={{ mb: 3 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="stock"
              label="Available Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
              error={!!errors.stock}
              helperText={errors.stock}
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth required error={!!errors.warehouse} sx={{ mb: 3 }}>
              <InputLabel id="warehouse-label">Warehouse</InputLabel>
              <Select
                labelId="warehouse-label"
                id="warehouse"
                name="warehouse"
                value={formData.warehouse}
                label="Warehouse"
                onChange={handleInputChange}
              >
                <MenuItem value={0} disabled>
                  Select a warehouse
                </MenuItem>
                {warehouses.map((warehouse) => (
                  <MenuItem key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.warehouse && <FormHelperText>{errors.warehouse}</FormHelperText>}
            </FormControl>

            <Box display="flex" justifyContent="flex-end">
              <Button type="button" variant="outlined" component={Link} href="/product" sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" startIcon={<Save />}>
                Save Product
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
