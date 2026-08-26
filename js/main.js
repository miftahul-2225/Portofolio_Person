// Main JavaScript Logic

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Theme Switcher
    initTheme();

    // 2. Initialize Canvas Particles
    initCanvasParticles();

    // 3. Initialize Typing Effect
    initTypingEffect();

    // 4. Initialize Interactive Terminal
    initTerminal();

    // 5. Render Portfolio Sections
    renderTimeline('all');
    renderSkills();
    renderProjects('all');
    renderCertificates();

    // 6. Initialize Scroll Animations & Counters
    initScrollObserver();

    // 7. Initialize Contact Form & Floating Chat
    initContactAndChat();
});

function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check saved preference or default to dark (Image 1) or light based on system
    const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio_theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Re-draw canvas particles with theme colors
        if (window.particleEngine) {
            window.particleEngine.updateTheme(newTheme);
        }
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (!themeIcon) return;
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeIcon.title = 'Switch to Light Mode';
    } else {
        themeIcon.className = 'fas fa-moon';
        themeIcon.title = 'Switch to Dark Mode';
    }
}

