import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  handleDeleteDonations,
  handleGetDonations,
} from '../../redux/actions/customerActions';
import DonationTable from '../../components/donationTable/DonationTable';

export default function HomeCustomer() {
  const dispatch = useAppDispatch();

  const donations = useAppSelector((state) => state.customer.donations);

  useEffect(() => {
    dispatch(handleGetDonations());
  }, []);

  const onDeleteDonation = (donationIds: any) => {
    dispatch(handleDeleteDonations(donationIds));
  };

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '25px 15px',
        flexDirection: 'column',
      }}
    >
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
              <CardActions
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button size="medium" variant="contained" href="/donate">
                  Donate
                </Button>
              </CardActions>
            </>
          </Card>
        </Box>
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined" style={{ padding: 10, margin: 10 }}>
            <>
              <CardContent>
                <img
                  src="assets/buy-cloth.png"
                  alt="Buy clothes"
                  style={{
                    padding: 10,
                    maxWidth: 100,
                  }}
                />
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  Do you want to to buy clothes
                </Typography>
              </CardContent>
              <CardActions
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button size="medium" variant="contained" href="/listings">
                  Buy
                </Button>
              </CardActions>
            </>
          </Card>
        </Box>
      </Box>
      <DonationTable data={donations} handleDelete={onDeleteDonation} />
    </Box>
  );
}
