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
