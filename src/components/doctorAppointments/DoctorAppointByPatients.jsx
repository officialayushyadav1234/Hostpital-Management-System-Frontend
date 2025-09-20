import { useEffect, useState } from "react";
import style from "./doctorAppointByPatients.module.css";
import { useNavigate } from "react-router-dom";

const DoctorAppointByPatients = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const doctorId = sessionStorage.getItem("id");

    // Get local date in YYYY-MM-DD format
    const today = new Date();
    const pad = (n) => n.toString().padStart(2, "0");
    const localToday = `${today.getFullYear()}-${pad(
      today.getMonth() + 1
    )}-${pad(today.getDate())}`;
    setSelectedDate(localToday);

    fetch(`http://localhost:8181/api/appointment/doctorId/${doctorId}`)
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data);

        // Extract unique sorted dates
        const uniqueDates = [
          ...new Set(data.map((appt) => appt.appointmentDate)),
        ].sort(); // Optional: sort dates
        setAvailableDates(uniqueDates);
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const handleViewPatient = (patientId) => {
    navigate(`/patient/${patientId}`);
  };

  // Filter appointments based on selected date
  const filteredAppointments = appointments.filter(
    (appt) => appt.appointmentDate === selectedDate
  );

  return (
    <div className={style.doctorAppointByPatientsContainer}>
      <h1>Appointments for {selectedDate}</h1>

      <div className={style.dropdownContainer}>
        <label>Select Date: </label>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className={style.dateDropdown}
        >
          {availableDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {filteredAppointments.length === 0 ? (
        <p>No appointments for selected date.</p>
      ) : (
        <table className={style.appointmentTable}>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appt) => (
              <tr key={appt.appointmentId}>
                <td>{appt.appointmentId}</td>
                <td>
                  {appt.patient.firstName} {appt.patient.lastName}
                </td>
                <td>{appt.patient.email}</td>
                <td>{appt.patient.contactNumber}</td>
                <td>
                  <button
                    onClick={() => handleViewPatient(appt.patient.patientId)}
                    className={style.viewButton}
                  >
                    View Patient
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorAppointByPatients;
