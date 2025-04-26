import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

export default function FeaturedRecipe() {
    const [likedRecipes, setLikedRecipes] = useState([]); // Store liked recipes

    useEffect(() => {
        // Fetch liked recipes when the component mounts
        fetch("http://localhost:5000/liked-recipes")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch liked recipes");
                }
                return response.json();
            })
            .then((data) => setLikedRecipes(data))
            .catch((error) => console.error("Error fetching liked recipes:", error));
    }, []);

    return (
        <section className="featured-recipes" id="featured">
            <h2>Featured Recipes</h2>
            <div className="recipe-list">
                {likedRecipes.length > 0 ? (
                    likedRecipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))
                ) : (
                    <p>No liked recipes yet.</p>
                )}
            </div>
        </section>
    );
}
