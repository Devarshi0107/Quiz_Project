import React, { useState } from 'react';
import { 
  Bell, Search, Menu, User, LogOut,
  Calendar, Clock, Timer, BookOpen,
  Settings, HelpCircle, LayoutDashboard,
  ChevronRight, ArrowRight, Plus
} from 'lucide-react';

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const student = {
    name: "John Smith",
    id: "STU2024001",
    branch: "Computer Science",
    semester: "6th Semester",
    notifications: [
      { id: 1, text: "New exam schedule posted", time: "2 hours ago" },
      { id: 2, text: "Assignment deadline reminder", time: "5 hours ago" }
    ],
    examStats: {
      completed: 12,
      upcoming: 3,
      ongoing: 1
    },
    upcomingExams: [
      {
        subject: "Database Management",
        date: "Jan 15, 2025",
        time: "10:00 AM",
        duration: "2 hours"
      },
      {
        subject: "Computer Networks",
        date: "Jan 20, 2025",
        time: "2:00 PM",
        duration: "3 hours"
      }
    ],
    recentActivity: [
      {
        type: "exam",
        title: "Data Structures",
        date: "Dec 28, 2024",
        score: "85/100"
      },
      {
        type: "profile",
        title: "Updated Profile Picture",
        date: "Dec 25, 2024"
      }
    ]
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: BookOpen, label: 'My Exams', id: 'exams' },
    { icon: User, label: 'Profile', id: 'profile' },
    { icon: Calendar, label: 'Calendar', id: 'calendar' },
    { icon: HelpCircle, label: 'Help', id: 'help' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg mb-1 transition-colors ${activeMenu === item.id ? 'bg-orange-500 text-white' : 'hover:bg-stone-100 text-stone-600'}`}
            >
              <item.icon size={20} className="mr-3" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 pt-16 transition-all duration-200 ${isSidebarOpen ? 'pl-72' : 'pl-16'}`}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Navigation */}
          <nav className="h-16 bg-white shadow-sm z-50 flex items-center justify-between mb-8">
            <div className="flex items-center gap-8">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-stone-100 rounded-lg"
              >
                <Menu size={24} />
              </button>
              <div className="text-xl font-semibold">Student Hub</div>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-stone-100 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 hover:bg-stone-100 rounded-lg relative"
                >
                  <Bell size={20} />
                  {student.notifications.length > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full" />
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-stone-200 py-2">
                    {student.notifications.map((notif) => (
                      <div key={notif.id} className="px-4 py-3 hover:bg-stone-50">
                        <p className="text-sm">{notif.text}</p>
                        <p className="text-xs text-stone-500 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pl-4 border-l">
                <div className="text-right">
                  <div className="text-sm font-medium">{student.name}</div>
                  <div className="text-xs text-stone-500">{student.branch}</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg text-white flex items-center justify-center font-medium">
                  {student.name[0]}
                </div>
              </div>
            </div>
          </nav>

          {/* Welcome Section */}
          <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-8 text-white mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {student.name}! 👋</h1>
            <p className="text-orange-100">You have {student.examStats.upcoming} upcoming exams this week.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-stone-500">Upcoming</span>
                <span className="p-2 bg-orange-100 rounded-lg">
                  <Calendar size={20} className="text-orange-600" />
                </span>
              </div>
              <div className="text-3xl font-bold text-stone-900">{student.examStats.upcoming}</div>
              <div className="mt-2 text-sm text-stone-500">Exams scheduled</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-stone-500">Ongoing</span>
                <span className="p-2 bg-emerald-100 rounded-lg">
                  <Clock size={20} className="text-emerald-600" />
                </span>
              </div>
              <div className="text-3xl font-bold text-stone-900">{student.examStats.ongoing}</div>
              <div className="mt-2 text-sm text-stone-500">Active exams</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-stone-500">Completed</span>
                <span className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen size={20} className="text-purple-600" />
                </span>
              </div>
              <div className="text-3xl font-bold text-stone-900">{student.examStats.completed}</div>
              <div className="mt-2 text-sm text-stone-500">Total exams</div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-5 gap-6">
            {/* Upcoming Exams */}
            <div className="col-span-3 bg-white rounded-xl shadow-sm border border-stone-200">
              <div className="p-6 border-b border-stone-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Upcoming Exams</h2>
                  <button className="flex items-center gap-1 text-orange-500 hover:text-orange-600">
                    <Plus size={18} />
                    Add New
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {student.upcomingExams.map((exam, index) => (
                    <div key={index} className="p-4 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium mb-2">{exam.subject}</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center text-stone-600">
                              <Calendar size={16} className="mr-2" />
                              <span className="text-sm">{exam.date}</span>
                            </div>
                            <div className="flex items-center text-stone-600">
                              <Clock size={16} className="mr-2" />
                              <span className="text-sm">{exam.time}</span>
                            </div>
                            <div className="flex items-center text-stone-600 col-span-2">
                              <Timer size={16} className="mr-2" />
                              <span className="text-sm">{exam.duration}</span>
                            </div>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-white rounded-lg text-stone-400 hover:text-stone-600">
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="col-span-2 bg-white rounded-xl shadow-sm border border-stone-200">
              <div className="p-6 border-b border-stone-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Recent Activity</h2>
                  <button className="text-orange-500 hover:text-orange-600">See all</button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {student.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors">
                      <div className={`w-2 h-2 rounded-full ${activity.type === 'exam' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                      <div className="flex-1">
                        <h3 className="font-medium">{activity.title}</h3>
                        <p className="text-sm text-stone-500 mt-1">{activity.date}</p>
                        {activity.score && (
                          <p className="text-sm text-emerald-600 font-medium mt-1">
                            Score: {activity.score}
                          </p>
                        )}
                      </div>
                      <button className="p-2 hover:bg-white rounded-lg text-stone-400 hover:text-stone-600">
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
