// Portfolio Data Storage

const PORTFOLIO_DATA = {
    personal: {
        name: "Rizky Pratama",
        altName: "M. Miftahul Muhtadin",
        role: "Web Developer",
        roles: ["Problem Solver", "Fullstack Developer", "Frontend Specialist", "UI/UX Enthusiast"],
        bio: "Pengembang web yang bersemangat membangun produk digital yang elegan dan berdampak. Dari desain hingga deployment — saya handle semuanya.",
        status: "Tersedia untuk Proyek Baru 🪄",
        location: "Samarinda, Indonesia",
        email: "rizky.pratama@example.com",
        phone: "+62 812 3456 7890",
        stats: [
            { number: 3, symbol: "+", label: "Tahun Exp", id: "exp" },
            { number: 25, symbol: "+", label: "Proyek", id: "projects" },
            { number: 15, symbol: "+", label: "Klien", id: "clients" },
            { number: 8, symbol: "+", label: "Teknologi", id: "tech" }
        ],
        socials: {
            github: "https://github.com",
            linkedin: "https://linkedin.com",
            email: "mailto:rizky.pratama@example.com",
            cv: "#"
        }
    },
    
    // Timeline items inspired by Image 2
    timeline: [
        {
            id: 1,
            year: "2015",
            title: "Masuk SMK",
            subtitle: "SMKN 7 Samarinda — Teknik Komputer & Jaringan",
            category: "Pendidikan",
            categoryType: "education", // green theme
            icon: "fas fa-book-open",
            description: "Memilih jurusan TKJ yang membuka mata saya terhadap dunia jaringan, sistem operasi, dan dasar-dasar pemrograman."
        },
        {
            id: 2,
            year: "2018",
            title: "Baris Kode Pertama",
            subtitle: "HTML • CSS • JavaScript",
            category: "Programming",
            categoryType: "programming", // orange theme
            icon: "fas fa-code",
            description: "Mulai belajar web development secara otodidak. Proyek pertama: landing page sederhana yang terasa seperti karya terbesar kala itu."
        },
        {
            id: 3,
            year: "2020",
            title: "Freelance Pertama",
            subtitle: "Web Developer — Proyek Lokal",
            category: "Karier",
            categoryType: "career", // purple theme
            icon: "fas fa-briefcase",
            description: "Mendapat klien pertama dari lingkungan sekitar. Membangun website profil dan sistem sederhana untuk UMKM lokal Samarinda."
        },
        {
            id: 4,
            year: "2022",
            title: "Fullstack Web Developer",
            subtitle: "PT Digital Innovation Tech",
            category: "Karier",
            categoryType: "career", // purple theme
            icon: "fas fa-laptop-code",
            description: "Bekerja secara profesional membangun RESTful API dengan Laravel/Node.js dan antarmuka modern menggunakan React & Tailwind CSS."
        },
        {
            id: 5,
            year: "2024",
            title: "Senior Developer & Tech Lead",
            subtitle: "Freelance & Consultations",
            category: "Karier",
            categoryType: "career", // purple theme
            icon: "fas fa-rocket",
            description: "Memimpin pengembangan solusi SaaS, arsitektur microservices, dan membimbing junior developer dalam best practices web modern."
        }
    ],

    // Tech stack & skills
    skills: [
        {
            category: "Frontend Development",
            icon: "fas fa-desktop",
            items: [
                { name: "React.js", level: 90, icon: "fab fa-react", color: "#61dafb" },
                { name: "Vue.js", level: 85, icon: "fab fa-vuejs", color: "#42b883" },
                { name: "JavaScript / ES6+", level: 95, icon: "fab fa-js-square", color: "#f7df1e" },
                { name: "TypeScript", level: 80, icon: "fas fa-code", color: "#3178c6" },
                { name: "HTML5 & CSS3", level: 98, icon: "fab fa-html5", color: "#e34f26" },
                { name: "Tailwind CSS", level: 92, icon: "fas fa-wind", color: "#38bdf8" }
            ]
        },
        {
            category: "Backend Development",
            icon: "fas fa-server",
            items: [
                { name: "Node.js & Express", level: 88, icon: "fab fa-node-js", color: "#68a063" },
                { name: "Laravel (PHP)", level: 90, icon: "fab fa-laravel", color: "#ff2d20" },
                { name: "Python / FastAPI", level: 75, icon: "fab fa-python", color: "#3776ab" },
                { name: "RESTful API / GraphQL", level: 92, icon: "fas fa-network-wired", color: "#2273ff" }
            ]
        },
        {
            category: "Database & Cloud",
            icon: "fas fa-database",
            items: [
                { name: "PostgreSQL", level: 85, icon: "fas fa-database", color: "#336791" },
                { name: "MySQL / MariaDB", level: 90, icon: "fas fa-database", color: "#00758f" },
                { name: "MongoDB", level: 80, icon: "fas fa-leaf", color: "#47a248" },
                { name: "Docker", level: 78, icon: "fab fa-docker", color: "#2496ed" },
                { name: "Git & GitHub", level: 95, icon: "fab fa-github", color: "#f05032" }
            ]
        }
    ],

    // Projects Showcase
    projects: [
        {
            id: 1,
            title: "EduLearn - Platform e-Learning",
            category: "Fullstack",
            image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
            description: "Platform pembelajaran online interaktif dengan fitur kuis otomatis, video kursus streaming, dan sertifikat kelulusan digital.",
            tags: ["React", "Laravel", "MySQL", "Tailwind CSS"],
            demoUrl: "https://example.com/edulearn",
            githubUrl: "https://github.com/example/edulearn"
        },
        {
            id: 2,
            title: "DashAnalytics - Dashboard Finansial",
            category: "Frontend",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            description: "Dashboard analisis keuangan real-time dengan grafik interaktif Chart.js, ekspor data PDF/Excel, dan dark mode switcher.",
            tags: ["React", "TypeScript", "Chart.js", "Tailwind"],
            demoUrl: "https://example.com/dashanalytics",
            githubUrl: "https://github.com/example/dashanalytics"
        },
        {
            id: 3,
            title: "StoreCraft - E-Commerce SaaS",
            category: "Fullstack",
            image: "https://images.unsplash.com/photo-1556742049-0a67daf40955?auto=format&fit=crop&w=800&q=80",
            description: "Sistem toko online siap pakai untuk UMKM dengan integrasi Payment Gateway Midtrans, RajaOngkir, dan WhatsApp Order.",
            tags: ["Laravel", "Vue.js", "PostgreSQL", "Bootstrap"],
            demoUrl: "https://example.com/storecraft",
            githubUrl: "https://github.com/example/storecraft"
        },
        {
            id: 4,
            title: "TaskFlow - Work Management App",
            category: "Frontend",
            image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
            description: "Aplikasi manajemen tugas ala Kanban Board dengan fitur drag and drop, timer Pomodoro, dan kolaborasi tim.",
            tags: ["React", "Redux", "Framer Motion"],
            demoUrl: "https://example.com/taskflow",
            githubUrl: "https://github.com/example/taskflow"
        },
        {
            id: 5,
            title: "APIService Hub - Gatekeeper API",
            category: "Backend",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
            description: "Microservice API Gateway dengan JWT Authentication, Rate Limiting, caching Redis, dan dokumentasi Swagger.",
            tags: ["Node.js", "Express", "Redis", "Docker"],
            demoUrl: "https://example.com/apihub",
            githubUrl: "https://github.com/example/apihub"
        },
        {
            id: 6,
            title: "AgroSmart - IoT Dashboard Agriculture",
            category: "Fullstack",
            image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80",
            description: "Sistem monitoring perkebunan berbasis IoT untuk membaca kelembapan tanah, suhu udara, dan otomasi penyiraman.",
            tags: ["Vue.js", "Python", "MQTT", "PostgreSQL"],
            demoUrl: "https://example.com/agrosmart",
            githubUrl: "https://github.com/example/agrosmart"
        }
    ],

    // Certificates
    certificates: [
        {
            id: 1,
            title: "Full-Stack Web Developer Professional",
            issuer: "Dicoding Indonesia",
            date: "2023",
            icon: "fas fa-certificate",
            color: "#2273ff",
            credentialUrl: "https://dicoding.com"
        },
        {
            id: 2,
            title: "React Specialist Certification",
            issuer: "Meta Frontend Developer",
            date: "2023",
            icon: "fab fa-react",
            color: "#06b6d4",
            credentialUrl: "https://coursera.org"
        },
        {
            id: 3,
            title: "AWS Certified Cloud Practitioner",
            issuer: "Amazon Web Services",
            date: "2024",
            icon: "fab fa-aws",
            color: "#f59e0b",
            credentialUrl: "https://aws.amazon.com"
        },
        {
            id: 4,
            title: "Google UX Design Professional",
            issuer: "Google",
            date: "2022",
            icon: "fab fa-google",
            color: "#10b981",
            credentialUrl: "https://coursera.org"
        }
    ]
};
