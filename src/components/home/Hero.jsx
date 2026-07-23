import "./Hero.css";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-main">
          <div className="hero-copy">
            <p className="hero-eyebrow">
              <span>Portfolio / 2026</span>
              Based in California
            </p>

            <h1>
              Ceaser
              <span>Hernandez.</span>
            </h1>

            <p className="hero-role">
              IT Support <span>•</span> Web Development <span>•</span> QA Engineering
            </p>

            <p className="hero-description">
              Father, Army Veteran, and Founder of Vallejo Tech—building useful
              digital experiences and solving real-world technology problems.
            </p>

            <div className="hero-buttons">
              <a className="button-primary" href="#work">
                View selected work <span>↗</span>
              </a>
              <a
                className="button-secondary resume-download"
                href={`${import.meta.env.BASE_URL}ceaser-hernandez-resume.pdf`}
                download="Ceaser-Hernandez-Resume.pdf"
              >
                Download resume <span>PDF</span>
              </a>
            </div>
          </div>

          <aside className="hero-console" aria-label="Professional profile summary">
            <div className="console-header">
              <span>PROFILE.sys</span>
              <div><i /><i /><i /></div>
            </div>
            <div className="console-body">
              <p><span>01</span> Veteran mindset</p>
              <p><span>02</span> People-first support</p>
              <p><span>03</span> Quality-driven builds</p>
              <p><span>04</span> Always learning</p>
            </div>
            <div className="console-footer">
              <span>STATUS</span>
              <strong>READY TO BUILD</strong>
            </div>
          </aside>
        </div>

        <div className="hero-strip">
          <span>SCROLL TO EXPLORE</span>
          <div />
          <p>Support professional by trade. Problem solver by nature.</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
