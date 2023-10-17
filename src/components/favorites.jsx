import { useGlobalContext } from "./context";
const Favorites = () => {
   const {favorites,removeAllFavorites,selectMeal} = useGlobalContext();
  return (
    <div className="favorites">
<div className="favorites-content">
      <h1>favorites</h1>
      <div className="favorites-container">
        {
            favorites.map((item)=>{
                const {idMeal,strMealThumb: image,strMeal:title } = item;
                return (<div key={idMeal}>
                 <img src={image} alt={title} style ={{height:'50px', width:'50px'}} className="favorite-img" onClick={()=>selectMeal(idMeal,true)} />
                 <h5 style={{wordrap: 'break-word'}}>{title}</h5>
                </div>)
            })
        }
      </div>
      <button className="btn " onClick={
            removeAllFavorites
        }>remove all</button>
    </div>
    </div>
    
  );
};

export default Favorites;
