// Footer.tsx
import { Box, Typography, Container, Grid } from "@mui/material";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { GoPackage } from "react-icons/go";
import { AiFillCopyrightCircle } from "react-icons/ai";
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        bgcolor: "primary.main",
        color: "white",
        py: 1,
        position: "fixed", // sticky to bottom
        bottom: 0,
        left: 0,
        zIndex: 1201, // above other elements
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={2} justifyContent="space-between">
          <Grid size={{ xs: 12, md: "auto" }}>
            <Box display="flex" alignItems="center">
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center" }}
              >
                Download <IoLogoGooglePlaystore style={{ marginLeft: 6 }} />
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: "auto" }}>
            <Box display="flex" alignItems="center">
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center" }}
              >
                Logout <IoLogOut style={{ marginLeft: 6 }} />
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: "auto" }}>
            <Box display="flex" alignItems="center">
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center" }}
              >
                Client id: 1
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: "auto" }}>
            <Box display="flex" alignItems="center">
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center" }}
              >
                User id: 2
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: "auto" }}>
            <Box display="flex" alignItems="center">
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center" }}
              >
                Package : Enterprises <GoPackage style={{ marginLeft: 6 }} />
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: "auto" }}>
            <Box display="flex" alignItems="center" gap={1}>
              <AiFillCopyrightCircle />
              <Typography variant="body2">
                2025 Orggen Technology LLP
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default Footer;
