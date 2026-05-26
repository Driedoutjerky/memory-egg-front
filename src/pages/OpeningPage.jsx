import "./OpeningPage.css";

function OpeningPage() {
  return (
    <main className="app-page opening-page">
      <section className="opening-card">
        <div className="opening-image-frame" aria-label="Mysterious egg image placeholder" />

        <div className="opening-story">
          <p>
            You found a mysterious egg in a worn nest. It looks abandoned. But
            just as you are about to leave, the egg moves once.
          </p>

          <p>
            Beside the nest lies a worn notebook. The first page says:
          </p>
        </div>

        <blockquote className="opening-quote">
          “The egg does not hatch from time. It hatches from what is remembered.”
        </blockquote>

        <div className="opening-actions">
          <a className="btn opening-primary" href="/register">
            Take care of<br />the egg
          </a>

          <a className="btn btn-secondary opening-secondary" href="/login">
            Leave for now
          </a>
        </div>
      </section>
    </main>
  );
}

export default OpeningPage;