import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SingleSelect from "../../components/form/select";
import { Link } from "react-router-dom";
import { KeyboardBackspace } from "@mui/icons-material";

export const cities = [
  {
    id: 1,
    name: "Mumbai",
  },
  {
    id: 2,
    name: "Delhi",
  },
  {
    id: 3,
    name: "Jaipur",
  },
];

export const states = [
  { id: 1, name: "Maharashtra" },
  { id: 2, name: "Delhi NCR" },
  { id: 3, name: "Rajasthan" },
];

export const countries = [
  { id: 1, name: "India" },
  { id: 2, name: "United States" },
  { id: 3, name: "Germany" },
];

export const AddWarehousePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <Container maxWidth="xl" sx={{ paddingBlock: "2.5rem" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: "1rem" }}>
        <Typography variant="h4">Add New Warehouse</Typography>
      </Box>

      {/* <Divider sx={{ marginBottom: "2rem" }} /> */}
      <Box
        component="section"
        onSubmit={handleSubmit}
        maxWidth={"xl"}
        marginInline={"auto"}
      >
        <Grid container spacing={2}>
          <Grid size={4}>
            <TextField
              label="Warehouse Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid size={4}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <TextField
              type="number"
              label="Warehouse Code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid size={4}>
            {/* <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
            /> */}
            <SingleSelect
              label="City"
              options={cities.map((city) => ({
                label: city.name,
                value: city.id,
              }))}
              onChange={(val) => console.log(val)}
              value={""}
            />
          </Grid>
          <Grid size={4}>
            {/* <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              fullWidth
            /> */}
            <SingleSelect
              label="State"
              options={states.map((state) => ({
                label: state.name,
                value: state.id,
              }))}
              onChange={(val) => console.log(val)}
              value={""}
            />
          </Grid>
          <Grid size={4}>
            {/* <TextField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
            /> */}
            <SingleSelect
              label="Country"
              options={countries.map((country) => ({
                label: country.name,
                value: country.id,
              }))}
              onChange={(val) => console.log(val)}
              value={""}
            />
          </Grid>

          <Grid size={4}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />
          </Grid>
        </Grid>

        <Box textAlign="right" mt={4}>
          <Button variant="outlined" color="primary" type="submit">
            Save Warehouse
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
