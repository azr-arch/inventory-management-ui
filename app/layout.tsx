import type React from "react";
import { Inter } from "next/font/google";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0 }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link
                  href="/"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  InventoryPro
                </Link>
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Link
                  href="/warehouse"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Warehouses
                </Link>
                <Link
                  href="/product"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Products
                </Link>
                <Link
                  href="/vendor"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Vendors
                </Link>
                <Link
                  href="/sales"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Sales Orders
                </Link>
                <Link
                  href="/purchase"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Purchase Orders
                </Link>
              </Box>
            </Toolbar>
          </AppBar>
          <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
            {children}
          </Container>
          <Box component="footer" sx={{ py: 3, px: 2, mt: "auto" }}>
            <Container maxWidth="sm">
              <Typography variant="body2" color="text.secondary" align="center">
                © {new Date().getFullYear()} InventoryPro. All rights reserved.
              </Typography>
            </Container>
          </Box>
        </Box>
      </body>
    </html>
  );
}
