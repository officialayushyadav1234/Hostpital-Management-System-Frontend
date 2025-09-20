import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import style from "./contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8181/contact",
        formData
      );
      if (response.status === 200) {
        toast.success("Message sent successfully");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      setError("Failed to send message. Please try again later.");
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className={style.contactPage}>
      <div className={style.contactContainer}>
        <h1>Contact Us</h1>
        <p className={style.description}>
          Have questions or need assistance? Reach out to us!
        </p>
        <form onSubmit={handleSubmit} className={style.contactForm}>
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

          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className={style.textarea}
          />

          {error && <p className={style.error}>{error}</p>}
          <button type="submit" className={style.button}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
