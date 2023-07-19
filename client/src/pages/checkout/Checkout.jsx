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
import { useNavigate, useLocation } from "react-router-dom";
import { faBed, faCalendarDays, faPerson, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {format} from "date-fns"
import parseWithOptions from 'date-fns/esm/fp/parseWithOptions';
import "./checkout.css"
import { useTranslation } from 'react-i18next';

const Checkout = () => {
  const { t } = useTranslation();

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
  
  const [personalFieldError, setPersonalFieldError] = React.useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false
  })

  const [paymentFieldError, setPaymentFieldError] = React.useState({
    holder: false,
    card: false,
    exp: false,
    cvv: false
  })

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
      const fields = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phoneNumber
      }
      const hasEmptyFields = Object.keys(fields).some((key) => !fields[key]);

      if (hasEmptyFields) {
        const updatedFieldError = {};
        for (const key in fields) {
          updatedFieldError[key] = !fields[key];
        }
        setPersonalFieldError(updatedFieldError);
        console.log(updatedFieldError)
        return; 
      }else{
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setIsHidden1(true);
        setIsHidden2(false);
      }
    } else if(activeStep == 1){
      const fields = {
        holder: cardholderName,
        card: cardNumber,
        exp: expirationDate,
        cvv: cvv
      }
      const hasEmptyFields = Object.keys(fields).some((key) => !fields[key]);

      if (hasEmptyFields) {
        const updatedFieldError = {};
        for (const key in fields) {
          updatedFieldError[key] = !fields[key];
        }
        setPaymentFieldError(updatedFieldError);
        console.log(updatedFieldError)
        return;
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
    const event = {
      eventName: dataState.hotel.name,
      eventStart: dates[0].startDate,
      eventEnd: dates[0].endDate
    }
    navigate("/profile", {state: event})
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

  const handlefnChange = (e) => {
    setFirstName(e.target.value);
    setPersonalFieldError((prevState) => ({
      ...prevState,
      firstName: false,
    }));
  };

  const handlelnChange = (e) => {
    setLastName(e.target.value);
    setPersonalFieldError((prevState) => ({
      ...prevState,
      lastName: false,
    }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setPersonalFieldError((prevState) => ({
      ...prevState,
      email: false,
    }));
  };

  const handlephoneChange = (e) => {
    setPhoneNumber(e.target.value);
    setPersonalFieldError((prevState) => ({
      ...prevState,
      phone: false,
    }));
  };

  const handleholderChange = (e) => {
    setCardholderName(e.target.value);
    setPaymentFieldError((prevState) => ({
      ...prevState,
      holder: false,
    }));
  };

  const handlecardChange = (e) => {
    setCardNumber(e.target.value);
    setPaymentFieldError((prevState) => ({
      ...prevState,
      card: false,
    }));
  };

  const handleexpChange = (e) => {
    setExpirationDate(e.target.value);
    setPaymentFieldError((prevState) => ({
      ...prevState,
      exp: false,
    }));
  };

  const handlecvvChange = (e) => {
    setCVV(e.target.value);
    setPaymentFieldError((prevState) => ({
      ...prevState,
      cvv: false,
    }));
  };



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
                {t("checkout.thanks")}<br></br>
                <br></br>
                {t("checkout.sent")}<br></br>
                {t("checkout.call")}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, textAlign: "center", margin : "auto" }}>
                <Box sx={{ flex: '1 1 auto', textAlign: "center", margin : "auto" }} />
                <Button onClick={handleProfile}>{t("checkout.profile")}</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div id="part1" style={{ display: isHidden1 ? 'none' : 'block' }}>
                <h2 style={{fontSize: 30}}>{t("checkout.booking")}</h2>
                <Box sx={{ maxWidth: '60%', marginTop: '30px' }}>
                  <Grid container spacing={2} justifyContent="flex-start" sx={{ flexDirection: { md: 'column', lg: 'row' } }}>
                    <Grid item xs={6}>
                      <TextField
                        label={t("checkout.first")}
                        variant="outlined"
                        fullWidth
                        id="firstName"
                        value={firstName}
                        onChange={handlefnChange}
                        error={personalFieldError.firstName}
                        helperText={personalFieldError.firstName && t("checkout.fnamereq")}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={t("checkout.last")}
                        variant="outlined"
                        fullWidth
                        id="lastName"
                        value={lastName}
                        onChange={handlelnChange}
                        error={personalFieldError.lastName}
                        helperText={personalFieldError.lastName && t("checkout.lnamereq")}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={t("checkout.email")}
                        variant="outlined"
                        type="email"
                        id="email"
                        fullWidth
                        value={email}
                        onChange={handleEmailChange}
                        error={personalFieldError.email}
                        helperText={personalFieldError.email && t("checkout.emailreq")}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={t("checkout.phone")}
                        variant="outlined"
                        type="number"
                        fullWidth
                        id="phone"
                        value={phoneNumber}
                        onChange={handlephoneChange}
                        error={personalFieldError.phone}
                        helperText={personalFieldError.phone && t("checkout.phonereq")}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <h2 style={{fontSize: 30}}>{t("checkout.drg")}</h2>
                <Box sx={{ maxWidth: '100%', marginTop: '-20px' }}>
                  <Grid container spacing={2} justifyContent="flex-start" sx={{ flexDirection: { md: 'column', lg: 'row' } }}>
                    <Grid item xs={6}>
                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" style={{fontSize: 20}}/>
                        <span style={{fontSize: 20}}>{`
                            ${format(dates[0].startDate, "MM/dd/yyyy")} ${t("header.to")}
                            ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                        <DateRange
                            editableDateInputs={true}
                            onChange={(item) => {setDates([item.selection]);}}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            style={{fontSize: 15}}
                        />
                    </Grid>
                    <Grid item xs={6} style={{position: "relative", left: "30px"}}>
                        <FontAwesomeIcon icon={faPerson} className="headerIcon" style={{fontSize: 20, marginRight: "5px", marginLeft: "40px"}}/>
                        <span style={{fontSize: 20}}>{`${options.adult} ${t("header.adult")} · ${options.children} ${t("header.children")} · ${options.room} ${t("header.room")}`}</span>
                        <div className='optionWrapper' style={{marginLeft: "30px"}}>
                            <div className="optionItem" >
                                <span className="optionText" style={{fontSize: 20}}>{t("checkout.adult2")}</span>
                                <div className="optionCounter">
                                    <button disabled={options.adult <= 1} className="optionCounterButton" onClick={()=>handleOption("adult", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.adult}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem" >
                                <span className="optionText" style={{fontSize: 20}}>{t("checkout.children2")}</span>
                                <div className="optionCounter">
                                    <button disabled={options.children <= 0} className="optionCounterButton" onClick={()=>handleOption("children", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.children}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem" >
                                <span className="optionText" style={{fontSize: 20}}>{t("checkout.room2")}</span>
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
                <h2 style={{fontSize: 30}}>{t("checkout.payment")}</h2>
                <Box sx={{ maxWidth: '60%', marginTop: '30px' }}>
                  <Grid container spacing={2} justifyContent="flex-start" sx={{ flexDirection: { md: 'column', lg: 'row' } }}>
                    <Grid item xs={12}>
                      <TextField
                        label={t("checkout.holder")}
                        variant="outlined"
                        id="holder"
                        fullWidth
                        value={cardholderName}
                        onChange={handleholderChange}
                        error={paymentFieldError.holder}
                        helperText={paymentFieldError.holder && t("checkout.holderreq")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label={t("checkout.card")}
                        variant="outlined"
                        type="number"
                        id="card"
                        fullWidth
                        value={cardNumber}
                        onChange={handlecardChange}
                        error={paymentFieldError.card}
                        helperText={paymentFieldError.card && t("checkout.cardreq")}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={t("checkout.exp")}
                        variant="outlined"
                        placeholder='MMYY'
                        type="number"
                        id="exp"
                        fullWidth
                        value={expirationDate}
                        onChange={handleexpChange}
                        error={paymentFieldError.exp}
                        helperText={paymentFieldError.exp && t("checkout.expreq")}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="CVV*"
                        variant="outlined"
                        type="number"
                        id="cvv"
                        fullWidth
                        value={cvv}
                        onChange={handlecvvChange}
                        error={paymentFieldError.cvv}
                        helperText={paymentFieldError.cvv && t("checkout.cvvreq")}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </div>
              <div id="part3" style={{ display: isHidden3 ? 'none' : 'block' }}>
                <h2 style={{fontSize: 30}}>{t("checkout.confirmation")}</h2>
                <div style={{textAlign: "center"}}>
                  <h3 style={{fontSize: 25}}>{t("checkout.personal")}</h3>
                  <h4>{t("login.first")}: {firstName} {lastName}</h4>
                  <h4>{t("login.email")}: {email}</h4>
                  <h4>{t("checkout.phone").slice(0, -1)}: {phoneNumber}</h4>
              </div>
                <div className="order-card" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                      <h2 style={{ fontWeight: "bold", whiteSpace: "nowrap", marginRight: "1rem" }}>{t("checkout.reservation")}</h2>
                  </div>
                  <hr style={{width: "100%"}}/>
                  <div className="order-items" style={{ whiteSpace: "nowrap" }}>
                      <img src={dataState.hotel.photos[0]} alt={"Room image of " + dataState.hotel.name} style={{ width: "100%", maxWidth: "400px", marginBottom: "1rem" }} />
                      <h3>{dataState.hotel.name}</h3>
                      <div className="order-item" style={{fontWeight: "bold"}}>{dataState.hotel.address}</div>
                      <div className="order-item"><b>{t("checkout.numrooms")}:</b> {options.room}</div>
                      <div className="order-item"><b>{t("checkout.numguests")}:</b> {options.children + options.adult}</div>
                      <div className="order-item"><b>{t("checkout.checkin")}:</b> {format(
                          dates[0].startDate,
                          "MM/dd/yyyy"
                      )}
                      </div>
                      <div className="order-item"><b>{t("checkout.checkout")}:</b> {format(
                          dates[0].endDate, 
                          "MM/dd/yyyy"
                      )}
                      </div>
                      <hr style={{width: "100%"}}/>
                      <div className='order-item' style={{fontSize: "20px"}}><b>{t("checkout.ppn")}: </b>${dataState.hotel.cheapestPrice}</div>
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
                  {t("checkout.back")}
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
                  <div className="order-item"><b>{t("checkout.numrooms")}:</b> {options.room}</div>
                  <div className="order-item"><b>{t("checkout.numguests")}:</b> {options.children + options.adult}</div>
                  <div className="order-item"><b>{t("checkout.checkin")}:</b> {format(
                      dates[0].startDate,
                      "MM/dd/yyyy"
                  )}
                  </div>
                  <div className="order-item"><b>{t("checkout.checkout")}:</b> {format(
                      dates[0].endDate, 
                      "MM/dd/yyyy"
                  )}
                  </div>
                  <hr style={{width: "100%"}}/>
                  <div className='order-item' style={{fontSize: "20px"}}><b>{t("checkout.ppn")}: </b>${dataState.hotel.cheapestPrice}</div>
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