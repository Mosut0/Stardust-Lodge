import { faBed, faCalendarDays, faPerson, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState, useContext, useEffect } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {format} from "date-fns"
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const Header = ({type}) => {
    const { t } = useTranslation();

    const [selectedOption, setSelectedOption] = useState(t("header.where"));
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
    const { user } = useContext(AuthContext);

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

    const handleLogin = () => {
        dispatch({type:"LOGIN_START"})
        navigate("/login", {state : false})
    };

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

    const updateOptions = (option, value) => {
        setOptions(prevOptions => ({
            ...prevOptions,
            [option]: parseInt(value),
        }));
    };
    
    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
            {type !== "list" && (
                <>
                <h1 className="headerTitle">{t("header.title")}</h1>
                <p className="headerDesc">
                {t("header.desc")}
                </p>
                {!user && <button className="headerBtn" onClick={handleLogin}>{t("header.login")}</button>}
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className="headerIcon"/>
                        <div className="dropdown">
                            <span
                                className="dropbtn"
                                role="button"
                                tabIndex="0"
                                aria-haspopup="true"
                                aria-expanded="false"
                                onClick={myFunction}
                            >
                                {destination === "" ? t("header.where") : destination}
                                <FontAwesomeIcon icon={faCaretDown} style={{ paddingLeft: '10px' }} />
                            </span>
                            <div className="dropdown-content" id="myDropdown" role="menu">
                                <a href="#" role="menuitem" onClick={() => handleOptionClick('All')}>
                                    {t("header.all")}
                                </a>
                                <a href="#" role="menuitem" onClick={() => handleOptionClick('Toronto, Canada')}>
                                    Toronto, Canada
                                </a>
                                <a href="#" role="menuitem" onClick={() => handleOptionClick('London, England')}>
                                    {t("header.london")}
                                </a>
                                <a href="#" role="menuitem" onClick={() => handleOptionClick('Paris, France')}>
                                    Paris, France
                                </a>
                                <a href="#" role="menuitem" onClick={() => handleOptionClick('Dublin, Ireland')}>
                                    {t("header.dublin")}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                        <span
                            role="button"
                            tabIndex="0"
                            onClick={() => setOpenDate(!openDate)}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') setOpenDate(!openDate);
                            }}
                            className="headerSearchText"
                            aria-label={`${format(dates[0].startDate, "MM/dd/yyyy")} ${t("header.to")} ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                        >
                            {`
                            ${format(dates[0].startDate, "MM/dd/yyyy")} ${t("header.to")} 
                            ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                        </span>
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
                        <span
                            role="button"
                            tabIndex="0"
                            onClick={() => setOpenOptions(!openOptions)}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') setOpenOptions(!openOptions);
                            }}
                            className="headerSearchText"
                            aria-label={`${options.adult} ${t("header.adult")} · ${options.children} ${t("header.children")} · ${options.room} ${t("header.room")}`}
                        >
                            {`${options.adult} ${t("header.adult")} · ${options.children} ${t("header.children")} · ${options.room} ${t("header.room")}`}
                        </span>
                        {openOptions && <div className="options">
                            <div className="optionItem">
                                <span className="optionText">{t("header.adult2")}</span>
                                <div className="optionCounter">
                                    <button disabled={options.adult <= 1} className="optionCounterButton" onClick={()=>handleOption("adult", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.adult}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">{t("header.children2")}</span>
                                <div className="optionCounter">
                                    <button disabled={options.children <= 0} className="optionCounterButton" onClick={()=>handleOption("children", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.children}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">{t("header.room2")}</span>
                                <div className="optionCounter">
                                    <button disabled={options.room <= 1} className="optionCounterButton" onClick={()=>handleOption("room", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.room}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className="headerSearchItem">
                        <button
                            className="headerBtn"
                            onClick={handleSearch}
                            aria-label={t("header.search")}
                        >
                            {t("header.search")}
                        </button>
                    </div>
                </div>
                </>
                )}
            </div>
        </div>
    )
}

export default Header