import React, { useState } from 'react';
import { ChevronLeft, BookOpen, Gamepad2, Gift, Beaker, Palette, Globe, BookText, Music, Calculator, Home, Book, Users } from 'lucide-react';

const KidLearnApp = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">KidLearn</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setCurrentPage('lessons')}
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Lessons
            </button>
            <button className="text-gray-600 hover:text-gray-800 font-medium transition-colors">
              Games
            </button>
            <button className="text-gray-600 hover:text-gray-800 font-medium transition-colors">
              Rewards
            </button>
            <button className="text-gray-600 hover:text-gray-800 font-medium transition-colors">
              Profile
            </button>
          </div>
          <div className="text-gray-600 font-medium">Hello, Young Learner!</div>
        </div>
      </nav>
      
      <div className="max-w-4xl mx-auto p-6">
        {/* Header with Character */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-32 h-32 bg-black rounded-3xl flex items-center justify-center relative">
              <div className="w-6 h-8 bg-orange-400 rounded-sm"></div>
              <div className="absolute -left-16 top-1/2 transform -translate-y-1/2">
                <div className="w-16 h-20 bg-teal-400 rounded-lg relative">
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-200 rounded-full border-2 border-gray-800">
                    <div className="w-2 h-2 bg-black rounded-full absolute top-1 left-1"></div>
                    <div className="w-2 h-2 bg-black rounded-full absolute top-1 right-1"></div>
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-black rounded-full"></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-6 h-4 bg-red-600 rounded-t-full"></div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to KidLearn!</h1>
        </div>

        {/* Main Navigation Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setCurrentPage('lessons')}
            className="bg-red-400 hover:bg-red-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-colors shadow-lg"
          >
            <BookOpen className="inline-block w-6 h-6 mr-2" />
            Lessons
          </button>
          <button className="bg-green-400 hover:bg-green-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-colors shadow-lg">
            <Gamepad2 className="inline-block w-6 h-6 mr-2" />
            Games
          </button>
          <button className="bg-blue-400 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-colors shadow-lg">
            <Gift className="inline-block w-6 h-6 mr-2" />
            Rewards
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <div className="w-12 h-12 bg-black rounded-lg relative overflow-hidden">
                <div className="absolute top-2 left-2 w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
            <div className="w-24 h-24 bg-black rounded-2xl mx-auto mb-4 flex items-center justify-center relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              </div>
              <div className="absolute top-2 left-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              </div>
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="absolute bottom-2 left-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="absolute bottom-2 right-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <div className="w-16 h-12 bg-amber-800 rounded-lg relative">
                <div className="absolute top-1 left-2 w-3 h-3 bg-blue-400 rounded-full"></div>
                <div className="absolute top-1 right-2 w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-red-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );

  const LessonsPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage('home')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg"></div>
              <span className="text-xl font-semibold">KidLearn</span>
            </div>
          </div>
          <div className="text-gray-600 font-medium">Hello, Young Learner!</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 bg-orange-400 rounded-2xl flex items-center justify-center">
            <div className="w-12 h-16 bg-gray-800 rounded-sm relative">
              <div className="absolute -left-3 top-2 w-6 h-12 bg-orange-300 rounded-full"></div>
              <div className="absolute top-1 left-1 w-2 h-1 bg-white rounded-full"></div>
              <div className="absolute top-3 left-1 w-3 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Choose Your Lesson</h1>
            <p className="text-gray-600">Explore exciting subjects and start learning today!</p>
          </div>
        </div>

        {/* Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Science */}
          <div className="bg-green-100 rounded-3xl p-8 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <Beaker className="w-12 h-12 mx-auto mb-4 text-green-800" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Science</h3>
            <p className="text-gray-600 mb-4">Discover the wonders of the universe.</p>
            <div className="flex justify-center gap-1">
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
            </div>
          </div>

          {/* Art */}
          <div className="bg-orange-100 rounded-3xl p-8 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <Palette className="w-12 h-12 mx-auto mb-4 text-orange-800" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Art</h3>
            <p className="text-gray-600 mb-4">Unleash your creativity with colors.</p>
            <div className="flex justify-center gap-1">
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
            </div>
          </div>

          {/* Geography */}
          <div className="bg-blue-100 rounded-3xl p-8 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <Globe className="w-12 h-12 mx-auto mb-4 text-blue-800" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Geography</h3>
            <p className="text-gray-600 mb-4">Travel the world from your desk.</p>
            <div className="flex justify-center gap-1">
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
            </div>
          </div>

          {/* Literature */}
          <div className="bg-pink-100 rounded-3xl p-8 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <BookText className="w-12 h-12 mx-auto mb-4 text-pink-800" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Literature</h3>
            <p className="text-gray-600 mb-4">Dive into the world of stories.</p>
            <div className="flex justify-center gap-1">
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
            </div>
          </div>

          {/* Music */}
          <div className="bg-green-200 rounded-3xl p-8 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <Music className="w-12 h-12 mx-auto mb-4 text-green-800" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Music</h3>
            <p className="text-gray-600 mb-4">Feel the rhythm and explore sounds.</p>
            <div className="flex justify-center gap-1">
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
            </div>
          </div>

          {/* Mathematics */}
          <div className="bg-cyan-100 rounded-3xl p-8 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <Calculator className="w-12 h-12 mx-auto mb-4 text-cyan-800" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Mathematics</h3>
            <p className="text-gray-600 mb-4">Solve puzzles and crack numbers.</p>
            <div className="flex justify-center gap-1">
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-6xl mx-auto flex justify-center gap-12">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Home className="w-6 h-6 text-gray-600" />
          </button>
          <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Book className="w-6 h-6 text-gray-600" />
          </button>
          <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Users className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'lessons' && <LessonsPage />}
    </div>
  );
};

export default KidLearnApp;