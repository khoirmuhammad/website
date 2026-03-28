//Base
export type BaseFieldProps<T, K extends PropertyKey> = {
  name: K;
  value: T;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  label?: string;
  error?: string;
};

//Input Text
export type InputTextProps<K extends PropertyKey> = BaseFieldProps<
  string,
  K
> & {
  placeholder?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  type?: "text" | "number" | "email" | "password" | "tel" | "url";
  pattern?: string;
  onChange: (name: K, value: string) => void;
};

//Dropdown
export type DropdownOption = {
  label: string;
  value: string;
};

export type DropdownProps<K extends PropertyKey> = BaseFieldProps<string, K> & {
  options: DropdownOption[];
  onChange: (name: K, value: string) => void;
};

//Checkbox (Single Checkbox)
export type CheckboxProps<K extends PropertyKey> = BaseFieldProps<
  boolean,
  K
> & {
  checked?: boolean;
  onChange: (name: K, value: boolean) => void;
};

//Multi Checkbox
export type CheckboxOption = {
  label: string;
  value: string;
};

export type CheckboxGroupProps<K extends PropertyKey> = BaseFieldProps<
  string[],
  K
> & {
  options: CheckboxOption[];
  onChange: (name: K, value: string[]) => void;
};

//Radio Group
export type RadioOption = {
  label: string;
  value: string;
};

export type RadioGroupProps<K extends PropertyKey> = BaseFieldProps<
  string,
  K
> & {
  options: RadioOption[];
  onChange: (name: K, value: string) => void;
};

//Input Date
export type InputDateProps<K extends PropertyKey> = BaseFieldProps<
  string,
  K
> & {
  min?: string; // format: YYYY-MM-DD
  max?: string;
  onChange: (name: K, value: string) => void;
};

//Input Time
export type InputTimeProps<K extends PropertyKey> = BaseFieldProps<
  string,
  K
> & {
  min?: string; // format: HH:mm
  max?: string;
  step?: number; // seconds (optional)
  onChange: (name: K, value: string) => void;
};

//Input Date Time
export type InputDateTimeProps<K extends PropertyKey> = BaseFieldProps<
  string,
  K
> & {
  min?: string; // format: YYYY-MM-DDTHH:mm
  max?: string;
  step?: number; // seconds
  onChange: (name: K, value: string) => void;
};

//Single Image
export type InputImageProps<K extends PropertyKey> = BaseFieldProps<
  File | null,
  K
> & {
  accept?: string; // e.g. "image/*" or "image/png, image/jpeg"
  onChange: (name: K, value: File | null) => void;
  preview?: boolean; // optional preview
};

//Multi Image
export type InputMultipleImageProps<K extends PropertyKey> = BaseFieldProps<
  File[],
  K
> & {
  accept?: string;
  onChange: (name: K, value: File[]) => void;
  preview?: boolean;
  maxFiles?: number;
};

//Dynamic File Upload
export interface InputFileProps<K extends PropertyKey> extends BaseFieldProps<
  File | File[] | null,
  K
> {
  onChange: (name: K, value: File | File[] | null) => void;

  isSingle?: boolean; // default = true
  accept?: string;
  notAllowed?: string;
  preview?: boolean;
  maxFiles?: number;
}
