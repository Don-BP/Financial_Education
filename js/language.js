// js/language.js

document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('language-switcher');
    let currentLang = localStorage.getItem('language') || 'en';

    const setLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('language', lang);
        
        document.documentElement.setAttribute('lang', lang);

        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                // Use innerHTML to render bold tags etc.
                element.innerHTML = translations[lang][key];
            }
        });
    };

    if (languageSwitcher) {
        languageSwitcher.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'ja' : 'en';
            setLanguage(newLang);
        });
    }

    // Set initial language
    setLanguage(currentLang);
});