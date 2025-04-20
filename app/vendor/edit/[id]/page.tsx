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
} from "@mui/material"
import { ArrowBack, Save } from "@mui/icons-material"
import Link from "next/link"
import { vendorSchema, type VendorFormValues } from "@/lib/validations"
import { vendors } from "@/lib/data"

export default function EditVendorPage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)

  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<VendorFormValues>({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call
    const vendor = vendors.find((v) => v.id === id)

    if (vendor) {
      setFormData({
        name: vendor.name,
        contact: vendor.contact,
        email: vendor.email,
        phone: vendor.phone,
        address: vendor.address,
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
      vendorSchema.parse(formData)

      // If validation passes, update the vendor (in a real app, this would be an API call)
      console.log("Updating vendor:", { id, ...formData })

      // Navigate back to vendor list
      router.push("/vendor")
    } catch (error) {
      if (error.errors) {
        // Format Zod validation errors
        const formattedErrors = {}
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message
        })
        setErrors(formattedErrors)
      } else {
        setSubmitError("An error occurred while updating the vendor.")
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
        <Alert severity="error">Vendor not found</Alert>
        <Button component={Link} href="/vendor" variant="contained" sx={{ mt: 2 }}>
          Back to Vendors
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={4}>
        <Button component={Link} href="/vendor" startIcon={<ArrowBack />} sx={{ mr: 2 }}>
          Back to Vendors
        </Button>
        <Typography variant="h4" component="h1">
          Edit Vendor
        </Typography>
      </Box>

      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
      )}

      <Card>
        <CardHeader title="Vendor Information" />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Vendor Name"
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
              id="contact"
              label="Contact Person"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              error={!!errors.contact}
              helperText={errors.contact}
              sx={{ mb: 3 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 3 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
              sx={{ mb: 3 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              multiline
              rows={3}
              value={formData.address}
              onChange={handleInputChange}
              error={!!errors.address}
              helperText={errors.address}
              sx={{ mb: 3 }}
            />

            <Box display="flex" justifyContent="flex-end">
              <Button type="button" variant="outlined" component={Link} href="/vendor" sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" startIcon={<Save />}>
                Update Vendor
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
