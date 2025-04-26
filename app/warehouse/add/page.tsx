"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { ArrowBack, Save } from "@mui/icons-material";
import FormInput from "@/components/form-input";
import {
  CITY_OPTIONS,
  COUNTRY_OPTIONS,
  STATE_OPTIONS,
  WarehouseSchema,
} from "@/schema/warehouse-schema";
// import { WarehouseSchema } from '../schemas/warehouseSchema';
// import FormInput from '../components/FormInput';

export default function AddWarehousePage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(WarehouseSchema),
    defaultValues: {
      name: "",
      warehouseCode: "",
      description: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      },
    },
  });

  const onSubmit = (data) => {
    console.log("Validated data:", data);
    // Handle form submission logic here
  };

  return (
    <Box p={4}>
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

      <Card>
        <CardHeader title="Warehouse Information" />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={3}>
              <Grid>
                <FormInput
                  name="name"
                  control={control}
                  label="Warehouse Name"
                  error={errors.name}
                />
              </Grid>

              <Grid>
                <FormInput
                  name="warehouseCode"
                  control={control}
                  label="Warehouse Code"
                  error={errors.warehouseCode}
                />
              </Grid>

              <Grid>
                <FormInput
                  name="description"
                  control={control}
                  label="Description"
                  multiline
                  rows={4}
                  error={errors.description}
                />
              </Grid>

              {/* Address Section */}
              <Grid>
                <Typography variant="h6" gutterBottom>
                  Address Details
                </Typography>
              </Grid>

              <Grid>
                <FormInput
                  name="address.street"
                  control={control}
                  label="Street Address"
                  error={errors.address?.street}
                />
              </Grid>

              <Grid>
                <FormInput
                  name="address.city"
                  control={control}
                  label="City"
                  type="select"
                  options={CITY_OPTIONS}
                  error={errors.address?.city}
                />
              </Grid>

              <Grid>
                <FormInput
                  name="address.state"
                  control={control}
                  label="State"
                  type="select"
                  options={STATE_OPTIONS}
                  error={errors.address?.state}
                />
              </Grid>

              <Grid>
                <FormInput
                  name="address.country"
                  control={control}
                  label="Country"
                  type="select"
                  options={COUNTRY_OPTIONS}
                  error={errors.address?.country}
                />
              </Grid>

              <Grid>
                <FormInput
                  name="address.pincode"
                  control={control}
                  label="Pincode"
                  error={errors.address?.pincode}
                />
              </Grid>

              <Grid>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button variant="outlined" component={Link} href="/warehouse">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                  >
                    Save Warehouse
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
