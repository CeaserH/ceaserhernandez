import { useEffect, useRef, useState } from "react";
import "./Exploring.css";

const contactEmail = "contact@ceaserhernandez.com";
const contactEndpoint = import.meta.env.VITE_CONTACT_API_URL;
const turnstileSiteKey = "0x4AAAAAAD8HylEowZfTlzRv";

function TurnstileWidget({ onVerify, resetKey }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let widgetId;
    let cancelled = false;

    function renderWidget() {
      if (cancelled || !containerRef.current || !window.turnstile) return;

      widgetId = window.turnstile.render(containerRef.current, {
        sitekey: turnstileSiteKey,
        theme: "dark",
        callback: onVerify,
        "expired-callback": () => onVerify(""),
        "error-callback": () => onVerify(""),
      });
    }

    const existingScript = document.querySelector(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]',
    );

    if (window.turnstile) {
      renderWidget();
    } else if (existingScript) {
      existingScript.addEventListener("load", renderWidget, { once: true });
    } else {
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.addEventListener("load", renderWidget, { once: true });
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (widgetId !== undefined && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [onVerify, resetKey]);

  return <div className="turnstile-widget" ref={containerRef} />;
}

function Exploring() {
  const [status, setStatus] = useState("idle");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("company")) return;

    const message = {
      name: data.get("name"),
      email: data.get("email"),
      subject: data.get("subject"),
      message: data.get("message"),
      company: data.get("company"),
      turnstileToken,
    };

    if (!contactEndpoint) {
      const subject = encodeURIComponent(
        message.subject || `Portfolio inquiry from ${message.name}`,
      );
      const body = encodeURIComponent(
        `Name: ${message.name}\nEmail: ${message.email}\n\n${message.message}`,
      );

      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      setStatus("email");
      return;
    }

    try {
      setStatus("sending");
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });

      if (!response.ok) throw new Error("Submission failed");

      form.reset();
      setStatus("sent");
      setTurnstileToken("");
      setTurnstileResetKey((value) => value + 1);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="section-heading">
          <div>
            <p className="section-label">06 / Let&apos;s Talk</p>
            <h2>Have a problem worth solving?</h2>
          </div>
          <p className="section-intro">Tell me what you&apos;re working on.</p>
        </div>

        <div className="contact-layout">
          <div className="contact-copy">
            <p>
              Whether you need technical support, want to discuss a project, or
              simply want to connect, send me a note.
            </p>

            <div className="contact-direct">
              <span>DIRECT CONTACT</span>
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              <a
                href="https://www.linkedin.com/in/ceaser-hernandez"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <b>↗</b>
              </a>
            </div>
          </div>

          {status === "sent" ? (
            <div className="contact-success" role="status" aria-live="polite">
              <div className="success-mark" aria-hidden="true">
                <span>✓</span>
              </div>
              <p>MESSAGE DELIVERED / 200 OK</p>
              <h3>Message sent.</h3>
              <strong>I&apos;ll be in touch soon.</strong>
              <span className="success-detail">
                Thanks for reaching out. Your message made it safely to my inbox.
              </span>
            </div>
          ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                <span>01 / Name</span>
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label>
                <span>02 / Email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
            </div>

            <label>
              <span>03 / Subject</span>
              <input name="subject" type="text" required />
            </label>

            <label>
              <span>04 / Message</span>
              <textarea name="message" rows="5" required />
            </label>

            <label className="form-honeypot" aria-hidden="true">
              Company
              <input name="company" type="text" tabIndex="-1" autoComplete="off" />
            </label>

            <TurnstileWidget
              onVerify={setTurnstileToken}
              resetKey={turnstileResetKey}
            />

            <div className="form-footer">
              <p aria-live="polite">
                {status === "email" && "Opening your email app to send the message."}
                {status === "sent" && "Message sent. I’ll be in touch soon."}
                {status === "error" && "Something went wrong. Please email me directly."}
              </p>
              <button
                type="submit"
                disabled={status === "sending" || (contactEndpoint && !turnstileToken)}
              >
                {status === "sending" ? "Sending..." : "Send message"}
                <span>↗</span>
              </button>
            </div>
          </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Exploring;
