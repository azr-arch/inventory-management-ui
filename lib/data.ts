// Mock data for warehouses
export const warehouses = [
  { id: 1, name: "Main Warehouse", location: "123 Main St, New York, NY", capacity: "5000 sq ft", utilization: "65%" },
  {
    id: 2,
    name: "West Coast Facility",
    location: "456 Ocean Ave, Los Angeles, CA",
    capacity: "8000 sq ft",
    utilization: "42%",
  },
  {
    id: 3,
    name: "Central Distribution",
    location: "789 Central Pkwy, Dallas, TX",
    capacity: "12000 sq ft",
    utilization: "78%",
  },
  { id: 4, name: "East Storage", location: "101 Harbor Rd, Boston, MA", capacity: "3500 sq ft", utilization: "91%" },
]

// Mock data for products
export const products = [
  { id: 1, name: "Laptop", price: 999.99, unit: "piece", stock: 45, warehouse: 1 },
  { id: 2, name: "Desk Chair", price: 199.5, unit: "piece", stock: 32, warehouse: 1 },
  { id: 3, name: "Printer Paper", price: 9.99, unit: "ream", stock: 120, warehouse: 2 },
  { id: 4, name: "Stapler", price: 5.99, unit: "piece", stock: 75, warehouse: 3 },
  { id: 5, name: "Ink Cartridge", price: 24.99, unit: "piece", stock: 60, warehouse: 2 },
]

// Mock data for vendors
export const vendors = [
  {
    id: 1,
    name: "Tech Supplies Inc.",
    contact: "John Smith",
    email: "john@techsupplies.com",
    phone: "555-123-4567",
    address: "100 Tech Blvd, San Francisco, CA",
  },
  {
    id: 2,
    name: "Office Essentials",
    contact: "Sarah Johnson",
    email: "sarah@officeessentials.com",
    phone: "555-987-6543",
    address: "200 Office Park, Chicago, IL",
  },
  {
    id: 3,
    name: "Global Distributors",
    contact: "Michael Chen",
    email: "michael@globaldist.com",
    phone: "555-456-7890",
    address: "300 Global Way, New York, NY",
  },
  {
    id: 4,
    name: "Quality Products Co.",
    contact: "Lisa Brown",
    email: "lisa@qualityproducts.com",
    phone: "555-789-0123",
    address: "400 Quality Rd, Austin, TX",
  },
]

// Mock data for sales orders
export const salesOrders = [
  {
    id: "SO-2023-001",
    customer: "Acme Corp",
    date: "2023-06-15",
    total: 2499.97,
    status: "Delivered",
    items: [
      { product: "Laptop", quantity: 2, price: 999.99 },
      { product: "Desk Chair", quantity: 2, price: 199.5 },
      { product: "Stapler", quantity: 5, price: 5.99 },
    ],
  },
  {
    id: "SO-2023-002",
    customer: "TechStart Inc",
    date: "2023-06-18",
    total: 1249.95,
    status: "Processing",
    items: [
      { product: "Laptop", quantity: 1, price: 999.99 },
      { product: "Ink Cartridge", quantity: 10, price: 24.99 },
    ],
  },
  {
    id: "SO-2023-003",
    customer: "Global Services",
    date: "2023-06-20",
    total: 599.4,
    status: "Shipped",
    items: [{ product: "Desk Chair", quantity: 3, price: 199.5 }],
  },
  {
    id: "SO-2023-004",
    customer: "Local Business",
    date: "2023-06-22",
    total: 1199.88,
    status: "Pending",
    items: [
      { product: "Printer Paper", quantity: 20, price: 9.99 },
      { product: "Ink Cartridge", quantity: 40, price: 24.99 },
    ],
  },
]

// Mock data for purchase orders
export const purchaseOrders = [
  {
    id: "PO-2023-001",
    vendor: "Tech Supplies Inc.",
    date: "2023-06-10",
    total: 5499.95,
    status: "Received",
    items: [
      { product: "Laptop", quantity: 5, price: 899.99 },
      { product: "Ink Cartridge", quantity: 20, price: 24.99 },
    ],
  },
  {
    id: "PO-2023-002",
    vendor: "Office Essentials",
    date: "2023-06-12",
    total: 1998.0,
    status: "Pending",
    items: [
      { product: "Desk Chair", quantity: 10, price: 179.8 },
      { product: "Stapler", quantity: 20, price: 5.0 },
    ],
  },
  {
    id: "PO-2023-003",
    vendor: "Global Distributors",
    date: "2023-06-14",
    total: 1499.85,
    status: "Shipped",
    items: [{ product: "Printer Paper", quantity: 150, price: 9.99 }],
  },
  {
    id: "PO-2023-004",
    vendor: "Quality Products Co.",
    date: "2023-06-16",
    total: 4499.95,
    status: "Ordered",
    items: [{ product: "Laptop", quantity: 5, price: 899.99 }],
  },
]
