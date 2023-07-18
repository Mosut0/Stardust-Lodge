import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import BookingCalendar from '../../components/calendar/BookingCalendar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/404', { state: 1 });
    }
  }, [user, navigate]);

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    // Add the new event data to the booked events
    setBookedEvents((prevEvents) => [
      ...prevEvents,
      {
        id: prevEvents.length + 1,
        title: eventName,
        start: new Date(eventDate + ' ' + eventTime),
        end: new Date(eventDate + ' ' + eventTime),
      },
    ]);

    // Clear the form fields after submission
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
                Profile
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: '8px', fontSize: '24px' }} />
                <Typography variant="h6">Booking Calendar</Typography>
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
          {/* Event Submission Form */}
          <Box
            component="form"
            onSubmit={handleSubmitEvent}
            sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <Typography variant="h6" gutterBottom>
              Submit Event Date
            </Typography>
            <TextField
              label="Event Name"
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
              label="Event Date"
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
              label="Event Time"
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
              Submit Event
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
