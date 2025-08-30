// Données des compétences
const skillsData = {
    electrical: [
        {
            name: "Installation Électrique",
            level: 85,
            icon: "plug",
            description: "Conception et installation de systèmes électriques résidentiels et industriels.",
            tags: ["Câblage", "Tableaux électriques", "Normes de sécurité"]
        },
        {
            name: "Maintenance Industrielle",
            level: 80,
            icon: "cogs",
            description: "Dépannage et maintenance préventive des équipements industriels.",
            tags: ["Diagnostic", "Réparation", "Maintenance préventive"]
        },
        {
            name: "Automatisme",
            level: 75,
            icon: "robot",
            description: "Programmation et mise en œuvre de systèmes automatisés.",
            tags: ["API", "Automatisation", "Systèmes embarqués"]
        }
    ],
    technical: [
        {
            name: "Électricité Bâtiment",
            level: 82,
            icon: "home",
            description: "Installation et rénovation électrique pour bâtiments résidentiels et commerciaux.",
            tags: ["Schémas électriques", "Mise aux normes", "Éclairage"]
        },
        {
            name: "Systèmes de Sécurité",
            level: 78,
            icon: "shield-alt",
            description: "Installation de systèmes d'alarme et de sécurité électrique.",
            tags: ["Détecteurs", "Alarmes", "Sécurité incendie"]
        },
        {
            name: "Énergies Renouvelables",
            level: 70,
            icon: "solar-panel",
            description: "Installation de systèmes solaires et solutions énergétiques durables.",
            tags: ["Panneaux solaires", "Énergie verte", "Économie d'énergie"]
        }
    ],
    soft: [
        {
            name: "Résolution de Problèmes",
            level: 88,
            icon: "lightbulb",
            description: "Analyse et résolution efficace des problèmes techniques complexes.",
            tags: ["Analyse", "Créativité", "Prise de décision"]
        },
        {
            name: "Travail d'Équipe",
            level: 90,
            icon: "users",
            description: "Collaboration efficace avec différentes équipes et intervenants.",
            tags: ["Communication", "Coordination", "Esprit d'équipe"]
        },
        {
            name: "Gestion du Temps",
            level: 85,
            icon: "clock",
            description: "Organisation et respect des délais dans la réalisation des projets.",
            tags: ["Planification", "Priorisation", "Efficacité"]
        }
    ]
};

// Initialisation de la roue des compétences
document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.querySelector('.skills-wheel');
    const detailsPanel = document.querySelector('.skill-details');
    const skillsGrid = document.querySelector('.skills-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    let allSkills = [];
    
    // Afficher toutes les compétences au chargement
    showSkills('all');
    
    // Gestion des filtres
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Mettre à jour les boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Afficher les compétences filtrées
            showSkills(button.dataset.filter);
        });
    });
    
    function showSkills(filter) {
        // Vider les conteneurs
        wheel.innerHTML = '';
        skillsGrid.innerHTML = '';
        
        // Préparer les compétences à afficher
        let skillsToShow = [];
        
        if (filter === 'all') {
            // Combiner toutes les compétences
            skillsToShow = [
                ...skillsData.electrical,
                ...skillsData.technical,
                ...skillsData.soft
            ];
        } else {
            // Filtrer par catégorie
            skillsToShow = skillsData[filter] || [];
        }
        
        // Mélanger les compétences pour un affichage aléatoire
        skillsToShow = shuffleArray([...skillsToShow]);
        allSkills = skillsToShow;
        
        // Créer les éléments de la roue
        createWheelItems(skillsToShow);
        
        // Créer la grille mobile
        createGridItems(skillsToShow);
    }
    
    function createWheelItems(skills) {
        const centerX = 200; // Position X du centre de la roue
        const centerY = 200; // Position Y du centre de la roue
        const radius = 150;  // Rayon de la roue
        
        skills.forEach((skill, index) => {
            // Calculer la position sur le cercle
            const angle = (index * (2 * Math.PI / skills.length)) - Math.PI/2;
            const x = centerX + radius * Math.cos(angle) - 40;
            const y = centerY + radius * Math.sin(angle) - 40;
            
            // Créer l'élément de compétence
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-item';
            skillElement.style.left = `${x}px`;
            skillElement.style.top = `${y}px`;
            skillElement.style.transform = `rotate(${index * (360 / skills.length)}deg)`;
            
            // Ajouter l'icône
            skillElement.innerHTML = `<i class="fas fa-${skill.icon}"></i>`;
            
            // Ajouter l'événement de clic
            skillElement.addEventListener('click', () => showSkillDetails(skill));
            
            // Ajouter à la roue
            wheel.appendChild(skillElement);
            
            // Animer l'entrée
            setTimeout(() => {
                skillElement.style.opacity = '1';
                skillElement.style.transform = `rotate(${index * (360 / skills.length)}deg) translateZ(0)`;
            }, 100 * index);
        });
    }
    
    function createGridItems(skills) {
        skillsGrid.innerHTML = '';
        
        skills.forEach(skill => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            skillCard.innerHTML = `
                <div class="skill-card-header">
                    <i class="fas fa-${skill.icon}"></i>
                    <h4>${skill.name}</h4>
                </div>
                <div class="skill-level">
                    <div class="level-bar">
                        <div class="level-progress" style="width: ${skill.level}%"></div>
                    </div>
                    <span class="level-percent">${skill.level}%</span>
                </div>
                <p class="skill-description">${skill.description}</p>
                <div class="skill-tags">
                    ${skill.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
                </div>
            `;
            
            skillCard.addEventListener('click', () => showSkillDetails(skill));
            skillsGrid.appendChild(skillCard);
        });
    }
    
    function showSkillDetails(skill) {
        const detailsContent = document.querySelector('.skill-details-content');
        
        // Mettre à jour les détails
        detailsContent.querySelector('.skill-icon').className = `skill-icon fas fa-${skill.icon}`;
        detailsContent.querySelector('.skill-title').textContent = skill.name;
        detailsContent.querySelector('.level-progress').style.width = `${skill.level}%`;
        detailsContent.querySelector('.level-percent').textContent = `${skill.level}%`;
        detailsContent.querySelector('.skill-description').textContent = skill.description;
        
        // Mettre à jour les tags
        const tagsContainer = detailsContent.querySelector('.skill-tags');
        tagsContainer.innerHTML = skill.tags.map(tag => 
            `<span class="skill-tag">${tag}</span>`
        ).join('');
        
        // Animer l'affichage
        detailsPanel.style.opacity = '0';
        detailsPanel.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            detailsPanel.style.opacity = '1';
            detailsPanel.style.transform = 'translateY(0)';
        }, 50);
    }
    
    // Fonction utilitaire pour mélanger un tableau
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    
    // Rotation automatique de la roue
    let rotationAngle = 0;
    setInterval(() => {
        rotationAngle += 0.2;
        wheel.style.transform = `rotate(${rotationAngle}deg)`;
    }, 50);
    
    // Afficher les détails de la première compétence par défaut
    if (allSkills.length > 0) {
        showSkillDetails(allSkills[0]);
    }
});

// Initialiser la roue au chargement de la page
window.addEventListener('load', () => {
    // Vérifier si on est sur la page des compétences
    if (document.getElementById('competences')) {
        // La roue est déjà initialisée par le code ci-dessus
    }
});
