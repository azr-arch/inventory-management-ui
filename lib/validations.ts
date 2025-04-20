import { z } from "zod"

// Warehouse validation schema
export const warehouseSchema = z.object({
  name: z.string().min(1, "Warehouse name is required"),
  location: z.string().min(1, "Location is required"),
  capacity: z.string().min(1, "Capacity is required"),
  utilization: z.string().min(1, "Utilization is required"),
})

export type WarehouseFormValues = z.infer<typeof warehouseSchema>

// Product validation schema
export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  unit: z.string().min(1, "Unit of measurement is required"),
  stock: z.coerce.number().min(0, "Stock must be a positive number"),
  warehouse: z.coerce.number().min(1, "Please select a warehouse"),
})

export type ProductFormValues = z.infer<typeof productSchema>

// Vendor validation schema
export const vendorSchema = z.object({
  name: z.string().min(1, "Vendor name is required"),
  contact: z.string().min(1, "Contact person is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
})

export type VendorFormValues = z.infer<typeof vendorSchema>

// Sales Order validation schema
export const salesOrderSchema = z.object({
  customer: z.string().min(1, "Customer name is required"),
  date: z.string().min(1, "Date is required"),
  status: z.string().min(1, "Status is required"),
  items: z
    .array(
      z.object({
        product: z.string().min(1, "Product is required"),
        quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
        price: z.coerce.number().min(0, "Price must be a positive number"),
      }),
    )
    .min(1, "At least one item is required"),
})

export type SalesOrderFormValues = z.infer<typeof salesOrderSchema>

// Purchase Order validation schema
export const purchaseOrderSchema = z.object({
  vendor: z.string().min(1, "Vendor is required"),
  date: z.string().min(1, "Date is required"),
  status: z.string().min(1, "Status is required"),
  items: z
    .array(
      z.object({
        product: z.string().min(1, "Product is required"),
        quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
        price: z.coerce.number().min(0, "Price must be a positive number"),
      }),
    )
    .min(1, "At least one item is required"),
})

export type PurchaseOrderFormValues = z.infer<typeof purchaseOrderSchema>
