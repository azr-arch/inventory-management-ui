"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Box, Button, Card, CardContent, CardHeader, TextField, Typography, Alert } from "@mui/material"
import { ArrowBack, Save } from "@mui/icons-material"
import Link from "next/link"
import { vendorSchema, type VendorFormValues } from "@/lib/validations"
import { vendors } from "@/lib/data"

export default function AddVendorPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<VendorFormValues>({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
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
      vendorSchema.parse(formData)

      // If validation passes, add the vendor (in a real app, this would be an API call)
      const newId = Math.max(...vendors.map((v) => v.id), 0) + 1

      // In a real app, you would update the database here
      console.log("Adding vendor:", { id: newId, ...formData })

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
        setSubmitError("An error occurred while saving the vendor.")
      }
    }
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={4}>
        <Button component={Link} href="/vendor" startIcon={<ArrowBack />} sx={{ mr: 2 }}>
          Back to Vendors
        </Button>
        <Typography variant="h4" component="h1">
          Add New Vendor
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
                Save Vendor
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
