import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginRegisterPage } from './pages/login-register/login-register';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/authenticate" replace />} />
        <Route path="/authenticate" element={<LoginRegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
