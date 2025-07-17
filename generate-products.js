// generate-products.js
const fs = require("fs");
const path = require("path");

const imagesDir = path.join(__dirname, "img");
const outputFile = path.join(__dirname, "js", "products.js");

const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];

fs.readdir(imagesDir, (err, files) => {
	if (err) throw err;

	const products = files
		.filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
		.map((file, index) => ({
			id: index + 1,
			name: `Gorra ${index + 1}`,
			description: `Descripción de la gorra ${index + 1}`,
			price: (Math.random() * 500 + 200).toFixed(2),
			image: `img/${file}`,
		}));

	const jsContent = `const products = ${JSON.stringify(products, null, 2)};`;

	fs.writeFileSync(outputFile, jsContent);
	console.log("Archivo products.js generado correctamente.");
});
