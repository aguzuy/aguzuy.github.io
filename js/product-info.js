 document.addEventListener("DOMContentLoaded", () => {
            const productList = document.getElementById('product-list');
            const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

            // Función para guardar el ID del producto y redirigir
            function redirectToProductInfo(id) {
                localStorage.setItem('productId', id);
                window.location.href = 'product-info.html';
            }

            // Fetch de productos desde la API
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    productList.innerHTML = ''; // Borrar mensaje de carga
                    data.products.forEach(product => {
                        const productCard = document.createElement('div');
                        productCard.className = 'product-card bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center';
                        productCard.innerHTML = `
                            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-lg mb-4">
                            <h3 class="text-xl font-semibold text-gray-800 mb-1">${product.name}</h3>
                            <p class="text-sm text-gray-500 mb-2">${product.description}</p>
                            <p class="text-2xl font-bold text-gray-700">$${product.cost}</p>
                            <p class="text-xs text-gray-400 mt-2">Vendidos: ${product.soldCount}</p>
                        `;
                        productCard.onclick = () => redirectToProductInfo(product.id);
                        productList.appendChild(productCard);
                    });
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                    productList.innerHTML = '<p class="text-red-500">Error al cargar los productos. Por favor, inténtelo de nuevo más tarde.</p>';
                });
        });
                document.addEventListener("DOMContentLoaded", () => {
            const productId = localStorage.getItem('productId');
            const productContainer = document.getElementById('product-container');
            const commentList = document.getElementById('comment-list');
            const relatedProductsList = document.getElementById('related-products-list');
            const commentForm = document.getElementById('comment-form');
            const starRatingContainer = document.getElementById('star-rating');
            const commentsApiUrl = "https://japceibal.github.io/emercado-api/products_comments/";
            const relatedProductsApiUrl = "https://japceibal.github.io/emercado-api/products/";
            let selectedRating = 0;

            // ID de usuario simple para demostración
            const userId = 'user' + Math.floor(Math.random() * 1000);

            if (!productId) {
                // Si no se encuentra ningún ID de producto, redirigir nuevamente
                alert("No se encontró el ID del producto. Redirigiendo a la página de productos.");
                window.location.href = 'products.html';
                return;
            }

            

            // evento para clasificación por estrellas
            starRatingContainer.addEventListener('click', (e) => {
                const star = e.target.closest('.fa-star');
                if (star) {
                    setStars(parseInt(star.dataset.rating));
                }
            });

            //Manejar el envío del formulario de comentarios
            commentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const commentText = document.getElementById('comment-text').value;
                if (!selectedRating || commentText.trim() === '') {
                    alert('Por favor, selecciona una puntuación y escribe un comentario.');
                    return;
                }

                const newComment = {
                    score: selectedRating,
                    description: commentText,
                    user: userId,
                    dateTime: new Date().toISOString()
                };

                // Para demostrarlo, simplemente agregaremos el nuevo comentario a la lista
                // En una aplicación real, esto se enviaría a un servidor.
                const commentElement = createCommentElement(newComment);
                commentList.prepend(commentElement);

                // Resetear form
                commentForm.reset();
                setStars(0);
            });

            // Función para crear una calificación de estrellas HTML
            function createStarRatingHTML(score) {
                let html = '';
                for (let i = 1; i <= 5; i++) {
                    html += `<i class="fa-solid fa-star text-yellow-400"></i>`;
                }
                return html;
            }

            // Función para crear un elemento HTML de comentario
            function createCommentElement(comment) {
                const element = document.createElement('div');
                element.className = 'border-b pb-4';
                element.innerHTML = `
                    <div class="flex items-center mb-2">
                        <span class="font-bold mr-2 text-gray-800">${comment.user}</span>
                        <div class="star-rating">
                            ${createStarRatingHTML(comment.score)}
                        </div>
                    </div>
                    <p class="text-gray-600 text-sm mb-1">${comment.description}</p>
                    <p class="text-gray-400 text-xs">${new Date(comment.dateTime).toLocaleString()}</p>
                `;
                return element;
            }

            // Función para representar detalles del producto
            function renderProductDetails(product) {
                productContainer.innerHTML = `
                    <h1 class="text-5xl font-bold text-gray-800 mb-4">${product.name}</h1>
                    <p class="text-xl text-gray-600 mb-6">Categoría: ${product.category}</p>
                    
                    <div class="flex items-center space-x-4 mb-8 text-gray-700">
                        <p class="font-bold text-3xl">$${product.cost}</p>
                        <p class="text-md">(${product.soldCount} vendidos)</p>
                    </div>

                    <p class="text-gray-800 text-lg mb-8 leading-relaxed">${product.description}</p>
                    
                    <h2 class="text-3xl font-bold text-gray-800 mb-6">Imágenes del producto</h2>
                    <div class="image-gallery">
                        ${product.images.map(imgSrc => `<img src="${imgSrc}" alt="${product.name}">`).join('')}
                    </div>
                `;
            }

            // Función para representar los comentarios.
            function renderComments(comments) {
                commentList.innerHTML = '';
                if (comments.length === 0) {
                    commentList.innerHTML = '<p class="text-gray-500 italic">Este producto aún no tiene comentarios.</p>';
                } else {
                    comments.forEach(comment => {
                        commentList.appendChild(createCommentElement(comment));
                    });
                }
            }

            // Función para representar productos relacionados
            function renderRelatedProducts(products) {
                relatedProductsList.innerHTML = '';
                if (products.length === 0) {
                    relatedProductsList.innerHTML = '<p class="text-gray-500 italic">No hay productos relacionados disponibles.</p>';
                } else {
                    products.forEach(product => {
                        const productCard = document.createElement('div');
                        productCard.className = 'bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 cursor-pointer';
                        productCard.innerHTML = `
                            <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover rounded-lg mb-4">
                            <h3 class="text-xl font-semibold text-gray-800 mb-1">${product.name}</h3>
                        `;
                        // Set new product ID and redirect on click
                        productCard.onclick = () => {
                            localStorage.setItem('productId', product.id);
                            window.location.reload();
                        };
                        relatedProductsList.appendChild(productCard);
                    });
                }
            }

            // Obtener datos de productos y comentarios
            Promise.all([
                fetch(`${relatedProductsApiUrl}${productId}.json`).then(res => res.json()),
                fetch(`${commentsApiUrl}${productId}.json`).then(res => res.json())
            ])
            .then(([productData, commentsData]) => {
                if (productData) {
                    renderProductDetails(productData);
                }
                if (commentsData) {
                    renderComments(commentsData);
                }
                // obtener productos relacionados 
                if (productData.relatedProducts && productData.relatedProducts.length > 0) {
                    renderRelatedProducts(productData.relatedProducts);
                } else {
                    relatedProductsList.innerHTML = '<p class="text-gray-500 italic">No hay productos relacionados disponibles.</p>';
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                productContainer.innerHTML = '<p class="text-red-500">Error al cargar la información del producto.</p>';
                commentList.innerHTML = '<p class="text-red-500">Error al cargar los comentarios.</p>';
                relatedProductsList.innerHTML = '<p class="text-red-500">Error al cargar los productos relacionados.</p>';
            });
        });
        document.addEventListener("DOMContentLoaded", () => {
            const productId = localStorage.getItem('productId');
            const productContainer = document.getElementById('product-container');
            const relatedProductsList = document.getElementById('related-products-list');
            const relatedProductsApiUrl = "https://japceibal.github.io/emercado-api/products/";

            if (!productId) {
                // si no se encuentra id del producto volvemos atras
                window.location.href = 'products.html';
                return;
            }

            // Function para los productos con carrusel
            function renderProductDetails(product) {
                productContainer.innerHTML = `
                <div class="contenedor">
                    <div class="contenedorSuperior">
                        <p class="Categoria">Categoría: ${product.category}</p>
                        <h1 class="nombreProducto">${product.name}</h1>
                    </div>

                    <div class="infoProductos">
                        <p class="precio">${product.cost}USD</p>
                        <p class="vendidos">vendidos:${product.soldCount}</p>
                        <button class="btn-agregar">Agregar</button>
                    </div>  
                </div>
                    <div id="image-carousel" class="carousel-container mb-8">
                        ${product.images.map((imgSrc, index) => `
                            <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                                <img src="${imgSrc}" alt="${product.name} - Imagen ${index + 1}">
                            </div>
                        `).join('')}
                        <button id="prev-btn" class="carousel-btn text-3xl p-4 rounded-full left-2"><i class="fas fa-chevron-left"></i></button>
                        <button id="next-btn" class="carousel-btn text-3xl p-4 rounded-full right-2"><i class="fas fa-chevron-right"></i></button>
                    </div>
                <div class="cajaInferior">
                    <p class="descripcionProducto">${product.description}</p>
                </div>
                `;

                // Carousel 
                let currentSlide = 0;
                const slides = productContainer.querySelectorAll('.carousel-slide');
                const prevBtn = productContainer.querySelector('#prev-btn');
                const nextBtn = productContainer.querySelector('#next-btn');
                const totalSlides = slides.length;

                function showSlide(index) {
                    slides.forEach(slide => slide.classList.remove('active'));
                    slides[index].classList.add('active');
                    currentSlide = index;
                }

                prevBtn.addEventListener('click', () => {
                    const newIndex = (currentSlide - 1 + totalSlides) % totalSlides;
                    showSlide(newIndex);
                });

                nextBtn.addEventListener('click', () => {
                    const newIndex = (currentSlide + 1) % totalSlides;
                    showSlide(newIndex);
                });
            }

            // Función para representar productos relacionados
            function renderRelatedProducts(products) {
                relatedProductsList.innerHTML = '';
                if (products.length === 0) {
                    relatedProductsList.innerHTML = '<p class="text-gray-500 italic">No hay productos relacionados disponibles.</p>';
                } else {
                    products.forEach(product => {
                        const productCard = document.createElement('div');
                        productCard.className = 'bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 cursor-pointer';
                        productCard.innerHTML = `
                            <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover rounded-lg mb-4">
                            <h3 class="text-xl font-semibold text-gray-800 mb-1">${product.name}</h3>
                        `;
                        // Establecer un nuevo ID de producto y redirigir al hacer clic
                        productCard.onclick = () => {
                            localStorage.setItem('productId', product.id);
                            window.location.reload();
                        };
                        relatedProductsList.appendChild(productCard);
                    });
                }
            }

            // Obtener datos de productos y productos relacionados
            fetch(`${relatedProductsApiUrl}${productId}.json`)
            .then(res => res.json())
            .then(productData => {
                if (productData) {
                    renderProductDetails(productData);
                }
                // Ahora obtenga productos relacionados desde el array
                if (productData.relatedProducts && productData.relatedProducts.length > 0) {
                    renderRelatedProducts(productData.relatedProducts);
                } else {
                    relatedProductsList.innerHTML = '<p class="text-gray-500 italic">No hay productos relacionados disponibles.</p>';
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                productContainer.innerHTML = '<p class="text-red-500">Error al cargar la información del producto.</p>';
                relatedProductsList.innerHTML = '<p class="text-red-500">Error al cargar los productos relacionados.</p>';
            });
        });