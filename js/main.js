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