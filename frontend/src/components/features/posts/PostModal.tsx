import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField, Typography,
} from '@mui/material';
import { useEffect } from 'react';
import type { IPost } from '@/models/IPost.ts';
import { useForm } from 'react-hook-form';
import styles from './PostModal.module.scss';

interface PostModalProps {
  open: boolean;
  post: IPost | null;
  onClose: () => void;
  onSubmit: (data: FormData, id?: number) => void;
}

interface PostFormInputs {
  title: string;
  content: string;
  image?: FileList;
}

function PostModal({ open, post, onClose, onSubmit }: PostModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<PostFormInputs>({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const imageFiles = watch('image');
  let selectedFile = imageFiles?.[0];

  const resetForm = () => {
    reset({
      title: '',
      content: '',
    });
    selectedFile = undefined;
  }

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        content: post.content,
      });
    } else {
      resetForm();
    }
  }, [post, reset, open]);

  const handleFormSubmit = (data: PostFormInputs) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);

    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }

    onSubmit(formData, post?.id);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{post ? 'Edit post' : 'Create post'}</DialogTitle>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        className={styles.modalForm}
      >
        <DialogContent>
          <TextField
            margin='normal'
            label='Title'
            type='text'
            fullWidth
            {...register('title', { required: 'Enter title' })}
          />

          <TextField
            label="Content"
            margin='normal'
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            placeholder="Write something here..."
            {...register('content', { required: 'Write content text' })}
          />

          <Button variant="contained" component="label">
            Select file
            <input type="file" hidden {...register('image')} />
          </Button>

          {(selectedFile || post?.image) && (
            <Typography variant="body2">
              File: {selectedFile?.name || post?.image}
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type='submit' variant='contained' disabled={isSubmitting}>
            {post ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default PostModal;
