import "./LandingPage.css";
import HowItWorks from "../components/HowItWorks";
import HistoryOfCipher from "../components/HistoryOfCipher";
import EncryptorTool from "../components/EncryptorTool";

function LandingPage() {
  return (
    <div className="landing-page-scrollable">
      <section id="encryptor" className="smooth-section">
        <EncryptorTool />
      </section>
      
      <section id="how-it-works" className="smooth-section">
        <HowItWorks />
      </section>
      
      <section id="history" className="smooth-section">
        <HistoryOfCipher />
      </section>
    </div>
  );
}

export default LandingPage;
