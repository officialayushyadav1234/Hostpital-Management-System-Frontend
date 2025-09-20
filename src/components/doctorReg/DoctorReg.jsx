import { useState } from "react";
import axios from "axios";
import Select from "react-select"; // Import react-select
import toast from "react-hot-toast";
import style from "./DoctorReg.module.css";

const API_BASE_URL = "http://localhost:8181/api/doctor";

const specializations = [
  "Allergy and immunology",
  "Anesthesiology",
  "Dermatology",
  "Diagnostic radiology",
  "Emergency medicine",
  "Cardiologist",
  "Family medicine",
  "Internal medicine",
  "Medical genetics",
  "Neurology",
  "Nuclear medicine",
  "Obstetrics and gynecology",
  "Ophthalmology",
  "Pathology",
  "Pediatrics",
  "Physical medicine and rehabilitation",
  "Preventive medicine",
  "Psychiatry",
  "Radiation oncology",
  "Surgery",
  "Urology",
];

const daysOfWeek = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

const DoctorReg = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    specialization: "",
    experienceYears: "",
    clinicAddress: "",
    availableDays: [],
    consultationFee: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDaysChange = (selectedOptions) => {
    setFormData({
      ...formData,
      availableDays: selectedOptions.map((option) => option.value),
    });
  };

  const validateForm = async () => {
    const {
      name,
      email,
      contactNumber,
      specialization,
      experienceYears,
      clinicAddress,
      availableDays,
      consultationFee,
      password,
      confirmPassword,
    } = formData;

    if (
      !name ||
      !email ||
      !contactNumber ||
      !specialization ||
      !experienceYears ||
      !clinicAddress ||
      availableDays.length === 0 ||
      !consultationFee ||
      !password ||
      !confirmPassword
    ) {
      return "All fields are required.";
    }
    if (!/^\d{10}$/.test(contactNumber)) {
      return "Contact number must be 10 digits.";
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "Invalid email format.";
    }
    if (isNaN(experienceYears) || experienceYears < 0) {
      return "Experience years must be a positive number.";
    }
    if (isNaN(consultationFee) || consultationFee < 0) {
      return "Consultation fee must be a positive number.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validationError = await validateForm();
    if (validationError) {
      toast.error("Doctor not saved due to duplicate details!"); // Show warning message
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}`, {
        ...formData,
        availableDays: formData.availableDays.join(", "),
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Doctor registered successfully");
        setFormData({
          name: "",
          email: "",
          contactNumber: "",
          specialization: "",
          experienceYears: "",
          clinicAddress: "",
          availableDays: [],
          consultationFee: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to register doctor."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.doctorRegContainer}>
      <h2>Doctor Registration</h2>
      <form onSubmit={handleSubmit} className={style.doctorForm}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Contact Number</label>
        <input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />

        <label>Specialization</label>
        <select
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        >
          <option value="">Select Specialization</option>
          {specializations.map((spec, index) => (
            <option key={index} value={spec}>
              {spec}
            </option>
          ))}
        </select>

        <label>Experience Years</label>
        <input
          type="number"
          name="experienceYears"
          value={formData.experienceYears}
          onChange={handleChange}
          required
        />

        <label>Clinic Address</label>
        <input
          type="text"
          name="clinicAddress"
          value={formData.clinicAddress}
          onChange={handleChange}
          required
        />

        <label>Available Days</label>
        <Select
          isMulti
          name="availableDays"
          options={daysOfWeek}
          className="basic-multi-select"
          classNamePrefix="select"
          value={daysOfWeek.filter((day) =>
            formData.availableDays.includes(day.value)
          )}
          onChange={handleDaysChange}
          required
        />

        <label>Consultation Fee</label>
        <input
          type="number"
          name="consultationFee"
          value={formData.consultationFee}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" className={style.submitButton} disabled={loading}>
          {loading ? "Registering..." : "Register Doctor"}
        </button>
      </form>
    </div>
  );
};

export default DoctorReg;
