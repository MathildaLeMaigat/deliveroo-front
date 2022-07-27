import Meal from "./Meal";
import Basket from "./Basket";

const Category = ({ category, basket, setBasket }) => {
  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < basket.length; i++) {
      total += basket[i].price * basket[i].quantity;
    }
    return total.toFixed(2);
  };
  return (
    <div className="main-left">
      {category.map((category, index) => {
        return (
          category.meals.length > 0 && (
            <section key={index}>
              <div className="sub-main">
                <h2>{category.name}</h2>

                <div className="meal-container">
                  {category.meals.map((meal, index) => {
                    return (
                      <Meal
                        meal={meal}
                        basket={basket}
                        setBasket={setBasket}
                        index={index}
                      />
                    );
                  })}
                </div>
              </div>
            </section>
          )
        );
      })}{" "}
      <Basket basket={basket} setBasket={setBasket} getTotal={getTotal} />
    </div>
  );
};

export default Category;
