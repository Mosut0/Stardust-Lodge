import { faBed, faCalendarDays, faPerson, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState, useContext } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {format} from "date-fns"
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const Header = ({type}) => {
    const [selectedOption, setSelectedOption] = useState('Where would you like to go?');
    const [destination, setDestination] = useState("")
    const [openDate, setOpenDate] = useState(false)
    const [dates, setDates] = useState([
     {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
     }
    ]);
    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    const navigate = useNavigate()

    const handleOption = (name, operation) => {
        setOptions(prev=>{
            return {
            ...prev, 
            [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        });
    };

    const handleSelectChange = (e) => {
        setDestination(e.target.value);
    };

    const {dispatch} = useContext(SearchContext)

    const handleSearch = () => {
        dispatch({type:"NEW_SEARCH", payload:{destination, dates, options}})
        navigate("/hotels", { state: {destination, dates, options} })
    };

    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    const handleOptionClick = (option) => {
        setSelectedOption(`${option}`);
        setDestination(`${option}`)
        document.getElementById("myDropdown").classList.remove("show");
    };
    
    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
            {type !== "list" && (
                <>
                <h1 className="headerTitle">Looking for somewhere to stay?</h1>
                <p className="headerDesc">
                    Search for hotels - find instant savings and discounts at our best locations!
                </p>
                <button className="headerBtn">Sign in / Register</button>
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className="headerIcon"/>
                        <div className="dropdown">
                            <span className="dropbtn" onClick={myFunction}>
                                {selectedOption}
                                <FontAwesomeIcon icon={faCaretDown} style={{ paddingLeft: '10px' }} />
                            </span>
                            <div className="dropdown-content" id="myDropdown">
                                <a href="#" onClick={() => handleOptionClick('All')}>All</a>
                                <a href="#" onClick={() => handleOptionClick('Toronto, Canada')}>Toronto, Canada</a>
                                <a href="#" onClick={() => handleOptionClick('London, England')}>London, England</a>
                                <a href="#" onClick={() => handleOptionClick('Paris, France')}>Paris, France</a>
                                <a href="#" onClick={() => handleOptionClick('Dublin, Ireland')}>Dublin, Ireland</a>
                            </div>
                        </div>
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                        <span onClick={()=>setOpenDate(!openDate)} className="headerSearchText">{`
                            ${format(dates[0].startDate, "MM/dd/yyyy")} to 
                            ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                        {openDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDates([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            className="date"
                        />}
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                        <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult(s) · ${options.children} children · ${options.room} room(s)`}</span>
                        {openOptions && <div className="options">
                            <div className="optionItem">
                                <span className="optionText">Adult(s)</span>
                                <div className="optionCounter">
                                    <button disabled={options.adult <= 1} className="optionCounterButton" onClick={()=>handleOption("adult", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.adult}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Children</span>
                                <div className="optionCounter">
                                    <button disabled={options.children <= 0} className="optionCounterButton" onClick={()=>handleOption("children", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.children}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Room(s)</span>
                                <div className="optionCounter">
                                    <button disabled={options.room <= 1} className="optionCounterButton" onClick={()=>handleOption("room", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.room}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerBtn" onClick={handleSearch}>Search</button>
                    </div>
                </div>
                </>
                )}
            </div>
        </div>
    )
}

export default Header