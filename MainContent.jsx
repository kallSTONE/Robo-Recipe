import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import RoboRecipe from "./RoboRecipe";
import IngredientsList from "./IngredientsList";
import FeaturedRecipe from './FeaturedRecipe.jsx'
import { getRecipeFromMistral } from "./ai"

import caurselImg from '../Images/defaultRecipeImage.png'
import bgImage from './Images/DALLRobo-Chef-ezgif.com-reverse-removebg-preview.png'
import bgImageFliped from './Images/DALLRobo-Chef-ezgif.com-reverse-removebg-preview - Copy.png'

export default function MainContent({deviceType}) {

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1.2,
          slidesToSlide: 1, // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
          slidesToSlide: 1, // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1, // optional, default to 1.
        },
      };
    

    const [ingredients, setIngredients] = useState([]);

    const [loading, setLoading] = useState(false);
  

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient").trim();
        if (newIngredient && !ingredients.includes(newIngredient)) {
            setIngredients([newIngredient, ...ingredients]); 
        }
    }

    const ingredientString = ingredients.join(", ");

    function removeIngredients() {
        setIngredients([]);
        setGeneratedRecipe("");
    }


    const [generatedRecipe, setGeneratedRecipe] = useState("")

    async function getRecipe() {
        setLoading(true);
        try {
            const recipe = await getRecipeFromMistral(ingredients);
            setGeneratedRecipe(recipe);
            // console.log(recipe)
        } catch (error) {
            console.error("Error fetching recipe:", error);
        }
        setLoading(false);
    }

    const recipeSection = React.useRef(null)
    const depend = (generatedRecipe !== "") && (recipeSection.current !== null)


    useEffect(function(){
        if(depend){
            recipeSection.current.scrollIntoView({behavior:"smooth"})
        }
            }, [generatedRecipe]
    );
  
    return (
        <main>  
            <div className="background-blur">
                <div className="imgContainer">
                    <img src={bgImage} alt="robo chef"/>  
                    <div className="MainHeaderI">
                        <h1>Robo Recipe</h1>
                        <p className="mainInfo">Based on the ingredients that you have i will generate a recipe for delicious meals</p>
                    </div>

                    <Carousel 
                        responsive={responsive}
                        containerClass="carouselContainer"
                        itemClass="carouselItem"
                        customTransition="all .4s"
                        transitionDuration={500}
                        swipeable={true}
                        infinite={true}
                        draggable={true}
                        showDots={false}
                        ssr={true} 
                        keyBoardControl={true}
                        dotListClass="custom-dot-list-style"
                    >                        
                        <img src={caurselImg} alt="recipe image"/>
                        <img src={caurselImg} alt="recipe image"/>
                        <img src={caurselImg} alt="recipe image"/>
                        <img src={caurselImg} alt="recipe image"/>
                        <img src={caurselImg} alt="recipe image"/>
                        <img src={caurselImg} alt="recipe image"/>
                    </Carousel>

                    <img src={bgImageFliped} alt="fliped robot chef" />

                    
                    
                </div>
                
            </div>

              <label>what are the ingrideients you have?</label>
            <form className="addIngredientForm" action={addIngredient}>
                <input name="ingredient" type="text" placeholder="e.g Oregano" aria-label="Add ingredient" />
                <button type="submit" className="btn1">Add ingredient</button>
                { !(ingredients.length === 0) &&<button type="button" className="btn2" onClick={removeIngredients}> CLEAR </button>}
            </form>     

            {!(ingredients.length === 0) && <IngredientsList recipeSection={recipeSection} getRecipe= {getRecipe} Ingredients = {ingredients}/> }

                {loading && (
                <div className="flipping-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}

            { generatedRecipe && <RoboRecipe generatedRecipe={generatedRecipe} ingredientString={ingredientString}/>}    


            <FeaturedRecipe/>         
                
        </main>
    );
}
