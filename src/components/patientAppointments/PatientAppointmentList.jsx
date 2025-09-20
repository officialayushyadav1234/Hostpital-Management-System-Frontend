import { useEffect, useState } from "react";
import axios from "axios";
import style from "./patientAppointmentList.module.css";

const PatientAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const patientId = sessionStorage.getItem("id"); // Get patient ID from sessionStorage

  useEffect(() => {
    if (patientId) {
      axios
        .get(`http://localhost:8181/api/appointment/patientId/${patientId}`)
        .then((response) => {
          // Sort appointments by date (most recent first)
          const sortedAppointments = response.data.sort(
            (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
          );
          setAppointments(sortedAppointments);
        })
        .catch((error) => console.error("Error fetching appointments:", error));
    }
  }, [patientId]);

  const isPastDate = (appointmentDate) => {
    return new Date(appointmentDate) < new Date(); // Check if the appointment date is before today
  };

  return (
    <div className={style.PatientAppointmentContainer}>
      <h2>Patient Appointments</h2>
      {appointments.length > 0 ? (
        <div className={style.CardContainer}>
          {appointments.map((appointment) => (
            <div key={appointment.appointmentId} className={style.Card}>
              <h3>Appointment ID: {appointment.appointmentId}</h3>
              <p
                className={
                  isPastDate(appointment.appointmentDate)
                    ? style.ExpiredDate
                    : ""
                }
              >
                <strong>Date:</strong> {appointment.appointmentDate}
              </p>
              <p>
                <strong>Doctor:</strong> {appointment.doctor.name} (
                {appointment.doctor.specialization})
              </p>
              <p>
                <strong>Clinic Address:</strong>{" "}
                {appointment.doctor.clinicAddress}
              </p>
              <p>
                <strong>Consultation Fee:</strong> ₹
                {appointment.doctor.consultationFee}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default PatientAppointmentList;
