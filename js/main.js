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

/* ==========================================================================
   1. Theme Management (Dark Cosmic <-> Light #2273ff)
   ========================================================================== */
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

/* ==========================================================================
   2. Particle Canvas Engine (Cosmic Dark vs Light Blue #2273ff)
   ========================================================================== */
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

/* ==========================================================================
   3. Typing Effect Engine
   ========================================================================== */
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

/* ==========================================================================
   5. Render Timeline (Image 2 Style)
   ========================================================================== */
function renderTimeline(filterCategory = 'all') {
    const timelineContainer = document.getElementById('timeline-items-wrapper');
    if (!timelineContainer) return;

    const items = PORTFOLIO_DATA.timeline.filter(item => {
        if (filterCategory === 'all') return true;
        return item.categoryType === filterCategory;
    });

    timelineContainer.innerHTML = items.map((item, index) => {
        return `
            <div class="timeline-item" data-category="${item.categoryType}">
                <div class="timeline-node ${item.categoryType}">
                    <div class="node-inner"></div>
                </div>
                <div class="timeline-year">${item.year}</div>
                <div class="timeline-card">
                    <div class="card-header-flex">
                        <div class="card-header-left">
                            <div class="card-icon-box ${item.categoryType}">
                                <i class="${item.icon}"></i>
                            </div>
                            <div class="card-title-group">
                                <h4>${item.title}</h4>
                                <div class="card-subtitle ${item.categoryType}">${item.subtitle}</div>
                            </div>
                        </div>
                        <span class="card-badge ${item.categoryType}">${item.category}</span>
                    </div>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
    }).join('');
}

window.filterTimeline = (category, btnElement) => {
    document.querySelectorAll('.timeline-filter-wrapper .filter-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    renderTimeline(category);
};

/* ==========================================================================
   6. Render Skills
   ========================================================================== */
function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;

    container.innerHTML = PORTFOLIO_DATA.skills.map(cat => {
        return `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="skill-category-card">
                    <div class="skill-cat-title">
                        <i class="${cat.icon}"></i>
                        <span>${cat.category}</span>
                    </div>
                    <div class="skills-list">
                        ${cat.items.map(skill => `
                            <div class="skill-item">
                                <div class="skill-info">
                                    <span class="skill-name">
                                        <i class="${skill.icon}" style="color: ${skill.color}"></i>
                                        ${skill.name}
                                    </span>
                                    <span class="skill-percent">${skill.level}%</span>
                                </div>
                                <div class="progress-bar-bg">
                                    <div class="progress-bar-fill" data-level="${skill.level}"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/* ==========================================================================
   7. Render Projects & Certificates
   ========================================================================== */
function renderProjects(filter = 'all') {
    const container = document.getElementById('projects-container');
    if (!container) return;

    const filtered = PORTFOLIO_DATA.projects.filter(p => filter === 'all' || p.category.toLowerCase() === filter.toLowerCase());

    container.innerHTML = filtered.map(p => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="project-card">
                <div class="project-img-wrapper">
                    <img src="${p.image}" alt="${p.title}" class="project-img">
                    <div class="project-overlay">
                        <a href="${p.demoUrl}" target="_blank" class="btn-primary-custom btn-sm">Demo</a>
                        <a href="${p.githubUrl}" target="_blank" class="btn-outline-custom btn-sm"><i class="fab fa-github"></i> Code</a>
                    </div>
                </div>
                <div class="project-content">
                    <h4 class="project-title">${p.title}</h4>
                    <p class="project-desc">${p.description}</p>
                    <div class="tech-tags">
                        ${p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

window.filterProjects = (cat, btn) => {
    document.querySelectorAll('.projects-filter .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(cat);
};

function renderCertificates() {
    const container = document.getElementById('certificates-container');
    if (!container) return;

    container.innerHTML = PORTFOLIO_DATA.certificates.map(c => `
        <div class="col-lg-6 mb-4">
            <div class="cert-card">
                <div class="cert-icon-box" style="background: rgba(34, 115, 255, 0.1); color: ${c.color}">
                    <i class="${c.icon}"></i>
                </div>
                <div class="cert-info">
                    <h5>${c.title}</h5>
                    <div class="cert-issuer">${c.issuer} • ${c.date}</div>
                </div>
                <a href="${c.credentialUrl}" target="_blank" class="ms-auto btn-outline-custom btn-sm" title="Lihat Kredensial">
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
    `).join('');
}

/* ==========================================================================
   8. Scroll Observer & Stat Counters
   ========================================================================== */
function initScrollObserver() {
    // Stat Counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate progress bars
                document.querySelectorAll('.progress-bar-fill').forEach(bar => {
                    bar.style.width = bar.getAttribute('data-level') + '%';
                });

                // Animate stat numbers
                document.querySelectorAll('.stat-number').forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 30;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.ceil(current) + '+';
                        }
                    }, 40);
                });

                observer.disconnect();
            }
        });
    }, { threshold: 0.2 });

    const statsSec = document.getElementById('hero-stats-wrapper');
    if (statsSec) observer.observe(statsSec);
}

/* ==========================================================================
   9. Contact Form & Chat Box Modal
   ========================================================================== */
function initContactAndChat() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah terkirim. Saya akan segera menghubungi Anda.');
            contactForm.reset();
        });
    }

    const chatBtn = document.getElementById('floating-chat-btn');
    const chatModal = document.getElementById('chat-box-modal');
    const closeChat = document.getElementById('close-chat-btn');

    if (chatBtn && chatModal) {
        chatBtn.addEventListener('click', () => {
            chatModal.style.display = chatModal.style.display === 'block' ? 'none' : 'block';
        });
    }

    if (closeChat && chatModal) {
        closeChat.addEventListener('click', () => {
            chatModal.style.display = 'none';
        });
    }
}
