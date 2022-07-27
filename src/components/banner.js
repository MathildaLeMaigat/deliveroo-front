const Banner = ({ restaurant }) => {
  return (
    <div className="container">
      <div className="banner">
        <div className="banner-left">
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description}</p>
        </div>
        <div className="banner-right">
          <img src={restaurant.picture} alt="meal" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
