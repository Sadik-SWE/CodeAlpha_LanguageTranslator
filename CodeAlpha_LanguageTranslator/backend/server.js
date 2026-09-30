const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// SERVE FRONTEND
// ===============================

app.use(express.static(path.join(__dirname, "../frontend")));

// ===============================
// HOME PAGE
// ===============================

app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../frontend/index.html")
    );
});

// ===============================
// TRANSLATION API
// ===============================

app.post("/api/translate", async (req, res) => {

    try {

        const {
            text,
            sourceLanguage,
            targetLanguage
        } = req.body;

        // Validate input
        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please enter some text."
            });
        }

        if (!targetLanguage) {
            return res.status(400).json({
                success: false,
                message: "Please select a target language."
            });
        }

        // Auto detect fallback
        const source =
            sourceLanguage === "auto"
                ? "en"
                : sourceLanguage;

        // Same language
        if (source === targetLanguage) {
            return res.json({
                success: true,
                translatedText: text
            });
        }

        const langPair =
            `${source}|${targetLanguage}`;

        const apiUrl =
            "https://api.mymemory.translated.net/get" +
            `?q=${encodeURIComponent(text)}` +
            `&langpair=${encodeURIComponent(langPair)}`;

        console.log("Translation Request:", {
            text,
            source,
            targetLanguage
        });

        const response = await fetch(apiUrl);

        const data = await response.json();

        console.log("Translation Response:", data);

        if (!response.ok) {
            return res.status(500).json({
                success: false,
                message: "Translation API request failed."
            });
        }

        if (
            !data.responseData ||
            !data.responseData.translatedText
        ) {
            return res.status(500).json({
                success: false,
                message:
                    data.responseDetails ||
                    "Translation result was not found."
            });
        }

        res.json({
            success: true,
            translatedText:
                data.responseData.translatedText
        });

    } catch (error) {

        console.error("Server Error:", error);

        res.status(500).json({
            success: false,
            message:
                "Unable to connect to translation service."
        });
    }
});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

    console.log(
        `CodeAlpha Language Translator running on port ${PORT}`
    );

});