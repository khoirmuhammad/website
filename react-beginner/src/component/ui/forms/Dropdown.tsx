import type { DropdownProps } from "../../../types/forms/form.type";
import FormFieldWrapper from "./FormFieldWrapper";

const Dropdown = <K extends string>({
  name,
  value,
  onChange,
  label,
  error,
  options,
  required,
  disabled,
}: DropdownProps<K>) => {
  return (
    <FormFieldWrapper label={label} error={error}>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        required={required}
        disabled={disabled}
        className="border p-2 rounded w-full"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormFieldWrapper>
  );
};

export default Dropdown;
