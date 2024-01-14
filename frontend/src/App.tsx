import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginRegisterPage } from './pages/login-register/login-register';
import { CreateInternshipPage } from './pages/create-internship/create-internship';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/authenticate" replace />} />
        <Route path="/authenticate" element={<LoginRegisterPage />} />
        <Route path='/create-internship' element={<CreateInternshipPage />} />
      </Routes>
    </>
  );
}

export default App;
