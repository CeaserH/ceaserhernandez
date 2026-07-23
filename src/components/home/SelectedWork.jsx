import { Code2, ExternalLink } from "lucide-react";
import { projects } from "../../data/projects";
import "./SelectedWork.css";

function ProjectPreview({ project }) {
  if (project.slug === "vallejo") {
    return (
      <div className="project-preview preview-vallejo">
        <img
          src={`${import.meta.env.BASE_URL}vallejo-tech-preview.png`}
          alt="Vallejo Tech homepage showing its PC repair service hero"
          loading="lazy"
        />
        <span className="preview-caption">LIVE HOMEPAGE / JUL 2026</span>
      </div>
    );
  }

  if (project.slug === "soulful") {
    return (
      <div className="project-preview preview-soulful">
        <img
          src={`${import.meta.env.BASE_URL}soulful-customs-preview.png`}
          alt="Soulful Customs homepage showing its personalized glass frame product"
          loading="lazy"
        />
        <span className="preview-caption">LIVE HOMEPAGE / JUL 2026</span>
      </div>
    );
  }

  return (
    <div className="project-preview preview-crimson" aria-hidden="true">
      <div className="game-sky"><span>CRIMSON</span><strong>DUSK</strong></div>
      <div className="game-crosshair"><i /><i /></div>
      <div className="game-hud"><span>HP 074</span><b>12 / 48</b></div>
      <div className="game-ground" />
    </div>
  );
}

function SelectedWork() {
  return (
    <section className="selected-work" id="work">
      <div className="selected-work-container">
        <div className="section-heading">
          <div>
            <p className="section-label">05 / Selected Work</p>
            <h2>Things I&apos;ve Built</h2>
          </div>
          <p className="section-intro">Web, commerce, and game development.</p>
        </div>

        <div className="projects-list">
          {projects.map((project) => (
            <article className={`project-card project-${project.slug}`} key={project.title}>
              <ProjectPreview project={project} />

              <div className="project-content">
                <div className="project-meta">
                  <span>{project.number}</span>
                  <p>{project.type}</p>
                </div>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <ul className="project-tags">
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <div className="project-links">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      Live site <ExternalLink size={14} />
                    </a>
                  )}
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    GitHub <Code2 size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="work-note">
          Role and contribution details will be added to each case study.
        </p>
      </div>
    </section>
  );
}

export default SelectedWork;
