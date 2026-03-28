import type { CheckboxProps } from "../../../types/forms/form.type";
import FormFieldWrapper from "./FormFieldWrapper";

const Checkbox = <K extends string>({
  name,
  checked,
  onChange,
  label,
  error,
  disabled,
}: CheckboxProps<K>) => {
  return (
    <FormFieldWrapper label={undefined} error={error}>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(name, e.target.checked)}
        />
        {label && <span>{label}</span>}
      </label>
    </FormFieldWrapper>
  );
};

export default Checkbox;
