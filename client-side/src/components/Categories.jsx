import { categories } from "../data"; // Importing category data
import "../styles/Categories.scss"; // Importing styles
import { Link } from "react-router-dom"; // Importing Link component for navigation

const Categories = () => {
  return (
    <div className="categories">
      {/* Heading */}
      <h1>Explore Top Categories</h1>
      {/* Description */}
      <p>
        Explore our wide range of vacation rentals that cater to all types of
        travelers. Immerse yourself in the local culture, enjoy the comforts of
        home, and create unforgettable memories in your dream destination.
      </p>

      {/* List of categories */}
      <div className="categories_list">
        {categories?.slice(1, 10).map((category, index) => (
          // Link to the category page
          <Link to={`/properties/category/${category.label}`} key={index}>
            {/* Category item */}
            <div className="category">
              {/* Category image */}
              <img src={category.img} alt={category.label} />
              {/* Overlay for hover effect */}
              <div className="overlay"></div>
              {/* Category text */}
              <div className="category_text">
                {/* Category icon */}
                <div className="category_text_icon">{category.icon}</div>
                {/* Category label */}
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
