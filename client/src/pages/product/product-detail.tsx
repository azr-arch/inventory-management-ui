import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Product, products, warehouses } from "../../lib/data";
import {
  AttachMoney,
  BarChart,
  Category,
  Edit,
  Inventory,
  Layers,
  LocationOn,
  Timeline,
  Warehouse,
} from "@mui/icons-material";
import { useState } from "react";

export const ProductDetailPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const params = useParams();

  const product = products.find((item) => item.id === params.id) as Product;
  const warehouse = warehouses.find((item) => item.id === product.warehouseId);

  const handleTabChange = (_: unknown, value: number) => {
    setTabValue(value);
  };

  return (
    <Container maxWidth="xl" sx={{ paddingBlock: "2.5rem" }}>
      {/* Breadcrumbs navigation */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Dashboard
        </Link>
        <Link
          to="/products"
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
                  label={"Available"}
                  color={"info"}
                  sx={{ mr: 1, fontWeight: "medium" }}
                />
                <Typography variant="body1" color="text.secondary">
                  {product.availableStock} {product.unitOfMeasurement}(s)
                  available
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex" gap={1} mt={{ xs: 2, sm: 0 }}>
            <Button
              component={Link}
              to={`/products/edit/${params.id}`}
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
        <Grid container spacing={3} height={"full"} flexGrow={1}>
          {/* Product Stats */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3} height={"full"} flexGrow={1}>
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
                        secondary={`$${product.pricePerUnit.toFixed(2)} per ${
                          product.unitOfMeasurement
                        }`}
                      />
                    </ListItem>

                    <ListItem disablePadding sx={{ pb: 2 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Category color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Unit"
                        secondary={product.unitOfMeasurement}
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
                        secondary={`${product.availableStock} items available`}
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
            </Stack>
          </Grid>

          {/* Warehouse Information */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ borderRadius: 2 }} height={"full"} flexGrow={1}>
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
                            to={`/warehouse/${warehouse.id}`}
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
                            {warehouse.address}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box mt={3}>
                      <Typography variant="body1">
                        This product is stored in the {warehouse.name}{" "}
                        warehouse, which is currently at 100 capacity. The
                        warehouse is located at {warehouse.address}.
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
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <BarChart color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Current Stock</Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: 80 }}
                  >
                    <Typography
                      variant="h2"
                      //  color={stockStatus.color}
                    >
                      {product.availableStock}
                    </Typography>
                  </Box>
                  <Box mt={2} textAlign="center">
                    {/* <Chip label={stockStatus.label} color={stockStatus.color} /> */}
                  </Box>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Timeline color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Inventory Status</Typography>
                  </Box>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Status"
                        secondary={
                          <Chip
                            size="small"
                            label={
                              product.availableStock < 10
                                ? "Reorder Required"
                                : product.availableStock < 20
                                ? "Approaching Reorder Point"
                                : "Healthy Stock Level"
                            }
                            color={
                              product.availableStock < 10
                                ? "error"
                                : product.availableStock < 20
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
              Could Add Product history tracking here
            </Typography>
          </Box>
        </Card>
      </TabPanel>
    </Container>
  );
};

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
