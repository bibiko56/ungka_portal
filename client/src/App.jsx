import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Population from './components/Population';
import LatestInformation from './components/LatestInformation';
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
        {/* Next sections like Quick Links or News can go here */}
      </main>
      <Footer />
    </div>
  );
}