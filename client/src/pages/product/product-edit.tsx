import { KeyboardBackspace } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { warehouses } from "../../lib/data";
import { useState } from "react";

export const EditProductPage = () => {
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
    <Container maxWidth="xl" sx={{ paddingBlock: "2rem" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: "1.8rem" }}>
        <IconButton
          aria-label="go back"
          size="medium"
          component={Link}
          to={".."}
          sx={{ mr: ".825rem" }}
        >
          <KeyboardBackspace />
        </IconButton>

        <Typography variant="h4" fontWeight="bold">
          Edit Product
        </Typography>
      </Box>

      {/* {submitError && (
    <Alert severity="error" sx={{ mb: 3 }}>
      {submitError}
    </Alert>
  )} */}

      <Box
        component="section"
        onSubmit={handleSubmit}
        maxWidth={"lg"}
        marginInline={"auto"}
        paddingInline={"1rem"}
      >
        <Grid container spacing={2}>
          <Grid size={4}>
            <TextField
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid size={4}>
            <TextField
              label="Price per Unit"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <TextField
              type="number"
              label="Unit of Measurement"
              name="code"
              value={formData.code}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid size={4}>
            <TextField
              label="Available Stock"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid size={4}>
            <TextField
              label="HSN Code"
              name="description"
              value={formData.description}
              onChange={handleChange}
              type="number"
              fullWidth
            />
          </Grid>

          <Grid size={4}>
            <FormControl
              fullWidth
              required
              // error={!!errors.warehouse}
              sx={{ mb: 3 }}
            >
              <InputLabel id="warehouse-label">Warehouse</InputLabel>
              <Select
                labelId="warehouse-label"
                id="warehouse"
                name="warehouse"
                // value={formData.warehouse}
                label="Warehouse"
                // onChange={handleInputChange}
              >
                <MenuItem value={0} disabled>
                  Select a warehouse
                </MenuItem>
                {warehouses.map((warehouse) => (
                  <MenuItem key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </MenuItem>
                ))}
              </Select>
              {/* {errors.warehouse && <FormHelperText>{errors.warehouse}</FormHelperText>} */}
            </FormControl>
          </Grid>
        </Grid>

        <Box textAlign="right" mt={4}>
          <Button variant="outlined" color="primary" type="submit">
            Update product
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
