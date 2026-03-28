import type { InputTimeProps } from "../../../types/forms/form.type";
import FormFieldWrapper from "./FormFieldWrapper";

const InputTime = <K extends PropertyKey>({
  name,
  value,
  onChange,
  label,
  error,
  min,
  max,
  step,
  required,
  disabled,
  readOnly,
}: InputTimeProps<K>) => {
  return (
    <FormFieldWrapper label={label} error={error}>
      <input
        type="time"
        name={String(name)}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        min={min}
        max={max}
        step={step}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        className="border p-2 rounded w-full"
      />
    </FormFieldWrapper>
  );
};

export default InputTime;
