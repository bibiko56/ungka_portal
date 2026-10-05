import React from 'react';
import NewsBanner from '../components/NewsBanner';
import LatestNewsSection from '../components/LatestNewsSection';
import RecentAccomplishments2 from '../components/RecentAccomplishments2';
import JoinCommunityBanner from '../components/JoinCommunityBanner';
import SkNews from '../components/SkNews';
import AssistanceAndGridNews from '../components/AssistanceAndGridNews';

export default function NewsUpdate() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <NewsBanner />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
        <LatestNewsSection />
        <RecentAccomplishments2 />
        <SkNews />
        <AssistanceAndGridNews />
      </div>
    </div>
  );
}