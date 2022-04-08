import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";

const CategoryPreview = ({title, products}) => {
    return (
        <div className="category-preview-container">
            <h2>
                <Link className="title" to={title}>{title.toUpperCase()}</Link>
            </h2>
            <div className="preview">
                {
                    products.filter((_, idx) => idx < 4)       // callback gets the product but we ignore it, we only need the index _ heißt i dont want to use it
                            .map((product) => 
                            <ProductCard key={product.id} product={product}/> )
                }
            </div>
        </div>
    )


}

export default CategoryPreview; 