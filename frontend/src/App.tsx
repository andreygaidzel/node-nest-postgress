import './App.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes.tsx';
import Notify from '@/components/shared/notification/Notification.tsx';

function App() {

  return (
    <>
      <RouterProvider router={router} />
      <Notify />
    </>
  );
}

export default App;
