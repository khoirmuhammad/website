import React from "react";
import {
  InputText,
  Dropdown,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  InputDate,
  InputTime,
  InputDateTime,
  InputImage,
  InputMultipleImage,
  InputFile,
} from "../ui/forms/index";
import { useForm } from "../../hooks/useForm";

interface Form1Values {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  isActive: boolean;
  hobbies: string[];
  role: string;
  birthDate: string;
  startTime: string;
  appointment: string;
  phone: string;
  website: string;
  profileImage: File | null;
  gallery: File[];
  file: File | null;
  files: File[];
}

const Form1: React.FC = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

  const { values, handleChange } = useForm<Form1Values>({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    isActive: false,
    hobbies: [],
    role: "",
    birthDate: now.toISOString().split("T")[0],
    startTime: new Date().toTimeString().slice(0, 5),
    appointment: now.toISOString().slice(0, 16),
    phone: "",
    website: "",
    profileImage: null,
    gallery: [],
    file: null,
    files: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    //Later on fix how to handle image after submission
    e.preventDefault();

    const json = JSON.stringify(values, null, 2);
    console.log(json);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "form1.json";
    a.click();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <InputText
        name="firstName"
        label="First Name"
        value={values.firstName}
        onChange={handleChange}
        required
      />

      <InputText
        name="lastName"
        label="Last Name"
        value={values.lastName}
        onChange={handleChange}
        required
      />

      <InputText
        name="email"
        label="Email"
        type="email"
        value={values.email}
        onChange={handleChange}
        required
      />

      <Dropdown
        name="gender"
        label="Gender"
        value={values.gender}
        onChange={handleChange}
        required
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
      />

      <CheckboxGroup
        name="hobbies"
        label="Hobbies"
        value={values.hobbies}
        onChange={handleChange}
        options={[
          { label: "Reading", value: "reading" },
          { label: "Gaming", value: "gaming" },
          { label: "Coding", value: "coding" },
        ]}
      />

      <RadioGroup
        name="role"
        label="Role"
        value={values.role}
        onChange={handleChange}
        options={[
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
          { label: "Guest", value: "guest" },
        ]}
      />

      <InputDate
        name="birthDate"
        label="Birth Date"
        value={values.birthDate}
        onChange={handleChange}
      />

      <InputTime
        name="startTime"
        label="Start Time"
        value={values.startTime}
        onChange={handleChange}
      />

      <InputDateTime
        name="appointment"
        label="Appointment"
        value={values.appointment}
        onChange={handleChange}
      />

      <InputText
        name="phone"
        label="Phone Number"
        type="tel"
        value={values.phone}
        onChange={handleChange}
        pattern="[0-9]{10}"
        placeholder="Enter 10 digit number"
      />

      <InputText
        name="website"
        label="Website"
        type="url"
        value={values.website}
        onChange={handleChange}
      />

      <InputImage
        name="profileImage"
        label="Profile Image"
        value={values.profileImage}
        onChange={handleChange}
        accept="image/png, image/jpeg"
        preview
      />

      <InputMultipleImage
        name="gallery"
        label="Gallery Images (Multi Image)"
        value={values.gallery}
        onChange={handleChange}
        maxFiles={5}
        preview
      />

      <InputFile
        name="file"
        label="Single File (Accepted : Pdf|Docx)"
        value={values.file}
        onChange={handleChange}
        isSingle
        accept="pdf|docx"
      />

      <InputFile
        name="files"
        label="Multi File (Accepted : Pdf|Docx|Xlsx)"
        value={values.files}
        onChange={handleChange}
        isSingle={false}
        accept="pdf|docx|xlsx"
        maxFiles={2}
      />

      {/* <InputFile
        name="upload"
        value={values.upload}
        onChange={handleChange}
        notAllowed="exe|bat"
        /> */}

      <Checkbox
        name="isActive"
        value={values.isActive}
        label="Active User"
        checked={values.isActive}
        onChange={handleChange}
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default Form1;
