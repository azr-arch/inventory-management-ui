import { z } from "zod";

export const AddressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pincode: z
    .string()
    .min(6, "Invalid pincode")
    .max(6, "Invalid pincode")
    .regex(/^\d+$/, "Must be only digits"),
});

export const WarehouseSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name too long"),
  warehouseCode: z
    .string()
    .min(4, "Code must be 4-8 characters")
    .max(8, "Code must be 4-8 characters"),
  description: z.string().optional(),
  address: AddressSchema,
});

// Sample options (expand with your actual data)
export const CITY_OPTIONS = [
  { value: "new_york", label: "New York" },
  { value: "london", label: "London" },
];
export const STATE_OPTIONS = [
  { value: "ny", label: "New York" },
  { value: "ca", label: "California" },
];
export const COUNTRY_OPTIONS = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
];
