import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage/HomePage.jsx';
import FilmDetail from './components/FilmDetail/FilmDetail.jsx';
import FilmEdit from './components/FilmDetail/FilmEdit.jsx';
import FilmAdd from './components/FilmDetail/FilmAdd.jsx';
import Login from './components/User/Login.jsx';
import SignUp from './components/User/SignUp.jsx';
import ChatBot from './components/ChatBot/ChatBot.jsx';
import { UserProvider } from './components/User/UserContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const [showChatBox, setShowChatBox] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    setIsLoginPage(currentPath === '/login' || currentPath === '/signup');
  }, [location.pathname]);

  return (
    <UserProvider>
      <div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/filmdetail/:idfilm' element={<FilmDetail />} />
          <Route path='/filmedit/:idfilm' element={<FilmEdit />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/filmadd' element={<FilmAdd />} />
        </Routes>
        {/* Ô hỗ trợ người dùng */}
        {!showChatBox && !isLoginPage && (
          <div className="support-button" onClick={() => setShowChatBox(true)}>
            <img src="/src/assets/botchat.png" alt="Bot icon" />
          </div>
        )}
        {/* Hộp thoại chat */}
        {showChatBox && <ChatBot onClose={() => setShowChatBox(false)} />}
      </div>
    </UserProvider>
  );
}

export default App;
