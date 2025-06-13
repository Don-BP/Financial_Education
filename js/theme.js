// js/theme.js
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const docElement = document.documentElement; // Target the <html> element

    // Function to set the theme and icon
    function applyTheme(theme) {
        if (theme === 'dark') {
            docElement.classList.add('dark-mode');
            themeSwitcher.textContent = '🌙';
        } else {
            docElement.classList.remove('dark-mode');
            themeSwitcher.textContent = '☀️';
        }
    }

    // Apply the correct icon on initial load
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Event listener for the switcher button
    themeSwitcher.addEventListener('click', () => {
        let newTheme = docElement.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
});