import React, { useState, useEffect } from 'react';
import ProductCards from './shop/ProductCards';
import { useStore } from '../context/StoreContext';
import API from '../../api';
import Categories from './home/Categories';

const NewArrivals = () => {
  const { currentStore } = useStore();
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentStore) {
      fetchNewArrivals();
    }
  }, [currentStore]);

  const fetchNewArrivals = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await API.request(
        `${API.endpoints.publicNewArrivals}?store=${currentStore.name}&limit=12`
      );
      
      setNewProducts(response || []);
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      setError('Failed to load new arrivals');
      setNewProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header">New Arrivals</h2>
        <p className="section__subheader">
          Discover our latest collection featuring the newest trends and must-have pieces 
          that just arrived in our store.
        </p>
      </section>

      <section className="section__container">
        {/* Featured New Arrival */}
        {/* <div className="mb-12">
          <div className="bg-gradient-to-r from-primary-light to-extra-light rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">✨ Just Dropped</h3>
            <p className="text-gray-600 mb-6">
              Be the first to shop our newest collection featuring the latest fashion trends
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium">Limited Stock</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-medium">Trending Now</span>
              </div>
            </div>
          </div>
        </div> */}

        {/* New Arrivals Grid */}
        <div className="mb-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading new arrivals...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={fetchNewArrivals}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-medium mb-6">
                {newProducts.length} Latest Products
              </h3>
              <div className="mt-6">
                {newProducts.length > 0 ? (
                  <ProductCards products={newProducts} />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No new arrivals available at the moment.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

      

        <Categories />

        {/* Newsletter Signup
        <div className="mt-16 bg-primary-light rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-gray-600 mb-6">
            Be the first to know about new arrivals, exclusive offers, and fashion updates
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
            />
            <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors">
              Subscribe
            </button>
          </div>
        </div> */}
      </section>
    </>
  );
};

export default NewArrivals;