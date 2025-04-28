import {
  Add,
  Business,
  Delete,
  Edit,
  Email,
  Phone,
  Visibility,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { vendors } from "../../lib/data";
import { ConfirmModal } from "../../components/modal/confirm-modal";

export const VendorList = () => {
  const [vendorList, setVendorList] = useState(vendors);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        title="Delete Vendor"
        description="Are you sure you want to delete. This action cannot be undone. All data associated with this vendor will be permanently removed."
      />
      <Container maxWidth="xl" sx={{ paddingBlock: "2rem" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4" component="h1">
            Vendors
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            component={Link}
            to="/vendor/add"
          >
            Add Vendor
          </Button>
        </Box>

        {/* <Grid container spacing={3}>
          {vendorList.map((vendor) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={vendor.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    component={Link}
                    to={`/vendor/${vendor.id}`}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    component={Link}
                    to={`/vendor/edit/${vendor.id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => setIsOpen(true)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid> */}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="sales orders table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Id</strong>
                </TableCell>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Contact</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Phone</strong>
                </TableCell>
                <TableCell>
                  <strong>Address</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>{vendor.id}</TableCell>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.contact}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.phone}</TableCell>
                  <TableCell>{vendor.address}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      startIcon={<Visibility />}
                      // onClick={() => handleOpenDetailsDialog(order)}
                      component={Link}
                      to={`${vendor.id}`}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};
