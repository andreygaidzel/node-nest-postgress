import React from 'react';
import { Alert, Snackbar, type SnackbarOrigin } from '@mui/material';
import { removeNotification } from '@/store/reducers/NotificationSlice.ts';
import type { RootState } from '@/store/store.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';

const anchorOrigin: SnackbarOrigin = { vertical: 'top', horizontal: 'right' };

const Notify: React.FC = () => {
  const notifications = useAppSelector((state: RootState) => state.notifications.notifications);
  const dispatch = useAppDispatch();

  const handleClose = (id: number) => {
    dispatch(removeNotification(id));
  };

  return (
    <>
      {notifications.map((n, index) => (
        <Snackbar
          key={n.id}
          open
          autoHideDuration={5000}
          onClose={() => handleClose(n.id)}
          anchorOrigin={anchorOrigin}
          sx={{
            mt: `${index * 70}px`,
            transition: "all 0.3s ease",
          }}
        >
          <Alert
            severity={n.severity}
            variant="filled"
            onClose={() => handleClose(n.id)}
            sx={{ width: "100%" }}
          >
            {n.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}

export default Notify;