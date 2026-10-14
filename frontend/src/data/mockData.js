/**
 * DEVELOPMENT MOCK DATA (TEMPORARY)
 * -------------------------------------------------------------
 * This dataset provides placeholder data for the Student Portal UI
 * during Phase 1 refactoring. Real API endpoints in backend/app
 * will replace this data in subsequent implementation phases.
 */

export const initialStudentData = {
  profile: {
    name: 'Vijay Vikas',
    initials: 'VK',
    role: 'Student',
    email: 'vijay.vikas@college.edu',
    institution: 'Erode Sengunthar Engineering College',
    department: 'Computer Science & Engineering',
    enrolledCoursesCount: 3,
    completedLessonsCount: 5,
    pendingAssessmentsCount: 2,
    overallProgress: 78,
    streakDays: 7,
  },

  schedule: [
    { id: 1, time: '10:00 AM', title: 'DSA Practice', status: 'Ongoing', type: 'practice' },
    { id: 2, time: '02:00 PM', title: 'AI Tutor Session', status: 'Upcoming', type: 'ai' },
    { id: 3, time: '04:00 PM', title: 'Web Dev Lecture', status: 'Upcoming', type: 'lecture' },
    { id: 4, time: '06:00 PM', title: 'Revise Notes', status: 'Upcoming', type: 'notes' },
  ],

  courses: [
    {
      id: 'dsa',
      title: 'Data Structures and Algorithms',
      instructor: 'Prof. M. Sridhar',
      progress: 65,
      completedLessons: 16,
      totalLessons: 24,
      assessmentsCount: 5,
      currentTopic: 'Arrays • In Progress',
      image: '/assets/course_dsa.png',
      status: 'in-progress',
      category: 'Computer Science',
      description: 'Learn fundamental to advanced data structures and algorithms with hands-on practice and real-world applications.',
      level: 'Intermediate',
      modules: [
        {
          id: 'm1',
          title: '1. Introduction',
          completedCount: 3,
          totalCount: 3,
          isCompleted: true,
          lessons: [
            { id: 'l1_1', title: '1.1 What are Data Structures?', duration: '12 min', completed: true },
            { id: 'l1_2', title: '1.2 Why Learn DSA?', duration: '10 min', completed: true },
            { id: 'l1_3', title: '1.3 Time and Space Complexity', duration: '15 min', completed: true },
          ]
        },
        {
          id: 'm2',
          title: '2. Arrays',
          completedCount: 2,
          totalCount: 5,
          isOpen: true,
          lessons: [
            { id: 'l2_1', title: '2.1 Introduction to Arrays', duration: '14 min', active: true, completed: true },
            { id: 'l2_2', title: '2.2 Array Operations', duration: '18 min', completed: true },
            { id: 'l2_3', title: '2.3 Problems on Arrays', duration: '25 min', completed: false },
            { id: 'l2_4', title: '2.4 Two Pointers Technique', duration: '20 min', locked: true },
            { id: 'l2_5', title: '2.5 Sliding Window', duration: '22 min', locked: true },
          ]
        },
        {
          id: 'm3',
          title: '3. Linked Lists',
          completedCount: 0,
          totalCount: 6,
          lessons: [
            { id: 'l3_1', title: '3.1 Singly Linked List', duration: '15 min', locked: true },
            { id: 'l3_2', title: '3.2 Doubly Linked List', duration: '18 min', locked: true },
          ]
        },
        {
          id: 'm4',
          title: '4. Stacks and Queues',
          completedCount: 0,
          totalCount: 5,
          lessons: [
            { id: 'l4_1', title: '4.1 Stack Implementation', duration: '16 min', locked: true },
          ]
        },
        {
          id: 'm5',
          title: '5. Trees',
          completedCount: 0,
          totalCount: 6,
          lessons: [
            { id: 'l5_1', title: '5.1 Binary Tree Basics', duration: '20 min', locked: true },
          ]
        },
        {
          id: 'm6',
          title: '6. Graphs',
          completedCount: 0,
          totalCount: 6,
          lessons: [
            { id: 'l6_1', title: '6.1 Graph Representations', duration: '22 min', locked: true },
          ]
        }
      ]
    },
    {
      id: 'java',
      title: 'Java Programming',
      instructor: 'Prof. R. Kumar',
      progress: 80,
      completedLessons: 19,
      totalLessons: 24,
      assessmentsCount: 3,
      currentTopic: 'OOP Concepts • In Progress',
      image: '/assets/course_java.png',
      status: 'in-progress',
      category: 'Programming',
      description: 'Master Java from basics to advanced concepts with hands-on coding practice.',
      level: 'Beginner to Intermediate'
    },
    {
      id: 'mern',
      title: 'Web Development (MERN Stack)',
      instructor: 'Prof. A. Nandhini',
      progress: 100,
      completedLessons: 28,
      totalLessons: 28,
      assessmentsCount: 4,
      currentTopic: 'Full Stack Project • Completed',
      image: '/assets/course_web.png',
      status: 'completed',
      category: 'Web Development',
      description: 'Learn modern web development with React, Node.js, Express, and MongoDB.',
      level: 'All Levels'
    }
  ],

  aiTutor: {
    selectedCourse: 'Data Structures and Algorithms',
    selectedMaterial: 'Arrays',
    activeMode: 'Chat & Explain',
    suggestedQuestions: [
      'Explain binary search with dry run',
      'What is the time complexity of binary search?',
      'Solve a binary search problem with example',
    ],
    recentChats: [
      { id: 1, title: 'Binary search in Java', time: '10:24 AM' },
      { id: 2, title: 'Time complexity of quick sort', time: 'Yesterday' },
      { id: 3, title: 'Explain linked list operations', time: 'Yesterday' },
      { id: 4, title: 'Differences between array and linked list', time: '2 days ago' },
      { id: 5, title: 'How does recursion work?', time: '3 days ago' },
    ],
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'Can you explain binary search with example in Java?',
        time: '10:24 AM'
      },
      {
        id: 'msg-2',
        sender: 'ai',
        time: '10:24 AM',
        content: {
          intro: "Of course! Let's go step by step.",
          headline: 'What is Binary Search?',
          description: 'Binary Search is an efficient searching algorithm used on a sorted array. It repeatedly divides the search space in half to find the target element.',
          howItWorks: [
            'Compare the target with the middle element.',
            'If equal → return the index.',
            'If target is smaller → search in the left half.',
            'If target is larger → search in the right half.',
            'Repeat until the element is found or the search space is empty.'
          ],
          codeTitle: 'Java Implementation',
          codeLang: 'Java',
          codeSnippet: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) return mid;
            else if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1; // element not found
    }
}`,
          exampleRun: {
            array: '[10, 20, 30, 40, 50]',
            target: '30',
            steps: [
              'mid = 2 → arr[2] = 30',
              'Since arr[mid] == target, return index 2.',
              'Output: 2'
            ]
          }
        }
      }
    ]
  },

  practiceQuestions: [
    {
      id: 1,
      number: 1,
      total: 10,
      topic: 'Maximum Subarray Sum',
      concepts: "Kadane's Algorithm, Subarray",
      difficulty: 'Medium',
      questionType: 'Multiple Choice Question',
      timeLimit: '2 minutes',
      badge: 'Arrays',
      title: 'Given an array arr[] of size n, find the maximum sum of any contiguous subarray (Kadane\'s Algorithm).',
      sampleCode: `Input:
arr[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4}

Output:
6

Explanation:
The subarray [4, -1, 2, 1] has the largest sum = 6.`,
      options: [
        { key: 'A', text: '3' },
        { key: 'B', text: '5' },
        { key: 'C', text: '6', isCorrect: true },
        { key: 'D', text: '7' }
      ],
      selectedOption: 'C',
      hint: "Maintain max_so_far and max_ending_here. Update max_ending_here = max(arr[i], max_ending_here + arr[i]).",
      status: 'correct'
    },
    {
      id: 2,
      number: 2,
      total: 10,
      topic: 'Two Pointers in Array',
      concepts: 'Two Pointers, Sorted Array',
      difficulty: 'Easy',
      questionType: 'MCQ',
      timeLimit: '2 minutes',
      badge: 'Arrays',
      title: 'Given a sorted array, what is the optimal time complexity to find if two numbers sum to target X?',
      options: [
        { key: 'A', text: 'O(N^2)' },
        { key: 'B', text: 'O(N log N)' },
        { key: 'C', text: 'O(N)', isCorrect: true },
        { key: 'D', text: 'O(1)' }
      ],
      selectedOption: 'C',
      status: 'correct'
    },
    {
      id: 3,
      number: 3,
      total: 10,
      topic: 'Array Indexing',
      concepts: 'Indexing, Bounds',
      difficulty: 'Easy',
      questionType: 'MCQ',
      timeLimit: '2 minutes',
      badge: 'Arrays',
      title: 'What will be the output of the following code?',
      sampleCode: `int[] arr = {1, 2, 3, 4, 5};
