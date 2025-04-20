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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  LinearProgress,
  Tabs,
  Tab,
  IconButton,
  Breadcrumbs,
} from "@mui/material";
import {
  Edit,
  LocationOn,
  Inventory,
  WarehouseOutlined,
  SquareFoot,
  PieChart,
  Add,
  Download,
  Print,
} from "@mui/icons-material";
import Link from "next/link";
import { warehouses, products } from "@/lib/data";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`warehouse-tabpanel-${index}`}
      aria-labelledby={`warehouse-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function WarehouseDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [warehouse, setWarehouse] = useState(null);
  const [warehouseProducts, setWarehouseProducts] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundWarehouse = warehouses.find((w) => w.id === id);

    if (foundWarehouse) {
      setWarehouse(foundWarehouse);

      // Find products in this warehouse
      const productsInWarehouse = products.filter((p) => p.warehouse === id);
      setWarehouseProducts(productsInWarehouse);
    } else {
      setNotFound(true);
    }

    setLoading(false);
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Calculate utilization percentage for progress bar
  const getUtilizationPercentage = (utilization) => {
    return Number.parseInt(utilization.replace("%", ""));
  };

  // Get color based on utilization
  const getUtilizationColor = (percentage) => {
    if (percentage < 50) return "success";
    if (percentage < 80) return "warning";
    return "error";
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

  const utilizationPercentage = getUtilizationPercentage(warehouse.utilization);
  const utilizationColor = getUtilizationColor(utilizationPercentage);

  return (
    <Box>
      {/* Breadcrumbs navigation */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          Dashboard
        </Link>
        <Link
          href="/warehouse"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Warehouses
        </Link>
        <Typography color="text.primary">{warehouse.name}</Typography>
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
              <WarehouseOutlined />
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                {warehouse.name}
              </Typography>
              <Box display="flex" alignItems="center" mt={0.5}>
                <LocationOn fontSize="small" color="action" sx={{ mr: 0.5 }} />
                <Typography variant="body1" color="text.secondary">
                  {warehouse.location}
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
              href={`/warehouse/edit/${id}`}
              startIcon={<Edit />}
              variant="contained"
              color="primary"
            >
              Edit Warehouse
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Tabs navigation */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="warehouse tabs"
        >
          <Tab
            label="Overview"
            id="warehouse-tab-0"
            aria-controls="warehouse-tabpanel-0"
          />
          <Tab
            label="Products"
            id="warehouse-tab-1"
            aria-controls="warehouse-tabpanel-1"
          />
          <Tab
            label="Activity"
            id="warehouse-tab-2"
            aria-controls="warehouse-tabpanel-2"
          />
        </Tabs>
      </Box>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Warehouse Stats */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", borderRadius: 2 }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="medium">
                  Warehouse Statistics
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 3 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Box display="flex" alignItems="center">
                      <SquareFoot color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        Capacity
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {warehouse.capacity}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1}
                    >
                      <Box display="flex" alignItems="center">
                        <PieChart color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Utilization
                        </Typography>
                      </Box>
                      <Typography variant="body1" fontWeight="medium">
                        {warehouse.utilization}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={utilizationPercentage}
                      color={utilizationColor}
                      sx={{ height: 8, borderRadius: 1 }}
                    />
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Box display="flex" alignItems="center">
                      <Inventory color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        Products Stored
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {warehouseProducts.length}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Warehouse Summary */}
          <Grid item xs={12} md={8}>
            <Card sx={{ height: "100%", borderRadius: 2 }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="medium">
                  Warehouse Summary
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Typography variant="body1" paragraph>
                  This warehouse is currently at {warehouse.utilization}{" "}
                  capacity, with {warehouseProducts.length} different products
                  stored. The warehouse is located at {warehouse.location} and
                  has a total capacity of {warehouse.capacity}.
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    fontWeight="medium"
                  >
                    Warehouse Status
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip
                      label={
                        utilizationPercentage > 90
                          ? "Critical Capacity"
                          : "Normal Capacity"
                      }
                      color={utilizationPercentage > 90 ? "error" : "success"}
                    />
                    <Chip label="Active" color="primary" />
                    <Chip label="Inventory Tracked" color="default" />
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Products Tab */}
      <TabPanel value={tabValue} index={1}>
        <Card sx={{ borderRadius: 2 }}>
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight="medium">
              Products in this Warehouse
            </Typography>
            <Button
              component={Link}
              href="/product/add"
              startIcon={<Add />}
              variant="contained"
              size="small"
              color="primary"
            >
              Add Product
            </Button>
          </Box>
          <Divider />
          {warehouseProducts.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Unit</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {warehouseProducts.map((product) => (
                    <TableRow key={product.id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar
                            sx={{
                              bgcolor: "primary.light",
                              width: 32,
                              height: 32,
                              mr: 1.5,
                            }}
                          >
                            <Inventory fontSize="small" />
                          </Avatar>
                          <Link
                            href={`/product/${product.id}`}
                            style={{
                              textDecoration: "none",
                              color: "#1976d2",
                              fontWeight: 500,
                            }}
                          >
                            {product.name}
                          </Link>
                        </Box>
                      </TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.unit}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={
                            product.stock > 10
                              ? "In Stock"
                              : product.stock > 0
                              ? "Low Stock"
                              : "Out of Stock"
                          }
                          color={
                            product.stock > 10
                              ? "success"
                              : product.stock > 0
                              ? "warning"
                              : "error"
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          component={Link}
                          href={`/product/${product.id}`}
                          size="small"
                          color="primary"
                          aria-label="view"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                No products in this warehouse.
              </Typography>
              <Button
                component={Link}
                href="/product/add"
                startIcon={<Add />}
                variant="contained"
                sx={{ mt: 2 }}
                color="primary"
              >
                Add Product
              </Button>
            </Box>
          )}
        </Card>
      </TabPanel>

      {/* Activity Tab */}
      <TabPanel value={tabValue} index={2}>
        <Card sx={{ borderRadius: 2 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Recent Activity
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ py: 4 }}
            >
              Activity tracking is not available in the demo version.
            </Typography>
          </Box>
        </Card>
      </TabPanel>
    </Box>
  );
}
