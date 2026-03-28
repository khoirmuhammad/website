import type { CheckboxGroupProps } from "../../../types/forms/form.type";
import FormFieldWrapper from "./FormFieldWrapper";

const CheckboxGroup = <K extends PropertyKey>({
  name,
  value = [],
  onChange,
  label,
  error,
  options,
  disabled,
}: CheckboxGroupProps<K>) => {
  const handleToggle = (optionValue: string) => {
    let newValue: string[];

    if (value.includes(optionValue)) {
      newValue = value.filter((v) => v !== optionValue);
    } else {
      newValue = [...value, optionValue];
    }

    onChange(name, newValue);
  };

  return (
    <FormFieldWrapper label={label} error={error}>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={value.includes(opt.value)}
              disabled={disabled}
              onChange={() => handleToggle(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </FormFieldWrapper>
  );
};

export default CheckboxGroup;
