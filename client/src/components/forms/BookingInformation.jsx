import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { faBed, faCalendarDays, faPerson, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {format} from "date-fns"


const BookingInformation = ({ firstName, setFirstName, lastName, setLastName, email, setEmail, phoneNumber, setPhoneNumber, dates2, setDates2, options2, setOptions2, onDateOrOptionsChange }) => {
    const [dates, setDates] = React.useState([dates2]);
    const [options, setOptions] = React.useState(options2);

    const handleOption = (name, operation) => {
        setOptions(prev=>{
            return {
            ...prev, 
            [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        });
        setOptions2(prev=>{
            return {
            ...prev, 
            [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        });
        onDateOrOptionsChange(dates2, options2);
    };

    return (
    <>
    <h2 style={{fontSize: 30}}>Booking Information</h2>
    <Box sx={{ maxWidth: '60%', marginTop: '30px' }}>
      <Grid container spacing={2} justifyContent="flex-start" sx={{ flexDirection: { md: 'column', lg: 'row' } }}>
        <Grid item xs={6}>
          <TextField
            label="First Name*"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Last Name*"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Email*"
            variant="outlined"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Phone Number*"
            variant="outlined"
            type="tel"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>

    <h2 style={{fontSize: 30}}>Date, Rooms & Guests</h2>
    <Box sx={{ maxWidth: '100%', marginTop: '-20px' }}>
      <Grid container spacing={2} justifyContent="flex-start" sx={{ flexDirection: { md: 'column', lg: 'row' } }}>
        <Grid item xs={6}>
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" style={{fontSize: 20}}/>
            <span style={{fontSize: 20}}>{`
                ${format(dates2[0].startDate, "MM/dd/yyyy")} to 
                ${format(dates2[0].endDate, "MM/dd/yyyy")}`}</span>
            <DateRange
                editableDateInputs={true}
                onChange={(item) => {setDates([item.selection]); setDates2([item.selection]); onDateOrOptionsChange([item.selection], options2);}}
                moveRangeOnFirstSelection={false}
                ranges={dates2}
                style={{fontSize: 15}}
            />
        </Grid>
        <Grid item xs={6}>
            <FontAwesomeIcon icon={faPerson} className="headerIcon" style={{fontSize: 20, marginRight: "5px"}}/>
            <span style={{fontSize: 20}}>{`${options2.adult} adult(s) · ${options2.children} children · ${options2.room} room(s)`}</span>
            <div className='optionWrapper'>
                <div className="optionItem" >
                    <span className="optionText" style={{fontSize: 20}}>Adult(s)</span>
                    <div className="optionCounter">
                        <button disabled={options2.adult <= 1} className="optionCounterButton" onClick={()=>handleOption("adult", "d")}>-</button>
                        <span className="optionCounterNumber">{options2.adult}</span>
                        <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
                    </div>
                </div>
                <div className="optionItem" >
                    <span className="optionText" style={{fontSize: 20}}>Children</span>
                    <div className="optionCounter">
                        <button disabled={options2.children <= 0} className="optionCounterButton" onClick={()=>handleOption("children", "d")}>-</button>
                        <span className="optionCounterNumber">{options2.children}</span>
                        <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
                    </div>
                </div>
                <div className="optionItem" >
                    <span className="optionText" style={{fontSize: 20}}>Room(s)</span>
                    <div className="optionCounter">
                        <button disabled={options2.room <= 1} className="optionCounterButton" onClick={()=>handleOption("room", "d")}>-</button>
                        <span className="optionCounterNumber">{options2.room}</span>
                        <button className="optionCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
                    </div>
                </div>
            </div>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default BookingInformation;
