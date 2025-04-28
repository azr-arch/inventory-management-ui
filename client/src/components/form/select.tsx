import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface Option {
  label: string;
  value: number;
}
interface SingleSelectProps {
  label: string;
  value: number | ""; // value can be number or empty string
  onChange: (value: number | "") => void; // onChange accepts either number or empty string
  options: Option[];
  required?: boolean;
}
export const SingleSelect: React.FC<SingleSelectProps> = ({
  label,
  value,
  onChange,
  options,
  required,
}) => {
  const handleChange = (event: SelectChangeEvent<any>) => {
    const newValue = event.target.value;
    onChange(newValue === "" ? "" : Number(newValue)); // Handle empty string or number
  };
  return (
    <FormControl fullWidth required={required}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value} // Ensure value is empty string or number
        label={label}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Choose an option</em>
        </MenuItem>
        {options.map((option, idx) => (
          <MenuItem key={idx} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default SingleSelect;
