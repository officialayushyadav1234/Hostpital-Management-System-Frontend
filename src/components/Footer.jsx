import style from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style.column}>
          <h3>About</h3>
          <ul>
            <li>About Us</li>
            <li>Our Team</li>
            <li>News & Media</li>
            <li>Careers</li>
          </ul>
        </div>

        <div className={style.column}>
          <h3>Services</h3>
          <ul>
            <li>Patient Management</li>
            <li>Doctor Consultation</li>
            <li>Appointment Booking</li>
            <li>Billing & Reports</li>
          </ul>
        </div>

        <div className={style.column}>
          <h3>Links</h3>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Support</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className={style.column}>
          <h3>Quick Contact</h3>
          <p>Email: support@hospitalms.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: 123, Healthcare Street, India</p>
        </div>
      </div>

      <div className={style.bottom}>
        <p>
          © {new Date().getFullYear()} Hospital Management System. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
