// main.js

// ===== modules/main.js =====
import initModale from "../components/modale.js";
import initCarousel from "../components/carrousel.js";
import initMode from "../components/mode.js";
import { initScrollAnimation } from "../classes/ScrollAnimator.js";

/**
 * Point d'entrée principal de la page.
 * Initialise tous les modules nécessaires dès le chargement.
 */
(function () {
    initModale();
    initCarousel();
    initMode();
    initScrollAnimation();
})();
