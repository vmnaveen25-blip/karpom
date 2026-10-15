import React from 'react';
import Sidebar from '../components/shared/Sidebar';
import Topbar from '../components/shared/Topbar';

export default function PortalLayout({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  currentRole,
  setCurrentRole,
  setIsLoggedIn,
  studentProfile,
  children
}) {
  return (
    <div className="app-layout">
      {/* Shared Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
      />

      {/* Main Content Area */}
      <div className="app-main">
        {/* Shared Top Navigation Bar */}
        <Topbar
          setActiveTab={setActiveTab}
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          setIsLoggedIn={setIsLoggedIn}
          studentProfile={studentProfile}
        />

        {/* Dynamic Page Content Viewport */}
        <main className="page-container">
          {children}
        </main>
      </div>
    </div>
  );
}
