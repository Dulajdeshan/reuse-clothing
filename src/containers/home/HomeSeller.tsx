import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function HomeSeller() {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '25px 15px',
      }}
    >
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined" style={{ padding: 10, margin: 10 }}>
          <>
            <CardContent>
              <img
                src="assets/donate-cloth.png"
                alt="Donate clothes"
                style={{
                  padding: 10,
                  maxWidth: 100,
                }}
              />
              <Typography sx={{ fontSize: 16 }} color="text.secondary">
                Do you have extra clothes
              </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
              <Button size="medium" variant="contained">
                Donate
              </Button>
            </CardActions>
          </>
        </Card>
      </Box>
    </Box>
  );
}
