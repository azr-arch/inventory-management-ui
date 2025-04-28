import { KeyboardBackspace, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export const EditVendorPage = () => {
  return (
    <Container maxWidth="xl" sx={{ paddingBlock: "2rem" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: "1rem" }}>
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
          Edit Vendor
        </Typography>
      </Box>

      {/* {submitError && (
      <Alert severity="error" sx={{ mb: 3 }}>
        {submitError}
      </Alert>
    )} */}

      <Card>
        <CardContent>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Vendor Name"
              name="name"
              // value={formData.name}
              // onChange={handleInputChange}
              // error={!!errors.name}
              // helperText={errors.name}
              sx={{ mb: 3 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="contact"
              label="Contact Person"
              name="contact"
              // value={formData.contact}
              // onChange={handleInputChange}
              // error={!!errors.contact}
              // helperText={errors.contact}
              sx={{ mb: 3 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              // value={formData.email}
              // onChange={handleInputChange}
              // error={!!errors.email}
              // helperText={errors.email}
              sx={{ mb: 3 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              // value={formData.phone}
              // onChange={handleInputChange}
              // error={!!errors.phone}
              // helperText={errors.phone}
              sx={{ mb: 3 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              multiline
              rows={3}
              // value={formData.address}
              // onChange={handleInputChange}
              // error={!!errors.address}
              // helperText={errors.address}
              sx={{ mb: 3 }}
            />

            <Box display="flex" justifyContent="flex-end">
              <Button
                type="button"
                variant="outlined"
                component={Link}
                to="/vendor"
                sx={{ mr: 2 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Save />}
              >
                Update Vendor
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
