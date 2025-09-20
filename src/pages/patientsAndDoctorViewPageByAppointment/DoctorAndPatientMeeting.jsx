import style from "./doctoaAndPatientMeeting.module.css";
import CreateDoctorNotes from "../../components/doctorNotesCreate/CreateDoctorNotes";
import PatientDoctorMeetingDetails from "../../components/doctorNotesCreate/PatientDoctorMeetingDetails";
import PatientAllMedicalReports from "../../components/doctorNotesCreate/PatientAllMedicalReports";

const DoctorAndPatientMeeting = () => {
  return (
    <div className={style.doctorAndPatientMeetingContainer}>
      <h1>Meeting</h1>

      <div className={style.sectionSplit}>
        <div className={style.leftSection}>
          <PatientDoctorMeetingDetails />
        </div>
        <div className={style.rightSection}>
          <CreateDoctorNotes />
        </div>
      </div>

      <PatientAllMedicalReports />
    </div>
  );
};

export default DoctorAndPatientMeeting;
