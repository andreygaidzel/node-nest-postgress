import './App.scss';
import { RouterProvider } from 'react-router-dom';
import { createContext } from 'react';
import { router } from '@/routes.tsx';

export const UserContext = createContext<{ name: string } | null>(null);
function App() {
  const user = { name: 'Andres' };

  return (
    <UserContext.Provider value={user}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
