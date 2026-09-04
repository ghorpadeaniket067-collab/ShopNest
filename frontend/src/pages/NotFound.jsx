import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="container not-found-content">
        <p className="error-code">404</p>

        <h1>Page Not Found</h1>

        <p>
          Sorry, the page you are looking for does not exist.
        </p>

        <Link to="/" className="btn home-button">
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;