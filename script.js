document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour gérer la carte de contact mobile
    function initMobileContactCard() {
        const mobileContactCard = document.querySelector('.mobile-contact-card');
        if (!mobileContactCard) return;

        const mobileContactHeader = mobileContactCard.querySelector('.mobile-contact-header');
        if (!mobileContactHeader) return;
        
        const isMobile = window.innerWidth < 992;
        
        // Supprimer les anciens écouteurs d'événements pour éviter les doublons
        const newHeader = mobileContactHeader.cloneNode(true);
        mobileContactHeader.parentNode.replaceChild(newHeader, mobileContactHeader);
        
        if (isMobile) {
            // Ajouter l'écouteur d'événement pour le clic
            newHeader.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                mobileContactCard.classList.toggle('active');
                
                // Animation du chevron
                const chevron = this.querySelector('.fa-chevron-down');
                if (chevron) {
                    chevron.style.transition = 'transform 0.3s ease';
                }
            });
            
            // Fermer la carte si on clique en dehors
            const closeOnOutsideClick = function(e) {
                if (!mobileContactCard.contains(e.target) && mobileContactCard.classList.contains('active')) {
                    mobileContactCard.classList.remove('active');
                }
            };
            
            // Ajouter l'écouteur pour fermer en cliquant à l'extérieur
            document.addEventListener('click', closeOnOutsideClick);
            
            // Nettoyer l'écouteur lors du redimensionnement
            return function cleanup() {
                document.removeEventListener('click', closeOnOutsideClick);
            };
        } else {
            // Sur desktop, s'assurer que la carte est toujours visible et dépliée
            mobileContactCard.classList.add('active');
            return function() {}; // Fonction de nettoyage vide
        }
    }
    
    // Initialiser la carte de contact au chargement
    let cleanupFunction = initMobileContactCard();
    
    // Réinitialiser la carte lors du redimensionnement de la fenêtre
    let resizeTimer;
    const handleResize = function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Nettoyer les anciens écouteurs
            if (typeof cleanupFunction === 'function') {
                cleanupFunction();
            }
            // Réinitialiser la carte
            cleanupFunction = initMobileContactCard();
        }, 250);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Nettoyage lors du démontage
    window.addEventListener('beforeunload', function() {
        window.removeEventListener('resize', handleResize);
        if (typeof cleanupFunction === 'function') {
            cleanupFunction();
        }
    });

    // Configuration de l'Intersection Observer pour les animations
    const initScrollAnimations = () => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const handleIntersect = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.animation || 'fade-up';
                    element.classList.add('animate', animationType);
                    observer.unobserve(element);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, options);
        const elementsToAnimate = [
            ...document.querySelectorAll('section'),
            ...document.querySelectorAll('[data-animate]')
        ];

        elementsToAnimate.forEach(element => {
            element.style.opacity = '0';
            observer.observe(element);
        });
    };

    // Menu mobile
    const initMobileMenu = () => {
        const hamburger = document.querySelector('.hamburger');
        const navList = document.querySelector('.nav-list');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (hamburger && navList) {
            hamburger.addEventListener('click', function() {
                this.classList.toggle('active');
                navList.classList.toggle('active');
            });

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navList.classList.remove('active');
                });
            });
        }
    };

    // Header scroll effect
    const initHeaderScroll = () => {
        const header = document.querySelector('.header');
        if (header) {
            window.addEventListener('scroll', () => {
                header.classList.toggle('scrolled', window.scrollY > 50);
            });
        }
    };

    // Bouton retour en haut
    const initBackToTop = () => {
        const backToTopButton = document.querySelector('.back-to-top');
        if (backToTopButton) {
            window.addEventListener('scroll', () => {
                backToTopButton.classList.toggle('visible', window.scrollY > 300);
            });

            backToTopButton.addEventListener('click', (e) => {
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
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                
                const rawMessage = `*=== NOUVEAU MESSAGE ===*

[De la part de] ${name}
[Email] ${email}

[Objet] ${subject}

[Message]
${message}

---
Message envoyé depuis mon portfolio professionnel`;

                // Votre numéro WhatsApp (format international sans + ni 00)
                const phoneNumber = '212623403245';

                // Encodage complet du message
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(rawMessage)}`;

                // Ouvrir WhatsApp
                window.open(whatsappUrl, '_blank');
                
                // Reset form
                contactForm.reset();
            });
        }
    }
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }
    
    // Intersection Observer for skill bars animation
    const skillsSection = document.getElementById('competences');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skillsSection);
    }
    
    // Form submission is now handled by the WhatsApp integration above
});