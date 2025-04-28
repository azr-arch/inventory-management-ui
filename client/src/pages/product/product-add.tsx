import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { warehouses } from "../../lib/data";
import { ChangeEvent, FormEventHandler, useState } from "react";

export const AddProductPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted:", formData);
  };
  return (
    <Container maxWidth="xl" sx={{ paddingBlock: "2rem" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: "1.8rem" }}>
        {/* <IconButton
          aria-label="go back"
          size="medium"
          component={Link}
          to={".."}
          sx={{ mr: ".825rem" }}
        >
          <KeyboardBackspace />
        </IconButton> */}

        <Typography variant="h4">Add New Product</Typography>
      </Box>

      {/* {submitError && (
    <Alert severity="error" sx={{ mb: 3 }}>
      {submitError}
    </Alert>
  )} */}

      <Box
        component="section"
        maxWidth={"xl"}
        marginInline={"auto"}
        // paddingInline={"1rem"}
      >
        <Typography fontSize={"1.5rem"} mb={2}>
          Product information
        </Typography>

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
          <Button
            onSubmit={handleSubmit}
            variant="outlined"
            color="primary"
            type="submit"
          >
            Save Product
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
