import DoctorProfile from "../../components/doctorProfile/DoctorProfile";
import DoctorAppointByPatients from "../../components/doctorAppointments/DoctorAppointByPatients";

const Doctors = () => {
  return (
    <div>
      <h1>Doctore</h1>
      <DoctorProfile /> <br />
      <br />
      <DoctorAppointByPatients /> <br /> <br />
    </div>
  );
};

export default Doctors;
