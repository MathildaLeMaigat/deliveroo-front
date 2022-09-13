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
              <div>
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
                <span className="basket-quantity">{basketItem.quantity}</span>
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
              </div>
              <div>
                <span className="basket-price"> {basketItem.price}€</span>
              </div>
            </div>
          );
        })}
        {basket.length > 0 && (
          <>
            <div className="under-total">
              <div className="under-total1">
                <p>Sous Total: </p>
                <p>{getTotal()} €</p>
              </div>
              <div className="under-total1">
                <p>Frais de livraison : </p>
                <p>2.5 €</p>
              </div>
            </div>
            <div className="total">
              <p>Total: </p>
              <p>{Number(getTotal()) + 2.5}€</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Basket;
