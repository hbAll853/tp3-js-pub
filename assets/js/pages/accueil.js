/**
 * Module Accueil
 * Affiche la liste des albums musicaux avec tri, filtre, et affichage des détails.
 * Gère également un carrousel d'images et les interactions utilisateur.
 */
(function () {

    // Liste des produits
    const sneakers = [
        { id: 1, marque: "Nike", nom: "Air Jordan 1", prix: 180, description: "Classique intemporel de la culture sneakers.", image: "assets/img/air-jordan.jpg" },
        { id: 2, marque: "Adidas", nom: "Yeezy Boost 350", prix: 220, description: "Sneaker ultra confortable et stylée.", image: "assets/img/adidas.jpg" },
        { id: 3, marque: "Puma", nom: "RS-X", prix: 130, description: "Design futuriste et confortable.", image: "assets/img/puma.jpg" },
        { id: 4, marque: "New Balance", nom: "550", prix: 110, description: "Modèle rétro tendance.", image: "assets/img/new-balance.jpg" },
        { id: 5, marque: "Nike", nom: "Air Max", prix: 160, description: "Confort et style moderne pour un usage quotidien.", image: "assets/img/air-max.jpg" },
        { id: 6, marque: "Reebok", nom: "Classic Leather", prix: 100, description: "Un modèle rétro intemporel en cuir premium.", image: "assets/img/reebok.jpg" }
    ];

    // Sélections HTML
    const listeProduitsHTML = document.getElementById("product-list");
    const detailProduitHTML = document.getElementById("product-detail");

    /**
     * Initialise la page d'accueil avec tous les comportements interactifs.
     */
    function init() {
        afficherProduits(sneakers);
        ajouterEcouteursTri();
    }

    // Affichage dynamique des produits 
    function afficherProduits(tableauProduits) {
        listeProduitsHTML.innerHTML = ""; 

        for (let i = 0; i < tableauProduits.length; i++) {
            let sneaker = tableauProduits[i];
            let nomFormate = sneaker.nom.trim(); 
            let nomMajuscule = nomFormate.toUpperCase();
            let imageSrc = sneaker.image.replaceAll(" ", "-").toLowerCase();
            let gabarit = `
                <div class="produit" data-id="${sneaker.id}">
                    <img src="${imageSrc}" alt="${nomMajuscule}">
                    <h3>${nomMajuscule}</h3>
                    <p>Marque: ${sneaker.marque}</p>
                    <p>Prix: ${sneaker.prix} $</p>
                </div>
            `;
            listeProduitsHTML.insertAdjacentHTML("beforeend", gabarit);
        }

        ajouterEvenementsProduits();
    }

    // Ajout des événements de clic et hover sur les produits 
    function ajouterEvenementsProduits() {
        let elementsProduits = document.querySelectorAll(".produit");

        for (let i = 0; i < elementsProduits.length; i++) {
            elementsProduits[i].addEventListener("click", afficherDetailProduit);
        }
    }

    // Affichage des détails du produit sélectionné
    function afficherDetailProduit(event) {
        let idProduit = event.currentTarget.getAttribute("data-id");
        let sneakerSelectionnee = sneakers.find(s => s.id == idProduit);

        document.querySelectorAll(".produit").forEach(p => p.classList.remove("selectionne"));
        event.currentTarget.classList.add("selectionne");

        let descriptionFormatee = sneakerSelectionnee.description;
        if (!descriptionFormatee.startsWith("Découvrez")) {
            descriptionFormatee = "Découvrez " + descriptionFormatee;
        }
        if (!descriptionFormatee.endsWith(".")) {
            descriptionFormatee += ".";
        }

        detailProduitHTML.innerHTML = `
            <h2>${sneakerSelectionnee.nom.toUpperCase()}</h2>
            <img src="${sneakerSelectionnee.image}" alt="${sneakerSelectionnee.nom}">
            <p>${descriptionFormatee}</p>
            <p><strong>Prix:</strong> ${sneakerSelectionnee.prix} $</p>
        `;
    }

    // Tri des Produits 
    function trierAlphabetiquement(tableau, ordre) {
        let copie = [...tableau];
        for (let i = 0; i < copie.length; i++) {
            for (let j = i + 1; j < copie.length; j++) {
                if ((ordre === "A-Z" && copie[i].nom.toLowerCase() > copie[j].nom.toLowerCase()) ||
                    (ordre === "Z-A" && copie[i].nom.toLowerCase() < copie[j].nom.toLowerCase())) {
                    let temp = copie[i];
                    copie[i] = copie[j];
                    copie[j] = temp;
                }
            }
        }
        return copie;
    }

    function trierParPrix(tableau, ordre) {
        let copie = [...tableau];
        for (let i = 0; i < copie.length; i++) {
            for (let j = i + 1; j < copie.length; j++) {
                if ((ordre === "croissant" && copie[i].prix > copie[j].prix) ||
                    (ordre === "décroissant" && copie[i].prix < copie[j].prix)) {
                    let temp = copie[i];
                    copie[i] = copie[j];
                    copie[j] = temp;
                }
            }
        }
        return copie;
    }

    // Ajout des écouteurs de tri
    function ajouterEcouteursTri() {
        document.getElementById("sort-alpha").addEventListener("click", function () {
            afficherProduits(trierAlphabetiquement(sneakers, "A-Z"));
        });

        document.getElementById("sort-reverse-alpha").addEventListener("click", function () {
            afficherProduits(trierAlphabetiquement(sneakers, "Z-A"));
        });

        document.getElementById("sort-price-asc").addEventListener("click", function () {
            afficherProduits(trierParPrix(sneakers, "croissant"));
        });

        document.getElementById("sort-price-desc").addEventListener("click", function () {
            afficherProduits(trierParPrix(sneakers, "décroissant"));
        });
    }

    // Exécution
    init();

})();
