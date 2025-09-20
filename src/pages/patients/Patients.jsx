import PatientAppointmentList from "../../components/patientAppointments/PatientAppointmentList";
import PatientsProfile from "../../components/patientsProfile/PatientsProfile";
import GetAppointment from "../../components/patientAppointments/GetAppointment";
import DoctorNote from "../../components/doctorNotes/DoctorNote";
import style from "./patients.module.css";

const Patients = () => {
  return (
    <div>
      <div className={style.patientsContainer}>
        <h1 className={style.pageTitle}>Patient Dashboard</h1>
        <div className={style.cardsContainer}>
          <div className={style.card}>
            <GetAppointment />
          </div>
          <div className={style.card}>
            <PatientsProfile />
          </div>
        </div>
      </div>
      <br />
      <PatientAppointmentList /> <br />
      <br />
      <DoctorNote /> <br />
      <br />
    </div>
  );
};

export default Patients;
