import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField, Typography,
} from '@mui/material';
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import type { IPost } from '@/models/IPost.ts';

interface PostModalProps {
  open: boolean;
  post: IPost | null;
  onClose: () => void;
  onSubmit: (data: FormData, id?: number) => void;
}

function PostModal({ open, post, onClose, onSubmit }: PostModalProps) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    } else {
      setTitle('');
      setContent('');
    }
    return () => setFile(null);
  }, [post]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    if (file) {
      formData.append('image', file);
    }
    onSubmit(formData, post?.id);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{post ? 'Edit post' : 'Create post'}</DialogTitle>
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

            {(post || file) && <Typography>File: {(file as File)?.name || post?.image}</Typography>}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type='submit' variant='contained'>
            {post ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default PostModal;
