document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartBtn = document.querySelector('.cart-btn');
    const cartModal = createCartModal();
    let cartItems = [];

    // Create cart modal dynamically
    function createCartModal() {
        const modal = document.createElement('div');
        modal.classList.add('cart-modal');
        modal.innerHTML = `
            <div class="cart-modal-content">
                <span class="cart-close-btn">&times;</span>
                <h2>Votre Panier</h2>
                <div class="cart-items-container"></div>
                <div class="cart-total">
                    <p>Total: <span class="total-price">0 FCFA</span></p>
                    <button class="btn btn-checkout">Procéder au paiement</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    // Show toast message
    function showToast(message) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 2000);
        }, 10);
    }

    // Add item to cart
    function addToCart(product) {
        cartItems.push(product);
        updateCartDisplay();
        showToast('Article ajouté dans le panier !');
    }

    // Update cart display
    function updateCartDisplay() {
        const cartItemsContainer = cartModal.querySelector('.cart-items-container');
        const cartTotalSpan = cartModal.querySelector('.total-price');
        
        // Clear previous items
        cartItemsContainer.innerHTML = '';
        
        // Calculate total
        let total = 0;
        
        // Populate cart items
        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <h3>${item.title}</h3>
                    <p>${item.price}</p>
                    <button class="btn btn-remove" data-index="${index}">Supprimer</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            
            // Parse price and add to total
            total += parseFloat(item.price.replace(' FCFA', ''));
        });

        // Update cart count and total
        cartCount.textContent = cartItems.length;
        cartTotalSpan.textContent = `${total.toFixed(2)} FCFA`;

        // Add remove item functionality
        const removeButtons = cartItemsContainer.querySelectorAll('.btn-remove');
        removeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cartItems.splice(index, 1);
                updateCartDisplay();
            });
        });
    }

    // Add to cart event listeners
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get product details from the card
            const productCard = button.closest('.product-card');
            const product = {
                title: productCard.querySelector('h3').textContent,
                price: productCard.querySelector('.price').textContent,
                image: productCard.querySelector('img').src
            };
            
            addToCart(product);
        });
    });

    // Cart modal toggle
    cartBtn.addEventListener('click', () => {
        cartModal.classList.toggle('show-modal');
    });

    // Close modal when clicking outside or on close button
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal || e.target.classList.contains('cart-close-btn')) {
            cartModal.classList.remove('show-modal');
        }
    });

    // Checkout button (placeholder)
    const checkoutBtn = cartModal.querySelector('.btn-checkout');
    checkoutBtn.addEventListener('click', () => {
        // Rediriger vers la page de paiement
        window.location.href = 'paiement.html';
    });
});