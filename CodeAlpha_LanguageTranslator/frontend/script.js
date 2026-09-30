const translateBtn =
    document.getElementById("translateBtn");

const copyBtn =
    document.getElementById("copyBtn");

const swapBtn =
    document.getElementById("swapBtn");

const inputText =
    document.getElementById("inputText");

const translatedText =
    document.getElementById("translatedText");

const sourceLanguage =
    document.getElementById("sourceLanguage");

const targetLanguage =
    document.getElementById("targetLanguage");

const loading =
    document.getElementById("loading");


// ===============================
// TRANSLATE
// ===============================

translateBtn.addEventListener("click", async () => {

    const text = inputText.value.trim();

    if (!text) {
        translatedText.innerText =
            "Please enter some text.";
        return;
    }

    loading.style.display = "block";
    translateBtn.disabled = true;

    translatedText.innerText =
        "Translating...";

    try {

        const response = await fetch(
            "/api/translate",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    text: text,

                    sourceLanguage:
                        sourceLanguage.value,

                    targetLanguage:
                        targetLanguage.value
                })
            }
        );

        const data =
            await response.json();

        console.log(
            "Backend Response:",
            data
        );

        if (!response.ok) {
            throw new Error(
                data.message ||
                "Translation failed."
            );
        }

        if (!data.success) {
            throw new Error(
                data.message ||
                "Translation failed."
            );
        }

        translatedText.innerText =
            data.translatedText;

    } catch (error) {

        console.error(
            "Translation Error:",
            error
        );

        translatedText.innerText =
            "❌ " + error.message;

    } finally {

        loading.style.display =
            "none";

        translateBtn.disabled =
            false;
    }
});


// ===============================
// COPY TRANSLATION
// ===============================

copyBtn.addEventListener(
    "click",
    async () => {

        const text =
            translatedText.innerText.trim();

        if (
            !text ||
            text === "Translating..."
        ) {
            alert("Nothing to copy.");
            return;
        }

        try {

            await navigator.clipboard
                .writeText(text);

            copyBtn.innerText =
                "✅ Copied!";

            setTimeout(() => {

                copyBtn.innerText =
                    "📋 Copy Translation";

            }, 1500);

        } catch (error) {

            alert(
                "Unable to copy translation."
            );
        }
    }
);


// ===============================
// SWAP LANGUAGES
// ===============================

swapBtn.addEventListener(
    "click",
    () => {

        const source =
            sourceLanguage.value;

        const target =
            targetLanguage.value;

        sourceLanguage.value =
            target;

        targetLanguage.value =
            source;
    }
);


// ===============================
// CTRL + ENTER
// ===============================

inputText.addEventListener(
    "keydown",
    (event) => {

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {
            translateBtn.click();
        }
    }
);