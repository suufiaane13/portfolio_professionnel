document.addEventListener('DOMContentLoaded', function() {
    // Sample skills data - replace with your actual data
    const skillsData = [
        {
            id: 1,
            title: "Développement Web",
            icon: "<i class='fas fa-code'></i>",
            level: 85,
            description: "Création de sites web modernes et réactifs avec les dernières technologies front-end et back-end.",
            tags: ["HTML5", "CSS3", "JavaScript", "React", "Node.js"],
            category: "technical"
        },
        {
            id: 2,
            title: "Conception UI/UX",
            icon: "<i class='fas fa-paint-brush'></i>",
            level: 78,
            description: "Conception d'interfaces utilisateur intuitives et d'expériences utilisateur optimisées.",
            tags: ["Figma", "Adobe XD", "Wireframing", "Prototypage"],
            category: "technical"
        },
        {
            id: 3,
            title: "Systèmes Électriques",
            icon: "<i class='fas fa-bolt'></i>",
            level: 92,
            description: "Conception et maintenance de systèmes électriques résidentiels et industriels.",
            tags: ["Électricité bâtiment", "Automatismes", "Schémas électriques"],
            category: "electrical"
        },
        {
            id: 4,
            title: "Communication",
            icon: "<i class='fas fa-comments'></i>",
            level: 88,
            description: "Capacité à transmettre clairement des idées et à travailler en équipe efficacement.",
            tags: ["Présentation", "Négociation", "Travail d'équipe"],
            category: "soft"
        },
        {
            id: 5,
            title: "Gestion de Projet",
            icon: "<i class='fas fa-tasks'></i>",
            level: 82,
            description: "Planification, organisation et suivi de projets avec respect des délais et du budget.",
            tags: ["Agile", "Scrum", "Gestion du temps"],
            category: "soft"
        },
        {
            id: 6,
            title: "Résolution de Problèmes",
            icon: "<i class='fas fa-lightbulb'></i>",
            level: 90,
            description: "Analyse et résolution efficace de problèmes techniques et organisationnels.",
            tags: ["Analyse", "Créativité", "Décision"],
            category: "soft"
        }
    ];

    // DOM Elements
    const skillsGrid = document.querySelector('.skills-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Initialize skills
    function initSkills() {
        // Clear existing skills
        skillsGrid.innerHTML = '';
        
        // Get active filter
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        
        // Filter skills based on active filter
        const filteredSkills = activeFilter === 'all' 
            ? skillsData 
            : skillsData.filter(skill => skill.category === activeFilter);
        
        // Render skills
        filteredSkills.forEach(skill => {
            const skillCard = createSkillCard(skill);
            skillsGrid.appendChild(skillCard);
        });
        
        // Animate progress bars
        animateProgressBars();
    }

    // Create skill card element
    function createSkillCard(skill) {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.dataset.category = skill.category;
        
        // Create tags HTML
        const tagsHTML = skill.tags.map(tag => 
            `<span class="skill-tag">${tag}</span>`
        ).join('');
        
        skillCard.innerHTML = `
            <div class="skill-icon">${skill.icon}</div>
            <h3>${skill.title}</h3>
            <div class="skill-level">
                <div class="level-info">
                    <span class="level-label">Maîtrise</span>
                    <span class="level-percent">${skill.level}%</span>
                </div>
                <div class="level-bar">
                    <div class="level-progress" data-level="${skill.level}"></div>
                </div>
            </div>
            <p class="skill-description">${skill.description}</p>
            <div class="skill-tags">${tagsHTML}</div>
        `;
        
        return skillCard;
    }

    // Animate progress bars
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.level-progress');
        
        progressBars.forEach(bar => {
            const level = bar.dataset.level;
            bar.style.width = '0%';
            
            // Use setTimeout to trigger the animation after a small delay
            setTimeout(() => {
                bar.style.width = `${level}%`;
            }, 100);
        });
    }

    // Filter skills
    function filterSkills(e) {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Reinitialize skills with new filter
        initSkills();
    }

    // Event Listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', filterSkills);
    });

    // Initialize on load
    initSkills();

    // Re-animate on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
            }
        });
    }, { threshold: 0.1 });

    // Observe skills section
    const skillsSection = document.getElementById('competences');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});
