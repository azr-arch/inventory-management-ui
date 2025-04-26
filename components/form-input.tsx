import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import type { Control, FieldError } from "react-hook-form";

interface FormInputProps {
  name: string;
  control: Control;
  label: string;
  type?: "text" | "select" | "number" | "textarea";
  options?: Array<{ value: string | number; label: string }>;
  multiline?: boolean;
  rows?: number;
  error?: FieldError;
}

const FormInput = ({
  name,
  control,
  label,
  type = "text",
  options = [],
  multiline = false,
  rows = 1,
  error,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          variant="outlined"
          type={type}
          select={type === "select"}
          multiline={multiline}
          rows={rows}
          error={!!error}
          helperText={error?.message || " "}
          InputLabelProps={{ shrink: true }}
        >
          {type === "select" &&
            options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      )}
    />
  );
};

export default FormInput;
