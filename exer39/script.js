

const fromLanguage = document.getElementById("from-language");
const toLanguage = document.getElementById("to-language");

const inputText = document.getElementById("input-text");
const translationResult = document.getElementById("translation-result");

const translateButton = document.getElementById("translate-button");
const swapButton = document.getElementById("swap-button");

const inputCount = document.getElementById("input-count");
const errorMessage = document.getElementById("error-message");




const API_KEY = "87f0607b07mshf5c589a78ad7172p184dfcjsndce430d7ec28";

const API_HOST = "free-google-translator.p.rapidapi.com";



const languageCodes = {
    so: "som",
    en: "en",
    ar: "ar",
    fr: "fr",
    es: "es",
    de: "de",
    it: "it",
    tr: "tr",
    zh: "zh",
    ja: "ja"
};



inputText.addEventListener("input", function () {

    inputCount.textContent =
        `${inputText.value.length} characters`;

});



async function translateText() {

    const text = inputText.value.trim();

    const from = languageCodes[fromLanguage.value];
    const to = languageCodes[toLanguage.value];


    // Clear old error
    errorMessage.textContent = "";


    // Check empty input
    if (text === "") {

        translationResult.textContent =
            "Please enter some text.";

        return;
    }


    // Same language
    if (from === to) {

        translationResult.textContent = text;

        return;
    }


    translateButton.disabled = true;
    translateButton.textContent = "Translating...";
    translationResult.textContent = "Translating...";


    try {

      
        const url =
            `https://${API_HOST}/external-api/free-google-translator` +
            `?from=${encodeURIComponent(from)}` +
            `&to=${encodeURIComponent(to)}` +
            `&query=${encodeURIComponent(text)}`;




        const options = {

            method: "POST",

            headers: {
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": API_HOST,
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                translate: text
            })

        };


        console.log("Request URL:", url);


       

        const response =
            await fetch(url, options);


        // Read response
        const result =
            await response.json();


        console.log("API Response:", result);


  

        if (!response.ok) {

            throw new Error(
                result.message || `Error ${response.status}`
            );

        }



        if (result.translation) {

            translationResult.textContent =
                result.translation;

        } else {

            translationResult.textContent =
                "Translation not found.";

        }


    } catch (error) {

        console.error("Translation Error:", error);

        translationResult.textContent = "";

        errorMessage.textContent =
            "Translation failed. Please try again.";

    }



    translateButton.disabled = false;
    translateButton.textContent = "Translate";

}




translateButton.addEventListener(
    "click",
    translateText
);




swapButton.addEventListener("click", function () {

    // Save languages
    const oldFrom =
        fromLanguage.value;

    const oldTo =
        toLanguage.value;


    // Swap languages
    fromLanguage.value = oldTo;
    toLanguage.value = oldFrom;


    // Save text
    const oldInput =
        inputText.value;

    const oldResult =
        translationResult.textContent;


    // Swap text
    if (
        oldResult &&
        oldResult !== "Translating..." &&
        oldResult !== "Translation not found."
    ) {

        inputText.value = oldResult;

        translationResult.textContent =
            oldInput;

    }


    // Update character count
    inputCount.textContent =
        `${inputText.value.length} characters`;


    // Clear error
    errorMessage.textContent = "";

});