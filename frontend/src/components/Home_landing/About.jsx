// import React from 'react';

// const About = () => {
//   return (
//     <div className="about-container">
//       <h2>About Us</h2>
//       <p>Welcome to the Quiz App! We are dedicated to providing a comprehensive platform for creating and managing quizzes.</p>
//       <p>Our platform offers tools for teachers to create quizzes, track student progress, and much more. If you have any questions or need assistance, feel free to contact us!</p>
//     </div>
//   );
// }

// export default About;

import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            About QUIZIFY
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering education through innovative assessment technology
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="px-6 py-8 sm:p-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At QUIZIFY, we're dedicated to transforming the assessment experience for both educators and students. 
              Our platform combines cutting-edge technology with pedagogical best practices to create an engaging, 
              effective, and efficient quiz management system for modern educational institutions.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-500 hover:scale-105">
            <div className="p-8">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Assessment</h3>
              <p className="text-gray-600">
                Our platform provides intelligent quiz creation tools with adaptive testing capabilities to meet diverse learning needs.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-500 hover:scale-105">
            <div className="p-8">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Comprehensive Analytics</h3>
              <p className="text-gray-600">
                Track student progress with detailed analytics, identifying strengths and areas for improvement.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-500 hover:scale-105">
            <div className="p-8">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Platform</h3>
              <p className="text-gray-600">
                Ensure academic integrity with our secure testing environment and anti-cheating measures.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-500 hover:scale-105">
            <div className="p-8">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Seamless Integration</h3>
              <p className="text-gray-600">
                Easily integrate with existing college systems and learning management platforms.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="px-6 py-8 sm:p-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Dr. Aisha Patel</h3>
                <p className="text-indigo-600 mb-2">Lead Developer</p>
                <p className="text-gray-600 text-sm">Ph.D in Computer Science specializing in educational technology.</p>
              </div>

              {/* Team Member 2 */}
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Prof. Robert Chen</h3>
                <p className="text-indigo-600 mb-2">Educational Consultant</p>
                <p className="text-gray-600 text-sm">25+ years experience in assessment methodology and curriculum design.</p>
              </div>

              {/* Team Member 3 */}
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Maya Johnson</h3>
                <p className="text-indigo-600 mb-2">UX/UI Designer</p>
                <p className="text-gray-600 text-sm">Specialist in creating accessible and engaging educational interfaces.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;