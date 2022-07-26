import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
      <h1>{data.restaurant.name}</h1>
      <p>{data.restaurant.description}</p>
      <img src={data.restaurant.picture} alt="meal" />
      {data.categories.map((category, index) => {
        return (
          category.meals.length > 0 && (
            <section key={index}>
              <h2>{category.name}</h2>
              {category.meals.map((meal, num) => {
                return (
                  <article key={num}>
                    <h3>{meal.title}</h3>
                    <p>{meal.description}</p>
                    <p>{meal.price} €</p>
                    {meal.popular && <p className="popular">Populaire</p>}
                    <img scr={meal.picture} alt="" />
                  </article>
                );
              })}
            </section>
          )
        );
      })}
    </div>
  );
}

export default App;
