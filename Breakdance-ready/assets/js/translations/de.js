import de from "../translations/de.js";
import en from "../translations/en.js";

const languages = {

    de,

    en

};

export function initializeLanguage() {

    const buttons =
        document.querySelectorAll(".lang-btn");

    let currentLanguage =
        localStorage.getItem("language") || "de";

    applyLanguage(currentLanguage);

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            currentLanguage =
                button.dataset.lang;

            localStorage.setItem(
                "language",
                currentLanguage
            );

            applyLanguage(currentLanguage);

        });

    });

}

function applyLanguage(language) {

    const text =
        languages[language];

    document.querySelector("[data-i18n='title']").textContent =
        text.title;

    document.querySelector("[data-i18n='subtitle']").textContent =
        text.subtitle;

    document.querySelector("[data-i18n='dashboard']").textContent =
        text.dashboard;

    document.querySelector("[data-i18n='calculator']").textContent =
        text.calculator;

    document.querySelector("[data-i18n='guide']").textContent =
        text.guide;

    document.querySelector("[data-i18n='faq']").textContent =
        text.faq;

    document.querySelector("[data-i18n='contact']").textContent =
        text.contact;

    document.querySelector("[data-i18n='about']").textContent =
        text.about;

    document.querySelector("[data-i18n='inputs']").textContent =
        text.inputs;

    document.querySelector("[data-i18n='results']").textContent =
        text.results;

    document.querySelector("[data-i18n='purchasePrice']").textContent =
        text.purchasePrice;

    document.querySelector("[data-i18n='region']").textContent =
        text.region;

    document.querySelector("[data-i18n='propertyType']").textContent =
        text.propertyType;

    document.querySelector("[data-i18n='resale']").textContent =
        text.resale;

    document.querySelector("[data-i18n='new']").textContent =
        text.new;

    document.querySelector("[data-i18n='deposit']").textContent =
        text.deposit;

    document.querySelector("[data-i18n='mortgageYears']").textContent =
        text.mortgageYears;

    document.querySelector("[data-i18n='interestRate']").textContent =
        text.interestRate;

    document
        .querySelectorAll(".lang-btn")
        .forEach(button => {

            button.classList.remove("active");

            if (button.dataset.lang === language) {

                button.classList.add("active");

            }

        });

}