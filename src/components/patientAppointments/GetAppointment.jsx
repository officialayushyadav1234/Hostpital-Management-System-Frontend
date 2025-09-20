import { useState, useEffect } from "react";
import axios from "axios";
import style from "./getAppointment.module.css";

const GetAppointment = () => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [patient, setPatient] = useState(null);
  const [message, setMessage] = useState("");

  const patientId = sessionStorage.getItem("id"); // Get patientId from session storage

  // Fetch all doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8181/api/doctor");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  // Fetch patient details from API
  useEffect(() => {
    if (patientId) {
      const fetchPatient = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8181/api/patient/${patientId}`
          );
          setPatient(response.data);
        } catch (error) {
          console.error("Error fetching patient details:", error);
        }
      };
      fetchPatient();
    }
  }, [patientId]);

  // Handle appointment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!appointmentDate || !doctorId) {
      setMessage("Please select a date and doctor.");
      return;
    }

    const appointmentData = {
      appointmentDate,
      doctor: { doctorId: parseInt(doctorId) },
      patient: { patientId: parseInt(patientId) },
    };

    try {
      await axios.post(
        "http://localhost:8181/api/appointment",
        appointmentData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setMessage("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      setMessage("Failed to book appointment.");
    }
  };

  return (
    <div className={style.appointmentContainer}>
      <h2>Book an Appointment</h2>

      {/* Patient Information */}
      {patient && (
        <div className={style.patientInfo}>
          <p>
            <strong>Patient:</strong> {patient.firstName} {patient.lastName}
          </p>
          <p>
            <strong>Email:</strong> {patient.email}
          </p>
          <p>
            <strong>Contact:</strong> {patient.contactNumber}
          </p>
        </div>
      )}

      <form className={style.appointmentForm} onSubmit={handleSubmit}>
        <label>Appointment Date:</label>
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />

        <label>Select Doctor:</label>
        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          required
        >
          <option value="">Choose a doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.doctorId} value={doctor.doctorId}>
              {doctor.name} - {doctor.specialization} (Fee:
              {doctor.consultationFee})
            </option>
          ))}
        </select>

        <button type="submit" className={style.submitButton}>
          Book Appointment
        </button>
        {message && <p className={style.message}>{message}</p>}
      </form>
    </div>
  );
};

export default GetAppointment;
