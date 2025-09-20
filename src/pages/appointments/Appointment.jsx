import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import style from "./appointment.module.css";

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, phone, date, time } = formData;
    if (!name || !email || !phone || !date || !time) {
      return "All fields are required.";
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "Invalid email format.";
    }
    if (!/^\d{10}$/.test(phone)) {
      return "Phone number must be 10 digits.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8181/appointmentController/saveAppointment",
        formData
      );
      if (response.status === 200) {
        toast.success("Appointment booked successfully");
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          message: "",
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to book appointment.");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.appointmentPage}>
      <div className={style.appointmentContainer}>
        <h1>Guest Appointment</h1>
        <p className={style.description}>
          Book an appointment with our hospital staff.
        </p>
        <form onSubmit={handleSubmit} className={style.appointmentForm}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={style.input}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={style.input}
          />

          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={style.input}
          />

          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className={style.input}
          />

          <label>Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className={style.input}
          />

          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={style.textarea}
          />

          {error && <p className={style.error}>{error}</p>}
          <button type="submit" className={style.button} disabled={loading}>
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Appointment;
