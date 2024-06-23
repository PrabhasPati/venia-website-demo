let products = [];
let visibleProducts = 3;

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        products = await response.json();
        displayProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts() {
    const productContainer = document.getElementById('productContainer');
    const filters = Array.from(document.querySelectorAll('.filter-checkbox:checked')).map(cb => cb.value);
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const sortValue = document.getElementById('sortSelect').value;

    let filteredProducts = products.filter(product =>
        (filters.length === 0 || filters.includes(product.category.toLowerCase())) &&
        (product.title.toLowerCase().includes(searchTerm))
    );

    if (sortValue === 'lowToHigh') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'highToLow') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    const productsToDisplay = filteredProducts.slice(0, visibleProducts);

    productContainer.innerHTML = productsToDisplay.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>$${product.price}</p>
        </div>
    `).join('');

    document.getElementById('resultsCount').textContent = `${filteredProducts.length} Results`;
}

document.getElementById('searchBar').addEventListener('input', displayProducts);
document.getElementById('sortSelect').addEventListener('change', displayProducts);
document.querySelectorAll('.filter-checkbox').forEach(cb => cb.addEventListener('change', displayProducts));
document.getElementById('loadMoreBtn').addEventListener('click', () => {
    visibleProducts += 3;
    displayProducts();
});

// Initial fetch and display of products
fetchProducts();
