import { useGlobalContext } from "./context";
import { useState } from "react";


const Search = () =>{
    const {setQuery,randomMeal}= useGlobalContext();
    const [text,setText]= useState('');

    const handleChange = (e)=>{
        
        console.log(e.target.value)
        setText(e.target.value);
    }
    const onSubmit = (e) =>{
    e.preventDefault();
    setQuery(text);
    }
    
    const handleRandomMeal= ()=>{
        setText('');
        setQuery('')
        randomMeal();
    }

    return(
        <header className="search-container">  
            <form action="" onSubmit={onSubmit}>
                <input type="text" onChange={handleChange} value={text} placeholder="Type your favorite meal" className="form-input" /> 
                <button className="btn" type="submit" >search</button>
                <button className="btn btn-hipster" type="button" onClick={handleRandomMeal}>surprise me!</button>
            </form>
        </header>
    )
    
} 

export default Search; 