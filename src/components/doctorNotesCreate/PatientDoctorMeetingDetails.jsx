import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./patientDoctorMeetingDetails.module.css";

const PatientDoctorMeetingDetails = () => {
  const { id: patientId } = useParams(); // Get patientId from URL
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    if (patientId) {
      axios
        .get(`http://localhost:8090/api/patient/${patientId}`)
        .then((response) => setPatient(response.data))
        .catch((error) => console.error("Error fetching patient data:", error));
    }
  }, [patientId]);

  return (
    <div className={style.patientsProfileContainer}>
      {patient ? (
        <div className={style.profileContent}>
          <div className={style.patientInfo}>
            <h1>
              {patient.patientId}. <strong>Name:</strong> {patient.firstName}{" "}
              {patient.lastName}
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

export default PatientDoctorMeetingDetails;
