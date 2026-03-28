import React, { useMemo, useEffect, useRef } from "react";
import type { InputImageProps } from "../../../types/forms/form.type";
import FormFieldWrapper from "./FormFieldWrapper";

const InputImage = <K extends PropertyKey>({
  name,
  value,
  onChange,
  label,
  error,
  required,
  disabled,
  accept = "image/*",
  preview = true,
}: InputImageProps<K>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Generate preview
  const previewUrl = useMemo(() => {
    if (!value) return null;
    return URL.createObjectURL(value);
  }, [value]);

  // ✅ Cleanup memory
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // ✅ Handle file selection (single only)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(name, file);

    // ✅ Reset input
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // ✅ Remove image
  const handleRemove = () => {
    onChange(name, null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <FormFieldWrapper label={label} error={error}>
      <div className="flex flex-col gap-3">
        {/* ✅ Hidden input */}
        <input
          ref={inputRef}
          type="file"
          name={String(name)}
          accept={accept}
          onChange={handleChange}
          required={required}
          disabled={disabled}
          className="hidden"
        />

        {/* ✅ Custom Button */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Choose Image
        </button>

        {/* ✅ File Info */}
        <p className="text-sm text-gray-600">
          {value ? "1 file selected" : "No file selected"}
        </p>

        {/* ✅ Preview */}
        {preview && previewUrl && (
          <div className="relative w-32">
            <img
              src={previewUrl}
              alt="preview"
              className="w-32 h-32 object-cover rounded border"
            />

            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </FormFieldWrapper>
  );
};

export default InputImage;
