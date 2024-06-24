document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.getElementById('cart-icon');
    const cartSection = document.querySelector('.cart-section');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const checkoutButton = document.getElementById('checkout-button');
    const orderForm = document.getElementById('order-form');
    const checkoutForm = document.getElementById('checkout-form');
    const hamburgerIcon = document.getElementById("hamburger-icon");
    const navLinks = document.getElementById("nav-links");

    let cart = [];

    // Toggle cart visibility
    cartIcon.addEventListener('click', function (e) {
        e.preventDefault();
        cartSection.style.display = cartSection.style.display === 'block' ? 'none' : 'block';
    });

    // Function to update cart display
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <p>${item.name}</p>
                <p>$${item.price.toFixed(2)}</p>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price;
        });
        cartTotal.textContent = `$${total.toFixed(2)}`;
        cartCount.textContent = cart.length;
    }

    // Add to cart button click handler
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productElement = this.parentElement;
            const id = parseInt(productElement.getAttribute('data-id'));
            const name = productElement.getAttribute('data-name');
            const price = parseFloat(productElement.getAttribute('data-price'));
            addToCart({ id, name, price });
        });
    });

    // Remove from cart button click handler
    cartItemsContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-from-cart')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(itemId);
        }
    });

    // Show order form on checkout
    checkoutButton.addEventListener('click', function () {
        orderForm.style.display = 'block';
    });

    // Handle form submission
    checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = this.querySelector('#name').value;
        const email = this.querySelector('#email').value;
        const address = this.querySelector('#address').value;
        if (name && email && address) {
            alert('Order placed successfully!');
            cart = [];
            updateCartDisplay();
            orderForm.style.display = 'none';
            this.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Function to add item to cart
    function addToCart(item) {
        cart.push(item);
        updateCartDisplay();
    }

    // Function to remove item from cart
    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        updateCartDisplay();
    }
    hamburgerIcon.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });

    // Initial cart display
    updateCartDisplay();
});
