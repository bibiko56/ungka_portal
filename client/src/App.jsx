import React from 'react';
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

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow">
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
        <div className="min-h-screen bg-white">
        <HealthCenterServices />
        </div>
        <div className="min-h-screen bg-white">
        <BarangayHallServices />
        </div>
        <StartUServeCTA />
        {/* Next sections like Quick Links or News can go here */}
      </main>
      <Footer />
    </div>
  );
}