import type { RadioGroupProps } from "../../../types/forms/form.type";
import FormFieldWrapper from "./FormFieldWrapper";

const RadioGroup = <K extends PropertyKey>({
  name,
  value,
  onChange,
  label,
  error,
  options,
  disabled,
}: RadioGroupProps<K>) => {
  return (
    <FormFieldWrapper label={label} error={error}>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              type="radio"
              name={String(name)} // important: same name groups radios
              value={opt.value}
              checked={value === opt.value}
              disabled={disabled}
              onChange={() => onChange(name, opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </FormFieldWrapper>
  );
};

export default RadioGroup;
