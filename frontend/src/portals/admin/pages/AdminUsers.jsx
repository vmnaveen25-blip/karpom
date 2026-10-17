import React, { useState, useMemo } from 'react';
import {
  Users,
  GraduationCap,
  Search,
  Plus,
  MoreVertical,
  X,
  Edit2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  User,
  Building,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  CheckCircle2,
  BookOpen,
  Layers,
  Shield,
  Activity,
  FileText,
  Clock,
  Sparkles,
  Award,
  Trash2,
  Filter
} from 'lucide-react';

export default function AdminUsers({ setActiveTab }) {
  // Primary Tab: 'teachers' | 'students'
  const [userType, setUserType] = useState('teachers');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Inspector Drawer selection
  const [selectedTeacherId, setSelectedTeacherId] = useState('T001');
  const [selectedStudentId, setSelectedStudentId] = useState('S001');
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [inspectorTab, setInspectorTab] = useState('overview'); // 'overview' | 'academic' | 'activity'

  // Selected Checkboxes
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Add User Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    facultyId: '',
    rollNo: '',
    email: '',
    phone: '',
    dateOfJoining: '16 Oct 2026',
    employeeType: 'Regular',
    status: 'Active', // strictly 'Active' or 'Inactive'
    department: 'Computer Science and Engineering',
    designation: 'Assistant Professor',
    academicYear: 'III Year',
    semester: 'Semester 5',
    cgpa: '8.92',
    attendance: '94%',
    blockName: 'CSE Block',
    floorNumber: '3rd Floor',
    officeHours: 'Mon - Fri, 10:00 AM - 4:00 PM',
    bio: '',
    avatar: ''
  });

  // Action Menu Dropdown State
  const [actionMenuId, setActionMenuId] = useState(null);

  // 1. Teachers Dataset (Exact match to uploaded image)
  const [teachers, setTeachers] = useState([
    {
      id: 'T001',
      num: 1,
      name: 'Dr. R. Kumar',
      department: 'Computer Science',
      fullDepartment: 'Computer Science and Engineering',
      email: 'rkumar@esec.ac.in',
      status: 'Active',
      designation: 'Professor',
      phone: '+91 9876543210',
      dateOfJoining: '12 Jul 2015',
      employeeType: 'Regular',
      officeRoom: 'CSE Block - 3rd Floor',
      officeHours: 'Mon - Fri, 10:00 AM - 4:00 PM',
      bio: 'Research interests: Artificial Intelligence, Machine Learning, Data Mining. 10+ years of teaching and research experience.',
      avatar: '/assets/dr_kumar.jpg',
      courses: ['Data Structures & Algorithms', 'Machine Learning', 'Operating Systems'],
      sections: ['CSE - III Year - Section A', 'CSE - IV Year - Section B'],
      recentActivity: [
        { time: 'Today 10:30 AM', text: 'Updated Course Material for Machine Learning Unit 3' },
        { time: 'Yesterday 04:15 PM', text: 'Approved 24 assignment submissions in DSA Lab' },
        { time: '14 Oct 2026', text: 'Conducted Live Interactive Teaching Session (Section A)' }
      ]
    },
    {
      id: 'T002',
      num: 2,
      name: 'Dr. M. Priya',
      department: 'Information Technology',
      fullDepartment: 'Information Technology & Cloud Systems',
      email: 'mpriya@esec.ac.in',
      status: 'Active',
      designation: 'Associate Professor',
      phone: '+91 9876543211',
      dateOfJoining: '18 Aug 2017',
      employeeType: 'Regular',
      officeRoom: 'IT Block - 2nd Floor',
      officeHours: 'Mon - Thu, 09:30 AM - 3:30 PM',
      bio: 'Specialization in Cloud Computing, Distributed Databases, and High-Performance Web Architecture.',
      avatar: '/assets/dr_priya.jpg',
      courses: ['Cloud Infrastructure', 'Web Development Frameworks'],
      sections: ['IT - III Year - Section A'],
      recentActivity: [
        { time: 'Today 11:00 AM', text: 'Created Week 6 Cloud Practice Quiz' },
        { time: '13 Oct 2026', text: 'Reviewed 42 semester projects' }
      ]
    },
    {
      id: 'T003',
      num: 3,
      name: 'Mr. S. Aravind',
      department: 'Computer Science',
      fullDepartment: 'Computer Science and Engineering',
      email: 'saravind@esec.ac.in',
      status: 'Active',
      designation: 'Assistant Professor',
      phone: '+91 9876543212',
      dateOfJoining: '05 Jan 2020',
      employeeType: 'Regular',
      officeRoom: 'CSE Block - 1st Floor',
      officeHours: 'Tue - Fri, 11:00 AM - 4:00 PM',
      bio: 'Focus on Competitive Programming, Java Software Architecture, and Concurrent Algorithms.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      courses: ['Advanced Java Programming', 'Object Oriented Design'],
      sections: ['CSE - II Year - Section C'],
      recentActivity: [
        { time: 'Yesterday 02:00 PM', text: 'Published Assignment 2: PriorityBlockingQueue' }
      ]
    },
    {
      id: 'T004',
      num: 4,
      name: 'Dr. K. Manikandan',
      department: 'Electronics & Communication',
      fullDepartment: 'Electronics and Communication Engineering',
      email: 'kmanikandan@esec.ac.in',
      status: 'Inactive',
      designation: 'Professor',
      phone: '+91 9876543213',
      dateOfJoining: '10 Nov 2012',
      employeeType: 'On Leave',
      officeRoom: 'ECE Block - 4th Floor',
      officeHours: 'By Appointment',
      bio: 'Embedded Systems, VLSI Circuit Design, and Smart IoT Sensor Networks.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      courses: ['Digital Signal Processing', 'Microcontroller Lab'],
      sections: ['ECE - IV Year - Section A'],
      recentActivity: [
        { time: '02 Oct 2026', text: 'Submitted leave application for international symposium' }
      ]
    },
    {
      id: 'T005',
      num: 5,
      name: 'Ms. V. Nandhini',
      department: 'Information Technology',
      fullDepartment: 'Information Technology & Cyber Security',
      email: 'vnandhini@esec.ac.in',
      status: 'Active',
      designation: 'Assistant Professor',
      phone: '+91 9876543214',
      dateOfJoining: '22 Feb 2021',
      employeeType: 'Regular',
      officeRoom: 'IT Block - 1st Floor',
      officeHours: 'Mon - Fri, 10:00 AM - 3:00 PM',
      bio: 'Network Defense, Ethical Hacking, Public Key Infrastructure, and Secure Coding standards.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      courses: ['Cybersecurity & Cryptography', 'Computer Networks'],
      sections: ['IT - II Year - Section B'],
      recentActivity: [
        { time: 'Today 09:15 AM', text: 'Verified student submissions in Network Defense lab' }
      ]
    },
    {
      id: 'T006',
      num: 6,
      name: 'Dr. P. Gokul',
      department: 'Mechanical Engineering',
      fullDepartment: 'Department of Mechanical Engineering',
      email: 'pgokul@esec.ac.in',
      status: 'Active',
      designation: 'Associate Professor',
      phone: '+91 9876543215',
      dateOfJoining: '14 Jun 2016',
      employeeType: 'Regular',
      officeRoom: 'Mech Block - 2nd Floor',
      officeHours: 'Mon - Fri, 09:00 AM - 04:00 PM',
      bio: 'Robotics, Mechatronics, CAD/CAM Modeling, and Finite Element Computational Analysis.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      courses: ['Robotics & Automation', 'Thermodynamics'],
      sections: ['ME - III Year - Section A'],
      recentActivity: [
        { time: '12 Oct 2026', text: 'Scheduled CAD/CAM lab evaluation session' }
      ]
    },
    {
      id: 'T007',
      num: 7,
      name: 'Mrs. R. Divya',
      department: 'Computer Science',
      fullDepartment: 'Computer Science and Engineering',
      email: 'rdivya@esec.ac.in',
      status: 'Active',
      designation: 'Lecturer',
      phone: '+91 9876543216',
      dateOfJoining: '01 Oct 2026',
      employeeType: 'Probationary',
      officeRoom: 'CSE Block - 1st Floor',
      officeHours: 'Mon - Wed, 01:00 PM - 05:00 PM',
      bio: 'Object-Oriented Analysis, Python Scripting, and Frontend Framework Systems.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
      courses: ['Python for Data Science'],
      sections: ['CSE - I Year - Section B'],
      recentActivity: [
        { time: '08 Oct 2026', text: 'Faculty onboarding credentials generated' }
      ]
    },
    {
      id: 'T008',
      num: 8,
      name: 'Mr. A. Lokesh',
      department: 'Artificial Intelligence',
      fullDepartment: 'Artificial Intelligence and Data Science',
      email: 'alokesh@esec.ac.in',
      status: 'Active',
      designation: 'Assistant Professor',
      phone: '+91 9876543217',
      dateOfJoining: '15 Jul 2022',
      employeeType: 'Regular',
      officeRoom: 'AI Research Block - 3rd Floor',
      officeHours: 'Mon - Fri, 10:00 AM - 04:30 PM',
      bio: 'Deep Learning, Convolutional Neural Networks, PyTorch Pipelines, and Computer Vision.',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
      courses: ['Deep Learning', 'Computer Vision Foundations'],
      sections: ['AI - III Year - Section A'],
      recentActivity: [
        { time: 'Yesterday 05:30 PM', text: 'Updated GPU cluster access tokens for semester research' }
      ]
    },
    {
      id: 'T009',
      num: 9,
      name: 'Dr. N. Harish',
      department: 'Electronics & Communication',
      fullDepartment: 'Electronics and Communication Engineering',
      email: 'nharish@esec.ac.in',
      status: 'Active',
      designation: 'Professor & HoD',
      phone: '+91 9876543218',
      dateOfJoining: '04 Aug 2011',
      employeeType: 'Regular',
      officeRoom: 'ECE Block - 1st Floor',
      officeHours: 'Mon - Fri, 09:00 AM - 05:00 PM',
      bio: 'Digital Signal Processing, RF Communication, Antenna Arrays, and Wireless Sensor Networks.',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      courses: ['Wireless Communication', 'Signals and Systems'],
      sections: ['ECE - IV Year - Section B'],
      recentActivity: [
        { time: '11 Oct 2026', text: 'Published departmental accreditation audit report' }
      ]
    },
    {
      id: 'T010',
      num: 10,
      name: 'Ms. S. Keerthana',
      department: 'Information Technology',
      fullDepartment: 'Information Technology & Web Technologies',
      email: 'skeerthana@esec.ac.in',
      status: 'Inactive',
      designation: 'Assistant Professor',
      phone: '+91 9876543219',
      dateOfJoining: '12 Jan 2023',
      employeeType: 'Sabbatical',
      officeRoom: 'IT Block - 2nd Floor',
      officeHours: 'By Appointment',
      bio: 'Full Stack Development, React/Node.js Ecosystems, UI/UX Engineering, and Microfrontends.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      courses: ['Modern Web Architectures'],
      sections: ['IT - III Year - Section B'],
      recentActivity: [
        { time: '28 Sep 2026', text: 'Transitioned course material to department backup faculty' }
      ]
    }
  ]);

  // 2. Students Dataset
  const [students, setStudents] = useState([
    {
      id: 'S001',
      num: 1,
      name: 'Arjun Mehta',
      rollNo: '23CS014',
      department: 'Computer Science',
      fullDepartment: 'Computer Science and Engineering',
      email: 'arjun.mehta@inst.edu',
      status: 'Active',
      yearSemester: 'III Year • Semester 5',
      cgpa: '8.92',
      attendance: '94%',
      phone: '+91 9442188101',
      dateOfJoining: '15 Aug 2023',
      guardianName: 'Sanjay Mehta',
      bio: 'Passionate competitive programmer, active member of ACM Chapter, focusing on graph algorithms.',
      avatar: '',
      enrolledCourses: ['Data Structures & Algorithms', 'Operating Systems', 'Database Systems', 'Computer Networks'],
      recentActivity: [
        { time: 'Today 09:40 AM', text: 'Submitted DSA Assessment 3 with score 96%' },
        { time: 'Yesterday', text: 'Completed AI Tutor session on Dijkstra Algorithm' }
      ]
    },
    {
      id: 'S002',
      num: 2,
      name: 'Vijay Vikas',
      rollNo: '23CS042',
      department: 'Computer Science',
      fullDepartment: 'Computer Science and Engineering',
      email: 'vijay.vikas@student.edu',
      status: 'Active',
      yearSemester: 'III Year • Semester 5',
      cgpa: '9.15',
      attendance: '98%',
      phone: '+91 9876543210',
      dateOfJoining: '15 Aug 2023',
      guardianName: 'R. Vikas',
      bio: 'Full stack developer and AI student representative. Built autonomous flashcard generation tools.',
      avatar: '',
      enrolledCourses: ['Advanced Java Programming', 'Machine Learning', 'Cloud Infrastructure'],
      recentActivity: [
        { time: 'Today 11:20 AM', text: 'Completed Java Multithreading Quiz' }
      ]
    },
    {
      id: 'S003',
      num: 3,
      name: 'Kavita Iyer',
      rollNo: '23EC021',
      department: 'Electronics & Communication',
      fullDepartment: 'Electronics and Communication Engineering',
      email: 'kavita.i@student.edu',
      status: 'Inactive',
      yearSemester: 'III Year • Semester 5',
      cgpa: '7.84',
      attendance: '68%',
      phone: '+91 9443211099',
      dateOfJoining: '15 Aug 2023',
      guardianName: 'N. Iyer',
      bio: 'VLSI enthusiast. Currently under medical leave for sports injury rehabilitation.',
      avatar: '',
      enrolledCourses: ['Digital Signal Processing', 'Microcontroller Lab'],
      recentActivity: [
        { time: 'Aug 14, 2026', text: 'Last active login on portal' }
      ]
    },
    {
      id: 'S004',
      num: 4,
      name: 'Rohan Sharma',
      rollNo: '24ME055',
      department: 'Mechanical Engineering',
      fullDepartment: 'Mechanical Engineering',
      email: 'rohan.s@student.edu',
      status: 'Active',
      yearSemester: 'II Year • Semester 3',
      cgpa: '8.40',
      attendance: '91%',
      phone: '+91 9884523114',
      dateOfJoining: '10 Aug 2024',
      guardianName: 'V. Sharma',
      bio: 'Robotics team lead in college SAE BAJA competition.',
      avatar: '',
      enrolledCourses: ['Robotics & Automation', 'Thermodynamics'],
      recentActivity: [
        { time: 'Yesterday', text: 'Submitted CAD/CAM Project Part 1' }
      ]
    },
    {
      id: 'S005',
      num: 5,
      name: 'Priya Patel',
      rollNo: '24CE018',
      department: 'Civil Engineering',
      fullDepartment: 'Civil and Structural Engineering',
      email: 'priya.p@student.edu',
      status: 'Pending',
      yearSemester: 'II Year • Semester 3',
      cgpa: '8.10',
      attendance: '88%',
      phone: '+91 9776144520',
      dateOfJoining: '12 Aug 2024',
      guardianName: 'D. Patel',
      bio: 'Interested in GIS mapping, structural design, and smart building sensors.',
      avatar: '',
      enrolledCourses: ['Structural Analysis', 'Fluid Mechanics'],
      recentActivity: [
        { time: '02 Oct 2026', text: 'Course enrollment pending advisor sign-off' }
      ]
    },
    {
      id: 'S006',
      num: 6,
      name: 'Siddharth Rao',
      rollNo: '23AI009',
      department: 'Artificial Intelligence',
      fullDepartment: 'Artificial Intelligence and Data Science',
      email: 'siddharth.r@student.edu',
      status: 'Active',
      yearSemester: 'III Year • Semester 5',
      cgpa: '9.35',
      attendance: '96%',
      phone: '+91 9123456780',
      dateOfJoining: '15 Aug 2023',
      guardianName: 'A. Rao',
      bio: 'Natural Language Processing and transformer optimization researcher.',
      avatar: '',
      enrolledCourses: ['Deep Learning', 'Computer Vision Foundations'],
      recentActivity: [
        { time: 'Today 08:30 AM', text: 'Ran fine-tuning benchmark on PyTorch' }
      ]
    },
    {
      id: 'S007',
      num: 7,
      name: 'Ananya Deshmukh',
      rollNo: '23IT033',
      department: 'Information Technology',
      fullDepartment: 'Information Technology',
      email: 'ananya.d@student.edu',
      status: 'Active',
      yearSemester: 'III Year • Semester 5',
      cgpa: '8.78',
      attendance: '92%',
      phone: '+91 9845199201',
      dateOfJoining: '15 Aug 2023',
      guardianName: 'M. Deshmukh',
      bio: 'Web security and cloud database administrator enthusiast.',
      avatar: '',
      enrolledCourses: ['Cybersecurity & Cryptography', 'Cloud Infrastructure'],
      recentActivity: [
        { time: 'Yesterday', text: 'Passed Cloud Security Unit Test' }
      ]
    },
    {
      id: 'S008',
      num: 8,
      name: 'Karthik Sundaram',
      rollNo: '23CS088',
      department: 'Computer Science',
      fullDepartment: 'Computer Science and Engineering',
      email: 'karthik.s@student.edu',
      status: 'Active',
      yearSemester: 'III Year • Semester 5',
      cgpa: '8.65',
      attendance: '90%',
      phone: '+91 9445012345',
      dateOfJoining: '15 Aug 2023',
      guardianName: 'S. Sundaram',
      bio: 'Systems software, kernel tuning, and memory-safe systems programming.',
      avatar: '',
      enrolledCourses: ['Operating Systems', 'Computer Networks'],
      recentActivity: [
        { time: '14 Oct 2026', text: 'Submitted Thread Scheduling Simulator' }
      ]
    },
    {
      id: 'S009',
      num: 9,
      name: 'Deepa Nambiar',
      rollNo: '24EC044',
      department: 'Electronics & Communication',
      fullDepartment: 'Electronics and Communication Engineering',
      email: 'deepa.n@student.edu',
      status: 'Inactive',
      yearSemester: 'II Year • Semester 3',
      cgpa: '7.50',
      attendance: '71%',
      phone: '+91 9884088712',
      dateOfJoining: '12 Aug 2024',
      guardianName: 'K. Nambiar',
      bio: 'Signal processing and embedded hardware prototyping.',
      avatar: '',
      enrolledCourses: ['Signals and Systems'],
      recentActivity: [
        { time: 'Sep 29, 2026', text: 'Exam attendance warning generated' }
      ]
    },
    {
      id: 'S010',
      num: 10,
      name: 'Manoj Verma',
      rollNo: '23ME012',
      department: 'Mechanical Engineering',
      fullDepartment: 'Mechanical Engineering',
      email: 'manoj.v@student.edu',
      status: 'Active',
      yearSemester: 'III Year • Semester 5',
      cgpa: '8.22',
      attendance: '89%',
      phone: '+91 9994033410',
      dateOfJoining: '15 Aug 2023',
      guardianName: 'R. Verma',
      bio: 'Finite element analysis and fluid power control systems.',
      avatar: '',
      enrolledCourses: ['Thermodynamics', 'Robotics & Automation'],
      recentActivity: [
        { time: '13 Oct 2026', text: 'Completed thermal conductivity lab experiment' }
      ]
    }
  ]);

  // Current records list
  const currentRecords = userType === 'teachers' ? teachers : students;

  // Filtered List based on Search & Status
  const filteredRecords = useMemo(() => {
    return currentRecords.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.id && item.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.rollNo && item.rollNo.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();

      return matchSearch && matchStatus;
    });
  }, [currentRecords, searchQuery, statusFilter]);

  // Currently Selected Entity for Inspector
  const selectedEntity = useMemo(() => {
    if (userType === 'teachers') {
      return teachers.find((t) => t.id === selectedTeacherId) || teachers[0];
    } else {
      return students.find((s) => s.id === selectedStudentId) || students[0];
    }
  }, [userType, selectedTeacherId, selectedStudentId, teachers, students]);

  // Checkbox Selection Helpers
  const isAllSelected = filteredRecords.length > 0 && selectedIds.size === filteredRecords.length;
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredRecords.map((r) => r.id)));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Add User Handler
  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    if (userType === 'teachers') {
      const teacherId = newUser.facultyId || `T0${teachers.length + 1}`.padStart(4, '0');
      const block = newUser.blockName || 'CSE Block';
      const floor = newUser.floorNumber || '3rd Floor';
      const officeLocation = `${block} - ${floor}`;
      const shortDept =
        newUser.department.includes('Computer Science')
          ? 'Computer Science'
          : newUser.department.includes('Information Technology')
          ? 'Information Technology'
          : newUser.department.includes('Electronics')
          ? 'Electronics & Communication'
          : newUser.department.includes('Mechanical')
          ? 'Mechanical Engineering'
          : newUser.department.includes('Artificial Intelligence')
          ? 'Artificial Intelligence'
          : newUser.department;

      const createdTeacher = {
        id: teacherId,
        num: teachers.length + 1,
        name: newUser.name,
        department: shortDept,
        fullDepartment: newUser.department,
        email: newUser.email,
        status: newUser.status || 'Active', // strictly 'Active' or 'Inactive'
        designation: newUser.designation || 'Assistant Professor',
        phone: newUser.phone || '+91 9876543210',
        dateOfJoining: newUser.dateOfJoining || '16 Oct 2026',
        employeeType: newUser.employeeType || 'Regular',
        officeRoom: officeLocation, // Combined Block Name and Floor Number (no room number)
        officeHours: newUser.officeHours || 'Mon - Fri, 10:00 AM - 4:00 PM',
        bio: newUser.bio || `Faculty member in ${newUser.department} specializing in curriculum instruction and academic excellence.`,
        avatar: newUser.avatar || '',
        courses: [`Intro to ${shortDept}`],
        sections: ['Section A'],
        recentActivity: [{ time: 'Just now', text: 'Faculty credentials created by Admin' }]
      };
      setTeachers((prev) => [createdTeacher, ...prev]);
      setSelectedTeacherId(teacherId);
      setInspectorOpen(true);
    } else {
      const newId = `S0${students.length + 1}`.padStart(4, '0');
      const studentRollNo = newUser.rollNo || `23CS0${students.length + 1}`;
      const standing = `${newUser.academicYear || 'III Year'} • ${newUser.semester || 'Semester 5'}`;
      const shortDept =
        newUser.department.includes('Computer Science')
          ? 'Computer Science'
          : newUser.department.includes('Information Technology')
          ? 'Information Technology'
          : newUser.department.includes('Electronics')
          ? 'Electronics & Communication'
          : newUser.department.includes('Mechanical')
          ? 'Mechanical Engineering'
          : newUser.department.includes('Artificial Intelligence')
          ? 'Artificial Intelligence'
          : newUser.department;

      const createdStudent = {
        id: newId,
        num: students.length + 1,
        name: newUser.name,
        rollNo: studentRollNo,
        department: shortDept,
        fullDepartment: newUser.department,
        email: newUser.email,
        status: newUser.status || 'Active', // strictly 'Active' or 'Inactive'
        yearSemester: standing,
        cgpa: newUser.cgpa || '8.92',
        attendance: newUser.attendance ? (newUser.attendance.endsWith('%') ? newUser.attendance : `${newUser.attendance}%`) : '94%',
        phone: newUser.phone || '+91 9442188101', // strictly 10 continuous digits without space
        dateOfJoining: newUser.dateOfJoining || '15 Aug 2026',
        guardianName: 'Guardian',
        bio: newUser.bio || 'Passionate competitive programmer, active member of ACM Chapter, focusing on graph algorithms.',
        avatar: newUser.avatar || '',
        enrolledCourses: ['Data Structures & Algorithms', 'Operating Systems', 'Database Systems'],
        recentActivity: [{ time: 'Just now', text: 'Student enrolled by Admin' }]
      };
      setStudents((prev) => [createdStudent, ...prev]);
      setSelectedStudentId(newId);
      setInspectorOpen(true);
    }

    setIsAddModalOpen(false);
    setNewUser({
      name: '',
      facultyId: '',
      rollNo: '',
      email: '',
      phone: '',
      dateOfJoining: '16 Oct 2026',
      employeeType: 'Regular',
      status: 'Active',
      department: 'Computer Science and Engineering',
      designation: 'Assistant Professor',
      academicYear: 'III Year',
      semester: 'Semester 5',
      cgpa: '8.92',
      attendance: '94%',
      blockName: 'CSE Block',
      floorNumber: '3rd Floor',
      officeHours: 'Mon - Fri, 10:00 AM - 4:00 PM',
      bio: '',
      avatar: ''
    });
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* 1. Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
        <span
          onClick={() => setActiveTab('home')}
          style={{ cursor: 'pointer', transition: 'color 0.18s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          Dashboard
        </span>
        <span style={{ opacity: 0.5 }}>›</span>
        <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Users</span>
      </div>

      {/* 2. Page Title Header */}
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.025em', margin: 0 }}>
          Users
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px', margin: 0 }}>
          Manage students and teachers across your institution.
        </p>
      </div>

      {/* 3. Primary Segmented Switcher Tabs */}
      <div
        style={{
          display: 'inline-flex',
          background: 'rgba(8, 16, 36, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '4px',
          gap: '4px',
          width: 'fit-content',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        {/* Students Tab */}
        <button
          onClick={() => {
            setUserType('students');
            setSelectedIds(new Set());
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 24px',
            borderRadius: '12px',
            border: userType === 'students' ? '1px solid #3B82F6' : '1px solid transparent',
            background:
              userType === 'students'
                ? 'linear-gradient(180deg, #164BE8 0%, #0E35B8 100%)'
                : 'transparent',
            boxShadow:
              userType === 'students'
                ? '0 0 20px rgba(23, 75, 255, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
                : 'none',
            color: userType === 'students' ? '#FFFFFF' : 'var(--text-muted)',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <GraduationCap size={20} color={userType === 'students' ? '#FFFFFF' : '#7B8BA6'} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: userType === 'students' ? '#FFFFFF' : 'var(--text-secondary)' }}>
              Students
            </div>
            <div style={{ fontSize: '11px', color: userType === 'students' ? '#BFDBFE' : 'var(--text-muted)', marginTop: '1px' }}>
              1,248 Students
            </div>
          </div>
        </button>

        {/* Teachers Tab */}
        <button
          onClick={() => {
            setUserType('teachers');
            setSelectedIds(new Set());
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 24px',
            borderRadius: '12px',
            border: userType === 'teachers' ? '1px solid #3B82F6' : '1px solid transparent',
            background:
              userType === 'teachers'
                ? 'linear-gradient(180deg, #164BE8 0%, #0E35B8 100%)'
                : 'transparent',
            boxShadow:
              userType === 'teachers'
                ? '0 0 20px rgba(23, 75, 255, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
                : 'none',
            color: userType === 'teachers' ? '#FFFFFF' : 'var(--text-muted)',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <Users size={20} color={userType === 'teachers' ? '#FFFFFF' : '#7B8BA6'} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: userType === 'teachers' ? '#FFFFFF' : 'var(--text-secondary)' }}>
              Teachers
            </div>
            <div style={{ fontSize: '11px', color: userType === 'teachers' ? '#BFDBFE' : 'var(--text-muted)', marginTop: '1px' }}>
              86 Teachers
            </div>
          </div>
        </button>
      </div>

      {/* 4. Main Two-Column Master/Detail Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: inspectorOpen ? 'minmax(0, 1fr) 380px' : 'minmax(0, 1fr)',
          gap: '20px',
          alignItems: 'start',
          width: '100%'
        }}
      >
        {/* ========================================================
            LEFT COLUMN: Main Table Card View
            ======================================================== */}
        <div
          style={{
            background: 'var(--bg-card)',
            borderRadius: '18px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            minWidth: 0
          }}
        >
          {/* Section Header with Action Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                {userType === 'teachers' ? 'Teachers (86)' : 'Students (1,248)'}
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '3px', margin: 0 }}>
                {userType === 'teachers'
                  ? 'View and manage all faculty members in your institution.'
                  : 'View and manage all enrolled students in your institution.'}
              </p>
            </div>

            <button
              onClick={() => {
                if (userType === 'teachers') {
                  const nextId = `T0${teachers.length + 1}`.padStart(4, '0');
                  setNewUser({
                    name: '',
                    facultyId: nextId,
                    email: '',
                    phone: '',
                    dateOfJoining: '16 Oct 2026',
                    employeeType: 'Regular',
                    status: 'Active',
                    department: 'Computer Science and Engineering',
                    designation: 'Assistant Professor',
                    blockName: 'CSE Block',
                    floorNumber: '3rd Floor',
                    officeHours: 'Mon - Fri, 10:00 AM - 4:00 PM',
                    bio: '',
                    avatar: ''
                  });
                } else {
                  const nextRoll = `23CS0${students.length + 1}`.padStart(7, '0');
                  setNewUser({
                    name: '',
                    rollNo: nextRoll,
                    email: '',
                    phone: '',
                    dateOfJoining: '15 Aug 2026',
                    status: 'Active',
                    department: 'Computer Science and Engineering',
                    academicYear: 'III Year',
                    semester: 'Semester 5',
                    cgpa: '8.92',
                    attendance: '94%',
                    bio: '',
                    avatar: ''
                  });
                }
                setIsAddModalOpen(true);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                borderRadius: '10px',
                background: 'var(--primary)',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(23, 75, 255, 0.45)',
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(23, 75, 255, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(23, 75, 255, 0.45)';
              }}
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>{userType === 'teachers' ? 'Add Teacher' : 'Add Student'}</span>
            </button>
          </div>

          {/* Search Bar Input */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search
              size={16}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder={
                userType === 'teachers'
                  ? 'Search by name, faculty ID, email...'
                  : 'Search by name, student ID, roll no, email...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 16px 11px 44px',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-input)',
                fontSize: '13px',
                color: 'var(--text-main)',
                outline: 'none',
                transition: 'border-color 0.18s ease'
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
            />
          </div>

          {/* Table Container */}
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr
                  style={{
                    borderBottom: '1px solid var(--border)',
                    background: 'rgba(6, 13, 29, 0.85)',
                    color: '#7B8BA6',
                    fontSize: '12px'
                  }}
                >
                  <th style={{ padding: '12px 10px', width: '38px', textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      style={{ cursor: 'pointer', accentColor: 'var(--primary)', width: '15px', height: '15px' }}
                    />
                  </th>
                  <th style={{ padding: '12px 10px', fontWeight: '600', width: '30px', color: '#7B8BA6' }}>#</th>
                  <th style={{ padding: '12px 14px', fontWeight: '600', width: '100px', color: '#7B8BA6' }}>
                    {userType === 'teachers' ? 'Faculty ID' : 'Roll No'}
                  </th>
                  <th style={{ padding: '12px 14px', fontWeight: '600', color: '#7B8BA6' }}>Name</th>
                  <th style={{ padding: '12px 14px', fontWeight: '600', color: '#7B8BA6' }}>Department</th>
                  <th style={{ padding: '12px 14px', fontWeight: '600', color: '#7B8BA6' }}>Email</th>
                  <th style={{ padding: '12px 14px', fontWeight: '600', color: '#7B8BA6' }}>Status</th>
                  <th style={{ padding: '12px 14px', fontWeight: '600', textAlign: 'center', width: '60px', color: '#7B8BA6' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((item) => {
                  const isSelected =
                    userType === 'teachers' ? selectedTeacherId === item.id : selectedStudentId === item.id;
                  const isChecked = selectedIds.has(item.id);

                  return (
                    <tr
                      key={item.id}
                      onClick={() => {
                        if (userType === 'teachers') {
                          setSelectedTeacherId(item.id);
                        } else {
                          setSelectedStudentId(item.id);
                        }
                        setInspectorOpen(true);
                      }}
                      style={{
                        borderBottom: '1px solid var(--border-subtle)',
                        fontSize: '13px',
                        cursor: 'pointer',
                        background: isSelected ? 'rgba(23, 75, 255, 0.14)' : 'transparent',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(23, 75, 255, 0.06)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {/* Checkbox */}
                      <td
                        style={{ padding: '13px 10px', textAlign: 'center' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelectOne(item.id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          style={{ cursor: 'pointer', accentColor: 'var(--primary)', width: '15px', height: '15px' }}
                        />
                      </td>

                      {/* Number # */}
                      <td style={{ padding: '13px 10px', color: 'var(--text-muted)', fontWeight: '600' }}>
                        {item.num}
                      </td>

                      {/* Faculty ID / Roll No */}
                      <td style={{ padding: '13px 14px', color: 'var(--text-main)', fontWeight: '600' }}>
                        {item.id || item.rollNo}
                      </td>

                      {/* Name with Avatar */}
                      <td style={{ padding: '13px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: 'var(--primary-gradient)',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: '700',
                              fontSize: '12px',
                              overflow: 'hidden',
                              flexShrink: 0,
                              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                            }}
                          >
                            {item.avatar ? (
                              <img
                                src={item.avatar}
                                alt={item.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            ) : (
                              <span>
                                {item.name
                                  .split(' ')
                                  .filter((n) => !n.startsWith('Dr.') && !n.startsWith('Mr.') && !n.startsWith('Ms.') && !n.startsWith('Mrs.'))
                                  .slice(0, 2)
                                  .map((n) => n[0])
                                  .join('') || item.name.slice(0, 2)}
                              </span>
                            )}
                          </div>
                          <span style={{ fontWeight: '700', color: '#FFFFFF' }}>{item.name}</span>
                        </div>
                      </td>

                      {/* Department */}
                      <td style={{ padding: '13px 14px', color: 'var(--text-secondary)' }}>
                        {item.department}
                      </td>

                      {/* Email */}
                      <td style={{ padding: '13px 14px', color: 'var(--text-muted)', fontSize: '12.5px' }}>
                        {item.email}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '13px 14px' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '3px 10px',
                            borderRadius: '12px',
                            fontSize: '11.5px',
                            fontWeight: '700',
                            background:
                              item.status === 'Active'
                                ? 'rgba(16, 185, 129, 0.16)'
                                : item.status === 'Pending'
                                ? 'rgba(245, 158, 11, 0.16)'
                                : 'rgba(239, 68, 68, 0.16)',
                            color:
                              item.status === 'Active'
                                ? '#10B981'
                                : item.status === 'Pending'
                                ? '#F59E0B'
                                : '#EF4444',
                            border:
                              item.status === 'Active'
                                ? '1px solid rgba(16, 185, 129, 0.3)'
                                : item.status === 'Pending'
                                ? '1px solid rgba(245, 158, 11, 0.3)'
                                : '1px solid rgba(239, 68, 68, 0.3)'
                          }}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td
                        style={{ padding: '13px 14px', textAlign: 'center', position: 'relative' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActionMenuId(actionMenuId === item.id ? null : item.id);
                        }}
                      >
                        <button
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '6px'
                          }}
                          title="Actions"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {/* Dropdown Menu */}
                        {actionMenuId === item.id && (
                          <div
                            className="fade-in"
                            style={{
                              position: 'absolute',
                              right: '12px',
                              top: 'calc(100% - 4px)',
                              width: '150px',
                              background: '#0B132B',
                              borderRadius: '10px',
                              border: '1px solid var(--border)',
                              boxShadow: '0 10px 28px rgba(0, 0, 0, 0.6)',
                              padding: '4px',
                              zIndex: 60,
                              textAlign: 'left'
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => {
                                if (userType === 'teachers') setSelectedTeacherId(item.id);
                                else setSelectedStudentId(item.id);
                                setInspectorOpen(true);
                                setActionMenuId(null);
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                width: '100%',
                                padding: '8px 10px',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-main)',
                                fontSize: '12px',
                                cursor: 'pointer',
                                borderRadius: '6px'
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(23, 75, 255, 0.15)')}
                              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                            >
                              <User size={13} color="var(--primary)" />
                              <span>View Profile</span>
                            </button>
                            <button
                              onClick={() => {
                                alert(`Editing details for ${item.name}`);
                                setActionMenuId(null);
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                width: '100%',
                                padding: '8px 10px',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-main)',
                                fontSize: '12px',
                                cursor: 'pointer',
                                borderRadius: '6px'
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(23, 75, 255, 0.15)')}
                              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                            >
                              <Edit2 size={13} color="#38BDF8" />
                              <span>Edit Record</span>
                            </button>
                            <button
                              onClick={() => {
                                alert(`Status updated for ${item.name}`);
                                setActionMenuId(null);
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                width: '100%',
                                padding: '8px 10px',
                                background: 'transparent',
                                border: 'none',
                                color: '#EF4444',
                                fontSize: '12px',
                                cursor: 'pointer',
                                borderRadius: '6px'
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)')}
                              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                            >
                              <Trash2 size={13} color="#EF4444" />
                              <span>Deactivate</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Pagination Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
              Showing 1 to {Math.min(filteredRecords.length, 10)} of{' '}
              {userType === 'teachers' ? '86 teachers' : '1,248 students'}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* Prev Button */}
              <button
                className="icon-btn-circle"
                style={{ width: '30px', height: '30px', borderRadius: '8px' }}
                disabled
              >
                <ChevronLeft size={14} />
              </button>

              {/* Page Numbers */}
              {[1, 2, 3, 4, 5].map((p) => (
                <button
                  key={p}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    border: p === 1 ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                    background: p === 1 ? 'var(--primary)' : 'transparent',
                    color: p === 1 ? '#FFFFFF' : 'var(--text-muted)',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: p === 1 ? '0 0 10px rgba(23, 75, 255, 0.4)' : 'none'
                  }}
                >
                  {p}
                </button>
              ))}

              <span style={{ color: 'var(--text-muted)', padding: '0 4px', fontSize: '12px' }}>...</span>

              <button
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                9
              </button>

              {/* Next Button */}
              <button
                className="icon-btn-circle"
                style={{ width: '30px', height: '30px', borderRadius: '8px' }}
              >
                <ChevronRight size={14} />
              </button>

              {/* Per Page Dropdown */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '5px 10px',
                  borderRadius: '8px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  marginLeft: '8px',
                  cursor: 'pointer'
                }}
              >
                <span>10 / page</span>
                <ChevronDown size={13} color="var(--text-muted)" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: User Profile Detail Inspector Drawer
            ======================================================== */}
        {inspectorOpen && selectedEntity && (
          <div
            className="fade-in"
            style={{
              background: 'var(--bg-card)',
              borderRadius: '18px',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-md), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              position: 'relative'
            }}
          >
            {/* Close Button at top-right */}
            <button
              onClick={() => setInspectorOpen(false)}
              className="icon-btn-circle"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '30px',
                height: '30px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
              title="Close details"
            >
              <X size={15} />
            </button>

            {/* Profile Avatar & Primary Information */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '6px' }}>
              <div
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  background: 'var(--primary-gradient)',
                  boxShadow: '0 8px 24px rgba(23, 75, 255, 0.35)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: '800',
                  fontSize: '28px',
                  marginBottom: '12px'
                }}
              >
                {selectedEntity.avatar ? (
                  <img
                    src={selectedEntity.avatar}
                    alt={selectedEntity.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span>
                    {selectedEntity.name
                      .split(' ')
                      .filter((n) => !n.startsWith('Dr.') && !n.startsWith('Mr.') && !n.startsWith('Ms.') && !n.startsWith('Mrs.'))
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join('') || 'VK'}
                  </span>
                )}
              </div>

              {/* Name & Status Pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                  {selectedEntity.name}
                </h3>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontSize: '11px',
                    fontWeight: '700',
                    background: 'rgba(16, 185, 129, 0.16)',
                    color: '#10B981',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}
                >
                  {selectedEntity.status}
                </span>
              </div>

              {/* Role & ID Tagline */}
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                {userType === 'teachers'
                  ? `${selectedEntity.id} | ${selectedEntity.designation}`
                  : `${selectedEntity.rollNo} | ${selectedEntity.yearSemester}`}
              </div>

              {/* Department */}
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {selectedEntity.fullDepartment}
              </div>

              {/* Action Buttons: Edit & More Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '14px', width: '100%' }}>
                <button
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: 'var(--primary)',
                    color: '#FFFFFF',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(23, 75, 255, 0.35)'
                  }}
                  onClick={() => alert(`Edit profile for ${selectedEntity.name}`)}
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>

                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'var(--bg-input)',
                    color: 'var(--text-secondary)',
                    fontSize: '12.5px',
                    fontWeight: '600',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                  onClick={() => alert('Additional management actions')}
                >
                  <span>More Actions</span>
                  <ChevronDown size={13} color="var(--text-muted)" />
                </button>
              </div>
            </div>

            {/* Inspector Sub-Tabs */}
            <div
              style={{
                display: 'flex',
                borderBottom: '1px solid var(--border)',
                marginTop: '4px'
              }}
            >
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'academic', label: 'Academic' },
                { id: 'activity', label: 'Activity' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setInspectorTab(tab.id)}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: inspectorTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                    color: inspectorTab === tab.id ? '#FFFFFF' : 'var(--text-muted)',
                    fontSize: '12.5px',
                    fontWeight: inspectorTab === tab.id ? '700' : '500',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: 1. OVERVIEW */}
            {inspectorTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Personal Information Group */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#38BDF8' }}>
                    <User size={15} />
                    <span>Personal Information</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Full Name</span>
                      <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{selectedEntity.name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{userType === 'teachers' ? 'Faculty ID' : 'Roll No'}</span>
                      <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{selectedEntity.id || selectedEntity.rollNo}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Email</span>
                      <span style={{ color: 'var(--text-main)', fontWeight: '500' }}>{selectedEntity.email}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Phone</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{selectedEntity.phone}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Date of Joining</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{selectedEntity.dateOfJoining}</span>
                    </div>
                    {selectedEntity.employeeType && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Employee Type</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{selectedEntity.employeeType}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Status</span>
                      <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '700', background: 'rgba(16, 185, 129, 0.16)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                        {selectedEntity.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Official Information Group */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#38BDF8' }}>
                    <Building size={15} />
                    <span>Official Information</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Department</span>
                      <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{selectedEntity.fullDepartment}</span>
                    </div>
                    {userType === 'teachers' ? (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Designation</span>
                          <span style={{ color: 'var(--text-secondary)' }}>{selectedEntity.designation}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Office Location</span>
                          <span style={{ color: 'var(--text-secondary)' }}>{selectedEntity.officeRoom}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Office Hours</span>
                          <span style={{ color: 'var(--text-secondary)', textAlign: 'right' }}>{selectedEntity.officeHours}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Current Standing</span>
                          <span style={{ color: 'var(--text-secondary)' }}>{selectedEntity.yearSemester}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Cumulative CGPA</span>
                          <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{selectedEntity.cgpa} / 10.0</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Attendance Rate</span>
                          <span style={{ color: '#10B981', fontWeight: '700' }}>{selectedEntity.attendance}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Bio / Description Group */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#38BDF8' }}>
                    <Shield size={15} />
                    <span>Bio</span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                    {selectedEntity.bio}
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 2. ACADEMIC */}
            {inspectorTab === 'academic' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase' }}>
                  {userType === 'teachers' ? 'Assigned Courses' : 'Enrolled Courses'}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(selectedEntity.courses || selectedEntity.enrolledCourses || []).map((c, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <BookOpen size={14} color="var(--primary)" />
                        <span style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-main)' }}>{c}</span>
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Active</span>
                    </div>
                  ))}
                </div>

                {selectedEntity.sections && (
                  <>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', marginTop: '6px' }}>
                      Allocated Class Sections
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedEntity.sections.map((s, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '10px 12px',
                            borderRadius: '10px',
                            background: 'var(--bg-input)',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <Layers size={14} color="#38BDF8" />
                          <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* TAB CONTENT: 3. ACTIVITY */}
            {inspectorTab === 'activity' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase' }}>
                  Recent System Timeline
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(selectedEntity.recentActivity || []).map((act, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px'
                      }}
                    >
                      <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary)' }}>
                        {act.time}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {act.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================
          MODAL: ADD NEW USER (Teacher or Student)
          ======================================================== */}
      {isAddModalOpen && (
        <div
          className="fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(3, 7, 18, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            style={{
              background: '#0B132B',
              borderRadius: '20px',
              border: '1px solid rgba(56, 189, 248, 0.22)',
              boxShadow: '0 24px 70px rgba(0, 0, 0, 0.85), 0 0 32px rgba(23, 75, 255, 0.25)',
              width: '100%',
              maxWidth: '660px',
              maxHeight: '88vh',
              overflowY: 'auto',
              padding: '26px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                  {userType === 'teachers' ? 'Add New Faculty Member' : 'Enroll New Student'}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '3px', margin: 0 }}>
                  {userType === 'teachers'
                    ? 'Enter faculty personal, official, and bio credentials.'
                    : 'Create institutional credentials and assign academic department permissions.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="icon-btn-circle"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {userType === 'teachers' ? (
                <>
                  {/* SECTION 1: Personal Information */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#38BDF8', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '6px' }}>
                      <User size={15} />
                      <span>Personal Information</span>
                    </div>

                    {/* Full Name & Faculty ID */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. Rajesh Kannan"
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 14px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Faculty ID *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="T011"
                          value={newUser.facultyId}
                          onChange={(e) => setNewUser({ ...newUser, facultyId: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 14px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Institutional Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@esec.ac.in"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 14px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 9876543210"
                          value={newUser.phone}
                          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 14px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    {/* Date of Joining & Employee Type */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Date of Joining
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 12 Jul 2024"
                          value={newUser.dateOfJoining}
                          onChange={(e) => setNewUser({ ...newUser, dateOfJoining: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 14px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Employee Type
                        </label>
                        <select
                          value={newUser.employeeType}
                          onChange={(e) => setNewUser({ ...newUser, employeeType: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        >
                          <option value="Regular">Regular</option>
                          <option value="Probationary">Probationary</option>
                          <option value="Sabbatical">Sabbatical</option>
                          <option value="Visiting">Visiting</option>
                          <option value="On Leave">On Leave</option>
                        </select>
                      </div>
                    </div>

                    {/* Status (Strictly 2 options: Active & Inactive) & Photo URL */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Status * (Active / Inactive)
                        </label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => setNewUser({ ...newUser, status: 'Active' })}
                            style={{
                              flex: 1,
                              padding: '8px 12px',
                              borderRadius: '8px',
                              border: newUser.status === 'Active' ? '1px solid #10B981' : '1px solid rgba(255, 255, 255, 0.1)',
                              background: newUser.status === 'Active' ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-input)',
                              color: newUser.status === 'Active' ? '#10B981' : 'var(--text-muted)',
                              fontWeight: '700',
                              fontSize: '12px',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              boxShadow: newUser.status === 'Active' ? '0 0 12px rgba(16, 185, 129, 0.35)' : 'none'
                            }}
                          >
                            Active
                          </button>
                          <button
                            type="button"
                            onClick={() => setNewUser({ ...newUser, status: 'Inactive' })}
                            style={{
                              flex: 1,
                              padding: '8px 12px',
                              borderRadius: '8px',
                              border: newUser.status === 'Inactive' ? '1px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.1)',
                              background: newUser.status === 'Inactive' ? 'rgba(239, 68, 68, 0.2)' : 'var(--bg-input)',
                              color: newUser.status === 'Inactive' ? '#EF4444' : 'var(--text-muted)',
                              fontWeight: '700',
                              fontSize: '12px',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              boxShadow: newUser.status === 'Inactive' ? '0 0 12px rgba(239, 68, 68, 0.35)' : 'none'
                            }}
                          >
                            Inactive
                          </button>
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Photo URL (Optional)
                        </label>
                        <input
                          type="url"
                          placeholder="https://... or blank for initials"
                          value={newUser.avatar}
                          onChange={(e) => setNewUser({ ...newUser, avatar: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 14px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: Official Information */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#38BDF8', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '6px' }}>
                      <Building size={15} />
                      <span>Official Information</span>
                    </div>

                    {/* Department & Designation */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Department *
                        </label>
                        <select
                          value={newUser.department}
                          onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        >
                          <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                          <option value="Information Technology & Cloud Systems">Information Technology & Cloud Systems</option>
                          <option value="Electronics & Communication">Electronics & Communication</option>
                          <option value="Mechanical Engineering">Mechanical Engineering</option>
                          <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Designation *
                        </label>
                        <select
                          value={newUser.designation}
                          onChange={(e) => setNewUser({ ...newUser, designation: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        >
                          <option value="Professor">Professor</option>
                          <option value="Associate Professor">Associate Professor</option>
                          <option value="Assistant Professor">Assistant Professor</option>
                          <option value="Lecturer">Lecturer</option>
                          <option value="Professor & HoD">Professor & HoD</option>
                        </select>
                      </div>
                    </div>

                    {/* Block Name & Floor Number (Strictly without room number) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Block Name *
                        </label>
                        <select
                          value={newUser.blockName}
                          onChange={(e) => setNewUser({ ...newUser, blockName: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        >
                          <option value="CSE Block">CSE Block</option>
                          <option value="IT Block">IT Block</option>
                          <option value="ECE Block">ECE Block</option>
                          <option value="Mech Block">Mech Block</option>
                          <option value="AI Research Block">AI Research Block</option>
                          <option value="Main Academic Block">Main Academic Block</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Floor Number *
                        </label>
                        <select
                          value={newUser.floorNumber}
                          onChange={(e) => setNewUser({ ...newUser, floorNumber: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        >
                          <option value="Ground Floor">Ground Floor</option>
                          <option value="1st Floor">1st Floor</option>
                          <option value="2nd Floor">2nd Floor</option>
                          <option value="3rd Floor">3rd Floor</option>
                          <option value="4th Floor">4th Floor</option>
                          <option value="5th Floor">5th Floor</option>
                        </select>
                      </div>
                    </div>

                    {/* Office Hours */}
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                        Office Hours
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mon - Fri, 10:00 AM - 4:00 PM"
                        value={newUser.officeHours}
                        onChange={(e) => setNewUser({ ...newUser, officeHours: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 14px',
                          borderRadius: '10px',
                          border: '1px solid var(--border)',
                          background: 'var(--bg-input)',
                          color: '#FFFFFF',
                          fontSize: '13px',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* SECTION 3: Bio & Research Summary */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#38BDF8', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '6px' }}>
                      <Shield size={15} />
                      <span>Bio & Research Summary</span>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                        Bio
                      </label>
                      <textarea
                        rows="3"
                        placeholder="Research interests: Artificial Intelligence, Machine Learning, Data Mining. 10+ years of teaching and research experience."
                        value={newUser.bio}
                        onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1px solid var(--border)',
                          background: 'var(--bg-input)',
                          color: '#FFFFFF',
                          fontSize: '13px',
                          outline: 'none',
                          resize: 'vertical',
                          lineHeight: '1.5'
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                /* ========================================================
                   STUDENT ENROLLMENT FORM (3 Distinct Sections matching Image 2)
                   ======================================================== */
                <>
                  {/* SECTION 1: Personal Information */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#38BDF8', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '6px' }}>
                      <User size={15} />
                      <span>Personal Information</span>
                    </div>

                    {/* Full Name & Roll No */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Arjun Mehta"
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 14px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Roll No *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="23CS014"
                          value={newUser.rollNo}
                          onChange={(e) => setNewUser({ ...newUser, rollNo: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 14px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    {/* Institutional Email & Phone Number (10 continuous digits without space) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Institutional Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="arjun.mehta@inst.edu"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 14px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Phone Number (e.g. +91 9442188101)
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 9442188101"
                          value={newUser.phone}
                          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 14px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    {/* Date of Joining & Binary Status (Strictly 2 options: Active & Inactive) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Date of Joining
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 15 Aug 2023"
                          value={newUser.dateOfJoining}
                          onChange={(e) => setNewUser({ ...newUser, dateOfJoining: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 14px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Status * (Active / Inactive)
                        </label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => setNewUser({ ...newUser, status: 'Active' })}
                            style={{
                              flex: 1,
                              padding: '8px 12px',
                              borderRadius: '8px',
                              border: newUser.status === 'Active' ? '1px solid #10B981' : '1px solid rgba(255, 255, 255, 0.1)',
                              background: newUser.status === 'Active' ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-input)',
                              color: newUser.status === 'Active' ? '#10B981' : 'var(--text-muted)',
                              fontWeight: '700',
                              fontSize: '12px',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              boxShadow: newUser.status === 'Active' ? '0 0 12px rgba(16, 185, 129, 0.35)' : 'none'
                            }}
                          >
                            Active
                          </button>
                          <button
                            type="button"
                            onClick={() => setNewUser({ ...newUser, status: 'Inactive' })}
                            style={{
                              flex: 1,
                              padding: '8px 12px',
                              borderRadius: '8px',
                              border: newUser.status === 'Inactive' ? '1px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.1)',
                              background: newUser.status === 'Inactive' ? 'rgba(239, 68, 68, 0.2)' : 'var(--bg-input)',
                              color: newUser.status === 'Inactive' ? '#EF4444' : 'var(--text-muted)',
                              fontWeight: '700',
                              fontSize: '12px',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              boxShadow: newUser.status === 'Inactive' ? '0 0 12px rgba(239, 68, 68, 0.35)' : 'none'
                            }}
                          >
                            Inactive
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Photo URL (Optional) */}
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                        Photo URL (Optional • Blank for initial initials avatar)
                      </label>
                      <input
                        type="url"
                        placeholder="https://... or blank for initials"
                        value={newUser.avatar}
                        onChange={(e) => setNewUser({ ...newUser, avatar: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 14px',
                          borderRadius: '10px',
                          border: '1px solid var(--border)',
                          background: 'var(--bg-input)',
                          color: '#FFFFFF',
                          fontSize: '13px',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* SECTION 2: Official Information */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#38BDF8', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '6px' }}>
                      <Building size={15} />
                      <span>Official Information</span>
                    </div>

                    {/* Department */}
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                        Department *
                      </label>
                      <select
                        value={newUser.department}
                        onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '10px',
                          border: '1px solid var(--border)',
                          background: 'var(--bg-input)',
                          color: '#FFFFFF',
                          fontSize: '13px',
                          outline: 'none'
                        }}
                      >
                        <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                        <option value="Information Technology & Cyber Security">Information Technology & Cyber Security</option>
                        <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                        <option value="Department of Mechanical Engineering">Department of Mechanical Engineering</option>
                        <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
                        <option value="Civil and Structural Engineering">Civil and Structural Engineering</option>
                      </select>
                    </div>

                    {/* Current Standing: Year & Semester Coordinated Dropdowns */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Academic Year *
                        </label>
                        <select
                          value={newUser.academicYear}
                          onChange={(e) => setNewUser({ ...newUser, academicYear: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        >
                          <option value="I Year">I Year</option>
                          <option value="II Year">II Year</option>
                          <option value="III Year">III Year</option>
                          <option value="IV Year">IV Year</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Semester *
                        </label>
                        <select
                          value={newUser.semester}
                          onChange={(e) => setNewUser({ ...newUser, semester: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        >
                          <option value="Semester 1">Semester 1</option>
                          <option value="Semester 2">Semester 2</option>
                          <option value="Semester 3">Semester 3</option>
                          <option value="Semester 4">Semester 4</option>
                          <option value="Semester 5">Semester 5</option>
                          <option value="Semester 6">Semester 6</option>
                          <option value="Semester 7">Semester 7</option>
                          <option value="Semester 8">Semester 8</option>
                        </select>
                      </div>
                    </div>

                    {/* Cumulative CGPA & Attendance Rate */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Cumulative CGPA (out of 10.0)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 8.92"
                          value={newUser.cgpa}
                          onChange={(e) => setNewUser({ ...newUser, cgpa: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 14px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                          Attendance Rate (e.g. 94%)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 94%"
                          value={newUser.attendance}
                          onChange={(e) => setNewUser({ ...newUser, attendance: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 14px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: Bio & Academic Background */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#38BDF8', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '6px' }}>
                      <Shield size={15} />
                      <span>Bio</span>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                        Bio & Academic Focus
                      </label>
                      <textarea
                        rows="3"
                        placeholder="Passionate competitive programmer, active member of ACM Chapter, focusing on graph algorithms."
                        value={newUser.bio}
                        onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1px solid var(--border)',
                          background: 'var(--bg-input)',
                          color: '#FFFFFF',
                          fontSize: '13px',
                          outline: 'none',
                          resize: 'vertical',
                          lineHeight: '1.5'
                        }}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    padding: '9px 20px',
                    borderRadius: '10px',
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    color: 'var(--text-secondary)',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '9px 26px',
                    borderRadius: '10px',
                    background: 'var(--primary)',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 18px rgba(23, 75, 255, 0.45)'
                  }}
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
