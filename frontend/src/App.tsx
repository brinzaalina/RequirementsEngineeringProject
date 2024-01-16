import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import InternshipList from "./components/companies/InternshipList";
import { CreateInternshipPage } from "./pages/create-internship/create-internship";
import { EditCompanyPage } from "./pages/edit-company/edit-company";
import { LoginRegisterPage } from "./pages/login-register/login-register";
import { CandidatesPage } from "./pages/recruiter/applicants-page";
import { RecruiterHomepage } from "./pages/recruiter/recruiter-homepage";
import StudentBrowseInternshipsPage from "./pages/student/StudentBrowseInternshipsPage";
import InternshipDetailsPage from "./pages/student/internshipDetailsPage";
import { StudentHomepage } from "./pages/student/student-homepage";
import { LoggedIn } from "./utils/logged-in";
import { ProtectedRoute } from "./utils/protected-route";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/authenticate" replace />} />
        <Route
          path="/authenticate"
          element={
            <LoggedIn>
              <LoginRegisterPage />
            </LoggedIn>
          }
        />
        <Route
          path="/student/home"
          element={
            <ProtectedRoute>
              <StudentHomepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/browse-internships"
          element={
            <ProtectedRoute>
              <StudentBrowseInternshipsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/home"
          element={
            <ProtectedRoute>
              <RecruiterHomepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-internship"
          element={
            <ProtectedRoute>
              <CreateInternshipPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/internships"
          element={
            <ProtectedRoute>
              <InternshipList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/internship-details/:internshipId"
          element={
            <ProtectedRoute>
              <InternshipDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/internship-candidates/:internshipId"
          element={
            <ProtectedRoute>
              <CandidatesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/edit-company"
          element={
            <ProtectedRoute>
              <EditCompanyPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
