import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Population from './components/Population';
import LatestInformation from './components/LatestInformation';
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

import Volunteer from './pages/Volunteer';
import NewsUpdate from './pages/NewsUpdate';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Population />
      <LatestInformation />
      <UpcomingEvents />
      <UpcomingEvents2 />
      <JoinCommunityBanner />
      <RecentAccomplishments />
      <RecentSKEvent />
      <SKUpcomingEvents />
      <SKRecentAccomplishments />
      <HealthCenterServices />
      <BarangayHallServices />
      <StartUServeCTA />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/health-center" element={<HealthCenterServices />} />
          <Route path="/news" element={<NewsUpdate />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}