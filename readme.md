Here's the architecture guide in markdown format suitable for your README:

```markdown
# Inventory Management System Architecture Guide

## Technical Design Decisions

### 1. Modular Folder Structure
```

src/
├── features/
│ ├── warehouse/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── services/
│ │ ├── schemas/
│ │ └── WarehouseForm.jsx
│ ├── vendor/
│ ├── customer/
│ └── ...
├── shared/
│ ├── components/ # Reusable UI
│ ├── hooks/ # Custom hooks
│ ├── utils/ # Helpers, constants
│ └── validations/ # Shared schemas
└── App.jsx

````

### 2. Core Patterns

#### Reusable Form Components
```jsx
// shared/components/Form/FormInput.jsx
const FormInput = ({ control, name, label, type = 'text', options = [] }) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        select={type === 'select'}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        label={label}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    )}
  />
);
````

#### Zod Validation Schemas

```typescript
// shared/validations/address.ts
export const AddressSchema = z.object({
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  pincode: z.string().regex(/^\d{6}$/),
});

// features/vendor/schemas/vendor.ts
export const VendorSchema = AddressSchema.extend({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/),
});
```

### 3. Service Layer Architecture

```javascript
// features/vendor/services/vendorService.js
class VendorService {
  constructor() {
    this.api = axios.create({ baseURL: "/api/vendors" });
  }

  getAll = async () => this.api.get("/");
  create = async (data) => this.api.post("/", data);
  update = async (id, data) => this.api.patch(`/${id}`, data);
  delete = async (id) => this.api.delete(`/${id}`);
}
```

### 4. Dynamic Forms Pattern

```jsx
// shared/components/Form/DynamicFieldArray.jsx
const DynamicFieldArray = ({ fields, append, remove, renderField }) => (
  <div>
    {fields.map((field, index) => (
      <div key={field.id}>
        {renderField(index)}
        <Button onClick={() => remove(index)}>Remove</Button>
      </div>
    ))}
    <Button onClick={() => append(defaultItem)}>Add Item</Button>
  </div>
);
```

### 5. Data Management

#### Dropdown Hook

```javascript
// shared/hooks/useDropdownData.js
const useDropdownData = (serviceMethod, transform = (data) => data) => {
  const { data } = useQuery({
    queryKey: [serviceMethod.name],
    queryFn: serviceMethod,
    select: transform,
  });
  return { options: data || [] };
};
```

#### Export Utility

```javascript
// shared/utils/export.js
export const exportToCSV = (data, filename) => {
  const csvContent = Papa.unparse(data);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, filename);
};
```

### 6. Key Recommendations

- **Type Safety**: Implement TypeScript for better type validation
- **Testing**:
  - Jest/React Testing Library for unit tests
  - Cypress for E2E testing
- **Performance**:
  - Virtualized lists for large datasets
  - API pagination implementation
  - React.memo for memoization
- **Documentation**: Maintain OpenAPI specs for backend APIs

### 7. Future-Proofing Strategies

1. API versioning (`/api/v1/...`)
2. Dependency injection for services
3. Feature toggling system
4. Centralized error logging
5. Business logic separation in service layers

### 8. Required Dependencies

```json
{
  "dependencies": {
    "@hookform/resolvers": "^3.3.1",
    "axios": "^1.6.2",
    "react-query": "^3.39.3",
    "zod": "^3.22.4",
    "@mui/material": "^5.14.20",
    "react-hook-form": "^7.48.2",
    "papaparse": "^5.4.1",
    "file-saver": "^2.0.5"
  }
}
```

## Implementation Roadmap

1. Set up base architecture with feature folders
2. Create shared form components
3. Implement Zod validation schemas
4. Build service classes for each module
5. Develop core CRUD interfaces
6. Add export functionality
7. Implement complex forms (Purchase/Sales Orders)
8. Add error boundaries and logging
9. Write test coverage
10. Add documentation

---

_Last Updated: ${new Date().toISOString().split('T')[0]}_  
_Maintainer: [Your Name]_  
_Project Status: Active Development_

````

You can save this as `ARCHITECTURE.md` in your project root. For offline access, you might want to:

1. Install documentation tools:
```bash
npm install -g docsify
````

2. Initialize docs:

```bash
docsify init ./docs
```

3. Copy this content into `docs/README.md`

This format provides a comprehensive technical reference while maintaining readability. Would you like me to create any specific implementation examples for particular components?
