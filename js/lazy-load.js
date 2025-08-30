document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour charger les images de manière paresseuse
    function lazyLoadImages() {
        const lazyImages = [].slice.call(document.querySelectorAll('img[loading="lazy"]'));
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src || '';
                        lazyImage.srcset = lazyImage.dataset.srcset || '';
                        lazyImage.classList.remove('lazy');
                        lazyImage.classList.add('loaded');
                        imageObserver.unobserve(lazyImage);
                    }
                });
            });

            lazyImages.forEach(function(lazyImage) {
                imageObserver.observe(lazyImage);
            });
        } else {
            // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
            let active = false;
            
            const lazyLoad = function() {
                if (active === false) {
                    active = true;
                    
                    setTimeout(function() {
                        lazyImages.forEach(function(lazyImage) {
                            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && 
                                 lazyImage.getBoundingClientRect().bottom >= 0) &&
                                getComputedStyle(lazyImage).display !== 'none') {
                                
                                lazyImage.src = lazyImage.dataset.src;
                                lazyImage.classList.remove('lazy');
                                lazyImage.classList.add('loaded');
                                
                                lazyImages = lazyImages.filter(function(image) {
                                    return image !== lazyImage;
                                });
                                
                                if (lazyImages.length === 0) {
                                    document.removeEventListener('scroll', lazyLoad);
                                    window.removeEventListener('resize', lazyLoad);
                                    window.removeEventListener('orientationchange', lazyLoad);
                                }
                            }
                        });
                        
                        active = false;
                    }, 200);
                }
            };
            
            document.addEventListener('scroll', lazyLoad);
            window.addEventListener('resize', lazyLoad);
            window.addEventListener('orientationchange', lazyLoad);
            
            // Chargement initial
            lazyLoad();
        }
    }

    // Charger les images du héros en priorité
    function preloadHeroImages() {
        const heroLight = new Image();
        heroLight.src = 'img/optimized/hero_claire.webp';
        
        const heroDark = new Image();
        heroDark.src = 'img/optimized/hero_sombre.webp';
        
        // Une fois l'image du thème actuel chargée, on l'affiche
        const currentHero = document.querySelector('.hero');
        const heroImage = new Image();
        
        heroImage.onload = function() {
            currentHero.style.backgroundImage = getComputedStyle(currentHero).backgroundImage;
            document.body.classList.add('hero-loaded');
        };
        
        heroImage.src = document.body.classList.contains('dark-mode') ? 
            'img/optimized/hero_sombre.webp' : 'img/optimized/hero_claire.webp';
    }

    // Initialisation
    lazyLoadImages();
    preloadHeroImages();

    // Mise à jour du thème
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Laisser le temps au thème de basculer
            setTimeout(preloadHeroImages, 100);
        });
    }
});
