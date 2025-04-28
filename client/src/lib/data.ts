export interface Product {
  id: string;
  name: string;
  pricePerUnit: number;
  unitOfMeasurement: string;
  warehouseId: number;
  availableStock: number;
  hsnCode: string;
}

export interface Warehouse {
  id: number;
  name: string;
  desc: string;
  code: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

export const products: Product[] = [
  {
    id: "P001",
    name: "Stainless Steel Rod",
    pricePerUnit: 120.5,
    unitOfMeasurement: "kg",
    warehouseId: 1,
    availableStock: 850,
    hsnCode: "72155010",
  },
  {
    id: "P002",
    name: "Industrial Lubricant",
    pricePerUnit: 89.0,
    unitOfMeasurement: "liter",
    warehouseId: 2,
    availableStock: 320,
    hsnCode: "27101980",
  },
  {
    id: "P003",
    name: "Copper Wire Spool",
    pricePerUnit: 550.0,
    unitOfMeasurement: "roll",
    warehouseId: 1,
    availableStock: 45,
    hsnCode: "74081990",
  },
  {
    id: "P004",
    name: 'PVC Pipe 4"',
    pricePerUnit: 220.0,
    unitOfMeasurement: "piece",
    warehouseId: 3,
    availableStock: 130,
    hsnCode: "39172390",
  },
  {
    id: "P005",
    name: "Concrete Mix Bag",
    pricePerUnit: 350.75,
    unitOfMeasurement: "bag",
    warehouseId: 2,
    availableStock: 200,
    hsnCode: "38245010",
  },
  {
    id: "P006",
    name: "Ceramic Tile 12x12",
    pricePerUnit: 30.0,
    unitOfMeasurement: "sq ft",
    warehouseId: 1,
    availableStock: 1000,
    hsnCode: "69072100",
  },
  {
    id: "P007",
    name: "Electrical Switch",
    pricePerUnit: 45.25,
    unitOfMeasurement: "piece",
    warehouseId: 4,
    availableStock: 760,
    hsnCode: "85365020",
  },
  {
    id: "P008",
    name: "Galvanized Sheet",
    pricePerUnit: 310.0,
    unitOfMeasurement: "sheet",
    warehouseId: 3,
    availableStock: 95,
    hsnCode: "72104900",
  },
  {
    id: "P009",
    name: "Engine Oil 5L",
    pricePerUnit: 799.99,
    unitOfMeasurement: "can",
    warehouseId: 2,
    availableStock: 180,
    hsnCode: "27101981",
  },
  {
    id: "P010",
    name: "Safety Gloves",
    pricePerUnit: 25.0,
    unitOfMeasurement: "pair",
    warehouseId: 5,
    availableStock: 600,
    hsnCode: "61161000",
  },
];

export const warehouses = [
  {
    id: 1,
    name: "Aurora Solutions",
    desc: "A leading provider of cloud-based enterprise software.",
    code: "AUR123",
    address: "457 Maple Street",
    city: "Seattle",
    state: "Washington",
    country: "USA",
  },
  {
    id: 2,
    name: "Nimbus Technologies",
    desc: "Innovative IT consulting and software development firm.",
    code: "NMB456",
    address: "89 Greenway Drive",
    city: "Dublin",
    state: "Leinster",
    country: "Ireland",
  },
  {
    id: 3,
    name: "BluePeak Corp",
    desc: "Specialists in data analytics and AI solutions.",
    code: "BLP789",
    address: "201 Ocean View Blvd",
    city: "San Diego",
    state: "California",
    country: "USA",
  },
  {
    id: 4,
    name: "Verde Innovations",
    desc: "Eco-friendly product design and sustainable tech.",
    code: "VRD321",
    address: "15 Bamboo Grove",
    city: "Vancouver",
    state: "British Columbia",
    country: "Canada",
  },
  {
    id: 5,
    name: "Crimson Logistics",
    desc: "Global logistics and supply chain management company.",
    code: "CRM654",
    address: "808 Transit Road",
    city: "Rotterdam",
    state: "South Holland",
    country: "Netherlands",
  },
  {
    id: 6,
    name: "Zenith Dynamics",
    desc: "Pioneers in aerospace and defense engineering.",
    code: "ZTH987",
    address: "550 Orbit Lane",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
  },
];

export const purchaseOrders = [
  {
    id: "PO-2023-001",
    vendor: "Tech Supplies Inc.",
    date: "2023-06-10",
    total: 5499.95,
    status: "Received",
    items: [
      {
        product: "Stainless Steel Rod",
        productId: "P001",
        hsncode: "72155010",
        unit: "kg",
        quantity: 25,
        price: 120.5,
        total: 3012.5,
      },
      {
        product: "Copper Wire Spool",
        productId: "P003",
        hsncode: "74081990",
        unit: "roll",
        quantity: 5,
        price: 550.0,
        total: 2750.0,
      },
    ],
  },
  {
    id: "PO-2023-002",
    vendor: "Office Essentials",
    date: "2023-06-12",
    total: 1998.0,
    status: "Pending",
    items: [
      {
        product: "Concrete Mix Bag",
        productId: "P005",
        hsncode: "38245010",
        unit: "bag",
        quantity: 4,
        price: 350.75,
        total: 1403.0,
      },
      {
        product: "Safety Gloves",
        productId: "P010",
        hsncode: "61161000",
        unit: "pair",
        quantity: 23.8,
        price: 25.0,
        total: 595.0,
      },
    ],
  },
  {
    id: "PO-2023-003",
    vendor: "Global Distributors",
    date: "2023-06-14",
    total: 1499.85,
    status: "Shipped",
    items: [
      {
        product: "Galvanized Sheet",
        productId: "P008",
        hsncode: "72104900",
        unit: "sheet",
        quantity: 4,
        price: 310.0,
        total: 1240.0,
      },
      {
        product: "Electrical Switch",
        productId: "P007",
        hsncode: "85365020",
        unit: "piece",
        quantity: 5.75,
        price: 45.25,
        total: 259.85,
      },
    ],
  },
  {
    id: "PO-2023-004",
    vendor: "Quality Products Co.",
    date: "2023-06-16",
    total: 4499.95,
    status: "Ordered",
    items: [
      {
        product: "Engine Oil 5L",
        productId: "P009",
        hsncode: "27101981",
        unit: "can",
        quantity: 5,
        price: 799.99,
        total: 3999.95,
      },
      {
        product: 'PVC Pipe 4"',
        productId: "P004",
        hsncode: "39172390",
        unit: "piece",
        quantity: 2.27,
        price: 220.0,
        total: 500.0,
      },
    ],
  },
];

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
];

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
];
