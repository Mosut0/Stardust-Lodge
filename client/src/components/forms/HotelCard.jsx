import React from 'react';
import "./hotelcard.css"
import { format } from "date-fns";

const HotelCard = ({ userData }) => {
    const [rerenderKey, setRerenderKey] = React.useState(0);
    const handleDateOrOptionsChange = () => {
        setRerenderKey((prevKey) => prevKey + 1);
      };

    React.useEffect(() => {
    }, [userData]);

  return (
    <>
    <div key={rerenderKey}>
        <div className="order-card" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                <h2 style={{ fontWeight: "bold", whiteSpace: "nowrap", marginRight: "1rem" }}>Your Reservation</h2>
            </div>
            <hr style={{width: "100%"}}/>
            <div className="order-items" style={{ whiteSpace: "nowrap" }}>
                <img src={userData.hotel.photos[0]} alt="Reservation" style={{ width: "100%", maxWidth: "400px", marginBottom: "1rem" }} />
                <h3>{userData.hotel.name}</h3>
                <div className="order-item" style={{fontWeight: "bold"}}>{userData.hotel.address}</div>
                <div className="order-item"><b># of Rooms:</b> {userData.options.room}</div>
                <div className="order-item"><b># of Guests:</b> {userData.options.children + userData.options.adult}</div>
                <div className="order-item"><b>Check-In Date:</b> {format(
                    userData.date[0].startDate,
                    "MM/dd/yyyy"
                )}
                </div>
                <div className="order-item"><b>Check-Out Date:</b> {format(
                    userData.date[0].endDate, 
                    "MM/dd/yyyy"
                )}
                </div>
            </div>
            <h4 id="total" style={{ fontWeight: "bold", marginTop: "2rem", whiteSpace: "nowrap" }}></h4>
        </div>
    </div>
    </>
  );
};

export default HotelCard;
