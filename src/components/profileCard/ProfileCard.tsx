import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import './ProfileCard.css';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';

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

interface ProfileCardProps {
  loading: boolean;
  handleSubmit: (data: any) => void;
}

export default function ProfileCard({
  loading,
  handleSubmit,
}: ProfileCardProps) {
  const profile = useAppSelector((state) => state.firebase.profile);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [mobile, setMobile] = useState('');
  const [shopName, setShopName] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');

  const handleDistrictChange = (event: SelectChangeEvent) => {
    setDistrict(event.target.value as string);
  };

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName ?? '');
      setLastName(profile.lastName ?? '');
      setRole(profile.role ?? 'Customer');
      setEmail(profile.email ?? '');
      setMobile(profile.mobile ?? '');
      setDistrict(profile.district ?? '');
      setShopName(profile.shopName ?? '');
      setAddress(profile.address ?? '');
    }
  }, [profile]);

  const onClickUpdate = () => {
    handleSubmit({
      mobile,
      shopName,
      address,
      district,
    });
  };
  return (
    <Card sx={{ minWidth: 400 }}>
      <CardHeader title="Your Profile Details" />
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
            <Input readOnly id="first-name" value={firstName} />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="last-name">Last Name</InputLabel>
            <Input readOnly id="last-name" value={lastName} />
          </FormControl>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { sm: '1fr' },
          }}
        >
          <FormControl variant="standard" className="login-input">
            <InputLabel id="role">You are a</InputLabel>
            <Select
              variant="standard"
              labelId="role"
              id="role"
              value={role}
              label="Role"
              style={{ textAlign: 'left' }}
              readOnly
            >
              <MenuItem value="Customer">Customer</MenuItem>
              <MenuItem value="Seller">Seller</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" className="login-input">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input readOnly id="email" value={email} />
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
            onClick={onClickUpdate}
          >
            Update
          </LoadingButton>
        </Stack>
      </CardActions>
    </Card>
  );
}
