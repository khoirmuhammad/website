import React, { useMemo, useEffect, useRef } from "react";
import FormFieldWrapper from "./FormFieldWrapper";
import type { InputFileProps } from "../../../types/forms/form.type";

// ================= UTILITIES =================

const parseExtensions = (ext?: string): string[] => {
  if (!ext) return [];
  return ext.split("|").map((e) => e.trim().toLowerCase());
};

const isFileValid = (
  file: File,
  accept?: string,
  notAllowed?: string,
): boolean => {
  const fileExt = file.name.split(".").pop()?.toLowerCase() || "";

  const allowList = parseExtensions(accept);
  const blockList = parseExtensions(notAllowed);

  if (blockList.length && blockList.includes(fileExt)) return false;
  if (allowList.length) return allowList.includes(fileExt);

  return true;
};

const buildAcceptAttr = (accept?: string) => {
  if (!accept) return undefined;
  return accept
    .split("|")
    .map((ext) => `.${ext.trim()}`)
    .join(",");
};

// ================= COMPONENT =================

const InputFile = <K extends PropertyKey>({
  name,
  value,
  onChange,
  label,
  error,
  required,
  disabled,
  isSingle = true,
  accept,
  notAllowed,
  maxFiles,
  preview = true,
}: InputFileProps<K>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Normalize value → always array internally
  const files: File[] = useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  // Generate preview URLs
  const previewUrls = useMemo(() => {
    return files.map((file) => URL.createObjectURL(file));
  }, [files]);

  // Cleanup memory
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  // Handle file selection
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    const validFiles = selectedFiles.filter((file) =>
      isFileValid(file, accept, notAllowed),
    );

    if (validFiles.length !== selectedFiles.length) {
      alert("Some files are not allowed");
    }

    if (isSingle) {
      const file = validFiles[0] || null;
      onChange(name, file);
    } else {
      let newFiles = [...files, ...validFiles];

      if (maxFiles) {
        newFiles = newFiles.slice(0, maxFiles);
      }

      onChange(name, newFiles);
    }

    // Reset input (important!)
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Remove file
  const handleRemove = (index: number) => {
    if (isSingle) {
      onChange(name, null);
    } else {
      const updated = files.filter((_, i) => i !== index);
      onChange(name, updated);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <FormFieldWrapper label={label} error={error}>
      <div className="flex flex-col gap-3">
        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="file"
          name={String(name)}
          accept={buildAcceptAttr(accept)}
          multiple={!isSingle}
          onChange={handleChange}
          required={required}
          disabled={disabled}
          className="hidden"
        />

        {/* Button */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isSingle ? "Choose File" : "Choose Files"}
        </button>

        {/* File Info */}
        <p className="text-sm text-gray-600">
          {files.length > 0
            ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
            : "No file selected"}
        </p>

        {/* Preview */}
        {preview && files.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {files.map((file, index) => {
              const url = previewUrls[index];
              const isImage = file.type.startsWith("image/");

              return (
                <div key={index} className="relative border rounded p-2">
                  {/* Image Preview */}
                  {isImage ? (
                    <img
                      src={url}
                      alt={`preview-${index}`}
                      className="w-full h-24 object-cover rounded"
                    />
                  ) : (
                    /* Non-image */
                    <div className="flex flex-col items-center justify-center h-24 text-xs text-gray-600 text-center break-all">
                      <span className="font-semibold">
                        {file.name.split(".").pop()?.toUpperCase()}
                      </span>
                      <span className="truncate w-full">{file.name}</span>
                    </div>
                  )}

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </FormFieldWrapper>
  );
};

export default InputFile;
