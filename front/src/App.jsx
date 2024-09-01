import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ApiProvider } from './context/ApiContext';

import Home from './page/Home';
import Register from './page/Register';
import Login from './page/Login';
import NavBar from './components/NavBar';
import PrivateRoute from './utils/PrivateRoute';
import Profile from './page/Profile';
import Follow from './page/Follow';
import PostDetail from './page/PostDetail';

import './App.css'

function App() {
  return (
    <Router>
      <ApiProvider>
        <AuthProvider>
          <NavBar />
          <div className='container-page'>
            <Routes>
              <Route path="/home" element={<PrivateRoute element={Home} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/:id" element={<PrivateRoute element={Profile} />} />
              <Route path="/follow" element={<PrivateRoute element={Follow} />} />
              <Route path="/post/:id" element={<PrivateRoute element={PostDetail} />} />
            </Routes>
          </div>
        </AuthProvider>
      </ApiProvider>
    </Router>
  );
}

export default App;
