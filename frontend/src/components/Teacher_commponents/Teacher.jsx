import React, { useState } from 'react';
import { Download, Trophy, BarChart, Users, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const TeacherQuizDashboard = () => {
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      name: 'Advanced Mathematics',
      date: '2024-03-01',
      time: '10:00 AM',
      totalStudents: 50,
      averageScore: 75,
      highestScore: 95,
      lowestScore: 45,
      passRate: 85,
      classSummary: {
        above90: 5,
        above80: 15,
        above70: 20,
        below70: 10
      },
      topPerformers: [
        { rank: 1, name: 'John Smith', score: 95 },
        { rank: 2, name: 'Sarah Chen', score: 92 },
        { rank: 3, name: 'Michael Rodriguez', score: 88 }
      ]
    },
    {
      id: 2,
      name: 'Data Science Fundamentals',
      date: '2024-02-22',
      time: '2:00 PM',
      totalStudents: 45,
      averageScore: 80,
      highestScore: 98,
      lowestScore: 55,
      passRate: 92,
      classSummary: {
        above90: 8,
        above80: 20,
        above70: 12,
        below70: 5
      },
      topPerformers: [
        { rank: 1, name: 'Emma Wilson', score: 98 },
        { rank: 2, name: 'David Kim', score: 95 },
        { rank: 3, name: 'Olivia Patel', score: 91 }
      ]
    }
  ]);

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [modalType, setModalType] = useState(null);

  const openModal = (quiz, type) => {
    setSelectedQuiz(quiz);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedQuiz(null);
    setModalType(null);
  };

  const deleteQuiz = (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
    }
  };

  const renderModalContent = () => {
    if (!selectedQuiz) return null;

    switch(modalType) {
      case 'performance':
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Class Performance Analysis</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedQuiz.averageScore}%</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Pass Rate</p>
                  <p className="text-2xl font-bold text-green-600">{selectedQuiz.passRate}%</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Score Distribution</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Above 90%</span>
                    <span className="font-bold">{selectedQuiz.classSummary.above90} students</span>
                  </div>
                  <div className="flex justify-between">
                    <span>80-90%</span>
                    <span className="font-bold">{selectedQuiz.classSummary.above80} students</span>
                  </div>
                  <div className="flex justify-between">
                    <span>70-80%</span>
                    <span className="font-bold">{selectedQuiz.classSummary.above70} students</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Below 70%</span>
                    <span className="font-bold">{selectedQuiz.classSummary.below70} students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'topPerformers':
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Top Performers</h2>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2">Rank</th>
                  <th className="p-2">Student Name</th>
                  <th className="p-2 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {selectedQuiz.topPerformers.map((student) => (
                  <tr key={student.rank} className="border-b">
                    <td className="p-2 text-center">{student.rank}</td>
                    <td className="p-2">{student.name}</td>
                    <td className="p-2 text-right font-bold">{student.score}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Quiz Management Dashboard</CardTitle>
        </CardHeader>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <tr>
                  <th className="p-3 text-left">Quiz Details</th>
                  <th className="p-3 text-center">Date & Time</th>
                  <th className="p-3 text-center">Students</th>
                  <th className="p-3 text-center">Performance</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz) => (
                  <tr key={quiz.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-semibold">{quiz.name}</div>
                    </td>
                    <td className="p-3 text-center">
                      <div>{quiz.date}</div>
                      <div className="text-sm text-gray-500">{quiz.time}</div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="font-semibold">{quiz.totalStudents}</div>
                      <div className="text-sm text-gray-500">Participants</div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="font-bold text-blue-600">{quiz.averageScore}%</div>
                      <div className="text-sm text-green-600">Pass Rate: {quiz.passRate}%</div>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center space-x-2">
                        <button 
                          onClick={() => openModal(quiz, 'performance')}
                          className="text-blue-500 hover:text-blue-700"
                          title="View Performance"
                        >
                          <BarChart size={20} />
                        </button>
                        <button 
                          onClick={() => {/* Download logic */}}
                          className="text-green-500 hover:text-green-700"
                          title="Download Report"
                        >
                          <Download size={20} />
                        </button>
                        <button 
                          onClick={() => openModal(quiz, 'topPerformers')}
                          className="text-yellow-500 hover:text-yellow-700"
                          title="Top Performers"
                        >
                          <Trophy size={20} />
                        </button>
                        <button 
                          onClick={() => deleteQuiz(quiz.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete Quiz"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Modal */}
      {selectedQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-96 max-h-[80vh] overflow-y-auto relative">
            <button 
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherQuizDashboard;