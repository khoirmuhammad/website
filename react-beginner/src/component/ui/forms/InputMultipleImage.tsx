// components/form/InputMultipleImage.tsx

import React, { useMemo, useEffect, useRef } from "react";
import type { InputMultipleImageProps } from "../../../types/forms/form.type";
import FormFieldWrapper from "./FormFieldWrapper";

const InputMultipleImage = <K extends PropertyKey>({
  name,
  value,
  onChange,
  label,
  error,
  required,
  disabled,
  accept = "image/*",
  maxFiles,
  preview = true,
}: InputMultipleImageProps<K>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Generate preview URLs
  const previewUrls = useMemo(() => {
    return value.map((file) => URL.createObjectURL(file));
  }, [value]);

  // ✅ Cleanup memory (VERY IMPORTANT)
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  // ✅ Handle file selection
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    let newFiles = [...value, ...files];

    if (maxFiles) {
      newFiles = newFiles.slice(0, maxFiles);
    }

    onChange(name, newFiles);

    // ✅ Reset input (prevents stale file list)
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // ✅ Remove image
  const handleRemove = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(name, updated);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <FormFieldWrapper label={label} error={error}>
      <div className="flex flex-col gap-3">
        {/* ✅ Hidden native input */}
        <input
          ref={inputRef}
          type="file"
          name={String(name)}
          accept={accept}
          multiple
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
          Choose Images
        </button>

        {/* ✅ Custom File Info */}
        <p className="text-sm text-gray-600">
          {value.length > 0
            ? `${value.length} file${value.length > 1 ? "s" : ""} selected`
            : "No file selected"}
        </p>

        {/* ✅ Preview */}
        {preview && value.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`preview-${index}`}
                  className="w-full h-24 object-cover rounded border"
                />

                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </FormFieldWrapper>
  );
};

export default InputMultipleImage;
