export default function IngredientsList(props){
    return(
        <section>
            <div className="ingreList">
                <h3>Ingredients on hand</h3>
                <ul>
                    {props.Ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li> 
                    ))}
                </ul>
            </div> 

            {(props.Ingredients.length > 3) &&                     
                <div className="ctaBox">
                    <div className="describe-action">
                        <h2>Ready for a Recipe?</h2>
                        <p>Generate your recipe from your list of ingredients</p>
                    </div>                    
                    <button onClick = {props.getRecipe } className="generateRecipeBtn">Get a Recipe</button>
                </div>}
        </section>

    )
}