import React from "react";
import "./featured.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Featured = () => {
    const { t } = useTranslation();

    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });
    const navigate = useNavigate();

    const handleClick = (destination) => {
        navigate("/hotels", { state: { destination, dates, options } });
    };

    return (
        <div className="featured" role="list">
            <div className="featuredItem" role="listitem" onClick={() => handleClick("London")} style={{ cursor: "pointer" }}>
                <img src="https://dandg.azureedge.net/cache/2/2/5/7/f/a/2257fa9015c73278d8fa06c2ce23f2df6d5531c4.jpg" alt="Picture of city of London" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>{t("featured.london")}</h1>
                    <h2>{t("featured.properties")}</h2>
                </div>
            </div>
            <div className="featuredItem" role="listitem" onClick={() => handleClick("Paris")} style={{ cursor: "pointer" }}>
                <img src="https://wallpaperaccess.com/full/203323.jpg" alt="Picture of city of Paris" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>Paris</h1>
                    <h2>{t("featured.properties")}</h2>
                </div>
            </div>

            <div className="featuredItem" role="listitem" onClick={() => handleClick("Dublin")} style={{ cursor: "pointer" }}>
                <img src="https://www.ncirl.ie/portals/0/Images/650x366-Cards-Teasers-Inners/Dublin%20city%20centre%201.jpg" alt="Picture of city of Dublin" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>Dublin</h1>
                    <h2>{t("featured.properties")}</h2>
                </div>
            </div>

            <div className="featuredItem" role="listitem" onClick={() => handleClick("Toronto")} style={{ cursor: "pointer" }}>
                <img src="https://cdn.britannica.com/93/94493-050-35524FED/Toronto.jpg" alt="Picture of city of Toronto" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>Toronto</h1>
                    <h2>{t("featured.properties")}</h2>
                </div>
            </div>
        </div>
    );
};

export default Featured;
