import './App.scss';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage.tsx';
import ProductsPage from './pages/products-page/ProductsPage.tsx';
import Sidebar from './components/layout/sidebar/Sidebar.tsx';
import Header from './components/layout/header/Header.tsx';
import UsersPage from './pages/users-page/UsersPage.tsx';
import RolesPage from './pages/roles-page/RolesPage.tsx';

function App() {
  return (
    <div className='layout'>
      <Header />
      <div className='layout-body'>
        <Sidebar />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/users' element={<UsersPage />} />
          <Route path='/roles' element={<RolesPage />} />
          {/*<Route path="/product/:id" element={<ProductsPage />} />*/}
        </Routes>
      </div>
    </div>
  );
}

export default App;
