document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    const panierRecap = document.getElementById('panier-recap');
    const soustotalElem = document.getElementById('sous-total');
    const fraisLivraisonElem = document.getElementById('frais-livraison');
    const totalCommandeElem = document.getElementById('total-commande');
    
    // Récupérer les articles du panier (à adapter selon votre implémentation)
    function recupererArticlesPanier() {
        // Simulation des articles du panier (à remplacer par votre logique réelle)
        return [
            {
                titre: 'Le secret de la prospérité',
                prix: 36000,
                quantite: 2
            },
            {
                titre: 'Le développement Personnel',
                prix: 31000,
                quantite: 1
            }
        ];
    }

    // Afficher les articles du panier
    function afficherArticlesPanier() {
        const articles = recupererArticlesPanier();
        panierRecap.innerHTML = '';
        
        articles.forEach(article => {
            const articleElem = document.createElement('div');
            articleElem.classList.add('article-panier');
            articleElem.innerHTML = `
                <span>${article.titre}</span>
                <span>${article.quantite} x ${article.prix} FCFA</span>
                <span>${(article.prix * article.quantite).toFixed(2)} FCFA</span>
            `;
            panierRecap.appendChild(articleElem);
        });

        // Calculer les totaux
        const soustotal = articles.reduce((total, article) => 
            total + (article.prix * article.quantite), 0);
        soustotalElem.textContent = `${soustotal.toFixed(2)} FCFA`;

        // Gestion des frais de livraison
        const livraisonOptions = document.querySelectorAll('input[name="livraison"]');
        livraisonOptions.forEach(option => {
            option.addEventListener('change', (e) => {
                const fraisLivraison = e.target.value === 'express' ? 2000 : 0;
                fraisLivraisonElem.textContent = `${fraisLivraison} FCFA`;
                
                const totalCommande = soustotal + fraisLivraison;
                totalCommandeElem.textContent = `${totalCommande.toFixed(2)} FCFA`;
            });
        });

        // Calcul initial du total
        totalCommandeElem.textContent = `${soustotal.toFixed(2)} FCFA`;
    }

    // Validation du formulaire
    function validerFormulaire(e) {
        e.preventDefault();
        
        // Vérification des champs obligatoires
        const champsObligatoires = document.querySelectorAll('[required]');
        let formulaireValide = true;

        champsObligatoires.forEach(champ => {
            if (!champ.value.trim()) {
                champ.classList.add('erreur');
                formulaireValide = false;
            } else {
                champ.classList.remove('erreur');
            }
        });

        // Vérification méthode de paiement
        const methodePaiement = document.querySelector('input[name="paiement"]:checked');
        if (!methodePaiement) {
            alert('Veuillez sélectionner une méthode de paiement');
            formulaireValide = false;
        }

        // Vérification méthode de livraison
        const methodeLivraison = document.querySelector('input[name="livraison"]:checked');
        if (!methodeLivraison) {
            alert('Veuillez sélectionner un mode de livraison');
            formulaireValide = false;
        }

        if (formulaireValide) {
            // Simulation de paiement/confirmation
            alert('Commande confirmée ! Merci pour votre achat.');
            
            // Réinitialiser le panier (à implémenter selon votre logique)
            window.location.href = 'confirmation.html';
        }
    }

    // Initialisation
    afficherArticlesPanier();
    checkoutForm.addEventListener('submit', validerFormulaire);
});