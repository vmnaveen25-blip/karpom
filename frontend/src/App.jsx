import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Home from './pages/Home';
import MyCourses from './pages/MyCourses';
import CourseOverview from './pages/CourseOverview';
import AITutor from './pages/AITutor';
import Practice from './pages/Practice';
import Assessments from './pages/Assessments';
import AssessmentResult from './pages/AssessmentResult';
import Notes from './pages/Notes';
import Flashcards from './pages/Flashcards';
import Library from './pages/Library';
import Progress from './pages/Progress';
import CalendarView from './pages/CalendarView';
import Notifications from './pages/Notifications';
import ProfileSettings from './pages/ProfileSettings';
import Login from './pages/Login';
import { initialStudentData } from './data/mockData';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentRole, setCurrentRole] = useState('Student');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState('dsa');
  const [selectedAssessment, setSelectedAssessment] = useState('a1');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('light');
  const [studentData, setStudentData] = useState(initialStudentData);

  const handleLogin = ({ email, role }) => {
    setIsLoggedIn(true);
    setCurrentRole(role || 'Student');
    setActiveTab('home');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} theme={theme} setTheme={setTheme} />;
  }

  return (
    <div className="app-layout">
      {/* Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <div className="app-main">
        {/* Top Header Bar */}
        <Topbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          theme={theme}
          setTheme={setTheme}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          setIsLoggedIn={setIsLoggedIn}
          studentProfile={studentData.profile}
        />

        {/* Dynamic Page Content Viewport */}
        <main className="page-container">
          {activeTab === 'home' && (
            <Home
              studentData={studentData}
              setActiveTab={setActiveTab}
              setSelectedCourse={setSelectedCourse}
            />
          )}

          {activeTab === 'courses' && (
            <MyCourses
              studentData={studentData}
              setActiveTab={setActiveTab}
              setSelectedCourse={setSelectedCourse}
            />
          )}

          {activeTab === 'courseDetail' && (
            <CourseOverview
              selectedCourseId={selectedCourse}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'aiTutor' && (
            <AITutor
              studentData={studentData}
            />
          )}

          {activeTab === 'practice' && (
            <Practice
              studentData={studentData}
            />
          )}

          {activeTab === 'assessments' && (
            <Assessments
              studentData={studentData}
              setActiveTab={setActiveTab}
              setSelectedAssessment={setSelectedAssessment}
            />
          )}

          {activeTab === 'assessmentResult' && (
            <AssessmentResult
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'notes' && (
            <Notes
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'flashcards' && (
            <Flashcards
              studentData={studentData}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'library' && (
            <Library
              studentData={studentData}
            />
          )}

          {activeTab === 'progress' && (
            <Progress
              studentData={studentData}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarView
              studentData={studentData}
            />
          )}

          {activeTab === 'notifications' && (
            <Notifications
              studentData={studentData}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileSettings
              studentData={studentData}
            />
          )}
        </main>
      </div>
    </div>
  );
}
