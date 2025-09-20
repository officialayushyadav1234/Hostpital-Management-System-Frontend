import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/homepage/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Layout from "../pages/layout/Layout";
import Doctors from "../pages/doctor/Doctors";
import Patients from "../pages/patients/Patients";
import Appointment from "../pages/appointments/Appointment";
import Contact from "../pages/contact/Contact";
import Admin from "../pages/adminDashboard/Admin";
import DoctorsEdit from "../pages/adminDashboard/DoctorsEdit";
import DoctorAndPatientMeeting from "../pages/patientsAndDoctorViewPageByAppointment/DoctorAndPatientMeeting";

export let myRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/doctor",
        element: <Doctors />,
      },
      {
        path: "/patient",
        element: <Patients />,
      },
      {
        path: "/appointments",
        element: <Appointment />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "editByAdmin/:id",
        element: <DoctorsEdit />,
      },
      {
        path: "patient/:id",
        element: <DoctorAndPatientMeeting />,
      },
    ],
  },
]);
