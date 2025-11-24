
import React, { useState } from 'react';
import { MessageSquare, Heart, Share2, MoreHorizontal, Send, User, CheckCircle, Search, Filter } from 'lucide-react';
import { BlogPost, Comment } from '../types';

interface BlogViewProps {
  user: any;
}

const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    author: 'Dr. Sarah Connor',
    role: 'Mentor',
    avatar: 'https://picsum.photos/id/64/100/100',
    content: "Just uploaded a new module on Advanced Neural Networks! 🧠 Check it out in the Data Science Fundamentals course. Let me know if you have any questions about backpropagation.",
    category: 'Knowledge',
    likes: 45,
    timestamp: '2 hours ago',
    isLiked: false,
    comments: [
      {
        id: 'c1',
        author: 'Alice Johnson',
        role: 'User',
        avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=random',
        content: "This is exactly what I needed! The previous visualization was a bit tricky.",
        timestamp: '1 hour ago'
      }
    ]
  },
  {
    id: '2',
    author: 'Bob Smith',
    role: 'User',
    avatar: 'https://ui-avatars.com/api/?name=Bob+Smith&background=random',
    content: "Can anyone recommend good resources for learning Typography rules? I'm struggling with font pairings for my final project. 🎨",
    category: 'Question',
    likes: 12,
    timestamp: '5 hours ago',
    isLiked: true,
    comments: []
  },
  {
    id: '3',
    author: 'Maya Angelou',
    role: 'Mentor',
    avatar: 'https://picsum.photos/id/66/100/100',
    content: "Writing Tip of the Day: Read your work aloud. If you stumble over a sentence, your reader will too. Simplicity is the ultimate sophistication.",
    category: 'Discussion',
    likes: 89,
    timestamp: '1 day ago',
    isLiked: false,
    comments: []
  }
];

const BlogView: React.FC<BlogViewProps> = ({ user }) => {
  const [posts, setPosts] = useState<BlogPost[]>(MOCK_POSTS);
  const [newPostContent, setNewPostContent] = useState('');
  const [category, setCategory] = useState<'Question' | 'Knowledge' | 'Discussion'>('Discussion');
  const [filter, setFilter] = useState('All');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: BlogPost = {
      id: Date.now().toString(),
      author: user.name,
      role: user.role, 
      avatar: user.avatar,
      content: newPostContent,
      category: category,
      likes: 0,
      comments: [],
      timestamp: 'Just now',
      isLiked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const filteredPosts = filter === 'All' ? posts : posts.filter(p => p.category === filter);

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Community Blog</h1>
        <p className="text-slate-500 dark:text-slate-400">Share knowledge, ask questions, and connect with mentors and peers.</p>
      </div>

      {/* Create Post Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0">
            <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <form onSubmit={handleCreatePost}>
              <textarea 
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder={`What's on your mind, ${user.name}?`}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 min-h-[100px] outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none transition-all dark:text-white mb-4"
              />
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                   {['Question', 'Knowledge', 'Discussion'].map((cat) => (
                     <button
                       key={cat}
                       type="button"
                       onClick={() => setCategory(cat as any)}
                       className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                         category === cat 
                           ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700' 
                           : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                       }`}
                     >
                       {cat}
                     </button>
                   ))}
                </div>
                <button 
                  type="submit"
                  disabled={!newPostContent.trim()}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Feed Filters */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
        <div className="flex gap-6">
          {['All', 'Knowledge', 'Question', 'Discussion'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`pb-4 -mb-4 text-sm font-bold transition-colors border-b-2 ${
                filter === f 
                  ? 'text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400' 
                  : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-2 text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5">
           <Search className="w-4 h-4" />
           <input type="text" placeholder="Search posts..." className="bg-transparent border-none outline-none text-xs w-32" />
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 animate-in slide-in-from-bottom-2 duration-300">
            {/* Post Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden ring-2 ring-white dark:ring-slate-700">
                  <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 dark:text-white">{post.author}</h3>
                    {post.role === 'Mentor' && (
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-700 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Mentor
                      </span>
                    )}
                    {post.role === 'Admin' && (
                      <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>{post.timestamp}</span>
                    <span>•</span>
                    <span className="font-medium text-slate-600 dark:text-slate-300">{post.category}</span>
                  </div>
                </div>
              </div>
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="mb-6">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>

            {/* Stats & Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
              <div className="flex gap-6">
                <button 
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    post.isLiked ? 'text-pink-500' : 'text-slate-500 dark:text-slate-400 hover:text-pink-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                  {post.likes}
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  {post.comments.length}
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Comments Preview */}
            {post.comments.length > 0 && (
              <div className="mt-6 pt-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 space-y-4">
                 {post.comments.map(comment => (
                   <div key={comment.id} className="flex gap-3">
                      <img src={comment.avatar} className="w-8 h-8 rounded-full" alt="" />
                      <div className="flex-1">
                         <div className="bg-white dark:bg-slate-800 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                            <div className="flex items-center gap-2 mb-1">
                               <span className="font-bold text-xs text-slate-900 dark:text-white">{comment.author}</span>
                               <span className="text-[10px] text-slate-400">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300">{comment.content}</p>
                         </div>
                      </div>
                   </div>
                 ))}
                 <div className="flex gap-3 items-center mt-2">
                    <img src={user.avatar} className="w-8 h-8 rounded-full" alt="" />
                    <input 
                      type="text" 
                      placeholder="Write a comment..." 
                      className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 text-sm outline-none focus:border-indigo-500 transition-colors"
                    />
                 </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogView;
