import { type FC, useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton, CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import styles from './LoginPage.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store.ts';
import { login } from '@/store/reducers/ActionCreators.ts';

const LoginPage: FC = () => {
  const [email, setEmail] = useState('admin@mail.ru');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { error: requestError, isLoading } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Enter Email and Password');
      return;
    }
    setError('');
    console.log('Отправляем данные:', { email, password });

    dispatch(login({ email, password }));
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
              Login
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
                disabled={isLoading}
              />

              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                          {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {(error || requestError) && (
                <Typography color="error" fontSize="0.9rem" mt={1}>
                  {error || requestError}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, py: 1 }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
              </Button>

              <Typography
                variant="body2"
                textAlign="center"
                mt={2}
                color="text.secondary"
              >
                No account? <Link to="/register">Register</Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
    </div>
  )
}

export default LoginPage;