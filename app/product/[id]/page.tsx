"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Button,
  Card,
  Typography,
  Alert,
  CircularProgress,
  Grid,
  Divider,
  Chip,
  Avatar,
  Tabs,
  Tab,
  Breadcrumbs,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stack,
} from "@mui/material";
import {
  Edit,
  Inventory,
  Warehouse,
  LocalShipping,
  AttachMoney,
  Category,
  ShoppingCart,
  Download,
  Print,
  LocationOn,
  SquareFoot,
  PieChart,
  Layers,
  Timeline,
  BarChart,
} from "@mui/icons-material";
import Link from "next/link";
import { products, warehouses } from "@/lib/data";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundProduct = products.find((p) => p.id === id);

    if (foundProduct) {
      setProduct(foundProduct);

      // Find the warehouse
      const foundWarehouse = warehouses.find(
        (w) => w.id === foundProduct.warehouse
      );
      setWarehouse(foundWarehouse);
    } else {
      setNotFound(true);
    }

    setLoading(false);
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Get stock status and color
  const getStockStatus = (stock) => {
    if (stock > 10) return { label: "In Stock", color: "success" };
    if (stock > 0) return { label: "Low Stock", color: "warning" };
    return { label: "Out of Stock", color: "error" };
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
        <Alert severity="error">Product not found</Alert>
        <Button
          component={Link}
          href="/product"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
      </Box>
    );
  }

  const stockStatus = getStockStatus(product.stock);

  return (
    <Box>
      {/* Breadcrumbs navigation */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          Dashboard
        </Link>
        <Link
          href="/product"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Products
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      {/* Header section */}
      <Paper
        elevation={0}
        sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: "#f8fafc" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 56,
                height: 56,
                mr: 2,
              }}
            >
              <Inventory fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                {product.name}
              </Typography>
              <Box display="flex" alignItems="center" mt={0.5}>
                <Chip
                  size="small"
                  label={stockStatus.label}
                  color={stockStatus.color}
                  sx={{ mr: 1, fontWeight: "medium" }}
                />
                <Typography variant="body1" color="text.secondary">
                  {product.stock} {product.unit}(s) available
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex" gap={1} mt={{ xs: 2, sm: 0 }}>
            <Button startIcon={<Print />} variant="outlined" size="small">
              Print
            </Button>
            <Button startIcon={<Download />} variant="outlined" size="small">
              Export
            </Button>
            <Button
              component={Link}
              href={`/product/edit/${id}`}
              startIcon={<Edit />}
              variant="contained"
              color="primary"
            >
              Edit Product
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Tabs navigation */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="product tabs"
        >
          <Tab
            label="Overview"
            id="product-tab-0"
            aria-controls="product-tabpanel-0"
          />
          <Tab
            label="Inventory"
            id="product-tab-1"
            aria-controls="product-tabpanel-1"
          />
          <Tab
            label="History"
            id="product-tab-2"
            aria-controls="product-tabpanel-2"
          />
        </Tabs>
      </Box>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Product Stats */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ borderRadius: 2 }}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight="medium">
                    Product Details
                  </Typography>
                  <Divider sx={{ my: 2 }} />

                  <List disablePadding>
                    <ListItem disablePadding sx={{ pb: 2 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <AttachMoney color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Price"
                        secondary={`$${product.price.toFixed(2)} per ${
                          product.unit
                        }`}
                        primaryTypographyProps={{
                          variant: "body2",
                          color: "text.secondary",
                        }}
                        secondaryTypographyProps={{
                          variant: "body1",
                          fontWeight: "medium",
                        }}
                      />
                    </ListItem>

                    <ListItem disablePadding sx={{ pb: 2 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Category color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Unit"
                        secondary={product.unit}
                        primaryTypographyProps={{
                          variant: "body2",
                          color: "text.secondary",
                        }}
                        secondaryTypographyProps={{
                          variant: "body1",
                          fontWeight: "medium",
                        }}
                      />
                    </ListItem>

                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Layers color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Stock"
                        secondary={`${product.stock} ${product.unit}(s)`}
                        primaryTypographyProps={{
                          variant: "body2",
                          color: "text.secondary",
                        }}
                        secondaryTypographyProps={{
                          variant: "body1",
                          fontWeight: "medium",
                        }}
                      />
                    </ListItem>
                  </List>
                </Box>
              </Card>

              <Card sx={{ borderRadius: 2 }}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight="medium">
                    Quick Actions
                  </Typography>
                  <Divider sx={{ my: 2 }} />

                  <Stack spacing={2}>
                    <Button
                      startIcon={<ShoppingCart />}
                      variant="outlined"
                      fullWidth
                    >
                      Add to Sales Order
                    </Button>
                    <Button
                      startIcon={<LocalShipping />}
                      variant="outlined"
                      fullWidth
                    >
                      Add to Purchase Order
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </Stack>
          </Grid>

          {/* Warehouse Information */}
          <Grid xs={12} md={8}>
            <Card sx={{ borderRadius: 2 }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="medium">
                  Warehouse Information
                </Typography>
                <Divider sx={{ my: 2 }} />

                {warehouse ? (
                  <Box>
                    <Box display="flex" alignItems="center" mb={3}>
                      <Avatar
                        sx={{
                          bgcolor: "primary.light",
                          width: 48,
                          height: 48,
                          mr: 2,
                        }}
                      >
                        <Warehouse />
                      </Avatar>
                      <Box>
                        <Typography variant="h6">
                          <Link
                            href={`/warehouse/${warehouse.id}`}
                            style={{ textDecoration: "none", color: "#1976d2" }}
                          >
                            {warehouse.name}
                          </Link>
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <LocationOn
                            fontSize="small"
                            color="action"
                            sx={{ mr: 0.5 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {warehouse.location}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Paper
                          variant="outlined"
                          sx={{ p: 2, borderRadius: 2 }}
                        >
                          <Box display="flex" alignItems="center" mb={1}>
                            <SquareFoot color="primary" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              Capacity
                            </Typography>
                          </Box>
                          <Typography variant="h6">
                            {warehouse.capacity}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Paper
                          variant="outlined"
                          sx={{ p: 2, borderRadius: 2 }}
                        >
                          <Box display="flex" alignItems="center" mb={1}>
                            <PieChart color="primary" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              Utilization
                            </Typography>
                          </Box>
                          <Typography variant="h6">
                            {warehouse.utilization}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>

                    <Box mt={3}>
                      <Typography variant="body1">
                        This product is stored in the {warehouse.name}{" "}
                        warehouse, which is currently at {warehouse.utilization}{" "}
                        capacity. The warehouse is located at{" "}
                        {warehouse.location}.
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Typography>Warehouse information not available.</Typography>
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Inventory Tab */}
      <TabPanel value={tabValue} index={1}>
        <Card sx={{ borderRadius: 2 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Inventory Levels
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <BarChart color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Current Stock</Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: 200 }}
                  >
                    <Typography variant="h2" color={stockStatus.color}>
                      {product.stock}
                    </Typography>
                  </Box>
                  <Box mt={2} textAlign="center">
                    <Chip label={stockStatus.label} color={stockStatus.color} />
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Timeline color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Inventory Status</Typography>
                  </Box>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Minimum Stock Level"
                        secondary="10 units"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Reorder Point"
                        secondary="20 units"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Maximum Stock Level"
                        secondary="100 units"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Status"
                        secondary={
                          <Chip
                            size="small"
                            label={
                              product.stock < 10
                                ? "Reorder Required"
                                : product.stock < 20
                                ? "Approaching Reorder Point"
                                : "Healthy Stock Level"
                            }
                            color={
                              product.stock < 10
                                ? "error"
                                : product.stock < 20
                                ? "warning"
                                : "success"
                            }
                            sx={{ mt: 0.5 }}
                          />
                        }
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </TabPanel>

      {/* History Tab */}
      <TabPanel value={tabValue} index={2}>
        <Card sx={{ borderRadius: 2 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Product History
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ py: 4 }}
            >
              Product history tracking is not available in the demo version.
            </Typography>
          </Box>
        </Card>
      </TabPanel>
    </Box>
  );
}
