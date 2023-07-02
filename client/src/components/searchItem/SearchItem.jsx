import "./searchItem.css";
import { Link } from "react-router-dom";

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
      <Link to={`/hotels/${item._id}`}>
        <img
          src={item.photos[0]}
          alt=""
          className="siImg"
        />
      </Link>
      <div className="siDesc">
        <Link to={`/hotels/${item._id}`} style={{ textDecoration: 'none' }}>
          <h1 className="siTitle">{item.name}</h1>
        </Link>
        <span className="siDistance">{item.city}, {item.country}</span>
        <span className="siSubtitle">
          {item.desc}
        </span>
        <span className="siFeatures">
          {item.rooms} rooms available
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <button>{item.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">{item.cheapestPrice}$</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;