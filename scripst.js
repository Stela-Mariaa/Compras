let budget = 0;
let cart = [];

document.getElementById('set-budget').addEventListener('click', function() {
    // Garantir que o orçamento seja um número válido
    const budgetInput = parseFloat(document.getElementById('budget').value);
    if (!isNaN(budgetInput) && budgetInput >= 0) {
        budget = budgetInput;
        alert(`Orçamento definido: R$ ${budget.toFixed(2)}`);
    } else {
        alert("Por favor, insira um valor válido para o orçamento.");
    }
});

document.getElementById('add-product').addEventListener('click', function() {
    const productName = document.getElementById('product-name').value;
    const productPrice = parseFloat(document.getElementById('product-price').value);

    if (productName && !isNaN(productPrice)) {
        addProductToCart(productName, productPrice);
        updateTotal();
        suggestProducts(productName);
    }
});

function addProductToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    const cartList = document.getElementById('cart-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${productName}: R$ ${productPrice.toFixed(2)}`;
    cartList.appendChild(listItem);
}

function updateTotal() {
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    document.getElementById('total-price').textContent = total.toFixed(2);

    // Verificar se o total ultrapassa o orçamento
    if (!isNaN(total) && total > budget) {
        alert('Você ultrapassou o seu orçamento!');
    }
}

document.getElementById('checkout').addEventListener('click', function() {
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    
    // Garantir que os valores são números e comparar corretamente
    if (total <= budget) {
        // Exibir a mensagem de sucesso
        document.getElementById('cart-section').style.display = 'none';
        document.getElementById('message-section').style.display = 'block';
    } else {
        alert('Você não tem orçamento suficiente!');
    }
});

document.getElementById('new-purchase').addEventListener('click', function() {
    cart = [];
    document.getElementById('cart-list').innerHTML = '';
    document.getElementById('total-price').textContent = '0.00';
    document.getElementById('message-section').style.display = 'none';
    document.getElementById('cart-section').style.display = 'block';
});

function suggestProducts(productName) {
    const recommendedProducts = [
        { name: 'Produto A', price: 30.00 },
        { name: 'Produto B', price: 50.00 },
        { name: 'Produto C', price: 20.00 }
    ];

    const recommendations = document.getElementById('recommended-products');
    recommendations.innerHTML = '';
    recommendedProducts.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - R$ ${product.price.toFixed(2)}`;
        recommendations.appendChild(listItem);
    });
}
