// js/main.js
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function showMessage(text) {
	const msg = document.getElementById("message");
	msg.textContent = text;
	msg.classList.remove("hidden");
	setTimeout(() => msg.classList.add("hidden"), 2500);
}

function updateCartCount() {
	const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
	document.getElementById("cart-count").textContent = totalItems;
}

function addToCart(product) {
	const index = cart.findIndex(p => p.id === product.id);
	if (index >= 0) {
		cart[index].quantity += 1;
	} else {
		cart.push({ ...product, quantity: 1 });
	}
	localStorage.setItem("cart", JSON.stringify(cart));
	updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
	const productList = document.getElementById("product-list");
	const template = document.getElementById("product-template");

	products.forEach(product => {
		const clone = template.content.cloneNode(true);
		const img = clone.querySelector(".product-img");
		const name = clone.querySelector(".product-name");
		const price = clone.querySelector(".product-price");
		const viewBtn = clone.querySelector(".view-btn");
		const addBtn = clone.querySelector(".add-btn");

		img.src = product.image;
		img.alt = product.name;
		name.textContent = product.name;
		price.textContent = `$${product.price}`;

		viewBtn.onclick = () => {
			localStorage.setItem("selectedProduct", JSON.stringify(product));
			window.location.href = "product.html";
		};

		addBtn.onclick = () => {
			addToCart(product);
			showMessage("Producto agregado al carrito ✅");
		};

		productList.appendChild(clone);
	});

	document.getElementById("cart-icon").addEventListener("click", () => {
		window.location.href = "cart.html";
	});

	updateCartCount();
});
