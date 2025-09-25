import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { type FormEvent, useState } from 'react';

function RoleModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Форма отправлена:', { title, category });
    handleClose();
  };

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        Create New Role
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Role</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin='dense'
              label='Заголовок'
              type='text'
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <FormControl fullWidth margin='dense'>
              <InputLabel id='category-label'>Категория</InputLabel>
              <Select
                labelId='category-label'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value='news'>Новости</MenuItem>
                <MenuItem value='blog'>Блог</MenuItem>
                <MenuItem value='article'>Статья</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button type='submit' variant='contained'>
              Сохранить
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default RoleModal;
