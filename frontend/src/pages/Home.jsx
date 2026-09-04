// import { Link } from "react-router-dom";
// import ProductCard from "../components/ProductCard";
// import categories from "../data/categories";
// import products from "../data/products";
// import "./Home.css";

// function Home() {
//   const featuredProducts = products.slice(0, 4);

//   return (
//     <main className="home">
//       <section className="hero">
//         <div className="container hero-content">
//           <div className="hero-text">
//             <p className="hero-label">
//               WELCOME TO SHOPNEST
//             </p>

//             <h1>
//               Everything You Need, All in One Place
//             </h1>

//             <p>
//               Discover quality products at great prices
//               and enjoy a simple online shopping
//               experience.
//             </p>

//             <Link
//               to="/products"
//               className="btn hero-button"
//             >
//               Shop Now
//             </Link>
//           </div>

//           <div className="hero-image">
//             <img
//               src="/images/hero/hero.jpg"
//               alt="ShopNest shopping"
//             />
//           </div>
//         </div>
//       </section>

//       <section className="categories-section">
//         <div className="container">
//           <div className="section-heading">
//             <p>EXPLORE</p>
//             <h2>Shop by Category</h2>
//           </div>

//           <div className="category-grid">
//             {categories.map((category) => (
//               <Link
//                 to="/products"
//                 className="category-card"
//                 key={category.id}
//               >
//                 <img
//                   src={category.image}
//                   alt={category.name}
//                 />

//                 <h3>{category.name}</h3>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="featured-section">
//         <div className="container">
//           <div className="section-heading">
//             <p>OUR PICKS</p>
//             <h2>Featured Products</h2>
//           </div>

//           <div className="product-grid">
//             {featuredProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//               />
//             ))}
//           </div>

//           <div className="view-products">
//             <Link
//               to="/products"
//               className="btn hero-button"
//             >
//               View All Products
//             </Link>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// export default Home;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import categories from "../data/categories";
import api from "../services/api";

import "./Home.css";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await api.get("/products");

        const products = response.data.map((product) => ({
          ...product,
          id: product._id,
        }));

        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <main className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">

          <div className="hero-text">
            <p className="hero-label">
              WELCOME TO SHOPNEST
            </p>

            <h1>
              Everything You Need,
              <br />
              All in One Place.
            </h1>

            <p className="hero-description">
              Discover fashion, electronics, footwear,
              accessories and more at great prices.
            </p>

            <Link to="/products" className="btn hero-button">
              Shop Now →
            </Link>
          </div>

          <div className="hero-image">
            <div className="hero-circle hero-circle-top"></div>
            <div className="hero-circle hero-circle-bottom"></div>

            <img
              src="/images/hero/hero.jpg"
              alt="ShopNest shopping"
            />
          </div>

        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">

          <div className="section-heading">
            <p>EXPLORE OUR STORE</p>
            <h2>Shop by Category</h2>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <Link
                to="/products"
                className="category-card"
                key={category.id}
              >
                <img
                  src={category.image}
                  alt={category.name}
                />

                <div className="category-content">
                  <h3>{category.name}</h3>
                  <span>Explore →</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">

          <div className="section-heading">
            <p>OUR TOP PICKS</p>
            <h2>Featured Products</h2>
          </div>

          {loading ? (
            <div className="home-loading">
              Loading products...
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="product-grid">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="home-loading">
              No products available.
            </div>
          )}

          <div className="view-products">
            <Link to="/products" className="btn view-button">
              View All Products →
            </Link>
          </div>

        </div>
      </section>

      {/* Why ShopNest */}
      <section className="benefits-section">
        <div className="container">

          <div className="section-heading">
            <p>SHOP WITH CONFIDENCE</p>
            <h2>Why ShopNest?</h2>
          </div>

          <div className="benefits-grid">

            <div className="benefit-card">
              <div className="benefit-icon">🛍️</div>
              <h3>Quality Products</h3>
              <p>
                Find useful and reliable products
                for your everyday needs.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🔒</div>
              <h3>Secure Shopping</h3>
              <p>
                Your account and shopping experience
                are protected with secure login.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🚚</div>
              <h3>Easy Ordering</h3>
              <p>
                Browse products, add to cart and
                place your order with ease.
              </p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Home;