import React, { useEffect } from "react";
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
} from "../ui/forms";
import { useForm } from "../../hooks/useForm";

interface FormLoad1Values {
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

const FormLoad1: React.FC = () => {
  const { values, setValues, handleChange } = useForm<FormLoad1Values>({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    isActive: false,
    hobbies: [],
    role: "",
    birthDate: "",
    startTime: "",
    appointment: "",
    phone: "",
    website: "",
    profileImage: null,
    gallery: [],
    file: null,
    files: [],
  });

  const loadDummyData = async () => {
    const profileImage = await urlToFile(
      "/mock/profile.jpg",
      "profile.jpg",
      "image/jpeg",
    );

    const gallery = await Promise.all([
      urlToFile("/mock/gallery1.jpg", "gallery1.jpg", "image/jpeg"),
      urlToFile("/mock/gallery2.jpg", "gallery2.jpg", "image/jpeg"),
    ]);

    const file = await urlToFile(
      "/mock/doc1.pdf",
      "doc1.pdf",
      "application/pdf",
    );

    const files = await Promise.all([
      urlToFile("/mock/doc1.pdf", "doc1.pdf", "application/pdf"),
      urlToFile(
        "/mock/doc2.docx",
        "doc2.docx",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ),
    ]);

    return {
      firstName: "Muhammad",
      lastName: "Khoirudin",
      email: "mkh@gmail.com",
      gender: "male",
      isActive: true,
      hobbies: ["reading", "coding"],
      role: "admin",
      birthDate: "1995-06-15",
      startTime: "09:30",
      appointment: "2026-03-28T10:00",
      phone: "1234567890",
      website: "https://mkh.com",
      profileImage,
      gallery,
      file,
      files,
    };
  };

  const urlToFile = async (url: string, filename: string, type: string) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type });
  };

  useEffect(() => {
    const init = async () => {
      const data = await loadDummyData();
      setValues(data);
    };
    init();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <InputText
        name="firstName"
        label="First Name"
        value={values.firstName}
        onChange={handleChange}
      />
      <InputText
        name="lastName"
        label="Last Name"
        value={values.lastName}
        onChange={handleChange}
      />
      <InputText
        name="email"
        label="Email"
        value={values.email}
        onChange={handleChange}
      />

      <Dropdown
        name="gender"
        label="Gender"
        value={values.gender}
        onChange={handleChange}
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
        label="Phone"
        value={values.phone}
        onChange={handleChange}
      />
      <InputText
        name="website"
        label="Website"
        value={values.website}
        onChange={handleChange}
      />

      <InputImage
        name="profileImage"
        label="Profile Image"
        value={values.profileImage}
        onChange={handleChange}
        preview
      />

      <InputMultipleImage
        name="gallery"
        label="Gallery"
        value={values.gallery}
        onChange={handleChange}
        preview
      />

      <InputFile
        name="file"
        label="Single File"
        value={values.file}
        onChange={handleChange}
        isSingle
      />

      <InputFile
        name="files"
        label="Multiple Files"
        value={values.files}
        onChange={handleChange}
        isSingle={false}
      />

      <Checkbox
        name="isActive"
        value={values.isActive}
        checked={values.isActive}
        onChange={handleChange}
        label="Active User"
      />

      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default FormLoad1;
