"use client"

import { useState } from "react"
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { Add, Edit, Delete, LocationOn, Visibility } from "@mui/icons-material"
import Link from "next/link"
import { warehouses } from "@/lib/data"

export default function WarehousePage() {
  const [warehouseList, setWarehouseList] = useState(warehouses)

  const handleDeleteWarehouse = (id) => {
    setWarehouseList(warehouseList.filter((w) => w.id !== id))
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Warehouses
        </Typography>
        <Button variant="contained" color="primary" startIcon={<Add />} component={Link} href="/warehouse/add">
          Add Warehouse
        </Button>
      </Box>

      <Grid container spacing={3}>
        {warehouseList.map((warehouse) => (
          <Grid item xs={12} sm={6} md={4} key={warehouse.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {warehouse.name}
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <LocationOn fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {warehouse.location}
                  </Typography>
                </Box>
                <Typography variant="body2" mb={1}>
                  <strong>Capacity:</strong> {warehouse.capacity}
                </Typography>
                <Typography variant="body2">
                  <strong>Utilization:</strong> {warehouse.utilization}
                </Typography>
              </CardContent>
              <CardActions sx={{ mt: "auto" }}>
                <Button size="small" startIcon={<Visibility />} component={Link} href={`/warehouse/${warehouse.id}`}>
                  View
                </Button>
                <Button size="small" startIcon={<Edit />} component={Link} href={`/warehouse/edit/${warehouse.id}`}>
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDeleteWarehouse(warehouse.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
