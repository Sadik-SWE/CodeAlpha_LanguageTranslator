const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "CodeAlpha Language Translator Backend is running!"
    });
});

app.post("/api/translate", async (req, res) => {
    try {
        const { text, sourceLanguage, targetLanguage } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please enter text."
            });
        }

        if (!targetLanguage) {
            return res.status(400).json({
                success: false,
                message: "Please select target language."
            });
        }

        /*
         * Temporary local translation.
         * Google Cloud Translation API can be connected here later.
         */

        const translations = {
            "hello": {
                bn: "হ্যালো",
                es: "Hola",
                fr: "Bonjour",
                de: "Hallo",
                hi: "नमस्ते"
            },
            "how are you": {
                bn: "আপনি কেমন আছেন?",
                es: "¿Cómo estás?",
                fr: "Comment allez-vous ?",
                de: "Wie geht es dir?",
                hi: "आप कैसे हैं?"
            },
            "good morning": {
                bn: "সুপ্রভাত",
                es: "Buenos días",
                fr: "Bonjour",
                de: "Guten Morgen",
                hi: "सुप्रभात"
            },
            "thank you": {
                bn: "ধন্যবাদ",
                es: "Gracias",
                fr: "Merci",
                de: "Danke",
                hi: "धन्यवाद"
            },
            "i love you": {
                bn: "আমি তোমাকে ভালোবাসি",
                es: "Te quiero",
                fr: "Je t'aime",
                de: "Ich liebe dich",
                hi: "मैं तुमसे प्यार करता हूँ"
            }
        };

        const input = text.trim().toLowerCase();

        let translatedText = translations[input]?.[targetLanguage];

        if (!translatedText) {
            translatedText =
                `[Demo Translation] ${text}`;
        }

        res.json({
            success: true,
            translatedText: translatedText
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Translation failed."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});