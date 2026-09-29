import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("English");
  const [targetLanguage, setTargetLanguage] = useState("Bangla");

  const languages = [
    "English",
    "Bangla",
    "Hindi",
    "Arabic",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
  ];

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">文</span>
          <span>Translify</span>
        </div>

        <div className="badge">
          AI Translation Tool
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <p className="eyebrow">SMART LANGUAGE TRANSLATION</p>

          <h1>
            Translate your words,
            <br />
            <span>connect the world.</span>
          </h1>

          <p className="subtitle">
            Fast and simple language translation powered by modern AI
            translation technology.
          </p>
        </section>

        <section className="translator-card">
          <div className="language-row">
            <div className="language-box">
              <label>Source Language</label>

              <select
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
              >
                {languages.map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
            </div>

            <button className="swap-button">⇄</button>

            <div className="language-box">
              <label>Target Language</label>

              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                {languages.map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="translation-area">
            <div className="input-section">
              <div className="section-header">
                <span>Enter text</span>
                <span>{text.length}/5000</span>
              </div>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={5000}
                placeholder="Type or paste the text you want to translate..."
              />

              <div className="input-footer">
                <button
                  className="clear-button"
                  onClick={() => setText("")}
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="output-section">
              <div className="section-header">
                <span>Translation</span>
                <span className="status">Ready</span>
              </div>

              <div className="translation-result">
                <p>
                  Your translated text will appear here.
                </p>
              </div>

              <div className="output-footer">
                <button className="copy-button">
                  Copy Translation
                </button>
              </div>
            </div>
          </div>

          <button className="translate-button">
            Translate
          </button>
        </section>

        <section className="features">
          <div>
            <strong>⚡ Fast</strong>
            <span>Quick translation response</span>
          </div>

          <div>
            <strong>🌐 Multiple Languages</strong>
            <span>Translate across languages</span>
          </div>

          <div>
            <strong>🔒 Secure</strong>
            <span>Your text stays protected</span>
          </div>
        </section>
      </main>

      <footer>
        <p>CodeAlpha Internship Project • Language Translation Tool</p>
      </footer>
    </div>
  );
}

export default App;