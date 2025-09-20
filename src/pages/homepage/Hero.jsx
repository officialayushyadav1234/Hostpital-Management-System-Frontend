import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./hero.module.css";

const slides = [
  {
    id: 1,
    title: "Welcome to Our Hospital",
    subtitle: "Your Health, Our Priority",
    img: "https://i.pinimg.com/736x/a1/f2/35/a1f235c5c31f06c967e01c8f239b829e.jpg",
  },
  {
    id: 2,
    title: "Advanced Medical Care",
    subtitle: "State-of-the-art Facilities & Expert Doctors",
    img: "https://i.pinimg.com/736x/94/86/0d/94860ddea4c38738cc784e388cd0c9fd.jpg",
  },
  {
    id: 3,
    title: "24/7 Emergency Services",
    subtitle: "Always Ready to Serve You",
    img: "https://i.pinimg.com/736x/59/c2/d1/59c2d1eb8d20d330c70bba99f8b06f12.jpg",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={style.hero}
      style={{ backgroundImage: `url(${slides[currentSlide].img})` }}
    >
      <div className={style.card}>
        <h1 className={style.title}>{slides[currentSlide].title}</h1>
        <p className={style.subtitle}>{slides[currentSlide].subtitle}</p>
        <button
          className={style.ctaButton}
          onClick={() => navigate("/register")}
        >
          Book Appointment
        </button>
      </div>
    </section>
  );
};

export default Hero;
