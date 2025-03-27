/**
 * Initialise une boîte modale personnalisée qui s'affiche après 5 secondes.
 * La modale peut être fermée par clic sur le bouton ou en cliquant à l'extérieur.
 * L'affichage est bloqué si l'utilisateur l'a déjà fermée (via localStorage).
 */

// Variables globales
let elementHTML;
let conteneurHTML;

// Fonctions

/**
 * Fonction principale d'initialisation de la modale.
 */
function initModale() {
    conteneurHTML = document.body;

    // Injecter la modale après 5 secondes
    setTimeout(() => {
        injecterHTML("Obtenez 20% de rabais sur votre première commande 🎉", "info");
        afficherModale();
    }, 5000);
}

/**
 * Injecte dynamiquement la modale dans le HTML.
 * @param {string} message 
 * @param {string} type 
 */
function injecterHTML(message, type) {
    const gabarit = `
    <div class="modale invisible" data-type="${type}">
        <div class="modale-contenu">
            <p>${message}</p>
            <button class="fermer-modale">Fermer</button>
        </div>
    </div>`;

    conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
    elementHTML = conteneurHTML.lastElementChild;

    // Écouteurs
    const boutonFermer = elementHTML.querySelector(".fermer-modale");
    boutonFermer.addEventListener("click", cacherModale);
    elementHTML.addEventListener("click", (e) => {
        if (e.target === elementHTML) {
            cacherModale();
        }
    });
}

/**
 * Affiche la modale en supprimant la classe d'invisibilité.
 */
function afficherModale() {
    elementHTML.classList.remove("invisible");
}

/**
 * Cache la modale et enregistre l'action dans le localStorage.
 */
function cacherModale() {
    elementHTML.classList.add("invisible");
}

export default initModale;