System.out.println(arr[3]);`,
      options: [
        { key: 'A', text: '3' },
        { key: 'B', text: '4', isCorrect: true },
        { key: 'C', text: '5' },
        { key: 'D', text: 'Compilation Error' }
      ],
      selectedOption: 'B',
      status: 'incorrect'
    }
  ],

  assessments: [
    {
      id: 'a1',
      title: 'Unit 1 - Fundamentals Quiz',
      category: 'Quiz',
      unit: 'Unit 1',
      date: 'Oct 10, 2026 10:00 AM – Oct 10, 2026 11:00 AM',
      duration: '60 mins',
      questionsCount: 30,
      totalMarks: 30,
      status: 'Upcoming',
      statusType: 'upcoming',
      canStart: true
    },
    {
      id: 'a2',
      title: 'Arrays - Practice Test',
      category: 'Test',
      unit: 'Unit 2',
      date: 'Oct 5, 2026 02:00 PM – Oct 5, 2026 03:00 PM',
      score: '24 / 30',
      percentage: '80%',
      attemptedOn: 'Oct 5, 2026',
      status: 'Completed',
      statusType: 'completed',
      hasResult: true
    },
    {
      id: 'a3',
      title: 'Unit 2 - Arrays Assessment',
      category: 'Test',
      unit: 'Unit 2',
      date: 'Sep 28, 2026 10:00 AM – Sep 28, 2026 11:00 AM',
      score: '18 / 25',
      percentage: '72%',
      attemptedOn: 'Sep 28, 2026',
      status: 'Graded',
      statusType: 'graded',
      hasResult: true
    },
    {
      id: 'a4',
      title: 'Mid Term Examination',
      category: 'Exam',
      unit: 'Units 1 - 3',
      date: 'Nov 2, 2026 09:00 AM – Nov 2, 2026 12:00 PM',
      duration: '180 mins',
      questionsCount: 60,
      totalMarks: 60,
      status: 'Upcoming',
      statusType: 'upcoming',
      canStart: true
    },
    {
      id: 'a5',
      title: 'Unit 3 - Searching & Sorting',
      category: 'Quiz',
      unit: 'Unit 3',
      date: 'Oct 20, 2026 11:00 AM – Oct 20, 2026 12:00 PM',
      duration: '60 mins',
      questionsCount: 25,
      totalMarks: 25,
      status: 'Not Attempted',
      statusType: 'not_attempted',
      canStart: true
    },
    {
      id: 'a6',
      title: 'Final Assessment',
      category: 'Exam',
      unit: 'Full Course',
      date: 'Dec 15, 2026 09:00 AM – Dec 15, 2026 12:00 PM',
      duration: '180 mins',
      questionsCount: 70,
      totalMarks: 70,
      status: 'Not Available',
      statusType: 'disabled'
    }
  ],

  flashcards: [
    {
      id: 1,
      topic: 'Arrays',
      question: 'What is the time complexity to access an element in an array by index?',
      answer: 'O(1) Constant Time. Because elements are stored in contiguous memory locations, the memory address can be computed directly using: Base_Address + (Index * Element_Size).',
      difficulty: 'Easy',
      status: 'learning'
    },
    {
      id: 2,
      topic: 'Arrays',
      question: 'What is the index of the first element in an array in Java / C++ / Python?',
      answer: '0 (Zero-indexed). The first element is accessed at index 0.',
      difficulty: 'Easy',
      status: 'mastered'
    },
    {
      id: 3,
      topic: 'Algorithms',
      question: 'What is the worst-case time complexity of QuickSort?',
      answer: 'O(N^2) when the pivot chosen is consistently the smallest or largest element.',
      difficulty: 'Medium',
      status: 'learning'
    },
    {
      id: 4,
      topic: 'Linked Lists',
      question: 'Why do arrays have faster element lookup than linked lists?',
      answer: 'Arrays offer direct random access with O(1) time complexity and superior CPU cache locality, whereas linked lists require sequential traversal with O(N) pointers.',
      difficulty: 'Medium',
      status: 'mastered'
    }
  ],

  libraryResources: [
    {
      id: 'r1',
      title: 'Unit 1 - Introduction to DSA',
      fileName: 'DSA_Unit1_Slides.pdf',
      type: 'Lecture Slides',
      category: 'slides',
      date: 'Oct 10, 2026',
      size: '12.4 MB',
      icon: 'pdf',
      action: 'Download'
    },
    {
      id: 'r2',
      title: 'Assignment 1 - Arrays',
      fileName: 'DSA_Assignment1.pdf',
      type: 'Assignments',
      category: 'assignments',
      date: 'Oct 8, 2026',
      size: '1.1 MB',
      icon: 'assignment',
      action: 'Download'
    },
    {
      id: 'r3',
      title: 'Algorithm Visualization Tool',
      fileName: 'External Link',
      type: 'Reference',
      category: 'reference',
      date: 'Oct 5, 2026',
      size: 'Link',
      icon: 'link',
      action: 'Open Link',
      url: 'https://visualgo.net'
    },
    {
      id: 'r4',
      title: 'Unit 2 - Two Pointers',
      fileName: 'DSA_Unit2_Slides.pdf',
      type: 'Lecture Slides',
      category: 'slides',
      date: 'Oct 10, 2026',
      size: '14.8 MB',
      icon: 'pdf',
      action: 'Download'
    },
    {
      id: 'r5',
      title: 'Sorting Algorithm Cheat Sheet',
      fileName: 'Sorting_CheatSheet.pdf',
      type: 'Reference',
      category: 'reference',
      date: 'Sep 28, 2026',
      size: '650 KB',
      icon: 'reference',
      action: 'Download'
    },
    {
      id: 'r6',
      title: 'Assignment 2 - Sorting',
      fileName: 'DSA_Assignment2.pdf',
      type: 'Assignments',
      category: 'assignments',
      date: 'Sep 25, 2026',
      size: '1.3 MB',
      icon: 'assignment',
      action: 'Download'
    },
    {
      id: 'r7',
      title: 'Array Practice Programs',
      fileName: 'arrays_examples.zip',
      type: 'Code Files',
      category: 'code',
      date: 'Sep 20, 2026',
      size: '420 KB',
      icon: 'code',
      action: 'Download'
    },
    {
      id: 'r8',
      title: 'Unit 3 - Recursion',
      fileName: 'DSA_Unit3_Slides.pdf',
      type: 'Lecture Slides',
      category: 'slides',
      date: 'Sep 15, 2026',
      size: '10.8 MB',
      icon: 'pdf',
      action: 'Download'
    },
    {
      id: 'r9',
      title: 'Sorting Implementations',
      fileName: 'sorting_codes.zip',
      type: 'Code Files',
      category: 'code',
      date: 'Sep 12, 2026',
      size: '980 KB',
      icon: 'code',
      action: 'Download'
    }
  ],

  notifications: [
    {
      id: 'n1',
      title: 'New Lecture Material Uploaded',
      category: 'Course Updates',
      time: '2 hours ago',
      unread: true,
      sender: 'Dr. R. Kumar',
      role: 'Assistant Professor, CSE',
      course: 'Advanced Java Programming',
      date: 'Oct 16, 2026 • 2:00 PM',
      body: 'Dear Students,\n\nThe lecture notes and slides for Unit 3 - Lambda Expressions are now available in the course materials section.\n\nPlease go through the materials before the next class.\n\nThank you.',
      attachments: [
        { name: 'Unit_3_Lambda_Expressions.pdf', size: '4.2 MB', type: 'pdf' },
        { name: 'Unit_3_Slides.pptx', size: '3.8 MB', type: 'ppt' }
      ]
    },
    {
      id: 'n2',
      title: 'Assignment 2 Released',
      category: 'Assignments',
      time: '5 hours ago',
      unread: true,
      sender: 'Dr. R. Kumar',
      course: 'Advanced Java Programming',
      body: 'Assignment 2 on Exception Handling is now available. Submission deadline is Oct 20, 2026.'
    },
    {
      id: 'n3',
      title: 'Quiz Scheduled',
      category: 'Assessments',
      time: '1 day ago',
      unread: true,
      sender: 'Dr. R. Kumar',
      course: 'Advanced Java Programming',
      body: 'A quiz on Unit 2 (Collections Framework) is scheduled for Oct 18, 2026 at 10:00 AM.'
    },
    {
      id: 'n4',
      title: 'Class Schedule Update',
      category: 'Announcements',
      time: '1 day ago',
      unread: true,
      sender: 'Dr. R. Kumar',
      course: 'Advanced Java Programming',
      body: "Tomorrow's class (Oct 17) will be conducted online via Google Meet."
    }
  ],

  calendarEvents: [
    { id: 'c1', title: '10:00 AM Lecture: Arrays', date: '2026-10-02', type: 'Lectures', color: '#3b82f6' },
    { id: 'c2', title: '11:00 AM Quiz: Unit 1', date: '2026-10-06', type: 'Assessments', color: '#6366f1' },
    { id: 'c3', title: '7:00 PM Self Study', date: '2026-10-08', type: 'Study Plan', color: '#10b981' },
    { id: 'c4', title: '11:59 PM Assignment 1 Deadline', date: '2026-10-10', type: 'Deadlines', color: '#ef4444' },
    { id: 'c5', title: '10:00 AM Lecture: Linked Lists', date: '2026-10-13', type: 'Lectures', color: '#3b82f6' },
    { id: 'c6', title: '2:00 PM Practice Test', date: '2026-10-15', type: 'Assessments', isCurrentDay: true, color: '#f59e0b' },
    { id: 'c7', title: '10:00 AM Lecture: Stacks & Queues', date: '2026-10-17', type: 'Lectures', color: '#3b82f6' },
    { id: 'c8', title: '7:00 PM Revision Session', date: '2026-10-20', type: 'Study Plan', color: '#10b981' },
    { id: 'c9', title: '11:59 PM Assignment 2 Deadline', date: '2026-10-22', type: 'Deadlines', color: '#ef4444' },
    { id: 'c10', title: '1:00 PM Mid Term Test', date: '2026-10-24', type: 'Assessments', color: '#6366f1' },
    { id: 'c11', title: '10:00 AM Lecture: Trees', date: '2026-10-27', type: 'Lectures', color: '#3b82f6' },
    { id: 'c12', title: '7:00 PM Self Study', date: '2026-10-29', type: 'Study Plan', color: '#10b981' },
    { id: 'c13', title: '10:00 AM Lecture: Graphs', date: '2026-10-31', type: 'Lectures', color: '#3b82f6' }
  ]
};

export const initialTeacherData = {
  profile: {
    name: 'Vijay Vikas',
    initials: 'VV',
    role: 'Teacher',
    designation: 'Assistant Professor, Computer Science',
    department: 'Computer Science & Engineering',
    email: 'vijay.vikas@college.edu',
    employeeId: 'EMP-CSE-2020-088',
    office: 'Room 304, Academic Block B',
    phone: '+91 98765 43210',
    institution: 'Erode Sengunthar Engineering College',
    bio: 'Assistant Professor in Computer Science specializing in Java architecture, multithreading, and distributed systems.',
    avatar: '',
    officeHours: 'Mon - Thu: 3:30 PM - 5:00 PM',
    preferences: {
      emailNotifications: true,
      submissionAlerts: true,
      aiDraftAlerts: true,
      weeklyDigest: false,
    }
  },

  courses: [
    {
      id: 'CSE301',
      code: 'CSE301',
      title: 'Advanced Java Programming',
      department: 'CSE',
      year: '3rd Year',
      semester: 'Semester V',
      regulation: 'R-2022',
      credits: 4,
      totalHours: 60,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 2,
      courseType: 'Core Professional',
      courseTypeBadge: 'Theory + Lab',
      classesCount: 4,
      departmentsCount: 3,
      term: 'Fall 2026',
      icon: 'java',
      sectionsCount: 4,
      studentsCount: 155,
      unitsCount: 5,
      materialsCount: 14,
      status: 'Active',
      subtitle: 'CSE301 • Object-oriented programming, concurrency, and JVM internals',
      description: 'Comprehensive study of modern Java architecture, multithreading, concurrency utilities, JVM memory models, JDBC, and reactive frameworks.',
      prerequisites: 'CS201 Data Structures, CS204 Object Oriented Programming using Java',
      objectives: [
        'Master object-oriented concepts, JVM architecture, and garbage collection mechanisms.',
        'Understand and apply generic programming and Java Collections Framework data structures.',
        'Develop concurrent and multithreaded applications with modern concurrency utilities.',
        'Apply modern functional programming paradigms with Java Streams and Lambda expressions.',
        'Design robust database-driven enterprise applications using JDBC connection pooling.'
      ],
      outcomes: [
        { id: 'CO1', text: 'Analyze and optimize Java application performance using JVM internal architecture and memory profiling.', bloom: 'Analyze (L4)', po: 'PO1, PO2, PO3' },
        { id: 'CO2', text: 'Select and implement appropriate Collection structures for high-throughput data processing.', bloom: 'Apply (L3)', po: 'PO2, PO3, PO5' },
        { id: 'CO3', text: 'Design thread-safe concurrent systems utilizing Lock APIs, Executors, and Atomic primitives.', bloom: 'Design (L5)', po: 'PO3, PO4, PO5' },
        { id: 'CO4', text: 'Construct clean data pipelines leveraging Lambdas, Streams, and Functional Interfaces.', bloom: 'Apply (L3)', po: 'PO1, PO3, PO5' },
        { id: 'CO5', text: 'Develop transactional, secure database connectivity modules using JDBC and Connection Pools.', bloom: 'Create (L6)', po: 'PO3, PO5, PO11' },
      ],
      books: {
        textbooks: [
          'Core Java Volume I – Fundamentals, 12th Edition by Cay S. Horstmann (Prentice Hall)',
          'Java: The Complete Reference, 12th Edition by Herbert Schildt (McGraw Hill)'
        ],
        references: [
          'Effective Java, 3rd Edition by Joshua Bloch (Addison-Wesley)',
          'Java Concurrency in Practice by Brian Goetz et al. (Addison-Wesley)'
        ]
      },
      units: [
        {
          id: 'u1',
          unitNumber: 1,
          title: 'Java Architecture & Object-Oriented Principles',
          hours: 12,
          description: 'JVM internals, class loaders, garbage collection algorithms, memory spaces, sealed classes, and records.',
          topics: [
            { id: 't1_1', title: 'JVM Architecture & Runtime Data Areas', hours: 3, status: 'Completed', keyConcepts: 'Class Loader Subsystem, Heap, Stack, Method Area, PC Register' },
            { id: 't1_2', title: 'Garbage Collection Mechanisms & Algorithms', hours: 3, status: 'Completed', keyConcepts: 'Serial GC, Parallel GC, G1 GC, ZGC, Generational Hypothesis' },
            { id: 't1_3', title: 'Interfaces, Default Methods & Sealed Classes', hours: 3, status: 'Completed', keyConcepts: 'Multiple inheritance of type, Sealed hierarchies, Permits clause' },
            { id: 't1_4', title: 'Java Records & Pattern Matching', hours: 3, status: 'Completed', keyConcepts: 'Record syntax, Canonical constructors, Pattern matching for instanceof' }
          ]
        },
        {
          id: 'u2',
          unitNumber: 2,
          title: 'Collections Framework & Generics',
          hours: 12,
          description: 'In-depth collection interfaces, concrete implementations, hashing mechanisms, ordering, and type bounds.',
          topics: [
            { id: 't2_1', title: 'List & Set Implementations Comparison', hours: 3, status: 'Completed', keyConcepts: 'ArrayList vs LinkedList, HashSet bucket hashing, TreeSet red-black tree' },
            { id: 't2_2', title: 'Map Internals & ConcurrentHashMap', hours: 3, status: 'Completed', keyConcepts: 'HashMap collision treeification, Segment locking, CAS operations' },
            { id: 't2_3', title: 'Comparable, Comparator & Custom Ordering', hours: 3, status: 'In Progress', keyConcepts: 'Natural ordering vs custom comparator chain, Null-safe comparators' },
            { id: 't2_4', title: 'Generic Classes, Methods & Wildcard Bounds', hours: 3, status: 'Planned', keyConcepts: 'Type parameter bounds, PECS guideline (Producer Extends, Consumer Super)' }
          ]
        },
        {
          id: 'u3',
          unitNumber: 3,
          title: 'Multithreading & Concurrency Utilities',
          hours: 14,
          description: 'Thread lifecycle, memory visibility, synchronization, lock APIs, executor framework, and fork/join.',
          topics: [
            { id: 't3_1', title: 'Thread Lifecycle & Inter-thread Communication', hours: 3, status: 'Planned', keyConcepts: 'Wait/notify protocol, Spurious wakeups, Volatile memory barrier' },
            { id: 't3_2', title: 'Explicit Locks, Condition & ReadWriteLock', hours: 4, status: 'Planned', keyConcepts: 'ReentrantLock, Fairness policy, Lock acquisition timeouts' },
            { id: 't3_3', title: 'ExecutorService, ThreadPools & Callable', hours: 4, status: 'Planned', keyConcepts: 'Fixed, Cached, Scheduled pools, Future.get() semantics' },
            { id: 't3_4', title: 'ForkJoinPool & Parallel Divide-and-Conquer', hours: 3, status: 'Planned', keyConcepts: 'Work-stealing algorithm, RecursiveTask, RecursiveAction' }
          ]
        },
        {
          id: 'u4',
          unitNumber: 4,
          title: 'Lambda Expressions & Stream API',
          hours: 11,
          description: 'Functional interfaces, method references, stream pipelines, intermediate/terminal operations, parallel streams.',
          topics: [
            { id: 't4_1', title: 'Functional Interfaces & Method References', hours: 3, status: 'Planned', keyConcepts: 'Predicate, Function, Consumer, Supplier, Method reference syntax' },
            { id: 't4_2', title: 'Stream Pipelines & Intermediate Operations', hours: 3, status: 'Planned', keyConcepts: 'Filter, Map, FlatMap, Distinct, Sorted, Laziness' },
            { id: 't4_3', title: 'Terminal Operations & Custom Collectors', hours: 3, status: 'Planned', keyConcepts: 'Collect, Reduce, GroupingBy, PartitioningBy' },
            { id: 't4_4', title: 'Parallel Stream Processing & Pitfalls', hours: 2, status: 'Planned', keyConcepts: 'Spliterator, Common ForkJoinPool, Side-effects' }
          ]
        },
        {
          id: 'u5',
          unitNumber: 5,
          title: 'JDBC, Connection Pooling & Transactions',
          hours: 11,
          description: 'Database architecture, JDBC driver types, PreparedStatement, HikariCP connection pooling, ACID transactions.',
          topics: [
            { id: 't5_1', title: 'JDBC Drivers & Core Interfaces', hours: 3, status: 'Planned', keyConcepts: 'DriverManager, Connection, Statement, ResultSet lifecycle' },
            { id: 't5_2', title: 'PreparedStatement & SQL Injection Prevention', hours: 3, status: 'Planned', keyConcepts: 'Query plan caching, Parameter binding, Batch execution' },
            { id: 't5_3', title: 'Transaction Management & Savepoints', hours: 3, status: 'Planned', keyConcepts: 'AutoCommit flag, Commit, Rollback, Isolation levels' },
            { id: 't5_4', title: 'Connection Pooling with HikariCP', hours: 2, status: 'Planned', keyConcepts: 'Pool sizing, Leak detection, Idle timeout, Validation queries' }
          ]
        }
      ]
    },
    {
      id: 'CSE302',
      code: 'CSE302',
      title: 'Python for Data Analysis',
      department: 'CSE',
      year: '3rd Year',
      semester: 'Semester V',
      regulation: 'R-2022',
      credits: 3,
      totalHours: 45,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 2,
      courseType: 'Professional Elective',
      courseTypeBadge: 'Theory + Lab',
      classesCount: 3,
      departmentsCount: 2,
      term: 'Fall 2026',
      icon: 'python',
      sectionsCount: 3,
      studentsCount: 110,
      unitsCount: 5,
      materialsCount: 8,
      status: 'Active',
      subtitle: 'CSE302 • Data manipulation with Pandas, NumPy, and statistical visualization',
      description: 'Hands-on scientific computing with NumPy, pandas, data cleaning, exploratory visual analysis, and statistical hypothesis testing.',
      prerequisites: 'CS102 Python Programming Basics',
      objectives: ['Master vectorized computing with NumPy', 'Process structured tabular data with Pandas'],
      outcomes: [{ id: 'CO1', text: 'Build data manipulation workflows using Pandas and NumPy.', bloom: 'Apply (L3)', po: 'PO1, PO3' }],
      books: { textbooks: ['Python for Data Analysis by Wes McKinney'], references: ['Python Data Science Handbook by Jake VanderPlas'] },
      units: [
        { id: 'u1_py', unitNumber: 1, title: 'NumPy Arrays & Vectorized Computing', hours: 9, description: 'Broadcasting, indexing, slicing, math functions', topics: [] },
        { id: 'u2_py', unitNumber: 2, title: 'Pandas DataFrames & Series', hours: 10, description: 'Data ingestion, indexing, filtering, aggregations', topics: [] },
        { id: 'u3_py', unitNumber: 3, title: 'Data Cleaning & Transformation', hours: 9, description: 'Missing values, duplicates, string operations', topics: [] },
        { id: 'u4_py', unitNumber: 4, title: 'Data Visualization with Matplotlib & Seaborn', hours: 9, description: 'Statistical plotting, aesthetic customisation', topics: [] },
        { id: 'u5_py', unitNumber: 5, title: 'Introductory Statistical Analysis', hours: 8, description: 'Descriptive stats, distributions, correlation', topics: [] }
      ]
    },
    {
      id: 'CSE303',
      code: 'CSE303',
      title: 'Software Engineering',
      department: 'CSE',
      year: '3rd Year',
      semester: 'Semester V',
      regulation: 'R-2022',
      credits: 3,
      totalHours: 45,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 0,
      courseType: 'Core Professional',
      courseTypeBadge: 'Theory',
      classesCount: 2,
      departmentsCount: 2,
      term: 'Fall 2026',
      icon: 'gear',
      sectionsCount: 2,
      studentsCount: 75,
      unitsCount: 5,
      materialsCount: 12,
      status: 'Active',
      subtitle: 'CSE303 • Agile methodologies, system design patterns, and CI/CD pipelines',
      description: 'Software development lifecycle, requirements engineering, UML modeling, architectural patterns, test-driven development, and DevOps pipelines.',
      prerequisites: 'CS201 Data Structures',
      objectives: ['Master software engineering methodologies', 'Apply UML and design patterns'],
      outcomes: [{ id: 'CO1', text: 'Design modular software architectures using design patterns.', bloom: 'Design (L5)', po: 'PO3, PO5' }],
      books: { textbooks: ['Software Engineering by Ian Sommerville'], references: ['Clean Architecture by Robert C. Martin'] },
      units: []
    },
    {
      id: 'CSE304',
      code: 'CSE304',
      title: 'Database Management Systems',
      department: 'CSE',
      year: '3rd Year',
      semester: 'Semester V',
      regulation: 'R-2022',
      credits: 4,
      totalHours: 60,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 2,
      courseType: 'Core Professional',
      courseTypeBadge: 'Theory + Lab',
      classesCount: 3,
      departmentsCount: 3,
      term: 'Fall 2026',
      icon: 'database',
      sectionsCount: 3,
      studentsCount: 115,
      unitsCount: 5,
      materialsCount: 16,
      status: 'Active',
      subtitle: 'CSE304 • Relational schema design, SQL optimization, indexing, and transactions',
      description: 'Relational algebra, normal forms, query optimization, ACID transactions, concurrency control, B+ tree indexing, and NoSQL databases.',
      prerequisites: 'CS201 Data Structures',
      objectives: ['Design normalized relational schemas', 'Execute complex SQL queries and analyze execution plans'],
      outcomes: [{ id: 'CO1', text: 'Design normalized enterprise database schemas and optimize query execution plans.', bloom: 'Create (L6)', po: 'PO2, PO3, PO5' }],
      books: { textbooks: ['Database System Concepts by Silberschatz et al.'], references: ['Fundamentals of Database Systems by Elmasri & Navathe'] },
      units: []
    },
    {
      id: 'CSE305',
      code: 'CSE305',
      title: 'Operating Systems',
      department: 'CSE',
      year: '3rd Year',
      semester: 'Semester V',
      regulation: 'R-2022',
      credits: 4,
      totalHours: 60,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 2,
      courseType: 'Core Professional',
      courseTypeBadge: 'Theory + Lab',
      classesCount: 2,
      departmentsCount: 2,
      term: 'Fall 2026',
      icon: 'os',
      sectionsCount: 2,
      studentsCount: 80,
      unitsCount: 5,
      materialsCount: 14,
      status: 'Active',
      subtitle: 'CSE305 • Process scheduling, virtual memory management, file systems, and IPC',
      description: 'Process management, multithreading, CPU scheduling algorithms, deadlock detection, paging and segmentation, and file system implementations.',
      prerequisites: 'CS202 Computer Organization & Architecture',
      objectives: ['Analyze OS scheduling and synchronization mechanisms', 'Understand virtual memory and page replacement policies'],
      outcomes: [{ id: 'CO1', text: 'Analyze concurrency, synchronization primitives, and memory paging algorithms.', bloom: 'Analyze (L4)', po: 'PO1, PO2' }],
      books: { textbooks: ['Operating System Concepts by Silberschatz et al.'], references: ['Modern Operating Systems by Andrew S. Tanenbaum'] },
      units: []
    }
  ],

  classes: [
    {
      id: 'CSE301-A',
      courseId: 'CSE301',
      courseCode: 'CSE301',
      courseTitle: 'Advanced Java Programming',
      department: 'Computer Science & Engineering',
      deptBadge: 'CSE',
      year: 'III Year',
      semester: 'Semester V',
      section: 'Section A',
      academicTerm: 'Fall 2026',
      classroom: 'LH-302 (Academic Block B)',
      totalStudents: 42,
      avgAttendance: 91.2,
      avgCgpa: 8.35,
      teacher: 'Vijay Vikas',
      teacherInitials: 'VV',
      scheduleBadges: ['Mon 10:00 AM', 'Wed 02:00 PM', 'Fri 11:00 AM'],
      students: [
        { rollNo: 'CSE2024001', name: 'Arjun Mehta', attendance: 95, cgpa: 8.9, email: 'arjun.mehta@example.com', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: 'CSE2024002', name: 'Priya Sharma', attendance: 88, cgpa: 8.1, email: 'priya.sharma@example.com', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Yesterday' },
        { rollNo: 'CSE2024003', name: 'Rahul Verma', attendance: 92, cgpa: 8.4, email: 'rahul.verma@example.com', status: 'Active', assignmentsSubmitted: '1/2', lastActive: '2 days ago' },
        { rollNo: 'CSE2024004', name: 'Sneha Reddy', attendance: 96, cgpa: 9.2, email: 'sneha.reddy@example.com', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: 'CSE2024005', name: 'Karan Patel', attendance: 84, cgpa: 7.6, email: 'karan.patel@example.com', status: 'Active', assignmentsSubmitted: '1/2', lastActive: '3 days ago' },
        { rollNo: 'CSE2024006', name: 'Neha Singh', attendance: 98, cgpa: 9.5, email: 'neha.singh@example.com', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: 'CSE2024007', name: 'Aditya Kumar', attendance: 86, cgpa: 7.9, email: 'aditya.kumar@example.com', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Yesterday' },
        { rollNo: 'CSE2024008', name: 'Isha Gupta', attendance: 94, cgpa: 8.7, email: 'isha.gupta@example.com', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: 'CSE2024009', name: 'Vikram Nair', attendance: 91, cgpa: 8.2, email: 'vikram.nair@example.com', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: 'CSE2024010', name: 'Pooja Iyer', attendance: 93, cgpa: 8.6, email: 'pooja.iyer@example.com', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: 'CSE2024011', name: 'Aadhya Subramanian', attendance: 95, cgpa: 8.9, email: 'aadhya.s@example.com', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: 'CSE2024012', name: 'Aaron Paul David', attendance: 88, cgpa: 8.1, email: 'aaron.p@example.com', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Yesterday' },
        { rollNo: 'CSE2024013', name: 'Abhinav Manoj', attendance: 92, cgpa: 8.4, email: 'abhinav.m@example.com', status: 'Active', assignmentsSubmitted: '1/2', lastActive: '2 days ago' },
        { rollNo: 'CSE2024014', name: 'Aditi Rao', attendance: 96, cgpa: 9.2, email: 'aditi.r@example.com', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: 'CSE2024015', name: 'Akil Sharma', attendance: 84, cgpa: 7.6, email: 'akil.s@example.com', status: 'Active', assignmentsSubmitted: '1/2', lastActive: '3 days ago' },
        { rollNo: '7376221CS106', name: 'Ananya Parthasarathy', attendance: 98, cgpa: 9.5, email: 'ananya.p@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS107', name: 'Arjun Kumar', attendance: 86, cgpa: 7.9, email: 'arjun.k@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Yesterday' },
        { rollNo: '7376221CS108', name: 'Bhavya Ramesh', attendance: 94, cgpa: 8.7, email: 'bhavya.r@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS109', name: 'Chetan Venkatesh', attendance: 78, cgpa: 7.2, email: 'chetan.v@college.edu', status: 'At Risk', assignmentsSubmitted: '1/2', lastActive: '5 days ago' },
        { rollNo: '7376221CS110', name: 'Divya Karthikeyan', attendance: 93, cgpa: 8.6, email: 'divya.k@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS111', name: 'Dinesh Balaji', attendance: 89, cgpa: 8.0, email: 'dinesh.b@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Yesterday' },
        { rollNo: '7376221CS112', name: 'Gokul Ramachandran', attendance: 90, cgpa: 8.3, email: 'gokul.r@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS113', name: 'Harini Sundar', attendance: 97, cgpa: 9.1, email: 'harini.s@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS114', name: 'Ishan Prakash', attendance: 82, cgpa: 7.5, email: 'ishan.p@college.edu', status: 'Active', assignmentsSubmitted: '1/2', lastActive: 'Yesterday' },
        { rollNo: '7376221CS115', name: 'Jagan Murugan', attendance: 91, cgpa: 8.2, email: 'jagan.m@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS116', name: 'Kavya Natarajan', attendance: 95, cgpa: 8.8, email: 'kavya.n@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS117', name: 'Keerthana Suresh', attendance: 87, cgpa: 8.0, email: 'keerthana.s@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Yesterday' },
        { rollNo: '7376221CS118', name: 'Manoj Rajan', attendance: 85, cgpa: 7.7, email: 'manoj.r@college.edu', status: 'Active', assignmentsSubmitted: '1/2', lastActive: '2 days ago' },
        { rollNo: '7376221CS119', name: 'Meera Sridhar', attendance: 96, cgpa: 9.3, email: 'meera.s@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS120', name: 'Nandan Krishnan', attendance: 80, cgpa: 7.4, email: 'nandan.k@college.edu', status: 'At Risk', assignmentsSubmitted: '1/2', lastActive: '4 days ago' },
        { rollNo: '7376221CS121', name: 'Naveen Venkat', attendance: 92, cgpa: 8.5, email: 'naveen.v@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS122', name: 'Nithya Mohan', attendance: 94, cgpa: 8.9, email: 'nithya.m@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS123', name: 'Pooja Selvam', attendance: 91, cgpa: 8.4, email: 'pooja.s@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Yesterday' },
        { rollNo: '7376221CS124', name: 'Pradeep Kannan', attendance: 86, cgpa: 7.8, email: 'pradeep.k@college.edu', status: 'Active', assignmentsSubmitted: '1/2', lastActive: 'Yesterday' },
        { rollNo: '7376221CS125', name: 'Priya Sundaram', attendance: 99, cgpa: 9.6, email: 'priya.s@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS126', name: 'Rahul Kothari', attendance: 92, cgpa: 8.6, email: 'rahul.k@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS127', name: 'Rajesh Muthu', attendance: 83, cgpa: 7.5, email: 'rajesh.m@college.edu', status: 'Active', assignmentsSubmitted: '1/2', lastActive: '3 days ago' },
        { rollNo: '7376221CS128', name: 'Rithika Varun', attendance: 95, cgpa: 8.8, email: 'rithika.v@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS129', name: 'Rohan Balan', attendance: 88, cgpa: 8.2, email: 'rohan.b@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Yesterday' },
        { rollNo: '7376221CS130', name: 'Sachin Prasanna', attendance: 90, cgpa: 8.3, email: 'sachin.p@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS131', name: 'Sai Krishna', attendance: 93, cgpa: 8.7, email: 'sai.k@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS132', name: 'Sanjay Vignesh', attendance: 85, cgpa: 7.9, email: 'sanjay.v@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Yesterday' },
        { rollNo: '7376221CS133', name: 'Shreya Madhavan', attendance: 96, cgpa: 9.0, email: 'shreya.m@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS134', name: 'Siddharth Rajan', attendance: 91, cgpa: 8.4, email: 'siddharth.r@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS135', name: 'Sneha Prakash', attendance: 94, cgpa: 8.9, email: 'sneha.p@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS136', name: 'Surya Thirumalai', attendance: 82, cgpa: 7.7, email: 'surya.t@college.edu', status: 'Active', assignmentsSubmitted: '1/2', lastActive: 'Yesterday' },
        { rollNo: '7376221CS137', name: 'Swetha Ramakrishnan', attendance: 98, cgpa: 9.4, email: 'swetha.r@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS138', name: 'Tharun Koushik', attendance: 89, cgpa: 8.1, email: 'tharun.k@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Yesterday' },
        { rollNo: '7376221CS139', name: 'Varun Swaminathan', attendance: 87, cgpa: 7.9, email: 'varun.s@college.edu', status: 'Active', assignmentsSubmitted: '1/2', lastActive: '2 days ago' },
        { rollNo: '7376221CS140', name: 'Vennila Maran', attendance: 97, cgpa: 9.3, email: 'vennila.m@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS141', name: 'Vijay Vikas', attendance: 92, cgpa: 8.6, email: 'vijay.vikas@college.edu', status: 'Active', assignmentsSubmitted: '2/2', lastActive: 'Today' },
        { rollNo: '7376221CS142', name: 'Vishnu Prasad', attendance: 86, cgpa: 8.0, email: 'vishnu.p@college.edu', status: 'Active', assignmentsSubmitted: '1/2', lastActive: 'Yesterday' }
      ]
    },
    {
      id: 'CSE301-B',
      courseId: 'CSE301',
      courseCode: 'CSE301',
      courseTitle: 'Advanced Java Programming',
      department: 'Information Technology',
      deptBadge: 'IT',
      year: 'III Year',
      semester: 'Semester V',
      section: 'Section B',
      academicTerm: 'Fall 2026',
      classroom: 'LH-304 (Academic Block B)',
      totalStudents: 38,
      avgAttendance: 88.5,
      avgCgpa: 8.1,
      teacher: 'Vijay Vikas',
      teacherInitials: 'VV',
      scheduleBadges: ['Tue 11:00 AM', 'Thu 02:00 PM', 'Fri 03:00 PM'],
      students: []
    },
    {
      id: 'CSE301-C',
      courseId: 'CSE301',
      courseCode: 'CSE301',
      courseTitle: 'Advanced Java Programming',
      department: 'Artificial Intelligence & Data Science',
      deptBadge: 'AI',
      year: 'III Year',
      semester: 'Semester V',
      section: 'Section A',
      academicTerm: 'Fall 2026',
      classroom: 'LH-305 (Academic Block B)',
      totalStudents: 40,
      avgAttendance: 86.9,
      avgCgpa: 7.95,
      teacher: 'Vijay Vikas',
      teacherInitials: 'VV',
      scheduleBadges: ['Mon 02:00 PM', 'Wed 10:00 AM', 'Thu 11:00 AM'],
      students: []
    },
    {
      id: 'CSE301-D',
      courseId: 'CSE301',
      courseCode: 'CSE301',
      courseTitle: 'Advanced Java Programming',
      department: 'Electronics & Communication Engineering',
      deptBadge: 'ECE',
      year: 'III Year',
      semester: 'Semester V',
      section: 'Section C',
      academicTerm: 'Fall 2026',
      classroom: 'LH-201 (Academic Block A)',
      totalStudents: 35,
      avgAttendance: 89.4,
      avgCgpa: 8.2,
      teacher: 'Vijay Vikas',
      teacherInitials: 'VV',
      scheduleBadges: ['Tue 09:00 AM', 'Thu 10:00 AM'],
      students: []
    },
    {
      id: 'CSE302-A',
      courseId: 'CSE302',
      courseCode: 'CSE302',
      courseTitle: 'Python for Data Science',
      department: 'CSE',
      year: '3rd Year',
      semester: 'Semester V',
      section: 'Section A',
      classroom: 'Lab 4 (Computer Center)',
      totalStudents: 35,
      avgAttendance: 92.4,
      avgCgpa: 8.45,
      scheduleBadges: ['Tue 09:00 AM', 'Thu 10:00 AM'],
      students: []
    }
  ],

  materials: [
    {
      id: 'mat_1',
      courseId: 'CSE301',
      unitNumber: 1,
      unitTitle: 'Unit 1: Java Basics & JVM Internals',
      title: 'JVM Memory Architecture & Class Loader Subsystem.pdf',
      type: 'pdf',
      size: '4.8 MB',
      uploadDate: 'Sep 12, 2026',
      downloads: 114,
      aiStatus: 'Processed (AI Indexed)',
      summary: 'Detailed architectural breakdown of JVM Runtime Data Areas, Heap partitions, and Garbage Collection pauses.'
    },
    {
      id: 'mat_2',
      courseId: 'CSE301',
      unitNumber: 1,
      unitTitle: 'Unit 1: Java Basics & JVM Internals',
      title: 'Unit 1 Lecture Slides - Sealed Classes & Records.pptx',
      type: 'ppt',
      size: '6.2 MB',
      uploadDate: 'Sep 15, 2026',
      downloads: 98,
      aiStatus: 'Processed (AI Indexed)',
      summary: 'Slide presentation on sealed interfaces, permits clauses, pattern matching, and record constructors.'
    },
    {
      id: 'mat_3',
      courseId: 'CSE301',
      unitNumber: 2,
      unitTitle: 'Unit 2: Collections & Generics',
      title: 'Java Collections Framework Complete Guide.pdf',
      type: 'pdf',
      size: '7.1 MB',
      uploadDate: 'Sep 24, 2026',
      downloads: 132,
      aiStatus: 'Processed (AI Indexed)',
      summary: 'Comprehensive text covering List, Set, Map, Queue, treeification in HashMap, and thread-safe collections.'
    },
    {
      id: 'mat_4',
      courseId: 'CSE301',
      unitNumber: 2,
      unitTitle: 'Unit 2: Collections & Generics',
      title: 'Generics PECS Principle & Wildcards Code Examples.zip',
      type: 'docx',
      size: '1.4 MB',
      uploadDate: 'Oct 02, 2026',
      downloads: 79,
      aiStatus: 'Processed (AI Indexed)',
      summary: 'Code snippets demonstrating Producer Extends Consumer Super bounds and generic sorting routines.'
    },
    {
      id: 'mat_5',
      courseId: 'CSE301',
      unitNumber: 3,
      unitTitle: 'Unit 3: Multithreading & Concurrency',
      title: 'Unit 3 Comprehensive Notes - Concurrency & Locks.pdf',
      type: 'pdf',
      size: '5.4 MB',
      uploadDate: 'Oct 08, 2026',
      downloads: 108,
      aiStatus: 'Processed (AI Indexed)',
      summary: 'Approved primary grounding document covering Thread lifecycle, ReentrantLock, ExecutorService, and ForkJoin.'
    },
    {
      id: 'mat_6',
      courseId: 'CSE301',
      unitNumber: 3,
      unitTitle: 'Unit 3: Multithreading & Concurrency',
      title: 'ForkJoinPool & Parallel Work Stealing Explained.mp4',
      type: 'video',
      size: '42.8 MB',
      uploadDate: 'Oct 10, 2026',
      downloads: 64,
      aiStatus: 'Processing',
      summary: 'Classroom recording walking through recursive task splitting and work-stealing thread allocation.'
    },
    {
      id: 'mat_7',
      courseId: 'CSE301',
      unitNumber: 4,
      unitTitle: 'Unit 4: Streams & Lambdas',
      title: 'Java 17 Stream API Cheatsheet & Best Practices.pdf',
      type: 'pdf',
      size: '2.1 MB',
      uploadDate: 'Oct 11, 2026',
      downloads: 45,
      aiStatus: 'Processed (AI Indexed)',
      summary: 'Quick reference sheet for intermediate and terminal stream operators, groupingBy collectors.'
    }
  ],

  assignments: [
    {
      id: 'AJP-A01',
      title: 'Collections Case Study: In-Memory Order Processing System',
      courseId: 'CSE301',
      courseCode: 'CSE301',
      courseTitle: 'Advanced Java Programming',
      section: 'Section A',
      dueDate: 'Oct 20, 2026 • 11:59 PM',
      dueTimestamp: '2026-10-20T23:59:00',
      totalMarks: 20,
      submittedCount: 38,
      totalCount: 42,
      status: 'Open',
      instructions: 'Design an in-memory priority order processing queue using PriorityBlockingQueue and ConcurrentHashMap. Submit source code and 2-page benchmark report in ZIP.',
      attachment: 'AJP_Assignment_1_Spec.pdf',
      submissions: [
        {
          id: 'sub_1',
          rollNo: '7376221CS101',
          name: 'Aadhya Subramanian',
          submittedAt: 'Oct 18, 2026 • 04:30 PM',
          file: '7376221CS101_OrderQueue.zip',
          fileSize: '1.2 MB',
          plagiarism: 2,
          aiFeedback: 'Clean implementation of ConcurrentHashMap with fine-grained lock segmenting. All unit tests passed.',
          grade: 19,
          remarks: 'Excellent work. Well documented locking strategies.',
          status: 'Evaluated'
        },
        {
          id: 'sub_2',
          rollNo: '7376221CS125',
          name: 'Priya Sundaram',
          submittedAt: 'Oct 18, 2026 • 06:15 PM',
          file: '7376221CS125_OrderQueue.zip',
          fileSize: '1.5 MB',
          plagiarism: 1,
          aiFeedback: 'Outstanding design with zero race conditions. Custom comparator efficiently handles urgent order tiers.',
          grade: 20,
          remarks: 'Exemplary solution. Model answer for Section A.',
          status: 'Evaluated'
        },
        {
          id: 'sub_3',
          rollNo: '7376221CS126',
          name: 'Rahul Kothari',
          submittedAt: 'Oct 19, 2026 • 02:40 PM',
          file: '7376221CS126_OrderQueue.zip',
          fileSize: '950 KB',
          plagiarism: 4,
          aiFeedback: 'Solid implementation. Minor synchronized block could be replaced with AtomicLong.',
          grade: 18,
          remarks: 'Good structure. Notice atomic counter recommendation.',
          status: 'Evaluated'
        },
        {
          id: 'sub_4',
          rollNo: '7376221CS141',
          name: 'Vijay Vikas',
          submittedAt: 'Oct 19, 2026 • 07:10 PM',
          file: '7376221CS141_OrderQueue.zip',
          fileSize: '1.1 MB',
          plagiarism: 3,
          aiFeedback: 'Implemented PriorityBlockingQueue correctly. Unit tests verified throughput up to 10k items/sec.',
          grade: 19,
          remarks: 'Well-structured code and detailed benchmark analysis.',
          status: 'Evaluated'
        },
        {
          id: 'sub_5',
          rollNo: '7376221CS109',
          name: 'Chetan Venkatesh',
          submittedAt: 'Oct 20, 2026 • 09:20 AM',
          file: '7376221CS109_OrderQueue.zip',
          fileSize: '820 KB',
          plagiarism: 8,
          aiFeedback: 'Contains basic queue logic. Concurrency tests exhibit deadlock when draining orders.',
          grade: null,
          remarks: '',
          status: 'Pending Evaluation'
        }
      ]
    },
    {
      id: 'AJP-A02',
      title: 'Multithreading Benchmark: Producer-Consumer ThreadPool',
      courseId: 'CSE301',
      courseCode: 'CSE301',
      courseTitle: 'Advanced Java Programming',
      section: 'Section A',
      dueDate: 'Oct 28, 2026 • 11:59 PM',
      dueTimestamp: '2026-10-28T23:59:00',
      totalMarks: 30,
      submittedCount: 12,
      totalCount: 42,
      status: 'Open',
      instructions: 'Implement a custom fixed thread pool that manages work queue task distribution with ReentrantLock and Condition variables. Benchmark against java.util.concurrent.Executors.',
      attachment: 'AJP_Assignment_2_Guide.pdf',
      submissions: []
    },
    {
      id: 'DSA-A01',
      title: 'Balanced Search Trees: Red-Black & AVL Tree Balancing',
      courseId: 'CSE303',
      courseCode: 'CSE303',
      courseTitle: 'Data Structures & Algorithms',
      section: 'Section A',
      dueDate: 'Oct 12, 2026 • 11:59 PM',
      dueTimestamp: '2026-10-12T23:59:00',
      totalMarks: 25,
      submittedCount: 42,
      totalCount: 42,
      status: 'Graded',
      instructions: 'Submit C++ or Java implementation of self-balancing tree node rotation routines with visual balance validation.',
      attachment: 'DSA_Tree_Rotation_Spec.pdf',
      submissions: []
    }
  ],

  assessments: [
    {
      id: 'AJP-T01',
      title: 'Mid-Semester Test: Java Internals & Collections',
      courseId: 'CSE301',
      courseCode: 'CSE301',
      courseTitle: 'Advanced Java Programming',
      type: 'MCQ & Descriptive',
      duration: '60 mins',
      date: 'Oct 22, 2026 • 10:00 AM',
      totalMarks: 40,
      questionsCount: 20,
      submittedCount: 0,
      totalStudents: 42,
      status: 'Scheduled',
      groundingSource: 'Unit 1 & Unit 2 Course Materials'
    },
    {
      id: 'DSA-Q01',
      title: 'Diagnostic Quiz: Arrays & Linked Lists Mastery',
      courseId: 'CSE303',
      courseCode: 'CSE303',
      courseTitle: 'Data Structures & Algorithms',
      type: 'MCQ',
      duration: '30 mins',
      date: 'Oct 05, 2026 • 02:00 PM',
      totalMarks: 20,
      questionsCount: 15,
      submittedCount: 42,
      totalStudents: 42,
      avgScore: 16.4,
      highestScore: 20,
      lowestScore: 11,
      passRate: '95.2%',
      status: 'Completed',
      groundingSource: 'Unit 1 Course Materials',
      results: [
        { rollNo: '7376221CS101', name: 'Aadhya Subramanian', score: 19, timeSpent: '21 mins', submittedAt: 'Oct 05, 2:22 PM', correctCount: '14/15' },
        { rollNo: '7376221CS106', name: 'Ananya Parthasarathy', score: 20, timeSpent: '19 mins', submittedAt: 'Oct 05, 2:20 PM', correctCount: '15/15' },
        { rollNo: '7376221CS125', name: 'Priya Sundaram', score: 20, timeSpent: '18 mins', submittedAt: 'Oct 05, 2:19 PM', correctCount: '15/15' },
        { rollNo: '7376221CS126', name: 'Rahul Kothari', score: 18, timeSpent: '24 mins', submittedAt: 'Oct 05, 2:25 PM', correctCount: '13/15' },
        { rollNo: '7376221CS141', name: 'Vijay Vikas', score: 19, timeSpent: '22 mins', submittedAt: 'Oct 05, 2:23 PM', correctCount: '14/15' }
      ]
    },
    {
      id: 'AJP-AI01',
      title: 'AI Practice Assessment: Concurrency & Multithreading (Unit 3)',
      courseId: 'CSE301',
      courseCode: 'CSE301',
      courseTitle: 'Advanced Java Programming',
      type: 'MCQ',
      duration: '45 mins',
      date: 'Oct 25, 2026 • 11:00 AM',
      totalMarks: 30,
      questionsCount: 6,
      submittedCount: 0,
      totalStudents: 42,
      status: 'Pending Teacher Approval',
      groundingSource: 'Unit 3 Comprehensive Notes - Concurrency & Locks.pdf',
      reviewQuestions: [
        {
          id: 'q1',
          number: 1,
          text: 'Under what specific condition will an invocation of wait() on an object throw an IllegalMonitorStateException in Java?',
          bloom: 'Understand (L2)',
          difficulty: 'Medium',
          sourceCitation: 'Source: Unit 3 Comprehensive Notes, Page 4 (Section 3.1: Thread Monitor Locks)',
          status: 'Approved',
          options: [
            { key: 'A', text: 'When the target thread has already finished its execution run.' },
            { key: 'B', text: 'When the calling thread does not hold the monitor lock on the synchronized target object.', isCorrect: true },
            { key: 'C', text: 'When the maximum timeout duration expires without a notify() signal.' },
            { key: 'D', text: 'When another thread attempts to interrupt the waiting thread simultaneously.' }
          ],
          explanation: 'As documented in Unit 3 Section 3.1, calling wait() requires the current thread to own the monitor lock of the object (via synchronized block or method); otherwise JVM raises IllegalMonitorStateException.'
        },
        {
          id: 'q2',
          number: 2,
          text: 'Which lock interface method guarantees that a thread will NOT get indefinitely blocked if another thread holds the lock?',
          bloom: 'Apply (L3)',
          difficulty: 'Easy',
          sourceCitation: 'Source: Unit 3 Comprehensive Notes, Page 7 (Section 3.2: ReentrantLock API)',
          status: 'Approved',
          options: [
            { key: 'A', text: 'lock.lock()' },
            { key: 'B', text: 'lock.lockInterruptibly()' },
            { key: 'C', text: 'lock.tryLock() with optional timeout', isCorrect: true },
            { key: 'D', text: 'lock.newCondition()' }
          ],
          explanation: 'tryLock() returns false immediately if the lock is held, or waits up to the designated timeout, preventing thread starvation and deadlocks.'
        },
        {
          id: 'q3',
          number: 3,
          text: 'What is the primary architectural purpose of the ForkJoinPool work-stealing algorithm in multi-core processors?',
          bloom: 'Analyze (L4)',
          difficulty: 'Hard',
          sourceCitation: 'Source: Unit 3 Comprehensive Notes, Page 12 (Section 3.4: ForkJoin Framework)',
          status: 'Pending Review',
          options: [
            { key: 'A', text: 'To allow idle threads in the pool to take tasks from the tail of busy threads’ deques.', isCorrect: true },
            { key: 'B', text: 'To terminate idle worker threads when CPU utilization exceeds 80%.' },
            { key: 'C', text: 'To prioritize I/O bound tasks over CPU intensive computational tasks.' },
            { key: 'D', text: 'To dynamically reallocate heap memory segments across thread local caches.' }
          ],
          explanation: 'In ForkJoinPool work-stealing, worker threads possess double-ended queues. When a thread completes its tasks, it steals work from the tail of another thread’s deque to maximize core utilization.'
        },
        {
          id: 'q4',
          number: 4,
          text: 'Why does declaring a variable volatile NOT guarantee thread safety for compound operations like counter++?',
          bloom: 'Analyze (L4)',
          difficulty: 'Hard',
          sourceCitation: 'Source: Unit 3 Comprehensive Notes, Page 5 (Section 3.1: Volatile vs Synchronization)',
          status: 'Pending Review',
          options: [
            { key: 'A', text: 'Volatile variables cannot be cached in CPU L1/L2 registers.' },
            { key: 'B', text: 'Incrementing is a non-atomic read-modify-write sequence requiring mutual exclusion.', isCorrect: true },
            { key: 'C', text: 'The volatile keyword is ignored by modern JIT compiler optimizations.' },
            { key: 'D', text: 'Volatile variables only provide atomicity for 64-bit double and long values.' }
          ],
          explanation: 'Volatile ensures visibility across thread caches, but compound operations like counter++ involve three separate bytecode operations (getfield, iadd, putfield) which can interleave without atomicity.'
        },
        {
          id: 'q5',
          number: 5,
          text: 'Which thread pool implementation in Executors uses an unbounded SynchronousQueue for task handoffs?',
          bloom: 'Understand (L2)',
          difficulty: 'Medium',
          sourceCitation: 'Source: Unit 3 Comprehensive Notes, Page 9 (Section 3.3: ThreadPool Types)',
          status: 'Approved',
          options: [
            { key: 'A', text: 'Executors.newFixedThreadPool()' },
            { key: 'B', text: 'Executors.newCachedThreadPool()', isCorrect: true },
            { key: 'C', text: 'Executors.newSingleThreadExecutor()' },
            { key: 'D', text: 'Executors.newScheduledThreadPool()' }
          ],
          explanation: 'newCachedThreadPool uses a SynchronousQueue with zero capacity to directly transfer tasks to new or reused threads, expanding on demand.'
        },
        {
          id: 'q6',
          number: 6,
          text: 'What is the correct protocol for shutting down an ExecutorService gracefully in production applications?',
          bloom: 'Apply (L3)',
          difficulty: 'Medium',
          sourceCitation: 'Source: Unit 3 Comprehensive Notes, Page 10 (Section 3.3: Executor Lifecycle)',
          status: 'Approved',
          options: [
            { key: 'A', text: 'Call shutdownNow() immediately without waiting for existing tasks.' },
            { key: 'B', text: 'Call shutdown(), wait with awaitTermination(), and fallback to shutdownNow() if timeout expires.', isCorrect: true },
            { key: 'C', text: 'Set all worker thread daemon flags to true before JVM termination.' },
            { key: 'D', text: 'Manually interrupt each worker thread using Thread.interrupt().' }
          ],
          explanation: 'Graceful shutdown stops receiving new tasks with shutdown(), gives active tasks time to finish via awaitTermination, and cancels unresponsive threads with shutdownNow().'
        }
      ]
    }
  ],

  schedule: [
    {
      id: 'sch_1',
      courseCode: 'CSE301',
      courseTitle: 'Advanced Java Programming',
      section: 'Section A',
      date: '2026-10-12',
      dayOfWeek: 'Monday',
      timeSlot: '10:00 AM - 11:30 AM',
      venue: 'LH-302 (Academic Block B)',
      topic: 'Java Concurrency: ReentrantLock & Condition Variables',
      mode: 'On Campus',
      status: 'Completed',
      attendees: '40/42'
    },
    {
      id: 'sch_2',
      courseCode: 'CSE301',
      courseTitle: 'Advanced Java Programming',
      section: 'Section A',
      date: '2026-10-14',
      dayOfWeek: 'Wednesday',
      timeSlot: '02:00 PM - 03:30 PM',
      venue: 'LH-302 (Academic Block B)',
      topic: 'Executor Framework & Thread Pools in Enterprise Java',
      mode: 'On Campus',
      status: 'Completed',
      attendees: '39/42'
    },
    {
      id: 'sch_3',
      courseCode: 'CSE301',
      courseTitle: 'Advanced Java Programming',
      section: 'Section A',
      date: '2026-10-16',
      dayOfWeek: 'Friday',
      timeSlot: '11:00 AM - 12:30 PM',
      venue: 'LH-302 (Academic Block B)',
      topic: 'ForkJoinPool & Work Stealing Algorithm Practical Demonstration',
      mode: 'On Campus',
      status: 'Upcoming',
      attendees: 'Scheduled'
    },
    {
      id: 'sch_4',
      courseCode: 'CSE302',
      courseTitle: 'Python for Data Science',
      section: 'Section A',
      date: '2026-10-19',
      dayOfWeek: 'Monday',
      timeSlot: '09:00 AM - 10:30 AM',
      venue: 'Lab 4 (Computer Center)',
      topic: 'Pandas Vectorized GroupBy & Pivot Tables Hands-on',
      mode: 'On Campus',
      status: 'Upcoming',
      attendees: 'Scheduled'
    },
    {
      id: 'sch_5',
      courseCode: 'CSE301',
      courseTitle: 'Advanced Java Programming',
      section: 'Section A',
      date: '2026-10-21',
      dayOfWeek: 'Wednesday',
      timeSlot: '02:00 PM - 03:30 PM',
      venue: 'LH-302 (Academic Block B)',
      topic: 'Mid-Semester Assessment Review & Doubt Clearing Session',
      mode: 'On Campus',
      status: 'Upcoming',
      attendees: 'Scheduled'
    },
    {
      id: 'sch_6',
      courseCode: 'CSE301',
      courseTitle: 'Advanced Java Programming',
      section: 'Section B',
      date: '2026-10-22',
      dayOfWeek: 'Thursday',
      timeSlot: '02:00 PM - 03:30 PM',
      venue: 'LH-304 (Academic Block B)',
      topic: 'Unit 3 Concurrency Problem Solving',
      mode: 'On Campus',
      status: 'Upcoming',
      attendees: 'Scheduled'
    }
  ],

  communication: {
    messages: [
      {
        id: 'msg_1',
        studentId: '7376221CS125',
        studentName: 'Priya Sundaram',
        studentInitials: 'PS',
        studentEmail: 'priya.s@college.edu',
        course: 'Advanced Java Programming (CSE301)',
        section: 'Section A',
        attendance: 99,
        cgpa: 9.6,
        unreadCount: 1,
        lastMessageTime: '10:45 AM',
        conversation: [
          { id: 'm1', sender: 'student', text: 'Good morning Professor! Regarding Assignment 1, should we handle poisoned pills in our PriorityBlockingQueue drain test?', time: '10:32 AM' },
          { id: 'm2', sender: 'teacher', text: 'Good morning Priya. Yes, implementing a sentinel poison pill object for clean consumer thread termination is highly encouraged.', time: '10:38 AM' },
          { id: 'm3', sender: 'student', text: 'Understood! I will include that in the benchmark report as well. Thank you!', time: '10:45 AM' }
        ]
      },
      {
        id: 'msg_2',
        studentId: '7376221CS141',
        studentName: 'Vijay Vikas',
        studentInitials: 'VV',
        studentEmail: 'vijay.vikas@college.edu',
        course: 'Advanced Java Programming (CSE301)',
        section: 'Section A',
        attendance: 92,
        cgpa: 8.6,
        unreadCount: 0,
        lastMessageTime: 'Yesterday',
        conversation: [
          { id: 'm4', sender: 'student', text: 'Sir, I reviewed the Unit 3 slides on ReentrantLock fairness policy. Does fairness impact throughput significantly?', time: 'Yesterday 3:15 PM' },
          { id: 'm5', sender: 'teacher', text: 'Yes Vijay, fair locks enforce FIFO queueing which increases context switching overhead by 2x to 5x. Use non-fair unless starvation must be strictly prevented.', time: 'Yesterday 4:02 PM' },
          { id: 'm6', sender: 'student', text: 'Thank you for explaining, that matches my benchmark observations!', time: 'Yesterday 4:10 PM' }
        ]
      },
      {
        id: 'msg_3',
        studentId: '7376221CS126',
        studentName: 'Rahul Kothari',
        studentInitials: 'RK',
        studentEmail: 'rahul.k@college.edu',
        course: 'Advanced Java Programming (CSE301)',
        section: 'Section A',
        attendance: 92,
        cgpa: 8.6,
        unreadCount: 0,
        lastMessageTime: '2 days ago',
        conversation: [
          { id: 'm7', sender: 'student', text: 'Professor, will the midterm on Oct 22 cover Stream collectors as well or only up to Concurrency?', time: '2 days ago' },
          { id: 'm8', sender: 'teacher', text: 'The midterm covers Unit 1 and Unit 2 completely, plus the first two topics of Unit 3. Streams (Unit 4) is not included.', time: '2 days ago' }
        ]
      },
      {
        id: 'msg_4',
        studentId: '7376221CS109',
        studentName: 'Chetan Venkatesh',
        studentInitials: 'CV',
        studentEmail: 'chetan.v@college.edu',
        course: 'Advanced Java Programming (CSE301)',
        section: 'Section A',
        attendance: 78,
        cgpa: 7.2,
        unreadCount: 2,
        lastMessageTime: '3 days ago',
        conversation: [
          { id: 'm9', sender: 'student', text: 'Sir, I missed Friday lecture due to medical reasons. Can I get permission for attendance reconciliation?', time: '3 days ago' },
          { id: 'm10', sender: 'student', text: 'I have the medical certificate ready to submit.', time: '3 days ago' }
        ]
      }
    ],

    announcements: [
      {
        id: 'ann_1',
        title: 'Unit 3 Lecture Notes & Concurrency Code Samples Released',
        priority: 'Important',
        courseCode: 'CSE301',
        courseTitle: 'Advanced Java Programming',
        section: 'Section A & B',
        publishedDate: 'Oct 10, 2026 • 09:30 AM',
        author: 'Dr. R. Kumar',
        views: 78,
        body: 'Dear Students,\n\nThe comprehensive lecture notes for Unit 3 (Multithreading & Concurrency Utilities) along with tested code samples for ReentrantLock and ExecutorService have been uploaded to the Teaching Materials portal.\n\nPlease study these before our next class on Friday.',
        attachment: 'Unit_3_Concurrency_Notes.pdf'
      },
      {
        id: 'ann_2',
        title: 'Mid-Semester Assessment Schedule Announced (Oct 22)',
        priority: 'Urgent',
        courseCode: 'CSE301',
        courseTitle: 'Advanced Java Programming',
        section: 'All Sections',
        publishedDate: 'Oct 08, 2026 • 02:00 PM',
        author: 'Dr. R. Kumar',
        views: 118,
        body: 'All 3rd Year CSE students are hereby informed that the Mid-Semester Assessment for CSE301 will be conducted on Thursday, Oct 22, 2026 from 10:00 AM to 11:00 AM in respective lecture halls.\n\nSyllabus: Unit 1 (Java Architecture) and Unit 2 (Collections & Generics). Total marks: 40.',
        attachment: 'Midterm_Test_Guidelines.pdf'
      },
      {
        id: 'ann_3',
        title: 'Assignment 1 Submission Portal Opened',
        priority: 'General',
        courseCode: 'CSE301',
        courseTitle: 'Advanced Java Programming',
        section: 'Section A',
        publishedDate: 'Oct 04, 2026 • 11:15 AM',
        author: 'Dr. R. Kumar',
        views: 84,
        body: 'The submission window for Assignment 1 (In-Memory Order Processing System) is now active. Ensure your code satisfies thread-safety tests without race conditions. Due date is Oct 20, 2026 at 11:59 PM.',
        attachment: 'Assignment_1_Starter_Code.zip'
      }
    ]
  }
};
