// js/language.js
document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('language-switcher');
    const originalTexts = new Map();

    function storeOriginalTexts() {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            if (!originalTexts.has(element)) {
                originalTexts.set(element, element.innerHTML);
            }
        });
    }

    function translatePage(lang) {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (lang === 'ja' && translations.ja[key]) {
                element.innerHTML = translations.ja[key];
            } else if (lang === 'en' && originalTexts.has(element)) {
                element.innerHTML = originalTexts.get(element);
            }
        });
    }

    window.setLanguage = (lang) => {
        localStorage.setItem('language', lang);
        document.documentElement.setAttribute('lang', lang);
        translatePage(lang);
        if (languageSwitcher) {
            languageSwitcher.textContent = lang === 'en' ? '日本語' : 'English';
        }
    };
    
    // Initial load
    storeOriginalTexts();
    const currentLang = localStorage.getItem('language') || 'en';
    window.setLanguage(currentLang);

    if (languageSwitcher) {
        languageSwitcher.addEventListener('click', () => {
            const newLang = document.documentElement.lang === 'en' ? 'ja' : 'en';
            window.setLanguage(newLang);
        });
    }

    // For dynamic content on seminar page
    const seminarObserver = new MutationObserver(() => {
        storeOriginalTexts();
        translatePage(localStorage.getItem('language') || 'en');
    });

    const seminarContainer = document.getElementById('seminar-list-container');
    if (seminarContainer) {
        seminarObserver.observe(seminarContainer, { childList: true });
    }
});