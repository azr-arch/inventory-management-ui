import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { RootLayout } from "./layout/root-layout";
import { Dashboard } from "./pages/dashboard";

import { WarehouseList } from "./pages/warehouse/warehouse-list";
import { AddWarehousePage } from "./pages/warehouse/warehouse-add";
import { EditWarehousePage } from "./pages/warehouse/warehouse-edit";
import { WarehouseDetailPage } from "./pages/warehouse/warehouse-detail";

import { ProductList } from "./pages/product/product-list";
import { AddProductPage } from "./pages/product/product-add";
import { EditProductPage } from "./pages/product/product-edit";
import { ProductDetailPage } from "./pages/product/product-detail";

import { VendorList } from "./pages/vendor/vendor-list";
import { AddVendorPage } from "./pages/vendor/vendor-add";
import { EditVendorPage } from "./pages/vendor/vendor-edit";
import { VendorDetailPage } from "./pages/vendor/vendor-detail";

import { PurchaseOrderPage } from "./pages/purchase/purchase-order";
import { AddPurchaseOrder } from "./pages/purchase/add-puchase-order";
import { SalesOrderPage } from "./pages/order/sales-order";
import { PurchaseOrderDetail } from "./pages/purchase/purchase-order-details";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Dashboard />} />

            <Route path="warehouses">
              <Route index element={<WarehouseList />} />
              <Route path=":id" element={<WarehouseDetailPage />} />
              <Route path="add" element={<AddWarehousePage />} />
              <Route path="edit/:id" element={<EditWarehousePage />} />
            </Route>

            <Route path="products">
              <Route index element={<ProductList />} />
              <Route path=":id" element={<ProductDetailPage />} />
              <Route path="add" element={<AddProductPage />} />
              <Route path="edit/:id" element={<EditProductPage />} />
            </Route>

            <Route path="vendor">
              <Route index element={<VendorList />} />
              <Route path=":id" element={<VendorDetailPage />} />
              <Route path="add" element={<AddVendorPage />} />
              <Route path="edit/:id" element={<EditVendorPage />} />
            </Route>
            {/* <Route path="add" element={<WarehouseAddPage />} /> */}

            <Route path="purchase">
              <Route index element={<PurchaseOrderPage />} />
              <Route path="add" element={<AddPurchaseOrder />} />
              <Route path=":id" element={<PurchaseOrderDetail />} />
            </Route>

            <Route path="sale" element={<SalesOrderPage />} />

            <Route
              path="*"
              element={
                <div>
                  <p>This route doesnt exists</p>
                  <Link to="/">Go back</Link>
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
