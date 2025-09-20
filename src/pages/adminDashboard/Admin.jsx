import styles from "./Admin.module.css";
import DoctorReg from "../../components/doctorReg/DoctorReg";
import DoctorsList from "../../components/doctorsList/DoctorsList";

/**
 * The Admin component renders an admin dashboard with sections for doctor registration and a list of
 * doctors.
 * @returns The Admin component is being returned. It contains a div with the title "Admin Dashboard"
 * centered at the top. Inside the div, there is a container with two sections. The first section
 * contains the DoctorReg component and the second section contains the DoctorsList component.
 */
function Admin() {
  return (
    <div>
      <center>
        <h2>Admin Dashboard</h2>
      </center>
      <div className={styles.adminContainer}>
        <div className={styles.section}>
          <DoctorReg />
        </div>
        <div className={styles.section}>
          <DoctorsList />
        </div>
      </div>
    </div>
  );
}

export default Admin;
