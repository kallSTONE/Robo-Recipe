import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from "react";
import starEmpty from '../Images/star.png';
import starFilled from '../Images/starFilled .png';


export default function RoboRecipe({ generatedRecipe, ingredientString }) {
    const [liked, setLiked] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');

    // Reset the liked state when a new recipe is generated
    useEffect(() => {
        setLiked(false);
    }, [generatedRecipe]);

    // Function to extract title from generated recipe
    const extractTitle = (recipeGen) => {
        const lines = recipeGen.split("\n");
        // const lines = recipeGen.split(/\n\s+|\n\n\s+/);
        const titleLine = lines.find(line => line.startsWith("###"));
        return titleLine ? titleLine.replace("###", "").trim() : "Generated Recipe";
    };

    // Dynamically extract the title from the generated recipe
    const titleExtracted = extractTitle(generatedRecipe);
    console.log(titleExtracted)
    const handleToggle = async () => {
        setLiked((prev) => {
            const newLiked = !prev; // Toggle the state

            // Only send to the backend if the recipe is liked (newLiked === true)
            if (newLiked) {
                const recipeData = {
                    title: titleExtracted, // Use the dynamically extracted title
                    image: "../Images/defaultRecipeImage.png",
                    description: ingredientString, // Extract from AI response
                    fullRecipe: generatedRecipe,
                };

                try {
                    console.log("trying to add new recipe to the liked recipe json file");
                    fetch("http://localhost:5000/like-recipe", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ recipe: recipeData }),
                    })
                    .then(response => {
                        if (!response.ok) {
                            setSaveStatus('Error')
                            throw new Error("Error saving recipe.");
                        }
                        console.log("Recipe successfully added to liked recipes!");
                        setSaveStatus('success')
                    })
                    .catch(error => {
                        console.error("Error saving recipe:", error);
                        setSaveStatus('Error')
                    });
                } catch (error) {
                    console.error("Error in try block:", error);
                    setSaveStatus('Error')
                }
            }

            console.log(titleExtracted)

            return newLiked; // Return the new state value
        });
    };
    return (
        generatedRecipe ? (
            <section className="gotrecipe">
                <h2>Chef Claude Recommends:</h2>
                <article className="suggested-recipe-container">
                    <ReactMarkdown>
                        {generatedRecipe}
                    </ReactMarkdown>
                </article>
                <button className="starToggleIcon" onClick={handleToggle}>
                    {!liked || saveStatus === 'Error' ? (
                        <img src={starEmpty} alt="Empty star" />
                    ) : (
                        <img src={starFilled} alt="Yellow star" />
                    )}
                </button>
            </section>
        ) : (
            <p>There was an error fetching your recipe or the monthly limit has been reached. Try again later.</p>
        )
    );
}    
