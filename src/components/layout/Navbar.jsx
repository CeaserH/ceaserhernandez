import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a className="navbar-brand" href="#home" aria-label="Ceaser Hernandez — home">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-c">C</span>
            <span className="brand-h">H</span>
            <span className="brand-cut" />
          </span>
          <span className="brand-name">
            <strong>CEASER</strong>
            <small>HERNANDEZ</small>
          </span>
        </a>

        <div className="navbar-right">
          <ul className="navbar-links">
            <li><a href="#home"><span>01</span>Home</a></li>
            <li><a href="#journey"><span>02</span>Journey</a></li>
            <li><a href="#about"><span>03</span>About</a></li>
            <li><a href="#work"><span>05</span>Work</a></li>
            <li><a href="#contact"><span>06</span>Contact</a></li>
          </ul>

          <a
            className="resume-button"
            href={`${import.meta.env.BASE_URL}ceaser-hernandez-resume.pdf`}
            download="Ceaser-Hernandez-Resume.pdf"
          >
            Resume <span>↓</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
