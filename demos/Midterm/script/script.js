// script.js
let orders = [];
let currentOrder = { customerName: "", products: [], orderNumber: generateOrderNumber() };

function generateOrderNumber() {
    return Math.floor(Math.random() * (100000000 - 10000000 + 1)) + 10000000;
}

function addProduct(productName, price) {
    currentOrder.products.push({ productName, price });
    updateOrderSummary();
}

function calculateSubtotal() {
    return currentOrder.products.reduce((acc, product) => acc + product.price, 0);
}

function calculateTax(subtotal) {
    const taxRate = 0.1; // 10%
    return subtotal * taxRate;
}

function updateOrderSummary() {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const total = subtotal + tax;
    const summary = document.getElementById('orderSummary');
    summary.innerHTML = `Order Number: ${currentOrder.orderNumber}<br>
        Customer: ${currentOrder.customerName}<br><br>
        Products:<br>${currentOrder.products.map(p => `${p.productName} - $${p.price.toFixed(2)}`).join('<br>')}<br>
        Subtotal: $${subtotal.toFixed(2)}<br>
        Tax (10%): $${tax.toFixed(2)}<br>
        Total: $${total.toFixed(2)}`;
}

document.querySelectorAll('#products button').forEach(btn => {
    btn.addEventListener('click', () => addProduct(btn.getAttribute('data-product'), parseFloat(btn.getAttribute('data-price'))));
});

document.getElementById('completePurchase').addEventListener('click', () => {
    const customerName = document.getElementById('customerName').value;
    if (!customerName) {
        alert('Add a customer name');
        return;
    }
    currentOrder.customerName = customerName;
    orders.push(currentOrder);
    const select = document.getElementById('previousTransactions');
    const option = new Option(`${currentOrder.customerName} - ${currentOrder.orderNumber}`, currentOrder.orderNumber);
    select.add(option);
    currentOrder = { customerName: "", products: [], orderNumber: generateOrderNumber() };
    document.getElementById('customerName').value = '';
    updateOrderSummary();
});

document.getElementById('previousTransactions').addEventListener('change', function() {
    const selectedOrder = orders.find(order => order.orderNumber == this.value);
    if (!selectedOrder) return;
    const subtotal = selectedOrder.products.reduce((acc, product) => acc + product.price, 0);
    const tax = calculateTax(subtotal);
    const total = subtotal + tax;
    const summary = document.getElementById('selectedOrderSummary');
    summary.innerHTML = `Order Number: ${selectedOrder.orderNumber}<br>
        Customer: ${selectedOrder.customerName}<br><br>
        Products:<br>${selectedOrder.products.map(p => `${p.productName} - $${p.price.toFixed(2)}`).join('<br>')}<br>
        Subtotal: $${subtotal.toFixed(2)}<br>
        Tax (10%): $${tax.toFixed(2)}<br>
        Total: $${total.toFixed(2)}`;
});
