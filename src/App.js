import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState([0]);

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
        <div className="container">
          <div className="banner">
            <div className="banner-left">
              <h1>{data.restaurant.name}</h1>
              <p>{data.restaurant.description}</p>
            </div>
            <div className="banner-right">
              <img src={data.restaurant.picture} alt="meal" />
            </div>
          </div>
        </div>

        <main>
          <div className="main-left">
            {data.categories.map((category, index) => {
              return (
                category.meals.length > 0 && (
                  <section key={index}>
                    <div className="sub-main">
                      <h2>{category.name}</h2>

                      <div className="meal-container">
                        {category.meals.map((meal, num) => {
                          return (
                            <article key={num}>
                              <div className="text">
                                <h3>{meal.title}</h3>
                                <p>{meal.description}</p>
                                <p>
                                  {meal.price} €{" "}
                                  {meal.popular && (
                                    <span className=" popular">
                                      ⭐️ Populaire
                                    </span>
                                  )}
                                </p>
                              </div>
                              <div className="image">
                                <img src={meal.picture} alt="" />
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                )
              );
            })}
          </div>
          <div className="main-right">
            <div>
              <button className="basket">Valider mon pannier</button>
            </div>
            {counter.map((counter, index) => {
              <div key={index}>
                <button>-</button>
                <span>{counter}</span>
                <button>+</button>
              </div>;
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
