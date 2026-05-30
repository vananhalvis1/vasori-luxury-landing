/**
 * VASORI PREMIUM IMPORTS - JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Header Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Calculate Flash Sale % ---
    // Look for all product cards and calculate discount if applicable
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const regularPriceElem = card.querySelector('.price-original');
        const salePriceElem = card.querySelector('.price-sale');
        
        if (regularPriceElem && salePriceElem) {
            // Extract numbers from strings like "1.200.000đ"
            const extractNum = (str) => parseInt(str.replace(/[^0-9]/g, ''));
            
            const regular = extractNum(regularPriceElem.textContent);
            const sale = extractNum(salePriceElem.textContent);
            
            if (regular > sale && sale > 0) {
                const percent = Math.round((1 - (sale / regular)) * 100);
                
                // Add discount tag dynamically
                const priceWrap = card.querySelector('.pc-price-wrap');
                const discountTag = document.createElement('span');
                discountTag.className = 'discount-tag';
                discountTag.textContent = `-${percent}%`;
                priceWrap.appendChild(discountTag);
            }
        }
    });

    // --- 3. Shopping Cart Logic ---
    let cart = JSON.parse(localStorage.getItem('vasoriCart')) || [];
    
    // DOM Elements
    const cartIconBtn = document.getElementById('cart-toggle-btn');
    const cartPanel = document.getElementById('cart-panel');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartBadge = document.getElementById('cart-badge');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalElem = document.getElementById('cart-total-amount');
    const checkoutBtn = document.getElementById('btn-checkout-zalo');

    // Toggle Cart
    const toggleCart = (show) => {
        if (show) {
            cartPanel.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            cartPanel.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    cartIconBtn.addEventListener('click', () => toggleCart(true));
    closeCartBtn.addEventListener('click', () => toggleCart(false));
    cartOverlay.addEventListener('click', () => toggleCart(false));

    // Format Currency
    const formatMoney = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
    };

    // Render Cart
    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty">
                    <i class="fa-solid fa-basket-shopping"></i>
                    <p>Giỏ hàng của bạn đang trống</p>
                </div>
            `;
            cartBadge.textContent = '0';
            cartTotalElem.textContent = '0đ';
            checkoutBtn.style.opacity = '0.5';
            checkoutBtn.style.pointerEvents = 'none';
            return;
        }

        checkoutBtn.style.opacity = '1';
        checkoutBtn.style.pointerEvents = 'auto';

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            count += item.quantity;

            const itemHtml = `
                <div class="cart-item" data-index="${index}">
                    <img src="${item.image}" alt="${item.name}" class="ci-img">
                    <div class="ci-info">
                        <div class="ci-title">${item.name}</div>
                        <div class="ci-price">${formatMoney(item.price)}</div>
                        <div class="ci-actions">
                            <div class="qty-control">
                                <button class="qty-btn minus">-</button>
                                <span class="qty-val">${item.quantity}</span>
                                <button class="qty-btn plus">+</button>
                            </div>
                            <button class="ci-remove">Xóa</button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', itemHtml);
        });

        cartBadge.textContent = count;
        cartTotalElem.textContent = formatMoney(total);
        
        // Save to local storage
        localStorage.setItem('vasoriCart', JSON.stringify(cart));
        
        // Add event listeners for the newly rendered buttons
        attachCartItemEvents();
    };

    const attachCartItemEvents = () => {
        const cartItemElems = document.querySelectorAll('.cart-item');
        
        cartItemElems.forEach(elem => {
            const index = elem.getAttribute('data-index');
            
            const btnMinus = elem.querySelector('.minus');
            const btnPlus = elem.querySelector('.plus');
            const btnRemove = elem.querySelector('.ci-remove');
            
            btnMinus.addEventListener('click', () => {
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    renderCart();
                }
            });
            
            btnPlus.addEventListener('click', () => {
                cart[index].quantity++;
                renderCart();
            });
            
            btnRemove.addEventListener('click', () => {
                cart.splice(index, 1);
                renderCart();
            });
        });
    };

    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.product-card');
            
            // Extract product info
            const name = card.querySelector('.pc-title').textContent.trim();
            const priceStr = card.querySelector('.price-sale') ? 
                             card.querySelector('.price-sale').textContent : 
                             card.querySelector('.price-regular').textContent;
            
            // Handle pricing like "399.000đ/kg" or "399k"
            let priceNum = 0;
            if (priceStr.toLowerCase().includes('k')) {
                // e.g. "399k" -> 399000
                priceNum = parseInt(priceStr.replace(/[^0-9]/g, '')) * 1000;
            } else {
                priceNum = parseInt(priceStr.replace(/[^0-9]/g, ''));
            }
            
            const image = card.querySelector('img').src;
            
            // Check if item exists in cart
            const existingItemIndex = cart.findIndex(item => item.name === name);
            
            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push({
                    name: name,
                    price: priceNum,
                    image: image,
                    quantity: 1
                });
            }
            
            renderCart();
            
            // Show feedback
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fa-solid fa-check"></i> ĐÃ THÊM';
            this.style.backgroundColor = 'var(--gold)';
            this.style.color = 'var(--white)';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 2000);
            
            // Open cart optionally
            // toggleCart(true); 
        });
    });

    // --- 4. Zalo Checkout Logic ---
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        
        const zaloPhone = '0909000000'; // Placeholder Zalo number
        let message = 'Chào VASORI, tôi muốn đặt hàng:\n\n';
        
        let total = 0;
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - SL: ${item.quantity}\n`;
            total += item.price * item.quantity;
        });
        
        message += `\nTổng tiền: ${formatMoney(total)}`;
        message += `\n\nVui lòng tư vấn thêm cho tôi!`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        const zaloLink = `https://zalo.me/${zaloPhone}?text=${encodedMessage}`;
        
        // Open Zalo in new tab
        window.open(zaloLink, '_blank');
    });

    // Initial render
    renderCart();
});
