import "./list.css";
import "../../components/dropdown/dropdown.css"
import Navbar from "../../components/navbar/Navbar";
import Slider from "@mui/material/Slider";
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import useFetch from "../../fetch/useFetch";
import SearchItem from "../../components/searchItem/SearchItem";
import Footer from "../../components/footer/Footer"
import { SearchContext } from "../../context/SearchContext";
import { faCaretDown, faCaretUp, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const List = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [range, setRange] = useState([0, 1000]);
  const [isActive, setIsActive] = useState(false)
  const destinations = [
      { value: 'All', label: 'All' },
      { value: 'Toronto, Canada', label: 'Toronto, Canada' },
      { value: 'London, England', label: 'London, England' },
      { value: 'Paris, France', label: 'Paris, France' },
      { value: 'Dublin, Ireland', label: 'Dublin, Ireland' },
  ];
  const [openOptions, setOpenOptions] = useState(true)

  function apiUrl(){
    let url = `https://seg125-f269f11245e5.herokuapp.com/api/hotels?`;
    if(destination == "All" || destination == ""){
      url += `city=Toronto&city=London&city=Paris&city=Dublin&min=${range[0] || 0}&max=${range[1] || 1000}&rooms=${options.room}`
    } else {
      url += `city=${destination.split(',')[0]}&min=${range[0] || 0}&max=${range[1] || 1000}&rooms=${options.room}`;
    }
    return url;
  }

  console.log(apiUrl())
  const { data, loading, error, reFetch } = useFetch(apiUrl());
  const {dispatch} = useContext(SearchContext)

  const handleClick = () =>{
    dispatch({type:"NEW_SEARCH", payload:{destination, dates, options}})
    reFetch();
  }

  function handleChanges(event, newValue) {
    console.log(newValue);
    setRange(newValue);
  }

  const handleOption = (name, operation) => {
    setOptions(prev=>{
        return {
        ...prev, 
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
        };
    });
  };

  return (
    <div style={{overflowX : "hidden"}}>
      <Navbar />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">{t("list.search")}</h1>
            <div className="lsItem">
              <label>{t("list.destination")}</label>
              <div className="dropdown2">
                <div className="dropdown-btn2" onClick={e => setIsActive(!isActive)}>
                    {destination === "" ? t("list.all") : destination}
                    {isActive ? <FontAwesomeIcon icon={faCaretUp}/> : <FontAwesomeIcon icon={faCaretDown}/>}
                </div>
                {isActive && (
                    <div className="dropdown-content2">
                        {destinations.map((location) =>(
                            <div
                                onClick={(e) => {
                                    setDestination(location.value);
                                    setIsActive(false);
                                }}
                                className="dropdown-item2"
                                key={location.key}
                                value={location.value}
                                {...console.log(destination)}
                            >
                                {location.value}
                            </div>
                        ))}
                    </div>
                )}
              </div>
            </div>
            <div className="lsItem">
              <label>{t("list.checkin")}</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} ${t("header.to")} ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div class="price-text">
                  <div>
                    {t("list.minprice")} <small><br/>{t("list.pernight")}</small>
                  </div>
                  <div class="separator"/>
                  <div>
                    {t("list.maxprice")} <small><br/>{t("list.pernight")}</small>
                  </div>
                </div>
                <div class="price-input">
                  <div class="field">
                    <input type="number" value={range[0]} onChange={e=>setRange([e.target.value, range[1]])} max={0}/>
                  </div>
                  <div class="separator">-</div>
                  <div class="field">
                    <input type="number" value={range[1]} onChange={e=>setRange([range[0], e.target.value])} min={0}/>
                  </div>
                </div>
                <div style = {{ width: "23.5rem", position: "relative"}}>
                  <Slider value = {range} onChange = {handleChanges} valueLabelDisplay="auto" step={10} max={1000} disableSwap/>
                </div>
                <div className="headerSearchItem">
                    {openOptions && <div className="options2">
                        <div className="optionItem2">
                            <span className="optionText2">{t("list.adult")}</span>
                            <div className="optionCounter2">
                                <button disabled={options.adult <= 1} className="optionCounterButton2" onClick={()=>handleOption("adult", "d")}>-</button>
                                <span className="optionCounterNumber2">{options.adult}</span>
                                <button className="optionCounterButton2" onClick={()=>handleOption("adult", "i")}>+</button>
                            </div>
                        </div>
                        <div className="optionItem2">
                            <span className="optionText2">{t("list.children")}</span>
                            <div className="optionCounter2">
                                <button disabled={options.children <= 0} className="optionCounterButton2" onClick={()=>handleOption("children", "d")}>-</button>
                                <span className="optionCounterNumber2">{options.children}</span>
                                <button className="optionCounterButton2" onClick={()=>handleOption("children", "i")}>+</button>
                            </div>
                        </div>
                        <div className="optionItem2">
                            <span className="optionText2">{t("list.room")}</span>
                            <div className="optionCounter2">
                                <button disabled={options.room <= 1} className="optionCounterButton2" onClick={()=>handleOption("room", "d")}>-</button>
                                <span className="optionCounterNumber2">{options.room}</span>
                                <button className="optionCounterButton2" onClick={()=>handleOption("room", "i")}>+</button>
                            </div>
                        </div>
                    </div>}
                  </div>
              </div>
            </div>
            <button onClick={() => handleClick()}>{t("list.search")}</button>
          </div>
          <div className="listResult">
            {loading ? "Loading..." : <>
            {data.map(item=>(
              <SearchItem item={item} key={item._id}/>
            ))}
            </>}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default List;