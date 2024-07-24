
const products = [
    { id: 1, name: 'Smart Watch', price: 2000.00, img: 'watch.jpg' },
    { id: 2, name: 'OPPO F23 Phone', price: 20000.00, img: 'phone.jpg' },
    { id: 3, name: 'Lenovo Laptop', price: 25000.00, img: 'laptop.jpg' },
    { id: 4, name: 'Speaker', price: 1000.00, img: 'speaker.jpg' },
];


let cart = [];


function displayProducts() {
  
    const productList = document.getElementById('product-list');
    
  
    productList.innerHTML = products.map(product => `
        <div class="product">
            <img src="${product.img}" alt="${product.name}">
            <span>${product.name} - Rs.${product.price.toFixed(2)}</span>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join(''); 
}


function displayCart() {
   
    const cartList = document.getElementById('cart-list');
    const totalAmount = document.getElementById('total-amount');

    
    cartList.innerHTML = cart.map(item => `
        <div class="cart-item" id="cart-item-${item.id}">
            <img src="${item.img}" alt="${item.name}">
            <span>${item.name} - Rs.${item.price.toFixed(2)} x ${item.quantity}</span>
            <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join(''); 

  
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = total.toFixed(2); 

    
    cart.forEach(item => {
        const element = document.getElementById(`cart-item-${item.id}`);
        if (element && !element.classList.contains('fade-in')) {
            setTimeout(() => {
                element.classList.add('fade-in');
            }, 0);
        }
    });
}


function addToCart(productId) {
  
    const product = products.find(p => p.id === productId);
    
    
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        
        cartItem.quantity += 1;
    } else {
     
        cart.push({ ...product, quantity: 1 });
    }
    
  
    displayCart();
}


function removeFromCart(productId) {
 
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        } else {
            
            cart = cart.filter(item => item.id !== productId);
        }
    }
    
    
    displayCart();
}


document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    displayCart();
});