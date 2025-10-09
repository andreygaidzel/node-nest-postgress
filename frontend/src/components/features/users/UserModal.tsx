import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { type FormEvent, useState } from 'react';
import { addUser } from '@/store/reducers/ActionCreators.ts';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store.ts';

function UserModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { error, isLoading } = useSelector((state: RootState) => state.users);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Форма отправлена:', { email, password }, e);
    dispatch(addUser({ email, password }));
    handleClose();
  };

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        Add New User
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Role</DialogTitle>
        {isLoading && (
          <CircularProgress size={20} /> // крутилка вместо текста
        )}

        {error && (
          <Typography color='error'>{error}</Typography> // выводим ошибку
        )}
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin='dense'
              label='Email'
              type='email'
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin='dense'
              label='Password'
              type='password'
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit' variant='contained'>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default UserModal;
