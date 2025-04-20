"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { ArrowBack, Save } from "@mui/icons-material";
import Link from "next/link";
import { warehouseSchema, type WarehouseFormValues } from "@/lib/validations";
import { warehouses } from "@/lib/data";

export default function AddWarehousePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<WarehouseFormValues>({
    name: "",
    location: "",
    capacity: "",
    utilization: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError(null);

    try {
      // Validate form data
      warehouseSchema.parse(formData);

      // If validation passes, add the warehouse (in a real app, this would be an API call)
      const newId = Math.max(...warehouses.map((w) => w.id), 0) + 1;

      // In a real app, you would update the database here
      console.log("Adding warehouse:", { id: newId, ...formData });

      // Navigate back to warehouse list
      router.push("/warehouse");
    } catch (error) {
      if (error.errors) {
        // Format Zod validation errors
        const formattedErrors = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      } else {
        setSubmitError("An error occurred while saving the warehouse.");
      }
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={4}>
        <Button
          component={Link}
          href="/warehouse"
          startIcon={<ArrowBack />}
          sx={{ mr: 2 }}
        >
          Back to Warehouses
        </Button>
        <Typography variant="h4" component="h1">
          Add New Warehouse
        </Typography>
      </Box>

      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
      )}

      <Card>
        <CardHeader title="Warehouse Information" />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Warehouse Name"
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
              id="location"
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              error={!!errors.location}
              helperText={errors.location}
              sx={{ mb: 3 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="capacity"
              label="Capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              error={!!errors.capacity}
              helperText={errors.capacity}
              sx={{ mb: 3 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="utilization"
              label="Utilization"
              name="utilization"
              value={formData.utilization}
              onChange={handleInputChange}
              error={!!errors.utilization}
              helperText={errors.utilization}
              sx={{ mb: 3 }}
            />

            <Box display="flex" justifyContent="flex-end">
              <Button
                type="button"
                variant="outlined"
                component={Link}
                href="/warehouse"
                sx={{ mr: 2 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Save />}
              >
                Save Warehouse
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
