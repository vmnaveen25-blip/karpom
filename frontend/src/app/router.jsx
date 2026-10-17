import React from 'react';
import {
  Home,
  MyCourses,
  CourseOverview,
  AITutor,
  Practice,
  Assessments,
  AssessmentResult,
  Notes,
  Flashcards,
  Library,
  Progress,
  CalendarView,
  Notifications,
  ProfileSettings
} from '../portals/student';
import {
  TeacherHomeOnHold,
  MyClassesAndStudents,
  CoursesAndCurriculum,
  TeachingMaterials,
  AssignmentsAndAssessments,
  LiveTeachingAndSchedule,
  TeacherCommunication,
  StudentProgressOnHold,
  TeacherProfileSettings,
  TeacherHelpSupport
} from '../portals/teacher';
import { AdminDashboard, AdminUsers } from '../portals/admin';
import { InstitutionDashboard } from '../portals/institution';

export default function AppRouter({
  currentRole,
  activeTab,
  setActiveTab,
  studentData,
  teacherData,
  setTeacherData,
  selectedCourse,
  setSelectedCourse,
  selectedAssessment,
  setSelectedAssessment
}) {
  // Portal resolution by Role
  if (currentRole === 'Teacher') {
    switch (activeTab) {
      case 'home':
        return <TeacherHomeOnHold teacherData={teacherData} setActiveTab={setActiveTab} />;
      case 'teacherClasses':
      case 'courses': // fallback if user was on courses tab
        return <MyClassesAndStudents teacherData={teacherData} setActiveTab={setActiveTab} />;
      case 'teacherCourses':
        return <CoursesAndCurriculum teacherData={teacherData} setTeacherData={setTeacherData} setActiveTab={setActiveTab} />;
      case 'teacherMaterials':
        return <TeachingMaterials teacherData={teacherData} setTeacherData={setTeacherData} />;
      case 'teacherAssignments':
        return <AssignmentsAndAssessments teacherData={teacherData} setTeacherData={setTeacherData} />;
      case 'teacherSchedule':
        return <LiveTeachingAndSchedule teacherData={teacherData} setTeacherData={setTeacherData} />;
      case 'teacherCommunication':
        return <TeacherCommunication teacherData={teacherData} setTeacherData={setTeacherData} />;
      case 'teacherProgress':
        return <StudentProgressOnHold />;
      case 'profile':
        return <TeacherProfileSettings teacherData={teacherData} setTeacherData={setTeacherData} />;
      case 'teacherHelp':
        return <TeacherHelpSupport />;
      default:
        return <TeacherHomeOnHold teacherData={teacherData} setActiveTab={setActiveTab} />;
    }
  }

  if (currentRole === 'Admin') {
    switch (activeTab) {
      case 'home':
      case 'dashboard':
        return <AdminDashboard setActiveTab={setActiveTab} />;
      case 'users':
      case 'adminStudents':
      case 'adminTeachers':
        return <AdminUsers setActiveTab={setActiveTab} />;
      default:
        return <AdminUsers setActiveTab={setActiveTab} />;
    }
  }

  if (currentRole === 'Institution') {
    return <InstitutionDashboard />;
  }

  // Student Portal tab routing
  switch (activeTab) {
    case 'home':
      return (
        <Home
          studentData={studentData}
          setActiveTab={setActiveTab}
          setSelectedCourse={setSelectedCourse}
        />
      );

    case 'courses':
      return (
        <MyCourses
          studentData={studentData}
          setActiveTab={setActiveTab}
          setSelectedCourse={setSelectedCourse}
        />
      );

    case 'courseDetail':
      return (
        <CourseOverview
          selectedCourseId={selectedCourse}
          setActiveTab={setActiveTab}
        />
      );

    case 'aiTutor':
      return (
        <AITutor
          studentData={studentData}
        />
      );

    case 'practice':
      return (
        <Practice
          studentData={studentData}
        />
      );

    case 'assessments':
      return (
        <Assessments
          studentData={studentData}
          setActiveTab={setActiveTab}
          setSelectedAssessment={setSelectedAssessment}
        />
      );

    case 'assessmentResult':
      return (
        <AssessmentResult
          setActiveTab={setActiveTab}
        />
      );

    case 'notes':
      return (
        <Notes
          setActiveTab={setActiveTab}
        />
      );

    case 'flashcards':
      return (
        <Flashcards
          studentData={studentData}
          setActiveTab={setActiveTab}
        />
      );

    case 'library':
      return (
        <Library
          studentData={studentData}
        />
      );

    case 'progress':
      return (
        <Progress
          studentData={studentData}
        />
      );

    case 'calendar':
      return (
        <CalendarView
          studentData={studentData}
        />
      );

    case 'notifications':
      return (
        <Notifications
          studentData={studentData}
          setActiveTab={setActiveTab}
        />
      );

    case 'profile':
      return (
        <ProfileSettings
          studentData={studentData}
        />
      );

    default:
      return (
        <Home
          studentData={studentData}
          setActiveTab={setActiveTab}
          setSelectedCourse={setSelectedCourse}
        />
      );
  }
}
