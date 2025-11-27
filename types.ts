

export enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Pending = 'Pending'
}

export type Role = 'Admin' | 'User';

export interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: number;
  status: UserStatus;
  joinDate: string;
  avatar?: string;
}

export interface Mentor {
  id: string;
  name: string;
  email: string;
  expertise: string[];
  rating: number;
  totalStudents: number;
  status: UserStatus;
  avatar: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  price: number;
  students: number;
  rating: number;
  image: string;
  description: string;
}

export interface Log {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Comment {
  id: string;
  author: string;
  role: string; 
  avatar: string;
  content: string;
  timestamp: string;
}

export interface BlogPost {
  id: string;
  author: string;
  role: string;
  avatar: string;
  content: string;
  category: 'Question' | 'Knowledge' | 'Discussion';
  likes: number;
  comments: Comment[];
  timestamp: string;
  isLiked?: boolean;
}

export type ViewState = 
  | 'home' 
  | 'dashboard' 
  | 'students' 
  | 'courses' 
  | 'explore'      
  | 'mentors' 
  | 'admin'
  | 'user-profile'   
  | 'user-settings'  
  | 'my-courses'     
  | 'apply-to-teach'
  | 'blog'
  | 'course-details'; // New Full Page View

export type Language = 'en' | 'vi';