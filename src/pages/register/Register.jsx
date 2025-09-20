import { useState } from "react";
import axios from "axios";
import style from "./register.module.css";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [patient, setPatient] = useState({
    contactNumber: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    emergencyContact: "",
    bloodType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!patient.contactNumber.match(/^\d{10}$/)) {
      toast.error("Invalid contact number. Must be 10 digits.");
      return;
    }
    if (!patient.email.includes("@")) {
      toast.error("Invalid email format.");
      return;
    }
    if (patient.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8181/api/patient",
        patient,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Successfully Register Patient");
        setPatient({
          contactNumber: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "",
          address: "",
          emergencyContact: "",
          bloodType: "",
        });
      }
    } catch (error) {
      console.error("Registration Failed:", error);
      toast.error("Registration Failed! Please try again.");
    }
  };

  return (
    <div className={style.container}>
      <Toaster />
      <div className={style.doctor}>
        <img src="src/pages/image/doctor.avif" alt="Doctor" />
      </div>
      <div className={style.form}>
        <h1>Patient Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className={style.details}>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                value={patient.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={patient.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={style.details}>
            <div>
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={patient.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                value={patient.gender}
                onChange={handleChange}
                required
              >
                <option value="">-- Select --</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          <div className={style.details}>
            <div>
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={patient.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={patient.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={style.details}>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={patient.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                value={patient.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={style.details}>
            <div>
              <label htmlFor="emergencyContact">Emergency Contact</label>
              <input
                type="tel"
                name="emergencyContact"
                value={patient.emergencyContact}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="bloodType">Blood Type</label>
              <select
                name="bloodType"
                value={patient.bloodType}
                onChange={handleChange}
                required
              >
                <option value="">-- Select --</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className={style.btn}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
