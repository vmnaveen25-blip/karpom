import React, { useState, useEffect } from 'react';
import PortalLayout from './layouts/PortalLayout';
import AppRouter from './app/router';
import Login from './auth/Login';
import { initialStudentData, initialTeacherData } from './data/mockData';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRole, setCurrentRole] = useState('Admin');
  const [activeTab, setActiveTab] = useState('users');
  const [selectedCourse, setSelectedCourse] = useState('dsa');
  const [selectedAssessment, setSelectedAssessment] = useState('a1');
  const [searchQuery, setSearchQuery] = useState('');
  const [studentData, setStudentData] = useState(initialStudentData);
  const [teacherData, setTeacherData] = useState(initialTeacherData);

  const adminProfile = {
    name: 'Dr. R. Kumar',
    email: 'rkumar@esec.ac.in',
    initials: 'RK',
    role: 'Institution Admin'
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    try {
      localStorage.setItem('tutor_theme', 'dark');
    } catch (e) {
      // ignore storage errors
    }
  }, []);

  const handleLogin = ({ email, role }) => {
    setIsLoggedIn(true);
    setCurrentRole(role || 'Admin');
    setActiveTab(role === 'Admin' ? 'users' : 'home');
  };

  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    // Set appropriate default landing tab if needed
    if (newRole === 'Admin' || newRole === 'Institution') {
      setActiveTab('users');
    } else if (newRole === 'Teacher' && (activeTab === 'courses' || activeTab === 'practice' || activeTab === 'notes' || activeTab === 'library' || activeTab === 'users')) {
      setActiveTab('teacherClasses');
    } else if (newRole === 'Student' && (activeTab.startsWith('teacher') || activeTab === 'users')) {
      setActiveTab('courses');
    }
  };

  const activeProfile =
    currentRole === 'Admin' || currentRole === 'Institution'
      ? adminProfile
      : currentRole === 'Teacher'
      ? teacherData.profile
      : studentData.profile;

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
