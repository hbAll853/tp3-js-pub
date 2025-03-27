/**
 * Initialise le carrousel d'images avec navigation manuelle
 * et défilement automatique toutes les 4 secondes.
 * @module carrousel
 */

export default function initCarousel() {
    const images = document.querySelectorAll(".carousel-image");
    const btnPrev = document.getElementById("carousel-prev");
    const btnNext = document.getElementById("carousel-next");
    let index = 0;
    let interval;

     /**
     * Affiche l'image correspondant à l'index donné.
     * @param {number} nouvelIndex - Index de la nouvelle image à afficher.
     */

    function afficherImage(nouvelIndex) {
      images[index].classList.remove("active");
      images[nouvelIndex].classList.add("active");
      index = nouvelIndex;
    }
  
    /**
     * Affiche l'image suivante dans le carrousel.
     */

    function imageSuivante() {
      let nextIndex = (index + 1) % images.length;
      afficherImage(nextIndex);
    }
  
     /**
     * Affiche l'image précédente dans le carrousel.
     */

    function imagePrecedente() {
      let prevIndex = (index - 1 + images.length) % images.length;
      afficherImage(prevIndex);
    }
  
    /**
     * Démarre le défilement automatique du carrousel.
     */

    function demarrerAuto() {
      interval = setInterval(imageSuivante, 4000);
    }
  
    /**
     * Arrête le défilement automatique du carrousel.
     */
    function arreterAuto() {
      clearInterval(interval);
    }
  
    // Événements des boutons de navigation
    btnNext.addEventListener("click", () => {
      imageSuivante();
      arreterAuto();
      demarrerAuto();
    });
  
    btnPrev.addEventListener("click", () => {
      imagePrecedente();
      arreterAuto();
      demarrerAuto();
    });
  
    demarrerAuto();
  }