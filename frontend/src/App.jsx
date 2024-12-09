import { useEffect, useState } from 'react'

import './App.css'

// Fetching products from the dummyjson API
const fetchProducts = async (category) => {
  const url = category === 'all'
    ? 'https://dummyjson.com/products'
    : `https://dummyjson.com/products/category/${category}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.products;
};

const App = () => {
  const [categories, setCategories] = useState([
    'all', 'beauty', 'furniture', 'fragrances', 'groceries',
  ]);  // Static list of categories based on the dummyjson API
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState(''); // State to track search query

  // Fetch products when the component mounts or the selected category changes
  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts(selectedCategory);
      setProducts(data);
    };

    getProducts();
  }, [selectedCategory]);

  // Handle category change from the dropdown
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-filter-container">
      <div className='navbar'>
        {/* Dropdown for categories */}
        <p className='search'>
          Filter: <select
          className="select-category"
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select></p>

        {/* Search input */}
        <p className='search'>
          Search: <input 
            type="search" 
            value={searchQuery}
            onChange={handleSearchChange} 
            className='select-category' 
            placeholder="Search by title or description" 
          />
        </p>
      </div>
      
      {/* Product list */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
            </div>
          ))
        ) : (
          <p className="no-products-message">No products found</p>
        )}
      </div>
    </div>
  )
}

export default App
