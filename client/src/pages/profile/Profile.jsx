import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTranslation } from 'react-i18next';

const localizer = momentLocalizer(moment);

const Profile = () => {
  const { t } = useTranslation();

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [bookedEvents, setBookedEvents] = useState(state !== null ? 
    [{id: 0,
      title: state.eventName,
      start: new Date(state.eventStart),
      end: new Date(state.eventEnd)
    }] : []);

  console.log(bookedEvents)

  useEffect(() => {
    if (!user) {
      navigate('/404', { state: 1 });
    }
  }, [user, navigate]);

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    setBookedEvents((prevEvents) => [
      ...prevEvents,
      {
        id: prevEvents.length + 1,
        title: eventName,
        start: new Date(eventDate + ' ' + eventTime),
        end: new Date(eventDate + ' ' + eventTime),
      },
    ]);

    setEventName('');
    setEventDate('');
    setEventTime('');
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          {/* Booking Calendar */}
            <Box p={4} flexGrow={1} sx={{ marginLeft: '20px' }}>
            <Typography variant="h4" gutterBottom>
                {t("profile.profile")}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: '8px', fontSize: '24px' }} />
                <Typography variant="h6">{t("profile.booking")}</Typography>
            </Box>
            <Box width="100%" sx={{ minHeight: 0, overflow: 'hidden' }}>
                <Calendar
                localizer={localizer}
                events={bookedEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                />
            </Box>
            </Box>
          <Box
            component="form"
            onSubmit={handleSubmitEvent}
            sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <Typography variant="h6" gutterBottom>
            {t("profile.submit")}
            </Typography>
            <TextField
              label={t("profile.eventname")}
              variant="outlined"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: '8px' }} />
                ),
              }}
            />
            <TextField
              label={t("profile.eventdate")}
              variant="outlined"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: '8px' }} />
                ),
              }}
            />
            <TextField
              label={t("profile.eventtime")}
              variant="outlined"
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              fullWidth
              required
              InputProps={{
                startAdornment: <FontAwesomeIcon icon={faBed} style={{ marginRight: '8px' }} />,
              }}
            />
            <Button type="submit" variant="contained">
              {t("profile.submitevent")}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
