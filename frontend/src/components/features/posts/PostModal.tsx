import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField, Typography,
} from '@mui/material';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import { useCreatePostMutation } from '@/services/PostService.ts';

function PostModal() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [createPost] = useCreatePostMutation();
  const [file, setFile] = useState<File | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("You should upload a file");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', file);
    console.log('Form is send', { title, content, file }, e);
    await createPost(formData);
    setTitle('');
    setContent('');
    setFile(null);
    handleClose();
  };

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        Add New Post
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Post</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin='normal'
              label='Title'
              type='text'
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              label="Content"
              margin='normal'
              multiline
              rows={4}
              fullWidth
              value={content}
              variant="outlined"
              placeholder="Write something here..."
              onChange={(e) => setContent(e.target.value)}
            />

            <Box component="div" sx={{ p: 2, border: '1px dashed grey', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button variant="contained" component="label">
                Chose picture
                <input type="file" hidden onChange={handleFileChange} />
              </Button>

              {file && <Typography>File: {(file as File).name}</Typography>}
            </Box>
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

export default PostModal;
