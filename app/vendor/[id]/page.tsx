"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
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
  Tabs,
  Tab,
  IconButton,
  Breadcrumbs,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material"
import { Edit, Email, Phone, Business, Person, LocalShipping, Download, Print, Receipt, Add } from "@mui/icons-material"
import Link from "next/link"
import { vendors, purchaseOrders } from "@/lib/data"

function TabPanel(props) {
  const { children, value, index, ...other } = props

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
  )
}

export default function VendorDetailPage() {
  const params = useParams()
  const id = Number(params.id)

  const [loading, setLoading] = useState(true)
  const [vendor, setVendor] = useState(null)
  const [vendorOrders, setVendorOrders] = useState([])
  const [notFound, setNotFound] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    // In a real app, this would be an API call
    const foundVendor = vendors.find((v) => v.id === id)

    if (foundVendor) {
      setVendor(foundVendor)

      // Find purchase orders from this vendor
      const vendorName = foundVendor.name
      const ordersFromVendor = purchaseOrders.filter((o) => o.vendor === vendorName)
      setVendorOrders(ordersFromVendor)
    } else {
      setNotFound(true)
    }

    setLoading(false)
  }, [id])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  // Get order status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Received":
        return "success"
      case "Shipped":
        return "info"
      case "Ordered":
        return "warning"
      case "Pending":
        return "default"
      default:
        return "default"
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    )
  }

  if (notFound) {
    return (
      <Box>
        <Alert severity="error">Vendor not found</Alert>
        <Button component={Link} href="/vendor" variant="contained" sx={{ mt: 2 }}>
          Back to Vendors
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      {/* Breadcrumbs navigation */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          Dashboard
        </Link>
        <Link href="/vendor" style={{ textDecoration: "none", color: "inherit" }}>
          Vendors
        </Link>
        <Typography color="text.primary">{vendor.name}</Typography>
      </Breadcrumbs>

      {/* Header section */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: "#f8fafc" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
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
            <Button startIcon={<Print />} variant="outlined" size="small">
              Print
            </Button>
            <Button startIcon={<Download />} variant="outlined" size="small">
              Export
            </Button>
            <Button
              component={Link}
              href={`/vendor/edit/${id}`}
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
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="vendor tabs">
          <Tab label="Overview" id="vendor-tab-0" aria-controls="vendor-tabpanel-0" />
          <Tab label="Purchase Orders" id="vendor-tab-1" aria-controls="vendor-tabpanel-1" />
          <Tab label="History" id="vendor-tab-2" aria-controls="vendor-tabpanel-2" />
        </Tabs>
      </Box>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Vendor Contact Information */}
          <Grid item xs={12} md={4}>
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
                      primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                      secondaryTypographyProps={{ variant: "body1", fontWeight: "medium" }}
                    />
                  </ListItem>

                  <ListItem disablePadding sx={{ pb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Email color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={
                        <Link href={`mailto:${vendor.email}`} style={{ textDecoration: "none", color: "#1976d2" }}>
                          {vendor.email}
                        </Link>
                      }
                      primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                      secondaryTypographyProps={{ variant: "body1", fontWeight: "medium" }}
                    />
                  </ListItem>

                  <ListItem disablePadding sx={{ pb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Phone color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone"
                      secondary={
                        <Link href={`tel:${vendor.phone}`} style={{ textDecoration: "none", color: "#1976d2" }}>
                          {vendor.phone}
                        </Link>
                      }
                      primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                      secondaryTypographyProps={{ variant: "body1", fontWeight: "medium" }}
                    />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Business color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Address"
                      secondary={vendor.address}
                      primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                      secondaryTypographyProps={{ variant: "body1", fontWeight: "medium" }}
                    />
                  </ListItem>
                </List>
              </Box>
            </Card>
          </Grid>

          {/* Vendor Summary */}
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 2 }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="medium">
                  Vendor Summary
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Grid container spacing={3} mb={3}>
                  <Grid item xs={12} sm={4}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: "center" }}>
                      <Typography variant="h3" color="primary" gutterBottom>
                        {vendorOrders.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Orders
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: "center" }}>
                      <Typography variant="h3" color="primary" gutterBottom>
                        ${vendorOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Spent
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: "center" }}>
                      <Typography variant="h3" color="primary" gutterBottom>
                        {vendorOrders.length > 0
                          ? new Date(
                              Math.max(...vendorOrders.map((o) => new Date(o.date).getTime())),
                            ).toLocaleDateString()
                          : "N/A"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Last Order Date
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Typography variant="body1" paragraph>
                  {vendor.name} is a vendor supplying various products to our inventory. We have placed{" "}
                  {vendorOrders.length} orders with this vendor to date, with a total value of $
                  {vendorOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}.
                </Typography>

                <Box mt={3}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                    Quick Actions
                  </Typography>
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Button startIcon={<LocalShipping />} variant="outlined">
                      Create Purchase Order
                    </Button>
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
          <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" fontWeight="medium">
              Purchase Orders
            </Typography>
            <Button
              component={Link}
              href="/purchase/add"
              startIcon={<Add />}
              variant="contained"
              size="small"
              color="primary"
            >
              Create Purchase Order
            </Button>
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
                    <TableRow key={order.id} hover>
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
                            href={`/purchase/${order.id}`}
                            style={{ textDecoration: "none", color: "#1976d2", fontWeight: 500 }}
                          >
                            {order.id}
                          </Link>
                        </Box>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip size="small" label={order.status} color={getStatusColor(order.status)} />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          component={Link}
                          href={`/purchase/${order.id}`}
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
                No purchase orders from this vendor.
              </Typography>
              <Button
                component={Link}
                href="/purchase/add"
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
            <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
              Vendor history tracking is not available in the demo version.
            </Typography>
          </Box>
        </Card>
      </TabPanel>
    </Box>
  )
}
