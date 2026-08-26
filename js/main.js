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

function initCanvasParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    let currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            
            if (currentTheme === 'dark') {
                // Purple and cyan cosmic stars
                ctx.fillStyle = this.opacity > 0.4 ? 'rgba(6, 182, 212, ' + this.opacity + ')' : 'rgba(147, 51, 234, ' + this.opacity + ')';
            } else {
                // Soft blue floating particles matching #2273ff
                ctx.fillStyle = 'rgba(34, 115, 255, ' + (this.opacity * 0.6) + ')';
            }
            
            ctx.fill();
        }
    }

    const particles = Array.from({ length: 65 }, () => new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    window.particleEngine = {
        updateTheme: (newTheme) => {
            currentTheme = newTheme;
        }
    };
}

function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const roles = PORTFOLIO_DATA.personal.roles;
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ==========================================================================
   4. Interactive Code Terminal Box (Image 1 Bottom Right)
   ========================================================================== */
function initTerminal() {
    const terminalBody = document.getElementById('terminal-body');
    if (!terminalBody) return;

    const commands = {
        'whoami': () => PORTFOLIO_DATA.personal.name.toLowerCase().replace(/\s+/g, '_'),
        'cat skills.txt': () => 'React • Node.js • Laravel • Vue.js • Docker • Tailwind • PostgreSQL',
        'cat contact.json': () => JSON.stringify({ email: PORTFOLIO_DATA.personal.email, location: PORTFOLIO_DATA.personal.location }, null, 2),
        'status': () => PORTFOLIO_DATA.personal.status,
        'help': () => 'Tersedia perintah: whoami, cat skills.txt, cat contact.json, status, clear',
        'clear': () => {
            terminalBody.innerHTML = '';
            return null;
        }
    };

    // Make command output clickable / interactive if needed
    window.runTerminalCmd = (cmdText) => {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `<span class="prompt-symbol">$</span> <span class="command-text">${cmdText}</span>`;
        terminalBody.appendChild(line);

        const resultFn = commands[cmdText];
        if (resultFn) {
            const res = resultFn();
            if (res !== null) {
                const outLine = document.createElement('div');
                outLine.className = 'output-text';
                outLine.innerHTML = `<pre style="margin:0; font-family:inherit;">${res}</pre>`;
                terminalBody.appendChild(outLine);
            }
        } else {
            const errLine = document.createElement('div');
            errLine.className = 'output-text';
            errLine.style.color = '#ef4444';
            errLine.textContent = `Command not found: ${cmdText}. Ketik 'help' untuk bantuan.`;
            terminalBody.appendChild(errLine);
        }
        terminalBody.scrollTop = terminalBody.scrollHeight;
    };
}