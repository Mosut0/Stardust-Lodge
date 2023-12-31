import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useEffect } from "react";
import { useForm } from "react-cool-form";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../fetch/useFetch";
import { SearchContext } from "../../context/SearchContext";
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const Hotel = () => {
  const { t } = useTranslation();

  const location = useLocation()
  const hotel_id = location.pathname.split('/')[2]
  const { user } = useContext(AuthContext);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const { data, loading, error, reFetch } = useFetch(`https://seg125-f269f11245e5.herokuapp.com/api/hotels/find/${hotel_id}`);
  const {dates, options} = useContext(SearchContext)
  console.log(options)
  const [ratingValue, setRatingValue] = useState(0);
  const navigate = useNavigate();

  function numberOfNights(date1, date2) {
    const msPerDay = 1000 * 60 *60 *24;
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / msPerDay)
    return diffDays;
  }

  useEffect(() => {
    if(error) {
      navigate("/404")
    }
  }, [error])

  let nights;
  console.log(dates)
  if (dates.length == 0){
    nights = 1;
  }else {
    nights = numberOfNights(dates[0].endDate, dates[0].startDate);
  }
  if(nights == 0) nights++;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const handleSubmitReview = () =>{
    var invalidInputClass = "invalid-input";
    var invalidInputStyle = document.createElement("style");
    invalidInputStyle.innerHTML = "." + invalidInputClass + " { border: 1px solid red;}";
    document.head.appendChild(invalidInputStyle);

    var fullNameInput = document.getElementById("fullname");
    var reviewInput = document.getElementById("message");
    var ratingInput = document.getElementById("rating");

    fullNameInput.classList.remove(invalidInputClass);
    reviewInput.classList.remove(invalidInputClass);
    ratingInput.classList.remove(invalidInputClass);

    var fullName = fullNameInput.value.trim();
    var review = reviewInput.value.trim();
    console.log(ratingValue)

    var missing = false;

    if (fullName === "") {
        fullNameInput.classList.add(invalidInputClass);
        missing = true;
    }
    if (review === "") {
      reviewInput.classList.add(invalidInputClass);
      missing = true;
    }
    if (ratingValue === 0) {
      ratingInput.classList.add(invalidInputClass);
      missing = true;
    }

    if(!missing){
      fullNameInput.value = "";
      reviewInput.value = "";
      setRatingValue(0);

      document.getElementById("thanksReview").style.display = "block";
    }
  }

  const checkUserValid = () => {
    if(user){
      const dataState = {date: dates, hotel: data, options: options}
      console.log(dataState)
      navigate("/checkout", {state: dataState})
    }else{
      navigate("/login", {state: `/hotels/${hotel_id}`})
    }
  }

  return (
    <div>
      <Navbar />
      {loading ? "Loading..." : <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={data.photos[slideNumber]} alt={"Room image " + (slideNumber+1) + " of " + data.name} className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow" onClick={checkUserValid}>{t("hotel.reserve")}</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{t("hotel.desc")}</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>{t('hotel.yourTranslationKey', { nights })}</h1>
              <h2>
                <b>{data.cheapestPrice * nights}$</b> {t('hotel.yourTranslationKey', { nights })}
              </h2>
              <button onClick={checkUserValid}>{t('hotel.reserve')}</button>
            </div>
          </div>
          <div className="reviewsContainer">
            <h1>{t('hotel.review')}</h1>
            <div className="reviewCards">
              {data.reviews?.map((review, index) => (
                <div className="reviewCard" key={index}>
                  <div className="reviewHeader">
                    <div className="reviewerInfo">
                      <h3>{review.reviewer}</h3>
                      <div className="rating">
                        <button>{review.rating}</button>
                      </div>
                    </div>
                  </div>
                  <p>"{review.review}"</p>
                </div>
              ))}
            </div>
          </div>
          <div className="userReview">
            <h2>{t('hotel.write')}</h2>
            <form>
              <div className="form-group">
                <label className="formFN" htmlFor="fullname">{t('hotel.fname')} *
                <input type="text" className="form-control" id="fullname" placeholder="Enter full name" required=""/>
                </label>
              </div>
              <div className="form-group">
                <label className="formFN" htmlFor="message">{t('hotel.yourreview')} *
                <textarea type="text" className="form-control" rows="4" id="message" placeholder="Enter review" required=""/>
                </label>
              </div>
              <label id="ratingTitle" className="formFN" htmlFor="rating">{t('hotel.yourrating')} *</label>
              <div>
              <Rating onChange={(event, value) => setRatingValue(value)} id="rating" name="size-large" defaultValue={0} size="large" style={{marginTop: "5px"}}/>
              </div>
            </form>
            <Button id="submitBtn" onClick={() => handleSubmitReview()} style={{marginTop: "10px"}} variant="contained" endIcon={<SendIcon />}>
            {t('hotel.send')}
            </Button>
            <p id="thanksReview" style={{fontSize: "20px", display: "none"}}>{t('hotel.thanks')}</p>
          </div>
        </div>
        <Footer />
      </div>}
    </div>
  );
};

export default Hotel;