let currentProductData = {
    name: '',
    price: '',
    storage: ''
};

function filterCategory(category) {
    const products = document.querySelectorAll('.product-item');
    const buttons = document.querySelectorAll('.tab-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + category).classList.add('active');

    products.forEach(product => {
        if (category === 'all') {
            product.style.display = 'flex';
        } else {
            if (product.classList.contains(category)) {
                product.style.display = 'flex';
            } else {
                product.style.display = 'none';
            }
        }
    });
}

function updateStorage(button, productId, storage, price) {
    const container = document.getElementById('storage-' + productId);
    const buttons = container.querySelectorAll('.storage-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const priceSpan = document.getElementById('price-' + productId);
    priceSpan.innerText = 'Rp ' + price;
    priceSpan.setAttribute('data-raw', price.replace(/\./g, ''));

    const buyBtn = document.getElementById('buy-' + productId);
    const productName = container.closest('.product-item').querySelector('h3').innerText;
    
    buyBtn.setAttribute('onclick', `openCheckout('${productName}', '${price.replace(/\./g, '')}', '${storage}')`);
}

function openCheckout(name, price, storage) {
    currentProductData.name = name;
    currentProductData.price = price;
    currentProductData.storage = storage;

    document.getElementById('modal-product-name').innerText = name;
    document.getElementById('modal-product-storage').innerText = storage;
    document.getElementById('modal-product-price').innerText = 'Rp ' + Number(price).toLocaleString('id-ID');

    document.getElementById('buyer-info').value = '';

    const modal = document.getElementById('checkout-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeCheckout() {
    const modal = document.getElementById('checkout-modal');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
}

function submitCheckoutDirect() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    const buyerInfoInput = document.getElementById('buyer-info');

    const paymentMethod = selectedPayment ? selectedPayment.value : 'E-Wallet (Dana / OVO / GoPay)';
    const buyerInfo = buyerInfoInput.value.trim() !== '' ? buyerInfoInput.value : 'Tamu (Patokbeusi)';
    const formattedPrice = Number(currentProductData.price).toLocaleString('id-ID');

    const message = `Halo Dhowz_Cell, saya ingin memesan:\n\n*Produk:* ${currentProductData.name}\n*Penyimpanan:* ${currentProductData.storage}\n*Harga:* Rp ${formattedPrice}\n*Metode Pembayaran:* ${paymentMethod}\n*Nama & Alamat:* ${buyerInfo}\n\nMohon segera diproses ya Kak!`;

    const phoneNumber = '6283176585304';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    closeCheckout();
    window.location.href = whatsappUrl;
}
