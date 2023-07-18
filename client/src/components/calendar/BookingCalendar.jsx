import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const BookingCalendar = () => {
  // Your booking calendar logic will go here
  // You can store the booked events in the component state or fetch them from an API.

  const bookedEvents = [
    {
      id: 1,
      title: 'Event 1',
      start: new Date(2023, 6, 20, 10, 0),
      end: new Date(2023, 6, 20, 12, 0),
    },
    // Add more booked events here
  ];

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Booking Calendar
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <FontAwesomeIcon icon={faBed} style={{ marginRight: '8px', fontSize: '24px' }} />
        <Typography variant="h5">Stardust Lodge</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: '8px', fontSize: '24px' }} />
        <Typography variant="h6">Check availability and book events</Typography>
      </Box>
      <Calendar
        localizer={localizer}
        events={bookedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </Box>
  );
};

export default BookingCalendar;
