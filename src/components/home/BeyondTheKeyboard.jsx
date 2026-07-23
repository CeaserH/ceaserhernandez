import "./BeyondTheKeyboard.css";

import { beyondTheKeyboard } from "../../data/beyondTheKeyboard";

function BeyondTheKeyboard() {
  return (
    <section className="beyond-keyboard">
      <div className="beyond-keyboard-container">
        <div className="section-heading">
          <div>
            <p className="section-label">04 / Interests &amp; Passions</p>
            <h2>Beyond the Keyboard</h2>
          </div>
          <p className="section-intro">What keeps me curious and grounded.</p>
        </div>

        <div className="beyond-keyboard-grid">
          {beyondTheKeyboard.map((item) => {
            const Icon = item.icon;

            return (
              <article className="beyond-keyboard-card" key={item.title}>
                <Icon size={22} className="beyond-keyboard-icon" />

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BeyondTheKeyboard;
