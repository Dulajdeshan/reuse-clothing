import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import './RegisterCard.css';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { useState } from 'react';

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

interface RegisterCardProps {
  loading: boolean;
  handleSubmit: (data: any) => void;
}

export default function RegisterCard({
  loading,
  handleSubmit,
}: RegisterCardProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [mobile, setMobile] = useState('');
  const [shopName, setShopName] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handleDistrictChange = (event: SelectChangeEvent) => {
    setDistrict(event.target.value as string);
  };

  const onClickRegister = () => {
    handleSubmit({
      email,
      password,
      firstName,
      lastName,
      role,
      mobile,
      shopName,
      address,
      district,
    });
  };
  return (
    <Card sx={{ minWidth: 400 }}>
      <CardHeader title="Register" />
      <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { sm: '1fr 1fr' },
            gap: 1,
            marginBottom: '10px !important',
          }}
        >
          <FormControl variant="standard">
            <InputLabel htmlFor="first-name">First Name</InputLabel>
            <Input
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="last-name">Last Name</InputLabel>
            <Input
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { sm: '1fr' },
          }}
        >
          <FormControl variant="standard" className="login-input">
            <InputLabel id="role">Register as</InputLabel>
            <Select
              variant="standard"
              labelId="role"
              id="role"
              value={role}
              label="Role"
              onChange={handleRoleChange}
              style={{ textAlign: 'left' }}
            >
              <MenuItem value="Customer">Customer</MenuItem>
              <MenuItem value="Seller">Seller</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" className="login-input">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl variant="standard" className="login-input">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl variant="standard" className="login-input">
            <InputLabel htmlFor="mobile">Mobile No</InputLabel>
            <Input
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </FormControl>

          {role !== 'Seller' && (
            <FormControl variant="standard" className="login-input">
              <InputLabel id="district">District</InputLabel>
              <Select
                variant="standard"
                labelId="district"
                id="district"
                value={district}
                label="District"
                onChange={handleDistrictChange}
                style={{ textAlign: 'left' }}
              >
                {districts.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
        {role === 'Seller' && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { sm: '1fr' },
            }}
          >
            <FormControl variant="standard" className="login-input">
              <InputLabel htmlFor="shopName">Shop Name</InputLabel>
              <Input
                id="shopName"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </FormControl>

            <FormControl variant="standard" className="login-input">
              <InputLabel id="district">District</InputLabel>
              <Select
                variant="standard"
                labelId="district"
                id="district"
                value={district}
                label="District"
                onChange={handleDistrictChange}
                style={{ textAlign: 'left' }}
              >
                {districts.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="standard" className="login-input">
              <InputLabel htmlFor="address">Address</InputLabel>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>
          </Box>
        )}
      </CardContent>
      <CardActions>
        <Stack
          direction="column"
          spacing={2}
          justifyContent="center"
          width="100%"
        >
          <LoadingButton
            loading={loading}
            size="large"
            fullWidth
            variant="contained"
            onClick={onClickRegister}
          >
            Register
          </LoadingButton>
          <Typography variant="body2" component="h2">
            Already have an account?
          </Typography>
          <Button href="/login">Login</Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
