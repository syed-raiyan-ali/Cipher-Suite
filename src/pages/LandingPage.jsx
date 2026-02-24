import "./LandingPage.css";
import Carousel from "../components/Carousel";

function LandingPage({ activeSlide }) {
  // Using activeSlide prop from parent App component

  return (
    <div className="landing-page">
      <Carousel activeSlide={activeSlide} />
    </div>
  );
}

export default LandingPage;
