import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());


  const allMealsUrl = `https://themealdb.com/api/json/v1/1/search.php?s=${query}`;
  const randomMealsUrl = "https://themealdb.com/api/json/v1/1/random.php";

  const selectMeal = (idMeal, favouriteMeal) => {
    const meal = favouriteMeal
      ? favorites.find((meal) => meal.idMeal == idMeal)
      : meals.find((meal) => meal.idMeal == idMeal);
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFavorites = (idMeal) => {
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const favoriteMeal = favorites.find((meal) => meal.idMeal === idMeal);

    let upDatedMeal = favoriteMeal // if alredy in favourites remove from favorites
      ? [...favorites].filter((fmeal) => fmeal.idMeal !== idMeal)
      : [...favorites, meal];
    
    setFavorites(upDatedMeal);
    localStorage.setItem('favorite', JSON.stringify(upDatedMeal));
    // console.log(localStorage);
  };

  const removeAllFavorites = () => {
    localStorage.setItem('favorite', JSON.stringify([]));
    setFavorites([]);
    document
      .querySelectorAll(".liked")
      .forEach((item) => item.classList.remove("liked"));
  };

 
    function getFavoritesFromLocalStorage() {
      let favorite = localStorage.getItem('favorite');
favorite = JSON.parse(favorite);
      favorite= 
      favorite? favorite :[];
      return favorite;
   
    }
     

  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios(url);

      setMeals(data.meals);

      console.log(data.meals);
    } catch (error) {
      console.log("error fetching meals", error);
    }
    setLoading(false);
  };

  //on initial load  fetch meals
  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  // if query in empty null :
  useEffect(() => {
    query ? fetchMeals(allMealsUrl) : null;
  }, [query]);

  const randomMeal = () => {
    fetchMeals(randomMealsUrl);
  };

  return (
    <AppContext.Provider
      value={{
        removeAllFavorites,
        favorites,
        handleFavorites,
        closeModal,
        selectedMeal,
        selectMeal,
        showModal,
        randomMeal,
        setQuery,
        loading,
        meals,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// creating custom usecontext hoook
// eslint-disable-next-line react-refresh/only-export -components

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
