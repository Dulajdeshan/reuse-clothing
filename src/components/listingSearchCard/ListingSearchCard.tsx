import * as React from 'react';
import './ListingSearchCard.css';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';

interface BuyCardProps {
  loading: boolean;
  handleSubmit: (
    count: string,
    garmentType: string,
    garmentDistrict: string
  ) => void;
}

const districts = [
  'Ampara',
  'Batticaloa',
  'Trincomalee',
  'Anuradhapura',
  'Polonnaruwa',
  'Badulla',
  'Moneragala',
  'Colombo',
  'Gampaha',
  'Kalutara',
  'Galle',
  'Hambantota',
  'Matara',
  'Jaffna',
  'Kilinochchi',
  'Mannar',
  'Mullativu',
  'Vavuniya',
  'Kandy',
  'Matale',
  'Nuwara Eliya',
  'Kegalle',
  'Rathnapura',
  'Kurunegala',
  'Puttalam',
];

export default function ListingSearchCard({
  loading,
  handleSubmit,
}: BuyCardProps) {
  const [count, setCount] = useState('');
  const [garmentType, setGarmentType] = useState('');
  const [garmentDistrict, setGarmentDistrict] = useState('');

  const handleGarmentTypeChange = (event: SelectChangeEvent) => {
    setGarmentType(event.target.value as string);
  };

  const handleDistrictChange = (event: SelectChangeEvent) => {
    setGarmentDistrict(event.target.value as string);
  };

  const handleSearch = () => {
    handleSubmit(count, garmentType, garmentDistrict);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '10px',
      }}
    >
      <Typography variant="h6">What do you want to buy?</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          padding: '10px 0',
          alignItems: 'center',
        }}
      >
        <FormControl variant="standard" className="form-input">
          <InputLabel htmlFor="email">No of Garments</InputLabel>
          <Input
            id="count"
            onChange={(e) => setCount(e.target.value)}
            value={count}
            inputProps={{
              min: 1,
            }}
          />
        </FormControl>
        <FormControl
          variant="standard"
          className="form-input"
          style={{ width: 200 }}
        >
          <InputLabel htmlFor="garmentType">Garment Type</InputLabel>
          <Select
            variant="standard"
            labelId="garmentType"
            id="garmentType"
            value={garmentType}
            label="Garment Type"
            onChange={handleGarmentTypeChange}
            style={{ textAlign: 'left', width: 200 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="office-wear">Office Wear</MenuItem>
            <MenuItem value="casual-wear">Casual Wear</MenuItem>
            <MenuItem value="active-wear">Activewear</MenuItem>
            <MenuItem value="winter-clothes">Winter Clothes</MenuItem>
            <MenuItem value="intimates">Intimates</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="standard"
          className="form-input"
          style={{ width: 200 }}
        >
          <InputLabel id="district">Location</InputLabel>
          <Select
            variant="standard"
            labelId="district"
            id="district"
            value={garmentDistrict}
            label="District"
            onChange={handleDistrictChange}
            style={{ textAlign: 'left', width: 200 }}
          >
            <MenuItem value="all">All</MenuItem>
            {districts.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LoadingButton
          loading={false}
          size="large"
          variant="contained"
          onClick={handleSearch}
        >
          Search
        </LoadingButton>
      </Box>
    </Box>
  );
}
