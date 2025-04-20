"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
} from "@mui/material";
import { ArrowBack, Save } from "@mui/icons-material";
import Link from "next/link";
import { warehouseSchema, type WarehouseFormValues } from "@/lib/validations";
import { warehouses } from "@/lib/data";

export default function EditWarehousePage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<WarehouseFormValues>({
    name: "",
    location: "",
    capacity: "",
    utilization: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const warehouse = warehouses.find((w) => w.id === id);

    if (warehouse) {
      setFormData({
        name: warehouse.name,
        location: warehouse.location,
        capacity: warehouse.capacity,
        utilization: warehouse.utilization,
      });
    } else {
      setNotFound(true);
    }

    setLoading(false);
  }, [id]);

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

      // If validation passes, update the warehouse (in a real app, this would be an API call)
      console.log("Updating warehouse:", { id, ...formData });

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
        setSubmitError("An error occurred while updating the warehouse.");
      }
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (notFound) {
    return (
      <Box>
        <Alert severity="error">Warehouse not found</Alert>
        <Button
          component={Link}
          href="/warehouse"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to Warehouses
        </Button>
      </Box>
    );
  }

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
          Edit Warehouse
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
                Update Warehouse
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
