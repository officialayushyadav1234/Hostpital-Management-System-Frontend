import { useEffect, useState } from "react";
import style from "./doctorProfile.module.css";

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const doctorId = sessionStorage.getItem("id");

  useEffect(() => {
    if (doctorId) {
      fetch(`http://localhost:8181/api/doctor/id?id=${doctorId}`)
        .then((response) => response.json())
        .then((data) => setDoctor(data))
        .catch((error) => console.error("Error fetching doctor data:", error));
    }
  }, [doctorId]);

  if (!doctor) {
    return <div className={style.loading}>Loading...</div>;
  }

  return (
    <div className={style.doctorProfileContainer}>
      <h1 className={style.title}>Doctor Profile</h1>
      <div className={style.card}>
        <h1>{doctor.name}</h1>
        <p>Id:{doctor.doctorId}</p>
        <p>
          <strong>Specialization:</strong> {doctor.specialization}
        </p>
        <p>
          <strong>Email:</strong> {doctor.email}
        </p>
        <p>
          <strong>Contact:</strong> {doctor.contactNumber}
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
          <strong>Consultation Fee:</strong> ${doctor.consultationFee}
        </p>
        <button className={style.editButton}>Edit</button>
      </div>
    </div>
  );
};

export default DoctorProfile;
