/**
 * AUTO PRESTIGE - SCRIPT GLOBAL
 * Auteur : Membre 2
 */

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // Mettre à jour le compteur du panier au chargement
    mettreAJourCompteurPanier();
});

/**
 * FONCTION 1 : Filtrer les voitures par catégorie
 * @param {string} categorie - La catégorie à afficher (berline, suv, sportive, utilitaire, tous)
 */
function filtrer(categorie) {
    const cartes = document.querySelectorAll('.carte-produit');
    const boutons = document.querySelectorAll('.btn-filtre');

    // Mise à jour de la classe active sur les boutons
    boutons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(`'${categorie}'`)) {
            btn.classList.add('actif-filtre');
        } else {
            btn.classList.remove('actif-filtre');
        }
    });

    // Filtrage des cartes
    cartes.forEach(carte => {
        const catCarte = carte.getAttribute('data-categorie');
        if (categorie === 'tous' || catCarte === categorie) {
            carte.style.display = 'block';
        } else {
            carte.style.display = 'none';
        }
    });
}

/**
 * FONCTION 2 : Ajouter un article au panier
 * @param {string} nom - Nom du modèle
 * @param {number} prix - Prix en FCFA
 */
function ajouterAuPanier(nom, prix) {
    // Récupérer le panier depuis localStorage
    let panier = JSON.parse(localStorage.getItem('panier_auto_prestige')) || [];

    // Vérifier si l'article existe déjà
    const index = panier.findIndex(item => item.nom === nom);

    if (index !== -1) {
        // Augmenter la quantité
        panier[index].quantite += 1;
    } else {
        // Ajouter le nouvel article
        panier.push({
            nom: nom,
            prix: prix,
            quantite: 1
        });
    }

    // Sauvegarder dans localStorage
    localStorage.setItem('panier_auto_prestige', JSON.stringify(panier));

    // Mettre à jour le compteur visible
    mettreAJourCompteurPanier();

    // Alerte de succès
    alert(`🚗 ${nom} a été ajoutée à votre panier !`);
}

/**
 * Met à jour le compteur de panier dans la barre de navigation
 */
function mettreAJourCompteurPanier() {
    const compteur = document.getElementById('compteur-panier');
    if (compteur) {
        let panier = JSON.parse(localStorage.getItem('panier_auto_prestige')) || [];
        let totalArticles = panier.reduce((acc, item) => acc + item.quantite, 0);
        compteur.innerText = totalArticles;
    }
}

/**
 * FONCTION 3 : Envoyer un message depuis le formulaire de contact
 */
function envoyerMessage() {
    // Récupérer les champs
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const sujet = document.getElementById('sujet').value.trim();
    const message = document.getElementById('message').value.trim();

    // Vérifications
    if (!nom || !email || !sujet || !message) {
        alert("⚠️ Erreur : Veuillez remplir tous les champs du formulaire.");
        return;
    }

    if (!email.includes('@')) {
        alert("⚠️ Erreur : Veuillez saisir une adresse email valide (doit contenir '@').");
        return;
    }

    // Succès
    alert(`✅ Merci ${nom}, votre message a bien été envoyé ! Nous vous répondrons dans les plus brefs délais.`);

    // Vider les champs
    document.getElementById('nom').value = "";
    document.getElementById('email').value = "";
    document.getElementById('sujet').value = "";
    document.getElementById('message').value = "";
}
