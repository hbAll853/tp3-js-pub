(function () {
    // ===== Variables globales =====
    let indexSectionActuelle = 0;

    // ===== Sélection HTML =====
    const formulaireHTML = document.getElementById("form-achat");
    const sectionsHTML = document.querySelectorAll(".form-step");
    const confirmationHTML = document.getElementById("confirmation");
    const resumeHTML = document.getElementById("resume");

    const champsHTML = formulaireHTML.querySelectorAll("[name]");
    const boutonSubmit = formulaireHTML.querySelector("button[type='submit']");
    const boutonsNavigation = formulaireHTML.querySelectorAll(".form-navigation button");

    // Champs individuels
    const champNom = document.getElementById("nomComplet");
    const champCourriel = document.getElementById("courriel");
    const champTel = document.getElementById("telephone");
    const champAdresse = document.getElementById("adresse");
    const champVille = document.getElementById("ville");
    const champPostal = document.getElementById("codePostal");
    const champDate = document.getElementById("dateLivraison");
    const champLivraisonMagasin = document.getElementById("livraisonMagasin");
    const champSuccursale = document.getElementById("succursale");
    const champCommentaires = document.getElementById("commentaires");
    const radiosLivraison = document.querySelectorAll("input[name='serviceLivraison']");

    // ===== Initialisation =====
    function init() {
        formulaireHTML.addEventListener("submit", onSubmitFormulaire);

        champsHTML.forEach(function (champHTML) {
            champHTML.addEventListener("input", onChangementChamp);
        });

        champLivraisonMagasin.addEventListener("change", activerSuccursale);

        boutonsNavigation.forEach(function (btn) {
            btn.addEventListener("click", onClicNavigation);
        });

        afficherSection(indexSectionActuelle);
        afficherProgression();
        afficherNavigation();
    }

    // ===== Événements =====
    function onSubmitFormulaire(e) {
        e.preventDefault();
        if (validerFormulaire()) {
            formulaireHTML.style.display = "none";
            confirmationHTML.classList.remove("hidden");
        }
    }

    function onChangementChamp(e) {
        const champ = e.currentTarget;
        validerChamp(champ);
        afficherNavigation();
    }

    function onClicNavigation(e) {
        const btn = e.currentTarget;
        const direction = Number(btn.dataset.direction);
        const nouvelleSection = indexSectionActuelle + direction;

        if (nouvelleSection >= 0 && nouvelleSection < sectionsHTML.length) {
            indexSectionActuelle = nouvelleSection;
            afficherSection(indexSectionActuelle);
            afficherNavigation();
            afficherProgression();
        }
    }

    // ===== Navigation =====
    function afficherSection(index) {
        sectionsHTML.forEach(section => section.classList.add("hidden"));
        sectionsHTML[index].classList.remove("hidden");
    }

    function afficherNavigation() {
        const sectionValide = validerSection(indexSectionActuelle);

        boutonsNavigation.forEach(btn => {
            const dir = Number(btn.dataset.direction);

            if (indexSectionActuelle === 0 && dir === -1) {
                btn.disabled = true;
            } else if (indexSectionActuelle === sectionsHTML.length - 1 && dir === 1) {
                btn.classList.add("hidden");
                boutonSubmit.classList.remove("hidden");
            } else {
                btn.disabled = !sectionValide;
                btn.classList.remove("hidden");
                boutonSubmit.classList.add("hidden");
            }
        });
    }

    function afficherProgression() {
        const progression = ((indexSectionActuelle + 1) / sectionsHTML.length) * 100;
        const barre = document.querySelector(".progress-bar");
        barre.style.width = progression + "%";
    }

    // ===== Validation =====
    function validerChamp(champHTML) {
        champHTML.setCustomValidity("");

        if (champHTML.id === "codePostal" && champHTML.value.length < 6) {
            champHTML.setCustomValidity("Le code postal doit contenir au moins 6 caractères.");
        }

        const spanErreur = champHTML.parentElement.querySelector(".erreur-champ");
        if (spanErreur) {
            spanErreur.textContent = champHTML.validationMessage;
        }

        champHTML.classList.toggle("invalide", !champHTML.checkValidity());
        champHTML.classList.toggle("valide", champHTML.checkValidity());
    }

    function validerSection(index) {
        const section = sectionsHTML[index];
        const champs = section.querySelectorAll("[name]");

        let valide = true;
        champs.forEach(champ => {
            validerChamp(champ);
            if (!champ.checkValidity()) valide = false;
        });

        if (champLivraisonMagasin.checked && champSuccursale.required) {
            if (!champSuccursale.checkValidity()) valide = false;
        }

        let serviceChoisi = false;
        radiosLivraison.forEach(r => {
            if (r.checked) serviceChoisi = true;
        });

        if (index === 1 && !serviceChoisi) valide = false;

        return valide;
    }

    function validerFormulaire() {
        return Array.from(sectionsHTML).every((_, index) => validerSection(index));
    }

    function activerSuccursale() {
        champSuccursale.disabled = !champLivraisonMagasin.checked;
        champSuccursale.required = champLivraisonMagasin.checked;
        if (!champLivraisonMagasin.checked) champSuccursale.value = "";
        validerChamp(champSuccursale);
    }

    // ===== Résumé =====
    function genererResume() {
        let service = "";
        radiosLivraison.forEach(r => {
            if (r.checked) service = r.value;
        });

        const livraison = champLivraisonMagasin.checked ? champSuccursale.value : "Livraison à domicile";

        resumeHTML.innerHTML = `
            <h3>Informations personnelles</h3>
            <p><strong>Nom complet:</strong> ${champNom.value}</p>
            <p><strong>Courriel:</strong> ${champCourriel.value}</p>
            <p><strong>Téléphone:</strong> ${champTel.value}</p>
            <p><strong>Adresse:</strong> ${champAdresse.value}, ${champVille.value}, ${champPostal.value}</p>

            <h3>Commande</h3>
            <p><strong>Date de livraison:</strong> ${champDate.value}</p>
            <p><strong>Livraison:</strong> ${livraison}</p>
            <p><strong>Service de livraison:</strong> ${service}</p>

            <h3>Autres infos</h3>
            <p><strong>Commentaires:</strong> ${champCommentaires.value || "Aucun"}</p>
        `;
    }

    // ===== Exécution =====
    init();
})();
