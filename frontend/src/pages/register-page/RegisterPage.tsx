import React, { type FC, useState } from 'react';

import styles from './RegisterPage.module.scss';
import { Box, Button, Container, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const RegisterPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Enter Email and Password');
      return;
    }
    setError('');
    console.log('Отправляем данные:', { email, password });

    // loginUser({ email, password })
    //   .then(...)
    //   .catch(...)
  };

  return (
    <div className={styles.authPage}>
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper elevation={6} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Register
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography color="error" fontSize="0.9rem" mt={1}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, py: 1 }}
            >
              Register
            </Button>

            <Typography
              variant="body2"
              textAlign="center"
              mt={2}
              color="text.secondary"
            >
              You have account? <Link to="/login">Login</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  )
}

export default RegisterPage;