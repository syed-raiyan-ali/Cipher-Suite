import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-inner">
        <div className="notfound-code" aria-label="Error 404">
          <span className="glitch" data-text="404">404</span>
        </div>
        <div className="notfound-divider" />
        <p className="notfound-subtitle">ENCRYPTED SECTOR NOT FOUND</p>
        <p className="notfound-body">
          The coordinates you entered lead to a classified void.<br />
          This location does not exist in our cipher network.
        </p>
        <button
          className="notfound-btn interactive"
          onClick={() => navigate("/")}
          aria-label="Return to main terminal"
        >
          <span className="notfound-btn-prefix">~/</span> Return to Main Terminal
        </button>
      </div>
    </div>
  );
}

export default NotFound;