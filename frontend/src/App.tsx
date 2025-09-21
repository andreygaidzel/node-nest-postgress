import './App.scss'
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page/HomePage.tsx";
import PostPage from "./pages/post-page/PostPage.tsx";
import Sidebar from "./components/layout/sidebar/Sidebar.tsx";
import Header from "./components/layout/header/Header.tsx";

function App() {
  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        <Sidebar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<PostPage />} />
          {/*<Route path="/product/:id" element={<PostPage />} />*/}
        </Routes>
      </div>
    </div>
  )
}

export default App
