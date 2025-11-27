import { Course, Mentor, Student, UserStatus, Log } from './types';

export const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@thk.edu', enrolledCourses: 3, status: UserStatus.Active, joinDate: '2023-01-15', avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=random' },
  { id: '2', name: 'Bob Smith', email: 'bob@thk.edu', enrolledCourses: 1, status: UserStatus.Inactive, joinDate: '2023-02-20', avatar: 'https://ui-avatars.com/api/?name=Bob+Smith&background=random' },
  { id: '3', name: 'Charlie Davis', email: 'charlie@thk.edu', enrolledCourses: 5, status: UserStatus.Active, joinDate: '2023-03-10', avatar: 'https://ui-avatars.com/api/?name=Charlie+Davis&background=random' },
  { id: '4', name: 'Diana Evans', email: 'diana@thk.edu', enrolledCourses: 2, status: UserStatus.Pending, joinDate: '2023-04-05', avatar: 'https://ui-avatars.com/api/?name=Diana+Evans&background=random' },
  { id: '5', name: 'Ethan Hunt', email: 'ethan@thk.edu', enrolledCourses: 4, status: UserStatus.Active, joinDate: '2023-05-12', avatar: 'https://ui-avatars.com/api/?name=Ethan+Hunt&background=random' },
];

export const MOCK_MENTORS: Mentor[] = [
  { 
    id: '1', 
    name: 'Dr. Sarah Connor', 
    email: 'sarah@thk.edu', 
    expertise: ['AI', 'Machine Learning', 'Python'], 
    rating: 4.9, 
    totalStudents: 1200, 
    status: UserStatus.Active, 
    avatar: 'https://picsum.photos/id/64/100/100',
    title: 'Lead AI Research Scientist',
    company: 'Skynet Labs',
    bio: 'Dr. Connor has over 15 years of experience in Artificial Intelligence and Neural Networks. She holds a Ph.D. from MIT and has published over 30 papers in top-tier journals. Her teaching style focuses on demystifying complex algorithms and applying them to real-world problems.',
    certificates: ['Ph.D. Computer Science', 'Google AI Fellow', 'Turing Award Nominee']
  },
  { 
    id: '2', 
    name: 'Prof. Alan Grant', 
    email: 'alan@thk.edu', 
    expertise: ['Paleontology', 'Biology', 'History'], 
    rating: 4.7, 
    totalStudents: 850, 
    status: UserStatus.Active, 
    avatar: 'https://picsum.photos/id/65/100/100',
    title: 'Senior Paleontologist',
    company: 'InGen Corp',
    bio: 'Prof. Grant is a world-renowned expert in evolutionary biology and paleontology. He specializes in the study of prehistoric ecosystems and has led numerous excavations in Montana. His courses bring history to life through immersive storytelling and scientific rigor.',
    certificates: ['Ph.D. Paleontology', 'National Science Foundation Grantee', 'Author of "Dinosaur Detectives"']
  },
  { 
    id: '3', 
    name: 'Maya Angelou', 
    email: 'maya@thk.edu', 
    expertise: ['Literature', 'Creative Writing', 'Poetry'], 
    rating: 5.0, 
    totalStudents: 2000, 
    status: UserStatus.Inactive, 
    avatar: 'https://picsum.photos/id/66/100/100',
    title: 'Distinguished Professor of Arts',
    company: 'Global Arts Foundation',
    bio: 'Maya is a celebrated poet, memoirist, and civil rights activist. With over 50 honorary degrees, she brings a lifetime of wisdom and lyrical mastery to her students. Her classes explore the power of voice, identity, and narrative structure.',
    certificates: ['Presidential Medal of Freedom', 'Pulitzer Prize Nominee', 'Grammy Award Winner']
  },
];

export const MOCK_COURSES: Course[] = [
  { id: '1', title: 'Advanced React Patterns', instructor: 'Dr. Sarah Connor', category: 'Development', price: 99.99, students: 450, rating: 4.8, image: 'https://picsum.photos/id/1/400/250', description: 'Master modern React concepts including hooks, context, and performance optimization.' },
  { id: '2', title: 'Creative Writing Masterclass', instructor: 'Maya Angelou', category: 'Arts', price: 79.99, students: 800, rating: 4.9, image: 'https://picsum.photos/id/2/400/250', description: 'Unlock your creativity and learn to write compelling stories.' },
  { id: '3', title: 'Data Science Fundamentals', instructor: 'Dr. Sarah Connor', category: 'Data Science', price: 129.99, students: 300, rating: 4.6, image: 'https://picsum.photos/id/3/400/250', description: 'An introduction to Python, Pandas, and data visualization.' },
  { id: '4', title: 'Dinosaur Biology', instructor: 'Prof. Alan Grant', category: 'Science', price: 59.99, students: 150, rating: 4.7, image: 'https://picsum.photos/id/4/400/250', description: 'Explore the fascinating world of prehistoric creatures.' },
];

export const MOCK_LOGS: Log[] = [
  { id: '1', action: 'System Backup Completed', user: 'System', timestamp: '2023-10-27 02:00:00', type: 'info' },
  { id: '2', action: 'Failed Login Attempt', user: 'Unknown IP', timestamp: '2023-10-27 04:15:00', type: 'warning' },
  { id: '3', action: 'Course "React 101" Deleted', user: 'Admin User', timestamp: '2023-10-26 15:30:00', type: 'error' },
];