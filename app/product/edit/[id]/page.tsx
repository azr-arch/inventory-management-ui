"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Alert,
  CircularProgress,
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

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)

  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<ProductFormValues>({
    name: "",
    price: 0,
    unit: "",
    stock: 0,
    warehouse: 0,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call
    const product = products.find((p) => p.id === id)

    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        unit: product.unit,
        stock: product.stock,
        warehouse: product.warehouse,
      })
    } else {
      setNotFound(true)
    }

    setLoading(false)
  }, [id])

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

      // If validation passes, update the product (in a real app, this would be an API call)
      console.log("Updating product:", { id, ...formData })

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
        setSubmitError("An error occurred while updating the product.")
      }
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    )
  }

  if (notFound) {
    return (
      <Box>
        <Alert severity="error">Product not found</Alert>
        <Button component={Link} href="/product" variant="contained" sx={{ mt: 2 }}>
          Back to Products
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={4}>
        <Button component={Link} href="/product" startIcon={<ArrowBack />} sx={{ mr: 2 }}>
          Back to Products
        </Button>
        <Typography variant="h4" component="h1">
          Edit Product
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
                Update Product
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
