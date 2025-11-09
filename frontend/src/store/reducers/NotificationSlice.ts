import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AlertColor } from '@mui/material/Alert';

type Severity = AlertColor;

interface Notification {
  id: number;
  message: string;
  severity: Severity;
}

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      state.notifications.push({ ...action.payload, id: Date.now() });
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
  },
});

export const { showNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;