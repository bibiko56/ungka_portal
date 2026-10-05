import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Population from './components/Population';
import LatestInformation from './components/LatestInformation';
import LatestNewsSection from './components/LatestNewsSection';
import UpcomingEvents from './components/UpcomingEvents';
import UpcomingEvents2 from './components/UpcomingEvents2';
import JoinCommunityBanner from './components/JoinCommunityBanner';
import RecentAccomplishments from './components/RecentAccomplishments';
import RecentSKEvent from './components/RecentSKEvent';
import SKUpcomingEvents from './components/SKUpcomingEvents';
import SKRecentAccomplishments from './components/SKRecentAccomplishments';
import HealthCenterServices from './components/HealthCenterServices';
import BarangayHallServices from './components/BarangayHallServices';
import StartUServeCTA from './components/StartUServeCTA';
import Footer from './components/Footer';

// Page Imports
import Volunteer from './pages/Volunteer';
import NewsUpdate from './pages/NewsUpdate';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import IncidentReportForm from './pages/IncidentReportForm';
import Officials from './pages/Officials';

// Auth Page Imports
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import AdminRegister from './pages/AdminRegister';
import AdminDashboard from './pages/AdminDashboard';
import ForgotPassword from './pages/ForgotPassword';
import NewsArticle from './pages/NewsArticle';


// Component & Context Imports
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ModalProvider } from './context/ModalContext';

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Population />
      <LatestNewsSection />
      <UpcomingEvents2 />
      <JoinCommunityBanner />
      <RecentAccomplishments />
      <RecentSKEvent />
      <SKRecentAccomplishments />
      <HealthCenterServices />
      <BarangayHallServices />
      <StartUServeCTA />
    </>
  );
}

// Create a layout component so useLocation runs INSIDE the Router
function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/health-center" element={<HealthCenterServices />} />
          <Route path="/news" element={<NewsUpdate />} />
          <Route path="/news/:id" element={<NewsArticle />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/report-issue" element={<IncidentReportForm />} />
          <Route path="/officials" element={<Officials />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/login/user" element={<UserLogin />} />
          <Route path="/register/user" element={<UserRegister />} />
          <Route path="/register/admin" element={<AdminRegister />} />
          <Route path="/forgot-password/:type" element={<ForgotPassword />} />
          

          {/* Protected Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <Layout />
      </ModalProvider>
    </AuthProvider>
  );
}