document.addEventListener('DOMContentLoaded', function() {
    // Données des compétences
    const skillsData = [
        // Compétences Électriques
        {
            name: "Installation Électrique",
            level: 85,
            icon: "<i class='fas fa-plug'></i>",
            description: "Conception et installation de systèmes électriques résidentiels et industriels.",
            tags: ["Câblage", "Tableaux électriques", "Normes de sécurité"],
            category: "electrical"
        },
        {
            name: "Maintenance Industrielle",
            level: 80,
            icon: "<i class='fas fa-cogs'></i>",
            description: "Dépannage et maintenance préventive des équipements industriels.",
            tags: ["Diagnostic", "Réparation", "Maintenance préventive"],
            category: "electrical"
        },
        {
            name: "Automatisme",
            level: 75,
            icon: "<i class='fas fa-robot'></i>",
            description: "Programmation et mise en œuvre de systèmes automatisés.",
            tags: ["API", "Automatisation", "Systèmes embarqués"],
            category: "electrical"
        },
        
        // Compétences Techniques
        {
            name: "Électricité Bâtiment",
            level: 82,
            icon: "<i class='fas fa-home'></i>",
            description: "Installation et rénovation électrique pour bâtiments résidentiels et commerciaux.",
            tags: ["Schémas électriques", "Mise aux normes", "Éclairage"],
            category: "technical"
        },
        {
            name: "Systèmes de Sécurité",
            level: 78,
            icon: "<i class='fas fa-shield-alt'></i>",
            description: "Installation et configuration de systèmes de sécurité et d'alarme.",
            tags: ["Sécurité incendie", "Contrôle d'accès", "Vidéosurveillance"],
            category: "technical"
        },
        
        // Compétences Personnelles
        {
            name: "Travail d'Équipe",
            level: 90,
            icon: "<i class='fas fa-users'></i>",
            description: "Collaboration efficace avec différentes équipes pour atteindre des objectifs communs.",
            tags: ["Communication", "Coopération", "Résoudre les problèmes"],
            category: "soft"
        },
        {
            name: "Résolution de Problèmes",
            level: 88,
            icon: "<i class='fas fa-lightbulb'></i>",
            description: "Analyse et résolution efficace des problèmes techniques et organisationnels.",
            tags: ["Analyse", "Créativité", "Prise de décision"],
            category: "soft"
        }
    ];

    // Initialiser le swiper
    const swiper = new Swiper('.skills-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 2,
            },
        },
    });

    // Fonction pour créer une carte de compétence
    function createSkillCard(skill) {
        const tagsHTML = skill.tags.map(tag => 
            `<span class="skill-tag">${tag}</span>`
        ).join('');
        
        return `
            <div class="swiper-slide">
                <div class="skill-card">
                    <div class="skill-icon">${skill.icon}</div>
                    <h3>${skill.name}</h3>
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
                </div>
            </div>
        `;
    }

    // Remplir le swiper avec les compétences
    function initSkills() {
        const swiperWrapper = document.querySelector('.skills-swiper .swiper-wrapper');
        if (!swiperWrapper) return;
        
        // Vider le contenu existant
        swiperWrapper.innerHTML = '';
        
        // Ajouter les cartes de compétences
        skillsData.forEach(skill => {
            swiperWrapper.innerHTML += createSkillCard(skill);
        });
        
        // Mettre à jour le swiper
        swiper.update();
        
        // Animer les barres de progression
        animateProgressBars();
    }

    // Animer les barres de progression
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.level-progress');
        progressBars.forEach(bar => {
            const level = bar.dataset.level;
            bar.style.width = '0%';
            
            // Démarrer l'animation après un petit délai
            setTimeout(() => {
                bar.style.width = `${level}%`;
            }, 100);
        });
    }

    // Initialiser les compétences
    initSkills();

    // Réinitialiser l'animation des barres lors du changement de slide
    swiper.on('slideChange', function() {
        setTimeout(animateProgressBars, 300);
    });
});
