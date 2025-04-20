"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import {
  Warehouse,
  Inventory,
  People,
  ShoppingCart,
  LocalShipping,
} from "@mui/icons-material";
import Link from "next/link";

export default function Home() {
  const modules = [
    {
      title: "Warehouses",
      icon: <Warehouse fontSize="large" />,
      description: "Manage your warehouses",
      link: "/warehouse",
    },
    {
      title: "Products",
      icon: <Inventory fontSize="large" />,
      description: "Manage your product inventory",
      link: "/product",
    },
    {
      title: "Vendors",
      icon: <People fontSize="large" />,
      description: "Manage your vendors",
      link: "/vendor",
    },
    {
      title: "Sales Orders",
      icon: <ShoppingCart fontSize="large" />,
      description: "Track your sales orders",
      link: "/sales",
    },
    {
      title: "Purchase Orders",
      icon: <LocalShipping fontSize="large" />,
      description: "Manage purchase orders",
      link: "/purchase",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Inventory Management Dashboard
      </Typography>
      <Grid container spacing={3} mt={2}>
        {modules.map((module, index) => (
          <Grid xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box sx={{ color: "primary.main", mb: 2 }}>{module.icon}</Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {module.title}
                </Typography>
                <Typography mb={2}>{module.description}</Typography>
                <Button
                  component={Link}
                  href={module.link}
                  variant="contained"
                  color="primary"
                  sx={{ mt: "auto" }}
                >
                  Go to {module.title}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
