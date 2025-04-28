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
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { data } from "./warehouse-list";
import {
  Add,
  Edit,
  Inventory,
  LocationOn,
  SquareFoot,
  WarehouseOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { warehouses } from "../../lib/data";

export const WarehouseDetailPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const params = useParams();

  const warehouseId = parseInt(params.id || "");

  const selectedWarehouse = warehouses.find((item) => item.id === warehouseId);

  const handleTabChange = (_: unknown, value: number) => {
    console.log(value);
    setSelectedTab(value);
  };

  if (!selectedWarehouse) return <p>Loading...</p>;

  return (
    <Container maxWidth="xl" sx={{ paddingBlock: "2.5rem" }}>
      {/* Breadcrumbs navigation */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Dashboard
        </Link>
        {/* <Link
          to="/warehouse"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Warehouses  
        </Link> */}
        <Typography color="text.primary">{selectedWarehouse.name}</Typography>
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
                {selectedWarehouse.name}
              </Typography>
              <Box display="flex" alignItems="center" mt={0.5}>
                <LocationOn fontSize="small" color="action" sx={{ mr: 0.5 }} />
                <Typography variant="body1" color="text.secondary">
                  {selectedWarehouse.address}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex" gap={1} mt={{ xs: 2, sm: 0 }}>
            <Button
              component={Link}
              to={`/warehouse/edit/${selectedWarehouse.id}`}
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
          value={selectedTab}
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
      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={3}>
          {/* Warehouse Stats */}
          <Grid size={{ xs: 12, md: 4 }}>
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
                      {/* {selectedWarehouse.capacity} */}
                      1500
                    </Typography>
                  </Box>

                  {/* <Box sx={{ mb: 3 }}>
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
                  </Box> */}

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
                      {/* {warehouseProducts.length} */}
                      100
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Warehouse Summary */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ height: "100%", borderRadius: 2 }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="medium">
                  Warehouse Summary
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Typography variant="body1" paragraph>
                  This warehouse is currently at 100% capacity, with 2 different
                  products stored. The warehouse is located at{" "}
                  {selectedWarehouse.address} and has a total capacity of 1500.
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
      <TabPanel value={selectedTab} index={1}>
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
              to="/product/add"
              startIcon={<Add />}
              variant="contained"
              size="small"
              color="primary"
            >
              Add Product
            </Button>
          </Box>
          <Divider />
          {/* {warehouseProducts.length > 0 ? (
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
          ) : ( */}
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              No products in this warehouse.
            </Typography>
            <Button
              component={Link}
              to="/product/add"
              startIcon={<Add />}
              variant="contained"
              sx={{ mt: 2 }}
              color="primary"
            >
              Add Product
            </Button>
          </Box>
          {/* )} */}
        </Card>
      </TabPanel>

      {/* Activity Tab */}
      <TabPanel value={selectedTab} index={2}>
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
    </Container>
  );

  // return (
  //   <Container maxWidth="xl" sx={{ paddingBlock: "2.5rem" }}>
  //     <Typography variant="h4" fontWeight="bold" gutterBottom>
  //       Warehouse Details
  //     </Typography>
  //     <Divider sx={{ marginBottom: "2rem" }} />
  //     <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

  //     </Grid>
  //   </Container>
  // );
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
