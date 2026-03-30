const themeToggleCheckbox = document.getElementById('themeToggleCheckbox');
const themeToggleLabel = document.querySelector('.theme-toggle');
const THEME_KEY = 'netflixTheme';

const applyTheme = (theme) => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);

    if (themeToggleCheckbox) {
        themeToggleCheckbox.checked = theme === 'dark';
    }

    if (themeToggleLabel) {
        themeToggleLabel.removeAttribute('aria-hidden');
        // no botão, a imagem é o próprio botão via pseudo-elemento
        themeToggleLabel.dataset.theme = theme;
        themeToggleLabel.setAttribute('aria-label', theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro');
        themeToggleLabel.classList.toggle('active', theme === 'dark');
    }

    localStorage.setItem(THEME_KEY, theme);
};

const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const initTheme = () => {
    const theme = getPreferredTheme();
    applyTheme(theme);
};

if (themeToggleCheckbox) {
    themeToggleCheckbox.addEventListener('change', () => {
        const activeTheme = themeToggleCheckbox.checked ? 'dark' : 'light';
        applyTheme(activeTheme);
    });
}

document.addEventListener('DOMContentLoaded', initTheme);
