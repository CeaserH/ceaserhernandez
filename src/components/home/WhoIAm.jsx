import "./WhoIAm.css";

const highlights = [
  "Father",
  "Army Veteran",
  "IT Professional",
  "Web Developer",
  "QA Engineer",
  "Founder",
  "Bilingual",
  "Problem Solver",
];

function WhoIAm() {
  return (
    <section className="who-i-am" id="about">
      <div className="who-i-am-container">
        <div className="section-heading">
          <div>
            <p className="section-label">03 / About Me</p>
            <h2>Who I Am</h2>
          </div>
          <p className="section-intro">The person behind the screen.</p>
        </div>

        <div className="who-i-am-content">
          <div className="who-i-am-highlights">
            {highlights.map((item, index) => (
              <span key={item}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                {item}
              </span>
            ))}
          </div>

          <div className="who-i-am-story">
            <p>
              I&apos;m a Father, Army Veteran, IT Professional, Web Developer,
              and QA Engineer with a passion for technology and problem-solving.
            </p>

            <p>
              My journey into technology began through game development studies
              before expanding into full-stack web development, quality
              assurance, and technical support. Along the way, I earned an
              Associate Degree in Computer Science and gained experience
              supporting users, investigating software issues, and building
              modern web applications.
            </p>

            <p>
              Today, I am the Founder and Owner of Vallejo Tech, where I help
              individuals and small businesses solve technology challenges while
              continuing to grow my skills in web development, QA engineering,
              systems administration, and cybersecurity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhoIAm;
