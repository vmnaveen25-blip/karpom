import React, { useState } from 'react';
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
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    try {
      const saved = localStorage.getItem('karpom_sidebar_open');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('karpom_sidebar_open', String(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  return (
    <div className={`app-layout ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      {/* Shared Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={handleToggleSidebar}
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
          sidebarOpen={sidebarOpen}
          onToggleSidebar={handleToggleSidebar}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Dynamic Page Content Viewport */}
        <main className="page-container">
          {children}
        </main>
      </div>
    </div>
  );
}
