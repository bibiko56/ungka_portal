import React from 'react';
import NewsBanner from '../components/NewsBanner';
import LatestInformation from '../components/LatestInformation';
import NewsCards from '../components/NewsCard';
import CommunityEventsGrid from '../components/CommunityEventsGrid';
import RecentSKEventSection from '../components/RecentSKEventSection';
import RecentAccomplishmentsGrid from '../components/RecentAccomplishmentsGrid';

export default function NewsUpdate() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <NewsBanner />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
        <LatestInformation />
        <NewsCards />
        <CommunityEventsGrid />
        <RecentSKEventSection />
        <RecentAccomplishmentsGrid />
      </div>
    </div>
  );
}