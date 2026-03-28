import React from "react";

interface Props {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

const FormFieldWrapper: React.FC<Props> = ({ label, error, children }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      {children}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default FormFieldWrapper;
