import './App.scss';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage.tsx';
import ProductsPage from './pages/products-page/ProductsPage.tsx';
import Sidebar from './components/layout/sidebar/Sidebar.tsx';
import Header from './components/layout/header/Header.tsx';
import UsersPage from './pages/users-page/UsersPage.tsx';
import RolesPage from './pages/roles-page/RolesPage.tsx';
import { createContext } from 'react';
import PlaygroundPage from './pages/playground-page/PlaygroundPage.tsx';

export const UserContext = createContext<{ name: string } | null>(null);
function App() {
  const user = { name: 'Andres' };

  return (
    <UserContext.Provider value={user}>
      <div className='layout'>
        <Header />
        <div className='layout-body'>
          <Sidebar />

          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/users' element={<UsersPage />} />
            <Route path='/roles' element={<RolesPage />} />
            <Route path='/playground' element={<PlaygroundPage />} />
            {/*<Route path="/product/:id" element={<ProductsPage />} />*/}
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
