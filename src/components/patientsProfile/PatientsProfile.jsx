import { useEffect, useState } from "react";
import axios from "axios";
import style from "./patientsProfile.module.css";

const PatientsProfile = () => {
  const [patient, setPatient] = useState(null);
  const patientId = sessionStorage.getItem("id");

  useEffect(() => {
    if (patientId) {
      axios
        .get(`http://localhost:8181/api/patient/${patientId}`)
        .then((response) => setPatient(response.data))
        .catch((error) => console.error("Error fetching patient data:", error));
    }
  }, [patientId]);

  return (
    <div className={style.patientsProfileContainer}>
      <div className={style.titleBar}>
        <h1>Profile</h1>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt="Profile"
          className={style.profileImage}
        />
        <button className={style.editButton}>Edit</button>
      </div>
      {patient ? (
        <div className={style.profileContent}>
          {/* <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Profile" className={style.profileImage} /> */}
          <div className={style.patientInfo}>
            <h1>
              <strong>Name:</strong> {patient.firstName} {patient.lastName}
            </h1>
            <p>
              <strong>Contact:</strong> {patient.contactNumber}
            </p>
            <p>
              <strong>Email:</strong> {patient.email}
            </p>
            <p>
              <strong>Date of Birth:</strong> {patient.dateOfBirth}
            </p>
            <p>
              <strong>Gender:</strong> {patient.gender}
            </p>
            <p>
              <strong>Address:</strong> {patient.address}
            </p>
            <p>
              <strong>Emergency Contact:</strong> {patient.emergencyContact}
            </p>
            <p>
              <strong>Blood Type:</strong> {patient.bloodType}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading patient data...</p>
      )}
    </div>
  );
};

export default PatientsProfile;
