import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import BookingInformation from '../../components/forms/BookingInformation';
import PaymentInformation from '../../components/forms/PaymentInformation';
import { useNavigate, useLocation } from "react-router-dom";
import { faBed, faCalendarDays, faPerson, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import HotelCard from '../../components/forms/HotelCard';
import {format} from "date-fns"
import parseWithOptions from 'date-fns/esm/fp/parseWithOptions';
import "./checkout.css"

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate()

  const dataState = location.state;
  var dataOptions = dataState.options;

  const [activeStep, setActiveStep] = React.useState(0);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  
  const [dates, setDates] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [hotelData, setHotelData] = React.useState(dataState);
  const [isHidden1, setIsHidden1] = React.useState(false);
  const [isHidden2, setIsHidden2] = React.useState(true);
  const [isHidden3, setIsHidden3] = React.useState(true);
  const [isHidden4, setIsHidden4] = React.useState(false);


  const handleDateOrOptionsChange = (date, options) => {
    setHotelData((prevData) => ({
      ...prevData,
      date: [date],
      options: options,
    }));
  };

  const handleOption = (name, operation) => {
    setOptions(prev=>{
        return {
        ...prev, 
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
        };
    });
};

  React.useEffect(() => {
    console.log(dataState.date)
    if (dataState.date.length > 0) {
      setDates([
        {
          startDate: dataState.date[0].startDate,
          endDate: dataState.date[0].endDate,
          key: 'selection'
        }
      ]);
    }
  }, [dataState]);

  console.log(dataOptions)
  if(dataOptions.adult == undefined || dataOptions.children == undefined || dataOptions.room == undefined){
    dataOptions = {
      adult : 1,
      children : 0,
      room : 1
    }
  }
  const [options, setOptions] = React.useState(dataOptions);

  const [cardNumber, setCardNumber] = React.useState('');
  const [expirationDate, setExpirationDate] = React.useState('');
  const [cvv, setCVV] = React.useState('');
  const [cardholderName, setCardholderName] = React.useState('');

  const handleNext = (activeStep) => {
    if(activeStep == 0){
      if (!firstName || !lastName || !email || !phoneNumber) {
        console.log('Fields are empty. Cannot proceed.');
      }else{
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setIsHidden1(true);
        setIsHidden2(false);
      }
    } else if(activeStep == 1){
      if (!cardNumber || !expirationDate || !cvv || !cardholderName) {
        console.log('Fields are empty. Cannot proceed.');
      }else{
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setIsHidden2(true)
        setIsHidden3(false)
        setIsHidden4(true)
      }
    } else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsHidden3(true)
      setIsHidden4(true)
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if(activeStep == 1){
      setIsHidden1(false)
      setIsHidden2(true)
    }else if(activeStep == 2){
      setIsHidden2(false)
      setIsHidden3(true)
      setIsHidden4(false)
    }
  };

  const handleProfile = () => {
    navigate("/profile")
  };

  const steps = {0:['Booking Information', null], 
    1:['Payment Details', null], 
    2:['Confirmation', null]
  };


  function numberOfNights(date1, date2) {
    const msPerDay = 1000 * 60 *60 *24;
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / msPerDay)
    return diffDays;
  }

  let nights;
  if (dates.length == 0){
    nights = 1;
  }else {
    nights = numberOfNights(dates[0].endDate, dates[0].startDate);
  }
  if(nights == 0) nights++;

  return (
    <><Navbar />
    <Box sx={{ width: '80%', alignItems: "center", margin: "5em auto" }}>
      <Grid container spacing={2} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
        <Grid item xs={8}>
          <Stepper activeStep={activeStep}>
          {Object.keys(steps).map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{steps[label][0]}</StepLabel>
              </Step>
            );
          })}
          </Stepper>
          {activeStep === Object.keys(steps).length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1, textAlign: "center" }}>
                Thank you for booking an appointment at Stardust Lodge!<br></br>
                <br></br>
                A confirmation of your appointment has been sent to your email.<br></br>
                To cancel, call us at (123) 456-7890.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, textAlign: "center", margin : "auto" }}>
                <Box sx={{ flex: '1 1 auto', textAlign: "center", margin : "auto" }} />
                <Button onClick={handleProfile}>Profile</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div id="part1" style={{ display: isHidden1 ? 'none' : 'block' }}>
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
                            ${format(dates[0].startDate, "MM/dd/yyyy")} to 
                            ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                        <DateRange
                            editableDateInputs={true}
                            onChange={(item) => {setDates([item.selection]);}}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            style={{fontSize: 15}}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FontAwesomeIcon icon={faPerson} className="headerIcon" style={{fontSize: 20, marginRight: "5px"}}/>
                        <span style={{fontSize: 20}}>{`${options.adult} adult(s) · ${options.children} children · ${options.room} room(s)`}</span>
                        <div className='optionWrapper'>
                            <div className="optionItem" >
                                <span className="optionText" style={{fontSize: 20}}>Adult(s)</span>
                                <div className="optionCounter">
                                    <button disabled={options.adult <= 1} className="optionCounterButton" onClick={()=>handleOption("adult", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.adult}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem" >
                                <span className="optionText" style={{fontSize: 20}}>Children</span>
                                <div className="optionCounter">
                                    <button disabled={options.children <= 0} className="optionCounterButton" onClick={()=>handleOption("children", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.children}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem" >
                                <span className="optionText" style={{fontSize: 20}}>Room(s)</span>
                                <div className="optionCounter">
                                    <button disabled={options.room <= 1} className="optionCounterButton" onClick={()=>handleOption("room", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.room}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
                                </div>
                            </div>
                        </div>
                    </Grid>
                  </Grid>
                </Box>
              </div>
              <div id="part2" style={{ display: isHidden2 ? 'none' : 'block' }}>
                <h2 style={{fontSize: 30}}>Payment Details</h2>
                <Box sx={{ maxWidth: '60%', marginTop: '30px' }}>
                  <Grid container spacing={2} justifyContent="flex-start" sx={{ flexDirection: { md: 'column', lg: 'row' } }}>
                    <Grid item xs={12}>
                      <TextField
                        label="Cardholder's Name"
                        variant="outlined"
                        fullWidth
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Card Number"
                        variant="outlined"
                        fullWidth
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Expiration Date"
                        variant="outlined"
                        fullWidth
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="CVV"
                        variant="outlined"
                        fullWidth
                        value={cvv}
                        onChange={(e) => setCVV(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </div>
              <div id="part3" style={{ display: isHidden3 ? 'none' : 'block' }}>
                <h2 style={{fontSize: 30}}>Confirmation</h2>
                <div style={{textAlign: "center"}}>
                  <h3 style={{fontSize: 25}}>Personal Information</h3>
                  <h4>Full Name: {firstName} {lastName}</h4>
                  <h4>Email: {email}</h4>
                  <h4>Phone Number: {phoneNumber}</h4>
              </div>
                <div className="order-card" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                      <h2 style={{ fontWeight: "bold", whiteSpace: "nowrap", marginRight: "1rem" }}>Your Reservation</h2>
                  </div>
                  <hr style={{width: "100%"}}/>
                  <div className="order-items" style={{ whiteSpace: "nowrap" }}>
                      <img src={dataState.hotel.photos[0]} alt="Reservation" style={{ width: "100%", maxWidth: "400px", marginBottom: "1rem" }} />
                      <h3>{dataState.hotel.name}</h3>
                      <div className="order-item" style={{fontWeight: "bold"}}>{dataState.hotel.address}</div>
                      <div className="order-item"><b># of Rooms:</b> {options.room}</div>
                      <div className="order-item"><b># of Guests:</b> {options.children + options.adult}</div>
                      <div className="order-item"><b>Check-In Date:</b> {format(
                          dates[0].startDate,
                          "MM/dd/yyyy"
                      )}
                      </div>
                      <div className="order-item"><b>Check-Out Date:</b> {format(
                          dates[0].endDate, 
                          "MM/dd/yyyy"
                      )}
                      </div>
                      <hr style={{width: "100%"}}/>
                      <div className='order-item' style={{fontSize: "20px"}}><b>Price per night: </b>${dataState.hotel.cheapestPrice}</div>
                      <div className='order-item' style={{fontSize: "20px", marginBottom: 0}}><b>Total: </b>${nights * dataState.hotel.cheapestPrice}</div>
                  </div>
                  <h4 id="total" style={{ fontWeight: "bold", marginTop: "2rem", whiteSpace: "nowrap" }}></h4>
              </div>
              </div>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />

                <Button onClick={()=>handleNext(activeStep)}>
                  {activeStep === Object.keys(steps).length - 1 ? 'Book' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Grid>
        <Grid item xs={4}>
          <div className="order-card" style={{ display: isHidden4 ? 'none' : 'flex', flexDirection: "column", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                  <h2 style={{ fontWeight: "bold", whiteSpace: "nowrap", marginRight: "1rem" }}>Your Reservation</h2>
              </div>
              <hr style={{width: "100%"}}/>
              <div className="order-items" style={{ whiteSpace: "nowrap" }}>
                  <img src={dataState.hotel.photos[0]} alt="Reservation" style={{ width: "100%", maxWidth: "400px", marginBottom: "1rem" }} />
                  <h3>{dataState.hotel.name}</h3>
                  <div className="order-item" style={{fontWeight: "bold"}}>{dataState.hotel.address}</div>
                  <div className="order-item"><b># of Rooms:</b> {options.room}</div>
                  <div className="order-item"><b># of Guests:</b> {options.children + options.adult}</div>
                  <div className="order-item"><b>Check-In Date:</b> {format(
                      dates[0].startDate,
                      "MM/dd/yyyy"
                  )}
                  </div>
                  <div className="order-item"><b>Check-Out Date:</b> {format(
                      dates[0].endDate, 
                      "MM/dd/yyyy"
                  )}
                  </div>
                  <hr style={{width: "100%"}}/>
                  <div className='order-item' style={{fontSize: "20px"}}><b>Price per night: </b>${dataState.hotel.cheapestPrice}</div>
                  <div className='order-item' style={{fontSize: "20px", marginBottom: 0}}><b>Total: </b>${nights * dataState.hotel.cheapestPrice}</div>
              </div>
              <h4 id="total" style={{ fontWeight: "bold", marginTop: "2rem", whiteSpace: "nowrap" }}></h4>
          </div>
        </Grid>
      </Grid>
    </Box>
    <Footer />
    </>
  );
}

export default Checkout