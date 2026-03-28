import type { InputDateProps } from "../../../types/forms/form.type";
import FormFieldWrapper from "./FormFieldWrapper";

const InputDate = <K extends PropertyKey>({
  name,
  value,
  onChange,
  label,
  error,
  min,
  max,
  required,
  disabled,
  readOnly,
}: InputDateProps<K>) => {
  return (
    <FormFieldWrapper label={label} error={error}>
      <input
        type="date"
        name={String(name)}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        min={min}
        max={max}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        className="border p-2 rounded w-full"
      />
    </FormFieldWrapper>
  );
};

export default InputDate;
