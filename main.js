document.addEventListener('DOMContentLoaded', function() {
    // Configuration de l'Intersection Observer pour les animations
    const initScrollAnimations = () => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const handleIntersect = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.animation || 'fade-up';
                    
                    // Ajouter la classe d'animation
                    element.classList.add('animate');
                    element.classList.add(animationType);
                    
                    // Ne plus observer cet élément
                    observer.unobserve(element);
                }
            });
        };

        // Créer un nouvel observer
        const observer = new IntersectionObserver(handleIntersect, options);

        // Sélectionner tous les éléments à animer
        const elementsToAnimate = [
            ...document.querySelectorAll('section'),
            ...document.querySelectorAll('[data-animate]')
        ];

        // Initialiser chaque élément et commencer l'observation
        elementsToAnimate.forEach(element => {
            // S'assurer que l'élément est invisible au départ
            element.style.opacity = '0';
            
            // Si l'élément est déjà dans la vue au chargement
            const rect = element.getBoundingClientRect();
            const isVisible = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );

            if (isVisible) {
                // Si l'élément est déjà visible, déclencher l'animation immédiatement
                const animationType = element.dataset.animation || 'fade-up';
                element.classList.add('animate', animationType);
            } else {
                // Sinon, commencer à observer l'élément
                observer.observe(element);
            }
        });
    };

    // Menu mobile
    const initMobileMenu = () => {
        const menuHamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const menuNavLinks = document.querySelectorAll('.nav-link');
        const html = document.documentElement;
        
        if (menuHamburger && navMenu) {
            // Fonction pour basculer le menu
            const toggleMenu = (isOpen) => {
                const isMenuOpen = isOpen !== undefined ? isOpen : !menuHamburger.classList.contains('active');
                
                // Mise à jour du bouton
                menuHamburger.classList.toggle('active', isMenuOpen);
                menuHamburger.setAttribute('aria-expanded', isMenuOpen);
                
                // Mise à jour du menu
                navMenu.classList.toggle('active', isMenuOpen);
                
                // Gestion du défilement du body
                if (isMenuOpen) {
                    html.style.overflow = 'hidden';
                    // Ajouter un overlay
                    let overlay = document.querySelector('.nav-overlay');
                    if (!overlay) {
                        overlay = document.createElement('div');
                        overlay.className = 'nav-overlay';
                        document.body.appendChild(overlay);
                        
                        // Fermer au clic sur l'overlay
                        overlay.addEventListener('click', () => toggleMenu(false));
                    }
                    overlay.classList.add('visible');
                } else {
                    html.style.overflow = '';
                    const overlay = document.querySelector('.nav-overlay');
                    if (overlay) {
                        overlay.classList.remove('visible');
                        // Supprimer l'overlay après l'animation
                        setTimeout(() => {
                            if (overlay && !navMenu.classList.contains('active')) {
                                overlay.remove();
                            }
                        }, 300);
                    }
                }
            };
            
            // Événement du bouton hamburger
            menuHamburger.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMenu();
            });

            // Fermer le menu au clic sur un lien
            menuNavLinks.forEach(link => {
                link.addEventListener('click', () => toggleMenu(false));
            });
            
            // Fermer le menu avec la touche Échap
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && menuHamburger.classList.contains('active')) {
                    toggleMenu(false);
                }
            });
            
            // Mettre à jour l'accessibilité au chargement
            menuHamburger.setAttribute('aria-expanded', 'false');
            menuHamburger.setAttribute('aria-controls', 'nav-menu');
            navMenu.id = 'nav-menu';
        }
    };

    // Header scroll effect
    const initHeaderScroll = () => {
        const pageHeader = document.querySelector('.header');
        if (pageHeader) {
            window.addEventListener('scroll', () => {
                pageHeader.classList.toggle('scrolled', window.scrollY > 50);
            });
        }
    };

    // Bouton retour en haut
    const initBackToTop = () => {
        const topButton = document.querySelector('.back-to-top');
        if (topButton) {
            window.addEventListener('scroll', () => {
                topButton.classList.toggle('visible', window.scrollY > 300);
            });

            topButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    // Formulaire de contact
    const initContactForm = () => {
        const contactFormElement = document.getElementById('contactForm');
        if (contactFormElement) {
            contactFormElement.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                
                const formattedMessage = `*Nouveau message de contact*%0A%0A` +
                                      `*Nom:* ${name}%0A` +
                                      `*Email:* ${email}%0A` +
                                      `*Sujet:* ${subject}%0A%0A` +
                                      `*Message:*%0A${message}`;
                
                const phoneNumber = '212623403245';
                window.open(`https://wa.me/${phoneNumber}?text=${formattedMessage}`, '_blank');
                contactFormElement.reset();
            });
        }
    };

    // Dark mode
    const initDarkMode = () => {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;
        
        const themeIcon = themeToggle.querySelector('i');
        const htmlElement = document.documentElement;
        
        // Désactiver les transitions pendant l'initialisation
        htmlElement.style.setProperty('--transition-theme', 'none');
        
        const applyTheme = (isDark) => {
            if (isDark) {
                htmlElement.classList.add('dark-mode');
                themeIcon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            } else {
                htmlElement.classList.remove('dark-mode');
                themeIcon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'light');
            }
            
            // Forcer un reflow
            void htmlElement.offsetHeight;
        };
        
        // Vérifier le thème sauvegardé ou la préférence système
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Appliquer le thème initial
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            applyTheme(true);
        } else {
            applyTheme(false);
        }
        
        // Réactiver les transitions après l'initialisation
        setTimeout(() => {
            htmlElement.style.setProperty('--transition-theme', 'all 0.3s ease');
        }, 100);
        
        // Gérer le basculement de thème
        themeToggle.addEventListener('click', function() {
            const isDarkMode = !htmlElement.classList.contains('dark-mode');
            applyTheme(isDarkMode);
        });
        
        // Mettre à jour le thème si la préférence système change
        const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleColorSchemeChange = (e) => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches);
            }
        };
        
        if (colorSchemeQuery.addEventListener) {
            colorSchemeQuery.addEventListener('change', handleColorSchemeChange);
        } else {
            colorSchemeQuery.addListener(handleColorSchemeChange);
        }
    };

    // Navigation active
    const initActiveNavigation = () => {
        const pageSections = document.querySelectorAll('section');
        const navLinkElements = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            pageSections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });

            navLinkElements.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    };

    // Animation des compétences
    const initSkillsAnimation = () => {
        const skillsSection = document.getElementById('competences');
        if (!skillsSection) return;

        const animateSkills = () => {
            const skills = document.querySelectorAll('.skill-progress');
            skills.forEach(skill => {
                const width = skill.getAttribute('data-width');
                skill.style.width = width + '%';
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    };

    // Fonction pour formater la date
    const formatDate = (dateStr) => {
        const [start, end] = dateStr.split(' - ');
        if (!end) return start;
        return `${start} - ${end}`;
    };

    // Fonction pour initialiser la timeline des formations
    const initFormationsTimeline = () => {
        const timelineContainer = document.querySelector('.timeline');
        if (!timelineContainer) return;

        // Trier les formations par année (du plus récent au plus ancien)
        const sortedFormations = [...formationsData.formations].sort((a, b) => {
            return new Date(b.annee.split(' - ')[0]) - new Date(a.annee.split(' - ')[0]);
        });

        // Générer le HTML pour chaque formation
        const timelineHTML = sortedFormations.map((formation, index) => {
            const position = index % 2 === 0 ? 'left' : 'right';
            const icon = getFormationIcon(formation.icone);
            
            return `
                <div class="timeline-container ${position}" data-animation="fade-up">
                    <div class="timeline-content">
                        <h3>${formation.titre}</h3>
                        <span class="date">${formatDate(formation.annee)}</span>
                        <p>${formation.etablissement}</p>
                        <p>${formation.description}</p>
                    </div>
                    <div class="icon">
                        <i class="fas fa-${icon}"></i>
                    </div>
                </div>
            `;
        }).join('');

        // Insérer le HTML dans le conteneur
        timelineContainer.innerHTML = timelineHTML;

        // Initialiser les animations pour la timeline
        initTimelineAnimations();
    };

    // Fonction utilitaire pour obtenir l'icône appropriée
    const getFormationIcon = (iconName) => {
        const icons = {
            'language': 'language',
            'industry': 'industry',
            'graduation-cap': 'graduation-cap',
            'certificate': 'certificate',
            'bolt': 'bolt',
            'wrench': 'wrench',
            'code': 'code',
            'book': 'book'
        };
        return icons[iconName] || 'graduation-cap';
    };

    // Fonction pour initialiser les animations de la timeline
    const initTimelineAnimations = () => {
        const timelineContainers = document.querySelectorAll('.timeline-container');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        timelineContainers.forEach(container => {
            observer.observe(container);
        });
    };

    // Initialisation de toutes les fonctionnalités
    const init = () => {
        initScrollAnimations();
        initMobileMenu();
        initHeaderScroll();
        initBackToTop();
        initContactForm();
        initDarkMode();
        initActiveNavigation();
        initSkillsAnimation();
        initFormationsTimeline();
    };
    

    // Démarrer l'application
    init();
});
