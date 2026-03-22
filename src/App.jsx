import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/auth/LoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import MainLayout from './components/layout/MainLayout/MainLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import ParishDetailsPage from './pages/parish/ParishDetailsPage';
import FamiliesListPage from './pages/families/FamiliesListPage';
import AddFamilyPage from './pages/families/AddFamilyPage';
import FamilyDetailsPage from './pages/families/FamilyDetailsPage';
import MembersListPage from './pages/members/MembersListPage';
import AddMemberPage from './pages/members/AddMemberPage';
import MemberDetailsPage from './pages/members/MemberDetailsPage';
import SacramentsDashboard from './pages/sacraments/SacramentsDashboard';
import SacramentRecordsPage from './pages/sacraments/SacramentRecordsPage';
import AddSacramentPage from './pages/sacraments/AddSacramentPage';
import DonationsListPage from './pages/donations/DonationsListPage';
import AddDonationPage from './pages/donations/AddDonationPage';
import DonationReportsPage from './pages/donations/DonationReportsPage';
import './styles/global.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading Parish System...</p>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="parish" element={<ParishDetailsPage />} />
            
            {/* Families Routes */}
            <Route path="families" element={<FamiliesListPage />} />
            <Route path="families/add" element={<AddFamilyPage />} />
            <Route path="families/:id" element={<FamilyDetailsPage />} />
            
            {/* Members Routes */}
            <Route path="members" element={<MembersListPage />} />
            <Route path="members/add" element={<AddMemberPage />} />
            <Route path="members/:id" element={<MemberDetailsPage />} />
            
            {/* Sacraments Routes */}
            <Route path="sacraments" element={<SacramentsDashboard />} />
            <Route path="sacraments/records" element={<SacramentRecordsPage />} />
            <Route path="sacraments/add" element={<AddSacramentPage />} />
            
            {/* Donations Routes */}
            <Route path="donations" element={<DonationsListPage />} />
            <Route path="donations/add" element={<AddDonationPage />} />
            <Route path="donations/reports" element={<DonationReportsPage />} />
          </Route>
        </Routes>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;