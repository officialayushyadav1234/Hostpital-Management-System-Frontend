import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import style from "./DoctorsList.module.css";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:8181/api/doctor";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      setDoctors(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch doctors.", error);
      setLoading(false);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      toast.success("Doctor deleted successfully");
      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor.doctorId !== id)
      );
    } catch (error) {
      toast.error(
        "Failed to delete doctor: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className={style.doctorsListContainer}>
      <h2>Doctors List</h2>
      {loading && <p>Loading doctors...</p>}
      {error && <p className={style.error}>{error}</p>}

      <div className={style.scrollContainer}>
        <div className={style.cardsContainer}>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div key={doctor.doctorId} className={style.card}>
                <p>ID: {doctor.doctorId}</p>
                <center>
                  <h3>Dr. {doctor.name}</h3>
                </center>
                <p>
                  <strong>Specialization:</strong> {doctor.specialization}
                </p>
                <p>
                  <strong>Experience:</strong> {doctor.experienceYears} years
                </p>
                <p>
                  <strong>Clinic Address:</strong> {doctor.clinicAddress}
                </p>
                <p>
                  <strong>Available Days:</strong> {doctor.availableDays}
                </p>
                <p>
                  <strong>Contact:</strong> {doctor.contactNumber}
                </p>
                <p>
                  <strong>Email:</strong> {doctor.email}
                </p>
                <p>
                  <strong>Consultation Fee:</strong> ₹{doctor.consultationFee}
                </p>
                <Link to={`/editByAdmin/${doctor.doctorId}`}>
                  <button className={style.editButton}> Edit </button>
                </Link>
                <button
                  className={style.deleteButton}
                  onClick={() => deleteDoctor(doctor.doctorId)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No doctors available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
