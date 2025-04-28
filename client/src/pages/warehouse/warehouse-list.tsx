import { Box, Button, Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { WarehouseCard } from "../../components/warehouse-card";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { warehouses } from "../../lib/data";

export const WarehouseList = () => {
  return (
    <Container maxWidth="xl" sx={{ paddingBlock: "2rem" }}>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.8rem",
        }}
      >
        <Typography component={"h1"} sx={{ fontSize: "2.4rem" }}>
          Warehouse
        </Typography>

        <Button
          component={Link}
          to={`/warehouses/add`}
          variant="contained"
          startIcon={<Add />}
        >
          Add Warehouse
        </Button>
      </Box>

      <Grid container spacing={3}>
        {warehouses.map((warehouse) => (
          <Grid size={{ sm: 12, md: 6, lg: 4 }} key={warehouse.code}>
            <WarehouseCard warehouse={warehouse} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
