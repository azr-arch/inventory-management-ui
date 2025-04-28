import {
  Button,
  ButtonGroup,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <Container sx={{ paddingBlock: "2.5rem" }}>
      <Typography variant={"h4"} gutterBottom>
        Dashboard
      </Typography>

      <Stack spacing={2}>
        <ButtonGroup>
          <Button component={Link} to="warehouses">
            Warehouses
          </Button>`

          <Button component={Link} to="products">
            Products
          </Button>

          <Button component={Link} to="vendor">
            Vendors
          </Button>

          <Button component={Link} to="sale">
            Sales Order
          </Button>

          <Button component={Link} to="purchase">
            Purchase Order
          </Button>
        </ButtonGroup>
      </Stack>
    </Container>
  );
};
