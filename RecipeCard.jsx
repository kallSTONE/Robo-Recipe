import { useState } from "react";
import defaultImage from "../Images/defaultRecipeImage.png";
import ReactMarkdown from 'react-markdown';

export default function RecipeCard({ recipe }) {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="recipeCard">
        <div className="dishImage">
          <img src={defaultImage} alt={recipe.title} />
        </div>
        <div className="descriptionAndTitle">
          <div className="title">
            <h4>{recipe.title}</h4>
          </div>

          <div className="recipeDescription">
            <h5>Ingredient list</h5>
            <p>{recipe.description}</p>
          </div>

          <button className="viewDetailsBtn" onClick={() => setShowModal(true)}>
            View Recipe
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <span className="closeBtn" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <img src={defaultImage} alt={recipe.title} className="modalImage" />
            <h2>{recipe.title}</h2>
             <ReactMarkdown >
                {recipe.fullRecipe}
            </ReactMarkdown> 
          </div>
        </div>
      )}
    </>
  );
}
