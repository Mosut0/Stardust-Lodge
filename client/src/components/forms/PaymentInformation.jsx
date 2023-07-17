import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const PaymentInformation= ({ cardholderName, cardNumber, expirationDate, cvv, setCardholderName, setCardNumber, setExpirationDate, setCVV}) => {

  return (
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
  );
};

export default PaymentInformation;
