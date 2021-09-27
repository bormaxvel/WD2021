'use strict';


let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartDOM = document.querySelector('.cart');
const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');




if (cart.length > 0) {
	cart.forEach(product => {
		insertItemToDOM(product);
		countCartTotal();

		addToCartButtonsDOM.forEach(addToCartButtonDOM => {
			const productDOM = addToCartButtonDOM.parentNode;

			if (productDOM.querySelector('.product__name').innerText === product.name) {
				handleActionButtons(addToCartButtonDOM, product);
			}
		});
	});
}

addToCartButtonsDOM.forEach(addToCartButtonDOM => {
	addToCartButtonDOM.addEventListener('click', () => {
		const productDOM = addToCartButtonDOM.parentNode;
		const product = {
			image: productDOM.querySelector('.product__image').getAttribute('src'),
			name: productDOM.querySelector('.product__name').innerText,
			price: productDOM.querySelector('.product__price').innerText,
			quantity: 1
		};

		const isInCart = cart.filter(cartItem => cartItem.name === product.name).length > 0;
		
		if (!isInCart) {

			insertItemToDOM(product);
			

			cart.push(product);
			saveCart();
			handleActionButtons(addToCartButtonDOM, product);
		}
	});
});


// Вставляння коду в корзину
function insertItemToDOM(product) {
	cartDOM.insertAdjacentHTML(
		'beforeend',
		`
    <div class="cart__item">
      <img class="cart__item__image" src="${product.image}" alt="${product.name}" >
      <h3 class="cart__item__name">${product.name}</h3>
      <h3 class="cart__item__price">${product.price}</h3>
      <button class="btn btn--primary btn--small${product.quantity === 1 ? ' btn--danger' : ''}" data-action="DECREASE_ITEM">&minus;</button>
      <h3 class="cart__item__quantity">${product.quantity}</h3>
      <button class="btn btn--primary btn--small" data-action="INCREASE_ITEM">&plus;</button>
      <button class="btn btn--danger btn--small" data-action="REMOVE_ITEM">&times;</button>
    </div>
  `
	);

	addCartFooter();
}

// Funtion to Handle Buttons in the cart
function handleActionButtons(addToCartButtonDOM, product) {
	addToCartButtonDOM.innerText = 'In Cart';
	addToCartButtonDOM.disabled = true;

	const cartItemsDOM = cartDOM.querySelectorAll('.cart__item');
	cartItemsDOM.forEach(cartItemDOM => {
		if (cartItemDOM.querySelector('.cart__item__name').innerText === product.name) {
			cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click', () => increaseItem(product, cartItemDOM));
			cartItemDOM
				.querySelector('[data-action="DECREASE_ITEM"]')
				.addEventListener('click', () => decreaseItem(product, cartItemDOM, addToCartButtonDOM));
			cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]').addEventListener('click', () => removeItem(product, cartItemDOM, addToCartButtonDOM));
		}
	});
}

// Збільшення кількості товару в кошику
function increaseItem(product, cartItemDOM) {
	cart.forEach(cartItem => {
		if (cartItem.name === product.name) {
			cartItemDOM.querySelector('.cart__item__quantity').innerText = ++cartItem.quantity;
			cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.remove('btn--danger');
			saveCart();
		}
	});
}

// Зменшення кількості товару в кошику
function decreaseItem(product, cartItemDOM, addToCartButtonDOM) {
	cart.forEach(cartItem => {
		if (cartItem.name === product.name) {
			if (cartItem.quantity > 1) {
				cartItemDOM.querySelector('.cart__item__quantity').innerText = --cartItem.quantity;
				saveCart();
			} else {
				removeItem(product, cartItemDOM, addToCartButtonDOM);
			}

			if (cartItem.quantity === 1) {
				cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.add('btn--danger');
			}
		}
	});
}

// вилучити товар з кошика
function removeItem(product, cartItemDOM, addToCartButtonDOM) {
	cartItemDOM.classList.add('cart__item--removed');
	setTimeout(() => cartItemDOM.remove(), 250);
	cart = cart.filter(cartItem => cartItem.name !== product.name);
	saveCart();
	addToCartButtonDOM.innerText = 'Add To Cart';
	addToCartButtonDOM.disabled = false;

	if (cart.length < 1) {
		document.querySelector('.cart-footer').remove();
	}
}

// додавання footer до кошика 
function addCartFooter() {
	if (document.querySelector('.cart-footer') === null) {
		cartDOM.insertAdjacentHTML(
			'afterend',
			`
      <div class="cart-footer">
        <button class="btn btn--danger" data-action="CLEAR_CART">Clear Cart</button>
        <button class="btn btn--primary" data-action="CHECKOUT">CHECKOUT</button>
      </div>
    `
		);

		document.querySelector('[data-action="CLEAR_CART"]').addEventListener('click', () => clearCart());
		document.querySelector('[data-action="CHECKOUT"]').addEventListener('click', () => checkout());
	}
}

// Очистити корзину
function clearCart() {
	var fileName = location.href.split("/").slice(-1); 
	if (fileName[0] === "cart.html"){
		window.location.href = 'index.html';
		document.querySelectorAll('.cart__item').forEach(cartItemDOM => {
			cartItemDOM.classList.add('cart__item--removed');
			setTimeout(() => cartItemDOM.remove(), 250);
		});
	
		cart = [];
		localStorage.removeItem('cart');
		countCartTotal();
		document.querySelector('.cart-footer').remove();
	
		addToCartButtonsDOM.forEach(addToCartButtonDOM => {
			addToCartButtonDOM.innerText = 'Add To Cart';
			addToCartButtonDOM.disabled = false;
		});
	}
	else{
		document.querySelectorAll('.cart__item').forEach(cartItemDOM => {
			cartItemDOM.classList.add('cart__item--removed');
			setTimeout(() => cartItemDOM.remove(), 250);
		});
	
		cart = [];
		localStorage.removeItem('cart');
		countCartTotal();
		document.querySelector('.cart-footer').remove();
	
		addToCartButtonsDOM.forEach(addToCartButtonDOM => {
			addToCartButtonDOM.innerText = 'Add To Cart';
			addToCartButtonDOM.disabled = false;
		});
	}
	
}


function checkout() {
	var fileName = location.href.split("/").slice(-1); 
	if (fileName[0] === "cart.html"){
		window.location.href = 'index.html';
		clearCart();
		alert("Дякую за покупку")
	}
	else{
		window.location.href = 'cart.html';
		
	}
}

// Обчислення загальної суми
function countCartTotal() {
	let cartTotal = 0;
	cart.forEach(cartItem => (cartTotal += cartItem.quantity * cartItem.price));
	document.querySelector('[data-action="CHECKOUT"]').innerText = `Pay $${cartTotal}`;
}

// Збереження кошика в localStorage при змінах 
function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cart));
	countCartTotal();
}


