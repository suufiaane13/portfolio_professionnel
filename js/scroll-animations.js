document.addEventListener('DOMContentLoaded', function() {
    // Configuration des options de l'IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Fonction pour gérer les entrées d'intersection
    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Si c'est une image avec chargement paresseux
                if (element.classList.contains('lazy-img')) {
                    loadLazyImage(element);
                } 
                // Si c'est un élément avec animation au défilement
                else if (element.classList.contains('animate-on-scroll')) {
                    element.classList.add('visible');
                    // Optionnel : désobserver après l'animation
                    observer.unobserve(element);
                }
            }
        });
    };

    // Créer l'observateur
    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Fonction pour charger les images de manière paresseuse
    function loadLazyImage(img) {
        if (!img.dataset.src) return;

        // Créer une nouvelle image pour le préchargement
        const tempImg = new Image();
        
        tempImg.onload = function() {
            // Une fois l'image chargée, la définir comme source
            img.src = img.dataset.src;
            
            // Supprimer l'attribut data-src pour éviter un rechargement
            img.removeAttribute('data-src');
            
            // Ajouter une classe pour l'animation de transition
            img.classList.add('loaded');
            
            // Cacher le placeholder
            const placeholder = img.parentElement.querySelector('.img-placeholder');
            if (placeholder) {
                setTimeout(() => {
                    placeholder.style.opacity = '0';
                    setTimeout(() => {
                        placeholder.remove();
                    }, 300);
                }, 100);
            }
            
            // Arrêter d'observer cette image
            observer.unobserve(img);
        };
        
        // Démarrer le chargement de l'image
        tempImg.src = img.dataset.src;
    }

    // Observer toutes les images avec la classe 'lazy-img'
    document.querySelectorAll('.lazy-img').forEach(img => {
        // Créer un placeholder si nécessaire
        if (!img.parentElement.querySelector('.img-placeholder') && img.dataset.src) {
            const placeholder = document.createElement('div');
            placeholder.className = 'img-placeholder';
            img.parentElement.insertBefore(placeholder, img);
        }
        observer.observe(img);
    });

    // Observer les éléments avec animation au défilement
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Détecter le changement de thème pour mettre à jour les placeholders
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Mettre à jour les placeholders visibles
            document.querySelectorAll('.img-placeholder').forEach(placeholder => {
                if (document.body.classList.contains('dark-mode')) {
                    placeholder.style.background = 'linear-gradient(90deg, #2d2d2d 25%, #3d3d3d 50%, #2d2d2d 75%)';
                } else {
                    placeholder.style.background = 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
                }
            });
        });
    }

    // Détecter le scroll pour déclencher manuellement les animations si nécessaire
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Forcer la vérification des éléments visibles
                document.querySelectorAll('.lazy-img, .animate-on-scroll').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        if (el.classList.contains('lazy-img')) {
                            loadLazyImage(el);
                        } else if (el.classList.contains('animate-on-scroll')) {
                            el.classList.add('visible');
                        }
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });
});
