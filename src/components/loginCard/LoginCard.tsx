import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import './LoginCard.css';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';

interface LoginCardProps {
  loading: boolean;
  handleSubmit: (email: string, password: string) => void;
}

export default function LoginCard({ loading, handleSubmit }: LoginCardProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickLogin = () => {
    handleSubmit(email, password);
  };
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardHeader title="Login" />
      <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { sm: '1fr' },
          }}
        >
          <FormControl variant="standard" className="login-input">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
        </Box>
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
            onClick={onClickLogin}
            variant="contained"
          >
            Login
          </LoadingButton>
          <Typography variant="body2" component="h2">
            Don&apos;t have an account?
          </Typography>
          <Button href="/register">Register</Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
