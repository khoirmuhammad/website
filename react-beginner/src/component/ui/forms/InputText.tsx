import type { InputTextProps } from "../../../types/forms/form.type";
import FormFieldWrapper from "./FormFieldWrapper";

const InputText = <K extends string>({
  name,
  value,
  onChange,
  label,
  error,
  placeholder,
  required,
  disabled,
  readOnly,
  maxLength,
  min,
  max,
  pattern,
  type = "text",
}: InputTextProps<K>) => {
  return (
    <FormFieldWrapper label={label} error={error}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        min={min}
        max={max}
        pattern={pattern}
        className="border p-2 rounded w-full"
      />
    </FormFieldWrapper>
  );
};

export default InputText;
