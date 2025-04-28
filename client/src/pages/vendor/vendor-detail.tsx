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
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { purchaseOrders, vendors } from "../../lib/data";
import {
  Add,
  Business,
  Edit,
  Email,
  Person,
  Phone,
  Receipt,
  Visibility,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getStatusColor } from "../purchase/purchase-order";

export const VendorDetailPage = () => {
  const [vendorOrders, setVendorOrders] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const params = useParams();
  const vendor = vendors.find((vendor) => vendor.id === parseInt(params.id!));

  const handleTabChange = (_: any, value: number) => {
    setTabValue(value);
  };

  useEffect(() => {
    const foundVendor = vendors.find(
      (vendor) => vendor.id === parseInt(params.id!)
    );

    if (foundVendor) {
      // Track orders from purchase order
      const vendorName = foundVendor.name;
      const ordersFromVendor = purchaseOrders.filter(
        (o) => o.vendor === vendorName
      );
      setVendorOrders(ordersFromVendor as []);
    }
  }, [params.id]);

  if (!vendor) {
    return <p>Vendor not found</p>;
  }

  return (
    <Container maxWidth="xl" sx={{ paddingBlock: "2rem" }}>
      {/* Breadcrumbs navigation */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Dashboard
        </Link>
        <Link to="/vendor" style={{ textDecoration: "none", color: "inherit" }}>
          Vendors
        </Link>
        <Typography color="text.primary">{vendor.name}</Typography>
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
              <Business fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                {vendor.name}
              </Typography>
              <Box display="flex" alignItems="center" mt={0.5}>
                <Person fontSize="small" color="action" sx={{ mr: 0.5 }} />
                <Typography variant="body1" color="text.secondary">
                  {vendor.contact}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex" gap={1} mt={{ xs: 2, sm: 0 }}>
            <Button
              component={Link}
              to={`/vendor/edit/${params.id}`}
              startIcon={<Edit />}
              variant="contained"
              color="primary"
            >
              Edit Vendor
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Tabs navigation */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="vendor tabs"
        >
          <Tab
            label="Overview"
            id="vendor-tab-0"
            aria-controls="vendor-tabpanel-0"
          />
          <Tab
            label="Purchase Orders"
            id="vendor-tab-1"
            aria-controls="vendor-tabpanel-1"
          />
          <Tab
            label="History"
            id="vendor-tab-2"
            aria-controls="vendor-tabpanel-2"
          />
        </Tabs>
      </Box>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Vendor Contact Information */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ borderRadius: 2 }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="medium">
                  Contact Information
                </Typography>
                <Divider sx={{ my: 2 }} />

                <List disablePadding>
                  <ListItem disablePadding sx={{ pb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Person color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Contact Person"
                      secondary={vendor.contact}
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
                      <Email color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={
                        <Link
                          to={`mailto:${vendor.email}`}
                          style={{ textDecoration: "none", color: "#1976d2" }}
                        >
                          {vendor.email}
                        </Link>
                      }
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
                      <Phone color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone"
                      secondary={
                        <Link
                          to={`tel:${vendor.phone}`}
                          style={{ textDecoration: "none", color: "#1976d2" }}
                        >
                          {vendor.phone}
                        </Link>
                      }
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
                      <Business color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Address"
                      secondary={vendor.address}
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
          </Grid>

          {/* Vendor Summary */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ borderRadius: 2 }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="medium">
                  Vendor Summary
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Grid container spacing={3} mb={3}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Paper
                      variant="outlined"
                      sx={{ p: 2, borderRadius: 2, textAlign: "center" }}
                    >
                      <Typography variant="h3" color="primary" gutterBottom>
                        {/* {vendorOrders.length} */}4
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Orders
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Paper
                      variant="outlined"
                      sx={{ p: 2, borderRadius: 2, textAlign: "center" }}
                    >
                      <Typography variant="h3" color="primary" gutterBottom>
                        $
                        {/* {vendorOrders
                          .reduce((sum, order) => sum + order.total, 0)
                          .toFixed(2)} */}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Spent
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Paper
                      variant="outlined"
                      sx={{ p: 2, borderRadius: 2, textAlign: "center" }}
                    >
                      <Typography variant="h3" color="primary" gutterBottom>
                        {/* {vendorOrders.length > 0
                          ? new Date(
                              Math.max(
                                ...vendorOrders.map((o) =>
                                  new Date(o.date).getTime()
                                )
                              )
                            ).toLocaleDateString() */}
                        {/* : */}
                        "N/A"
                        {/* } */}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Last Order Date
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Typography variant="body1" paragraph>
                  {vendor.name} is a vendor supplying various products to our
                  inventory. We have placed 5 orders with this vendor to date,
                  with a total value of $
                  {/* {vendorOrders
                    .reduce((sum, order) => sum + order.total, 0)
                    .toFixed(2)} */}
                  .
                </Typography>

                <Box mt={3}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    fontWeight="medium"
                  >
                    Quick Actions
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Button startIcon={<Email />} variant="outlined">
                      Contact Vendor
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Purchase Orders Tab */}
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
              Purchase Orders
            </Typography>
          </Box>
          <Divider />
          {vendorOrders.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vendorOrders.map((order) => (
                    <TableRow key={order?.id || ""} hover>
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
                            <Receipt fontSize="small" />
                          </Avatar>
                          <Link
                            to={`/=urchase/${order.id}`}
                            style={{
                              textDecoration: "none",
                              color: "#1976d2",
                              fontWeight: 500,
                            }}
                          >
                            {order.id}
                          </Link>
                        </Box>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={order.status}
                          color={getStatusColor(order.status)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          component={Link}
                          to={`/purchase/${order.id}`}
                          size="small"
                          color="primary"
                          aria-label="view"
                        >
                          <Visibility fontSize="small" />
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
                No purchase orders from this vendor.
              </Typography>
              <Button
                component={Link}
                to="/purchase/add"
                startIcon={<Add />}
                variant="contained"
                sx={{ mt: 2 }}
                color="primary"
              >
                Create Purchase Order
              </Button>
            </Box>
          )}
        </Card>
      </TabPanel>

      {/* History Tab */}
      <TabPanel value={tabValue} index={2}>
        <Card sx={{ borderRadius: 2 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Vendor History
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ py: 4 }}
            >
              Could list vendor history here
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
      id={`vendor-tabpanel-${index}`}
      aria-labelledby={`vendor-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}
