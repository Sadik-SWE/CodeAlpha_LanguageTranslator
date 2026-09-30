const express = require("express");
const cors = require("cors");

const app = express();

// Render automatically provides PORT
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "CodeAlpha Language Translator Backend is running!"
    });
});

// Translation API
app.post("/api/translate", async (req, res) => {
    try {
        const {
            text,
            sourceLanguage,
            targetLanguage
        } = req.body;

        // Validate text
        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please enter some text."
            });
        }

        // Validate target language
        if (!targetLanguage) {
            return res.status(400).json({
                success: false,
                message: "Please select a target language."
            });
        }

        // MyMemory does not use "auto"
        // For now, default auto-detect to English
        const source =
            sourceLanguage === "auto"
                ? "en"
                : sourceLanguage;

        const langPair = `${source}|${targetLanguage}`;

        const apiUrl =
            "https://api.mymemory.translated.net/get" +
            `?q=${encodeURIComponent(text)}` +
            `&langpair=${encodeURIComponent(langPair)}`;

        console.log("Translation request:", {
            text,
            source,
            targetLanguage
        });

        const response = await fetch(apiUrl);

        const data = await response.json();

        console.log("MyMemory response:", data);

        // API error
        if (!response.ok) {
            return res.status(500).json({
                success: false,
                message: "Translation API request failed."
            });
        }

        // Check translation result
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

        const translatedText =
            data.responseData.translatedText;

        res.json({
            success: true,
            translatedText: translatedText
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

// Start server
app.listen(PORT, () => {
    console.log(
        `CodeAlpha Backend running on port ${PORT}`
    );
});