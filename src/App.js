import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

//Components
import Banner from "./components/Banner";
import Category from "./components/Category";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://deliveroo-backend-mathi.herokuapp.com/"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="App">
      <header>
        <p>deliveroo</p>
      </header>
      <div className="main-container">
        <Banner restaurant={data.restaurant} />
        <main>
          <Category
            category={data.categories}
            basket={basket}
            setBasket={setBasket}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
