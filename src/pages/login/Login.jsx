import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./Login.module.css";

const Login = () => {
  const [activeUser, setActiveUser] = useState("patient");
  const [formData, setFormData] = useState({ id: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    let apiEndpoint = "";
    if (activeUser === "Doctor") {
      apiEndpoint = `http://localhost:8181/api/doctor/authenticate?doctorId=${formData.id}&password=${formData.password}`;
    } else if (activeUser === "patient") {
      apiEndpoint = `http://localhost:8181/api/patient/auth?patientId=${formData.id}&password=${formData.password}`;
    } else {
      apiEndpoint = `http://localhost:8181/api/authenticateAdmin/identifier/${formData.email}/password/${formData.password}`;
    }

    try {
      const response = await axios.post(apiEndpoint);
      if (response.data === true) {
        if (formData.email.length > 0) {
          sessionStorage.setItem("email", formData.email);
        } else {
          sessionStorage.setItem("id", formData.id);
        }
        navigate(`/${activeUser.toLowerCase()}`);
        toast.success("Login successful");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      toast.error(`Something went wrong: ${error}`);
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.toggleContainer}>
          <button
            className={`${styles.toggleButton} ${
              activeUser === "Doctor" ? styles.active : ""
            }`}
            onClick={() => setActiveUser("Doctor")}
          >
            Doctor
          </button>
          <button
            className={`${styles.toggleButton} ${
              activeUser === "patient" ? styles.active : ""
            }`}
            onClick={() => setActiveUser("patient")}
          >
            Patient
          </button>
          <button
            className={`${styles.toggleButton} ${
              activeUser === "admin" ? styles.active : ""
            }`}
            onClick={() => setActiveUser("admin")}
          >
            Admin
          </button>
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          {activeUser === "admin" ? (
            <>
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </>
          ) : (
            <>
              <label>ID</label>
              <input
                type="text"
                name="id"
                placeholder="Enter your ID"
                className={styles.input}
                value={formData.id}
                onChange={handleChange}
                required
              />
            </>
          )}
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <a href="#" className={styles.forgotPassword}>
            Forgot Password?
          </a>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
