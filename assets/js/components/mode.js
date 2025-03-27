/**
 * Module de gestion du mode sombre / clair
 * Permet à l'utilisateur de changer le thème de la page.
 * Le choix est sauvegardé dans le localStorage pour être conservé lors des rechargements.
 */

// ========== Variables HTML ==========
const parentHTML = document.querySelector("[data-mode]");
const boutonsHTML = document.querySelectorAll("[data-mode-option]");

/**
 * Initialise le thème au chargement de la page.
 * Applique le thème sauvegardé et ajoute un seul écouteur d’événement.
 */
export default function initMode() {
    const modeEnregistre = localStorage.getItem("theme") || "nuit";
    changerMode(modeEnregistre);

    parentHTML.addEventListener("click", auClicBouton);
}

/**
 * Gère le clic sur les boutons de thème (jour/nuit)
 * @param {Event} evenement 
 */
function auClicBouton(evenement) {
    const bouton = evenement.target.closest("[data-mode-option]");

    if (bouton) {
        const nouveauMode = bouton.dataset.modeOption;
        enregistrerMode(nouveauMode);
    }
}

/**
 * Change le mode visuel du site en modifiant le data-theme du body
 * @param {String} mode 
 */
function changerMode(mode) {
    document.body.dataset.theme = mode;
    changerApparenceBoutons(mode);
}

/**
 * Met à jour l’affichage des boutons selon le mode actif
 * @param {String} nouveauMode 
 */
function changerApparenceBoutons(nouveauMode) {
    boutonsHTML.forEach((bouton) => {
        const mode = bouton.dataset.modeOption;
        bouton.classList.toggle("invisible", mode === nouveauMode);
    });
}

/**
 * Sauvegarde le mode dans localStorage et applique le changement
 * @param {String} nouveauMode 
 */
function enregistrerMode(nouveauMode) {
    localStorage.setItem("theme", nouveauMode);
    changerMode(nouveauMode);
}
