import "./Journey.css";
import { journey } from "../../data/journey";

function Journey() {
  return (
    <section className="journey" id="journey">
      <div className="journey-container">
        <div className="section-heading">
          <div>
            <p className="section-label">02 / Professional Journey</p>
            <h2>How I Got Here</h2>
          </div>
          <p className="section-intro">Experience, education, and momentum.</p>
        </div>

        <div className="roadmap">
          {journey.map((item, index) => (
            <article
              className={`milestone-card ${
                item.title === "Founder & Owner" ? "current-milestone" : ""
              }`}
              key={item.title}
            >
              <span className="milestone-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                {item.title === "Founder & Owner" && (
                  <span className="current-badge">CURRENT</span>
                )}
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="additional-experience">
          <h3>Additional Experience</h3>
          <ul>
            <li>Apprentice Electrician • Richard Craig Electric</li>
            <li>Wireless Specialist / Interim Assistant Manager • AT&amp;T</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Journey;
