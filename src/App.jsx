import { useGlobalContext } from "./components/context";
import Favorites from "./components/favorites";
import Modal from "./components/modal";
import Search from "./components/search";
import Meals from "./components/meals";
import "./App.css";

function App() {
const {favorites,showModal} = useGlobalContext();
  return (
    <>
      <Search />
     {favorites.length>0 && <Favorites />} 
      <Meals />
      {showModal && <Modal />}
    </>
  );
}

export default App;
