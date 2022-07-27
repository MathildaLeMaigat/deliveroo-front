const Basket = ({ basket, setBasket, getTotal }) => {
  return (
    <div className="main-right">
      {basket.length === 0 ? (
        <button className="basket">Pannier Vide</button>
      ) : (
        <button className="basket">Valider mon pannier</button>
      )}
      <div className="bottom-basket">
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

              <span> {basketItem.title}</span>
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
    </div>
  );
};

export default Basket;
