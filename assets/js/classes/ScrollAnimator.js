/**
 * Classe ScrollAnimator
 *
 * Cette classe permet d'appliquer des animations d'apparition ou de disparition
 * aux éléments HTML lors de leur entrée ou sortie de la zone de visibilité du viewport.
 * Elle utilise l'API IntersectionObserver pour observer des éléments ciblés.
 * Utile dans les pages où l'on souhaite animer dynamiquement des sections
 * ou éléments au fur et à mesure que l'utilisateur fait défiler la page.
 */
class ScrollAnimator {
    /**
     * Crée une nouvelle instance de ScrollAnimator.
     * @param {HTMLElement|null} zoneVisibilite - Élément racine à observer (null = fenêtre du navigateur).
     * @param {HTMLElement[]} targets - Liste des éléments cibles à observer pour l'animation au défilement.
     */
    constructor(zoneVisibilite, targets) {
        this.zoneVisibilite = zoneVisibilite;
        this.targets = targets;

        this.options = {
            root: this.zoneVisibilite,
            rootMargin: "0px",
            threshold: 0.5,
        };

        this.observer = new IntersectionObserver(this.onIntersection.bind(this), this.options);

        this.targets.forEach(function (target) {
            this.observer.observe(target);
        }.bind(this));
    }

    /**
     * Fonction appelée par l'IntersectionObserver lorsqu'un ou plusieurs éléments observés
     * entrent ou sortent de la zone de visibilité spécifiée.
     * Applique une animation d'apparition ou de disparition aux éléments selon leur visibilité.
     * 
     * @param {IntersectionObserverEntry[]} entries - Tableau des entrées représentant les éléments observés.
     */
    onIntersection(entries) {
        entries.forEach(function (objetVisible) {
            const element = objetVisible.target;
            const intersecte = objetVisible.isIntersecting;

            // Animation d'apparition/disparition selon visibilité
            if (intersecte === true) {
                element.animate([
                    { opacity: 0, transform: "translateY(20px)" },
                    { opacity: 1, transform: "translateY(0px)" }
                ], {
                    duration: 1000,
                    fill: "forwards"
                });
            } else {
                element.animate([
                    { opacity: 1, transform: "translateY(0px)" },
                    { opacity: 0, transform: "translateY(20px)" }
                ], {
                    duration: 1000,
                    fill: "forwards"
                });
            }
        }.bind(this));
    }
}

export default ScrollAnimator;

// Fonction d'initialisation à utiliser dans main.js
export function initScrollAnimation() {
    const elements = document.querySelectorAll(".scroll-box");
    new ScrollAnimator(null, elements);
}
