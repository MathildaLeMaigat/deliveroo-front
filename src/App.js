import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);

  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < basket.length; i++) {
      total += basket[i].price * basket[i].quantity;
    }
    return total.toFixed(2);
  };

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
                            <article
                              key={num}
                              onClick={() => {
                                const newBasket = [...basket];

                                let alreadyInBasket = false;
                                for (let i = 0; i < newBasket.length; i++)
                                  if (newBasket[i].id === meal.id) {
                                    newBasket[i].quantity++;
                                    alreadyInBasket = true;
                                  }
                                if (alreadyInBasket === false) {
                                  newBasket.push({
                                    title: meal.title,
                                    price: meal.price,
                                    id: meal.id,
                                    quantity: 1,
                                  });
                                }

                                setBasket(newBasket);
                                // console.log(meal);
                              }}
                            >
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
            {basket.length === 0 ? (
              <button className="basket">Pannier Vide</button>
            ) : (
              <button className="basket">Valider mon pannier</button>
            )}
            {basket.map((basketItem, index) => {
              return (
                <div className="basket-items" key={index}>
                  <button
                    onClick={() => {
                      const newBasket = [...basket];

                      if (newBasket[index].quantity === 1) {
                        newBasket.splice(index, 1);
                      } else {
                        newBasket[index].quantity--;
                      }

                      setBasket(newBasket);
                    }}
                  >
                    -
                  </button>
                  <span>{basketItem.quantity}</span>
                  <button
                    onClick={() => {
                      const newBasket = [...basket];
                      newBasket[index].quantity++;
                      setBasket(newBasket);
                    }}
                  >
                    +
                  </button>
                  <span>{basketItem.title}</span>
                  <span> // {basketItem.price} €</span>
                </div>
              );
            })}
            {basket.length > 0 && (
              <>
                <p>Sous Total: {getTotal()} €</p>
                <p>Frais de livraison : 2.5 €</p>
                <h4>Total: {Number(getTotal()) + 2.5}€</h4>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
