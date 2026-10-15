import React, { useState, useEffect } from 'react';
import PortalLayout from './layouts/PortalLayout';
import AppRouter from './app/router';
import Login from './auth/Login';
import { initialStudentData, initialTeacherData } from './data/mockData';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentRole, setCurrentRole] = useState('Student');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState('dsa');
  const [selectedAssessment, setSelectedAssessment] = useState('a1');
  const [searchQuery, setSearchQuery] = useState('');
  const [studentData, setStudentData] = useState(initialStudentData);
  const [teacherData, setTeacherData] = useState(initialTeacherData);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    try {
      localStorage.setItem('tutor_theme', 'light');
    } catch (e) {
      // ignore storage errors
    }
  }, []);

  const handleLogin = ({ email, role }) => {
    setIsLoggedIn(true);
    setCurrentRole(role || 'Student');
    setActiveTab('home');
  };

  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    // Set appropriate default landing tab if needed
    if (newRole === 'Teacher' && (activeTab === 'courses' || activeTab === 'practice' || activeTab === 'notes' || activeTab === 'library')) {
      setActiveTab('teacherClasses');
    } else if (newRole === 'Student' && activeTab.startsWith('teacher')) {
      setActiveTab('courses');
    }
  };

  const activeProfile = currentRole === 'Teacher' ? teacherData.profile : studentData.profile;

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <PortalLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      currentRole={currentRole}
      setCurrentRole={handleRoleChange}
      setIsLoggedIn={setIsLoggedIn}
      studentProfile={activeProfile}
    >
      <AppRouter
        currentRole={currentRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        studentData={studentData}
        teacherData={teacherData}
        setTeacherData={setTeacherData}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        selectedAssessment={selectedAssessment}
        setSelectedAssessment={setSelectedAssessment}
      />
    </PortalLayout>
  );
}
