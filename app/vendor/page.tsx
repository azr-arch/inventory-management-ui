"use client"

import { useState } from "react"
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { Add, Edit, Delete, Email, Phone, Business, Visibility } from "@mui/icons-material"
import Link from "next/link"
import { vendors } from "@/lib/data"

export default function VendorPage() {
  const [vendorList, setVendorList] = useState(vendors)

  const handleDeleteVendor = (id) => {
    setVendorList(vendorList.filter((v) => v.id !== id))
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Vendors
        </Typography>
        <Button variant="contained" color="primary" startIcon={<Add />} component={Link} href="/vendor/add">
          Add Vendor
        </Button>
      </Box>

      <Grid container spacing={3}>
        {vendorList.map((vendor) => (
          <Grid item xs={12} sm={6} md={4} key={vendor.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {vendor.name}
                </Typography>
                <Typography variant="body2" mb={1}>
                  <strong>Contact:</strong> {vendor.contact}
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <Email fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {vendor.email}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Phone fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {vendor.phone}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Business fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {vendor.address}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ mt: "auto" }}>
                <Button size="small" startIcon={<Visibility />} component={Link} href={`/vendor/${vendor.id}`}>
                  View
                </Button>
                <Button size="small" startIcon={<Edit />} component={Link} href={`/vendor/edit/${vendor.id}`}>
                  Edit
                </Button>
                <Button size="small" color="error" startIcon={<Delete />} onClick={() => handleDeleteVendor(vendor.id)}>
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
