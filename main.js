document.addEventListener('DOMContentLoaded', () => {
    // Sample product data with simulated reviews
    const products = [
        {
            id: 1,
            name: 'Plan de Nutrición Personalizado',
            description: '4 semanas de menús personalizados con seguimiento semanal.',
            details: 'Este plan incluye menús semanales adaptados a tus objetivos (pérdida de peso, ganancia muscular, etc.), listas de compras, recetas detalladas y check-ins semanales con un nutricionista certificado para ajustar tu plan según tu progreso.',
            price: 50,
            image: 'images/nutrition-plan.jpg',
            reviews: [
                { name: 'María G.', rating: 5, comment: '¡Qué buen producto! Me ayudó a organizar mis comidas y bajar de peso.' },
                { name: 'Juan P.', rating: 4, comment: 'Excelente plan, muy fácil de seguir y con resultados visibles.' }
            ]
        },
        {
            id: 2,
            name: 'Programa de Entrenamiento Dinámico',
            description: '6 semanas de rutinas con videos y soporte de entrenador.',
            details: 'Un programa de 6 semanas con rutinas de ejercicio personalizadas, videos instructivos para cada ejercicio, y soporte continuo de un entrenador certificado. Ideal para todos los niveles, desde principiantes hasta avanzados.',
            price: 75,
            image: 'images/training-program.jpg',
            reviews: [
                { name: 'Laura S.', rating: 5, comment: '¡Me ha cambiado la vida! Los videos son súper claros y motivadores.' },
                { name: 'Carlos R.', rating: 4, comment: 'Muy buen programa, aunque me gustaría más variedad en las rutinas.' }
            ]
        },
        {
            id: 3,
            name: 'Consulta Fitness Online',
            description: '1 hora de asesoramiento virtual con un entrenador certificado.',
            details: 'Una sesión virtual de 1 hora con un entrenador certificado para discutir tus objetivos, evaluar tu progreso y recibir recomendaciones personalizadas. Incluye un plan de acción inicial basado en tus necesidades.',
            price: 30,
            image: 'images/consultation.jpg',
            reviews: [
                { name: 'Ana L.', rating: 5, comment: '¡Increíble! El entrenador fue muy profesional y me dio grandes consejos.' },
                { name: 'Pedro M.', rating: 5, comment: 'Una consulta muy completa, valió cada centavo.' }
            ]
        }
    ];

    // Update cart count
    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
    };

    // Initial cart count update
    updateCartCount();

    // Popup control with sessionStorage
    const popup = document.getElementById('promo-popup');
    const closePopup = document.getElementById('close-popup');
    if (popup) {
        const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
        if (!hasSeenPopup) {
            setTimeout(() => {
                popup.style.display = 'flex';
                sessionStorage.setItem('hasSeenPopup', 'true');
            }, 1000);
        }

        closePopup.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
    }

    // IMC Calculator
    const imcForm = document.getElementById('imc-form');
    if (imcForm) {
        imcForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value) / 100;
            const resultDiv = document.getElementById('imc-result');

            if (weight > 0 && height > 0) {
                const bmi = (weight / (height * height)).toFixed(1);
                let category = '';

                if (bmi < 18.5) {
                    category = 'Bajo peso';
                } else if (bmi >= 18.5 && bmi <= 24.9) {
                    category = 'Peso normal';
                } else if (bmi >= 25 && bmi <= 29.9) {
                    category = 'Sobrepeso';
                } else {
                    category = 'Obesidad';
                }

                resultDiv.innerHTML = `
                    <h3>Tu IMC: ${bmi}</h3>
                    <p>Categoría: ${category}</p>
                    <p>Consulta con nuestros expertos para un plan personalizado.</p>
                `;
            } else {
                resultDiv.innerHTML = '<p>Por favor, ingresa valores válidos para peso y altura.</p>';
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');
            contactForm.reset();
        });
    }

    // Register Form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const authMessage = document.getElementById('auth-message');

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.find(user => user.email === email)) {
                authMessage.innerHTML = '<p>El correo ya está registrado. Por favor, inicia sesión.</p>';
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            authMessage.innerHTML = '<p>¡Registro exitoso! Ahora puedes iniciar sesión.</p>';
            registerForm.reset();
        });
    }

    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const authMessage = document.getElementById('auth-message');

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                authMessage.innerHTML = `<p>¡Bienvenido, ${user.name}! Has iniciado sesión correctamente.</p>`;
                loginForm.reset();
            } else {
                authMessage.innerHTML = '<p>Correo o contraseña incorrectos. Intenta de nuevo.</p>';
            }
        });
    }

    // Product Detail Page
    const productDetail = document.getElementById('product-title');
    if (productDetail) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = products.find(p => p.id == productId);

        if (product) {
            document.querySelectorAll('#product-title').forEach(el => el.textContent = product.name);
            document.getElementById('product-image').src = product.image;
            document.getElementById('product-image').alt = product.name;
            document.getElementById('product-description').textContent = product.details;
            document.getElementById('product-price').textContent = `$${product.price}`;
            document.getElementById('add-to-cart').dataset.productId = product.id;
            document.getElementById('product-hero').style.backgroundImage = `url(${product.image})`;

            // Render simulated reviews
            const reviewsContainer = document.getElementById('product-reviews');
            reviewsContainer.innerHTML = product.reviews.map(review => `
                <div class="review">
                    <p><strong>${review.name}</strong> ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                    <p>${review.comment}</p>
                </div>
            `).join('');

            // Render user-submitted reviews
            const userReviews = JSON.parse(localStorage.getItem(`reviews_${productId}`) || '[]');
            reviewsContainer.innerHTML += userReviews.map(review => `
                <div class="review">
                    <p><strong>${review.name}</strong> ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                    <p>${review.comment}</p>
                </div>
            `).join('');
        } else {
            document.getElementById('product-description').textContent = 'Producto no encontrado.';
        }

        const addToCartButton = document.getElementById('add-to-cart');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                const existingItem = cart.find(item => item.id == productId);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ ...product, quantity: 1 });
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                alert(`${product.name} añadido al carrito.`);
                window.location.href = 'carrito.html'; // Redirect to cart
            });
        }

        // Review Form Submission
        const reviewForm = document.getElementById('review-form');
        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('review-name').value.trim();
                const rating = document.getElementById('review-rating').value;
                const comment = document.getElementById('review-comment').value.trim();

                if (name && comment) {
                    const userReviews = JSON.parse(localStorage.getItem(`reviews_${productId}`) || '[]');
                    userReviews.push({ name, rating: parseInt(rating), comment });
                    localStorage.setItem(`reviews_${productId}`, JSON.stringify(userReviews));
                    alert('¡Reseña enviada! Gracias por tu opinión.');
                    reviewForm.reset();

                    // Re-render reviews
                    const reviewsContainer = document.getElementById('product-reviews');
                    reviewsContainer.innerHTML = product.reviews.map(review => `
                        <div class="review">
                            <p><strong>${review.name}</strong> ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                            <p>${review.comment}</p>
                        </div>
                    `).join('');
                    reviewsContainer.innerHTML += userReviews.map(review => `
                        <div class="review">
                            <p><strong>${review.name}</strong> ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                            <p>${review.comment}</p>
                        </div>
                    `).join('');
                } else {
                    alert('Por favor, completa todos los campos requeridos.');
                }
            });
        }

        // Filter out the current product from related products
        const relatedProductsContainer = document.querySelector('#related-products .products-container');
        if (relatedProductsContainer) {
            const relatedProducts = products.filter(p => p.id != productId);
            relatedProductsContainer.innerHTML = relatedProducts.map(item => `
                <a href="producto.html?id=${item.id}" class="product-card">
                    <img src="${item.image}" alt="${item.name}" class="product-image">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p class="price">$${item.price}</p>
                    <button class="cta-button">Ver Detalles</button>
                </a>
            `).join('');
        }
    }

    // Cart Page
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
        const renderCart = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const cartTotal = document.getElementById('cart-total');

            if (cart.length === 0) {
                cartContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
                cartTotal.textContent = '0';
            } else {
                cartContainer.innerHTML = cart.map(item => `
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <p>Precio: $${item.price}</p>
                            <p>Cantidad: 
                                <button class="quantity-decrease" data-id="${item.id}">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-increase" data-id="${item.id}">+</button>
                            </p>
                            <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                            <button class="remove-item" data-id="${item.id}">Eliminar</button>
                        </div>
                    </div>
                `).join('');

                const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                cartTotal.textContent = total.toFixed(2);
            }
            updateCartCount();
        };

        renderCart();

        cartContainer.addEventListener('click', (e) => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const id = e.target.dataset.id;

            if (e.target.classList.contains('quantity-increase')) {
                const item = cart.find(item => item.id == id);
                if (item) {
                    item.quantity += 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                }
            }

            if (e.target.classList.contains('quantity-decrease')) {
                const item = cart.find(item => item.id == id);
                if (item && item.quantity > 1) {
                    item.quantity -= 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                }
            }

            if (e.target.classList.contains('remove-item')) {
                const updatedCart = cart.filter(item => String(item.id) !== id);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                renderCart();
            }
        });
    }

    // Payment Page
    const cartSummary = document.getElementById('cartSummary');
    if (cartSummary) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const totalAmount = document.getElementById('totalAmount');
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

        if (cart.length === 0) {
            cartSummary.innerHTML = '<p>El carrito está vacío.</p>';
            totalAmount.textContent = 'Total a pagar: $0.00';
            document.getElementById('paypal-button-container').style.display = 'none';
        } else {
            cartSummary.innerHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Precio: $${item.price}</p>
                        <p>Cantidad: ${item.quantity}</p>
                        <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                </div>
            `).join('');
            totalAmount.textContent = `Total a pagar: $${total}`;
        }

        // Initialize PayPal Buttons
        if (cart.length > 0) {
            paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: total,
                                currency_code: 'USD'
                            }
                        }]
                    });
                },
                onApprove: (data, actions) => {
                    return actions.order.capture().then((details) => {
                        document.getElementById('payment-success').style.display = 'block';
                        document.getElementById('paypal-button-container').style.display = 'none';
                        cartSummary.style.display = 'none';
                        totalAmount.style.display = 'none';
                        localStorage.removeItem('cart');
                        updateCartCount();
                    });
                },
                onError: (err) => {
                    alert('Ocurrió un error con el pago. Por favor, intenta de nuevo.');
                    console.error('PayPal Error:', err);
                }
            }).render('#paypal-button-container');
        }
    }
});