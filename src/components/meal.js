const Meal = ({ meal, basket, setBasket, index }) => {
  return (
    <article
      key={index}
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
          {meal.popular && <span className=" popular">⭐️ Populaire</span>}
        </p>
      </div>
      <div className="image">
        <img src={meal.picture} alt="" />
      </div>
    </article>
  );
};

export default Meal;
