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
import { useCreateRoleMutation } from '../../../services/RoleService.ts';
import type { IRole } from '../../../models/IRole.ts';

function RoleModal() {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [role, setRole] = useState('');
  const [createRole] = useCreateRoleMutation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Форма отправлена:', { role, description }, e);
    await createRole({ value: role, description } as IRole);
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
            <FormControl fullWidth margin='dense'>
              <InputLabel id='category-label'>Role</InputLabel>
              <Select
                labelId='category-label'
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='emplyee'>Employee</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin='dense'
              label='Descruption'
              type='text'
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default RoleModal;
