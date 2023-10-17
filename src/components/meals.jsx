//import axios  from "axios";
import { useState } from "react";
import { BsHandThumbsUp } from "react-icons/bs";
import { useGlobalContext } from "./context";
const Meals = () => {
  const {handleFavorites,selectMeal,loading, meals} = useGlobalContext();
  // const [click,setClick] = useState(false);

  const handleClick =(e)=>{
    const like = e.currentTarget;
    like.classList.contains('liked')?
    like.classList.remove('liked'):
    like.classList.add('liked');

  }

  return (
    <>
      <div className="section-center">
        
      {
        !loading?  
      meals? 
                  meals.map((singleMeal) => {
                    const { idMeal, strMeal: title, strMealThumb: image } = singleMeal;
                    return (
                      <div key={idMeal} className="single-meal">
                        <img src={image} alt="food img"  onClick={()=>selectMeal(idMeal)}/>
                        <footer>
                          <h5>{title}</h5>
                          <button className="like-btn" style={{fill: 'blue'}} onClick={handleClick}>
                        
                            <BsHandThumbsUp onClick={()=> handleFavorites(idMeal)} />
                          </button>
                        </footer>
                      </div>)})
                     : <p className="section">Sorry couldn't find that! </p>
                     : <p className="section"> loading..</p>

        ////////////////
      
   
      //     <div id="load">
      //       <div>G</div>
      //       <div>N</div>
      //       <div>I</div>
      //       <div>D</div>
      //       <div>A</div>
      //       <div>O</div>
      //       <div>L</div>
      //     </div>
  
        
        }

      </div>

      
    </>
  );
};

export default Meals;
